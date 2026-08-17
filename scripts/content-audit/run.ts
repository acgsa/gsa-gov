/**
 * Content Relevancy Audit — run harness.
 *
 * Pipeline: parse URLs → fetch+extract (rate-limited, cached) → DAP traffic
 * (cached) → corpus redundancy → USAi score (cached) → JSON/CSV artifacts +
 * static HTML report.
 *
 * Resume-safe: every network step is file-cached, so a crashed/aborted run can
 * be re-invoked and will only do the outstanding work.
 *
 * Validation gate: by default only the first `validationBatchSize` URLs are
 * processed and the run STOPS for owner review. Pass `--all` to process the
 * whole export, or `--limit=N` for an explicit count.
 *
 * Usage:
 *   npm run content-audit             # validation batch (~100), then stop
 *   npm run content-audit -- --all    # full corpus (after owner sign-off)
 *   npm run content-audit -- --limit=25
 *
 * Requires USAI_API_KEY and DAP_API_KEY in the local .env (never committed).
 */
import pLimit from "p-limit";
import { config } from "./config";
import { parseUrlExport } from "./parseUrls";
import { fetchAndExtract } from "./fetchPage";
import { getDapMetrics } from "./dapClient";
import { annotateRedundancy } from "./redundancy";
import { scorePage } from "./scorer";
import { buildArtifact, writeJson, writeCsv } from "./artifacts";
import { writeReport } from "./report";
import type { PageInput, PageSignals, ScoredPage } from "./types";

interface RunOptions {
  limit: number;
  all: boolean;
}

function parseArgs(argv: string[]): RunOptions {
  const all = argv.includes("--all");
  const limitArg = argv.find((a) => a.startsWith("--limit="));
  const limit = limitArg
    ? Math.max(1, Number(limitArg.split("=")[1]) || 0)
    : config.validationBatchSize;
  return { all, limit };
}

function log(msg: string): void {
  process.stdout.write(`[content-audit] ${msg}\n`);
}

/**
 * Build a conservative Needs-review record for a page whose USAi scoring threw.
 * This is NOT written to the score cache, so a later re-run retries only the
 * failed pages (resume-on-failure) instead of persisting a poisoned result.
 */
function scoreFailureRecord(
  input: PageInput,
  signals: PageSignals,
  error: string,
): ScoredPage {
  return {
    url: input.normalizedUrl,
    title: input.title ?? signals.metaTitle ?? input.normalizedUrl,
    totalScore: 0,
    breakdown: {
      alignment: 0,
      contentQuality: 0,
      actionable: 0,
      seoValue: 0,
      redundancy: 0,
      userValue: 0,
    },
    recommendation: "Needs review",
    justification: `Scoring failed (${error}); routed to manual review and not auto-deleted.`,
    legalHold: false,
    possibleLegalHold: false,
    needsManualReview: true,
    reviewReasons: signals.reviewReasons.includes("fetch-error")
      ? signals.reviewReasons
      : [...signals.reviewReasons],
    dapVisits: signals.dapVisits,
    dapPageviews: signals.dapPageviews,
    scoredAt: new Date().toISOString(),
  };
}

async function main(): Promise<void> {
  const opts = parseArgs(process.argv.slice(2));

  log(`reading URL export from ${config.inputCsvPath}`);
  const allInputs = await parseUrlExport(config.inputCsvPath);
  const inputs = opts.all ? allInputs : allInputs.slice(0, opts.limit);
  log(
    opts.all
      ? `processing full corpus: ${inputs.length} URLs`
      : `VALIDATION BATCH: processing ${inputs.length} of ${allInputs.length} URLs (pass --all after review)`,
  );

  // 1) Fetch + extract (rate-limited, cached).
  const fetchLimit = pLimit(config.fetchConcurrency);
  const signalsByUrl = new Map<string, PageSignals>();
  let done = 0;
  await Promise.all(
    inputs.map((input: PageInput) =>
      fetchLimit(async () => {
        const s = await fetchAndExtract(input.normalizedUrl);
        signalsByUrl.set(input.normalizedUrl, s);
        done += 1;
        if (done % 25 === 0 || done === inputs.length)
          log(`fetched ${done}/${inputs.length}`);
      }),
    ),
  );

  // 2) DAP traffic (cached). Failures degrade gracefully.
  const dapLimit = pLimit(config.fetchConcurrency);
  await Promise.all(
    inputs.map((input) =>
      dapLimit(async () => {
        const m = await getDapMetrics(input.normalizedUrl);
        const s = signalsByUrl.get(input.normalizedUrl);
        if (s) {
          s.dapVisits = m.visits;
          s.dapPageviews = m.pageviews;
        }
      }),
    ),
  );
  log("DAP traffic merged");

  // 3) Corpus-wide redundancy signal.
  annotateRedundancy(signalsByUrl);
  log("redundancy annotated");

  // 4) Score via USAi (cached, sequential-ish to respect model rate limits).
  // Resume-safe: a single scoring failure is recorded as a needs-review row and
  // reported, never silently retried, and never aborts the batch (AGENTS.md).
  const scoreLimit = pLimit(2);
  const scored: ScoredPage[] = [];
  const scoreFailures: { url: string; error: string }[] = [];
  let s = 0;
  await Promise.all(
    inputs.map((input) =>
      scoreLimit(async () => {
        const signals = signalsByUrl.get(input.normalizedUrl);
        if (!signals) return;
        try {
          const result = await scorePage(input, signals);
          scored.push(result);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          scoreFailures.push({ url: input.normalizedUrl, error: message });
          scored.push(scoreFailureRecord(input, signals, message));
        }
        s += 1;
        if (s % 10 === 0 || s === inputs.length)
          log(`scored ${s}/${inputs.length}`);
      }),
    ),
  );

  if (scoreFailures.length > 0) {
    log(
      `WARNING: ${scoreFailures.length} page(s) failed to score and were routed to Needs review:`,
    );
    for (const f of scoreFailures.slice(0, 10)) log(`  - ${f.url}: ${f.error}`);
    if (scoreFailures.length > 10)
      log(`  …and ${scoreFailures.length - 10} more.`);
    log(
      "Fix the cause, then re-run — cached successes are reused; only failures are retried.",
    );
  }

  // 5) Artifacts + report.
  const artifact = buildArtifact(scored);
  await writeJson(artifact);
  await writeCsv(artifact.pages);
  await writeReport(artifact);

  log(`wrote ${config.outJsonPath}`);
  log(`wrote ${config.outCsvPath}`);
  log(`wrote ${config.outHtmlPath}`);
  const sum = artifact.summary;
  log(
    `summary: keep=${sum.keep} consolidate=${sum.consolidate} delete=${sum.delete} needsReview=${sum.needsReview} legalHold=${sum.legalHold} possibleLegal=${sum.possibleLegalHold}`,
  );

  if (!opts.all) {
    log(
      "VALIDATION BATCH complete — review the report, then re-run with --all.",
    );
  }
}

main().catch((err: unknown) => {
  process.stderr.write(
    `[content-audit] FAILED: ${err instanceof Error ? err.message : String(err)}\n`,
  );
  process.exitCode = 1;
});
