/**
 * Migration sample runner.
 *
 * Pipeline:
 *   1. Parse the Drupal metadata export in `data/drupalexport/`.
 *   2. Select deterministic, oversampled candidates per content type.
 *   3. Fetch each candidate's public URL via the existing content-audit fetcher
 *      (warm JSON cache, polite rate limiting).
 *   4. Sanitize + sectionize into fixtures, filling each quota with the first
 *      candidates that pass the substance filter.
 *   5. Emit `src/lib/migration/samples.generated.ts`.
 *
 * Run with:  ./scripts/migration-sample/run.sh
 *
 * Use the wrapper, not `npx tsx` directly: it supplies the invocation-scoped
 * NODE_EXTRA_CA_CERTS bundle that Node needs to complete the gsa.gov TLS chain
 * on GSA-managed machines. Without it every fetch fails with "unable to get
 * local issuer certificate" and every page looks like an error.
 *
 * Network access is limited to www.gsa.gov through the existing fetcher. All
 * content handled here is public; individual contact details are stripped.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { config } from "../content-audit/config";
import { fetchAndExtract } from "../content-audit/fetchPage";
import { loadExport, DEFAULT_EXPORT_DIR } from "./parseDrupalExport";
import { resolveCandidateUrls } from "./resolveUrl";
import { SAMPLE_QUOTAS, selectCandidates } from "./selectSample";
import { toSample } from "./toSample";
import type { MigrationSample } from "../../src/lib/migration/types";
import type { LegacyContentType, LegacyRecord } from "./types";

const OUT_PATH = "src/lib/migration/samples.generated.ts";

/**
 * Try each resolved URL for one record and return the first usable fixture.
 *
 * A record can map to more than one candidate URL because the export's
 * `Public URL` column is unreliable for some content types — see
 * {@link resolveCandidateUrls}. Rejections are logged with their reason so a
 * failed quota is diagnosable without re-running the fetch.
 */
async function trySample(
  record: LegacyRecord,
): Promise<MigrationSample | undefined> {
  const urls = resolveCandidateUrls(record);
  if (urls.length === 0) {
    console.log(`  – skip ${record.title} (no resolvable public URL)`);
    return undefined;
  }

  for (const url of urls) {
    // refetchErrors: a previous run may have cached transport-level failures
    // (e.g. a missing enterprise CA root before run.sh existed). Those are
    // environmental, not properties of the page, so retry them.
    const signals = await fetchAndExtract(url, { refetchErrors: true });
    const result = toSample(record, signals, config.thinContentWordThreshold);

    if (result.ok) return result.sample;

    console.log(
      `  – reject ${record.title} · ${result.reason}` +
        ` (status ${signals.fetchStatus}, ${signals.wordCount} words) ${url}`,
    );
  }

  return undefined;
}

/**
 * Fetch candidates for one content type until the quota is met.
 * Candidates that 404, error, or fall under the word threshold are skipped.
 */
async function fillQuota(
  contentType: LegacyContentType,
  candidates: LegacyRecord[],
  quota: number,
): Promise<MigrationSample[]> {
  const filled: MigrationSample[] = [];

  for (const record of candidates) {
    if (filled.length >= quota) break;
    try {
      const sample = await trySample(record);
      if (sample) {
        filled.push(sample);
        console.log(
          `  ✓ ${contentType} · ${sample.title} (${sample.provenance.wordCount} words)`,
        );
      }
    } catch (err) {
      console.log(
        `  ! error ${contentType} · ${record.title}: ${(err as Error).message}`,
      );
    }
  }

  if (filled.length < quota) {
    console.log(
      `  ⚠ ${contentType}: filled ${filled.length}/${quota} from ${candidates.length} candidates`,
    );
  }

  return filled;
}

/** Render the generated fixture module. */
function renderModule(samples: MigrationSample[]): string {
  const generatedAt = new Date().toISOString().slice(0, 10);
  return `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by \`./scripts/migration-sample/run.sh\` from the Drupal
 * metadata export in \`data/drupalexport/\` plus body content fetched from the
 * legacy public pages. Regenerate rather than editing.
 *
 * Content is real, published GSA.gov copy. Individual staff email addresses and
 * phone numbers are removed during generation; point-of-contact values are
 * reduced to role-based office labels.
 *
 * Generated: ${generatedAt}
 * Samples: ${samples.length}
 */
import type { MigrationSample } from "./types";

export const MIGRATION_SAMPLES: MigrationSample[] = ${JSON.stringify(
    samples,
    null,
    2,
  )};
`;
}

async function main(): Promise<void> {
  const exportDir = process.env.DRUPAL_EXPORT_DIR ?? DEFAULT_EXPORT_DIR;

  console.log(`Reading Drupal export from ${exportDir} …`);
  const records = await loadExport(exportDir);
  console.log(`  ${records.length} unique records across all content types`);

  const candidates = selectCandidates(records, SAMPLE_QUOTAS);

  const samples: MigrationSample[] = [];
  for (const [contentType, quota] of Object.entries(SAMPLE_QUOTAS)) {
    const pool = candidates.get(contentType as LegacyContentType) ?? [];
    console.log(
      `\n${contentType}: filling ${quota} from ${pool.length} candidates`,
    );
    samples.push(
      ...(await fillQuota(contentType as LegacyContentType, pool, quota)),
    );
  }

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, renderModule(samples), "utf8");

  console.log(`\nWrote ${samples.length} samples to ${OUT_PATH}`);
  const byType = samples.reduce<Record<string, number>>((acc, s) => {
    acc[s.contentType] = (acc[s.contentType] ?? 0) + 1;
    return acc;
  }, {});
  console.table(byType);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
