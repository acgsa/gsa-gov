/**
 * USAi scorer.
 *
 * Sends deterministic per-page signals to a GSA-approved USAi model
 * (OpenAI-compatible chat completions) and returns the strict 100-point
 * rubric. The legal-hold hard gate (ADR-006) is applied AFTER the model
 * responds: a legal-hold match forces Keep and blocks Delete/Consolidate,
 * and needs-review pages are never auto-deleted.
 *
 * Fails closed: unparseable model output or a legal-hold match resolves to a
 * conservative "Needs review" / "Keep" outcome instead of a Delete.
 */
import { config, getUsaiKey } from "./config";
import { JsonCache } from "./cache";
import { matchLegalHold, matchNewsroomHold } from "./legal-hold";
import { linesOfBusinessPromptBlock } from "./lineOfBusiness";
import type {
  PageInput,
  PageSignals,
  RawScore,
  Recommendation,
  ScoreBreakdown,
  ScoredPage,
} from "./types";

const cache = new JsonCache(config.cacheDir);

const SYSTEM_PROMPT = `You are a strict federal web content auditor for the GSA.gov redesign.
Score each page against a 100-point rubric. Be consistent and STRICT: most
pages on this legacy site will score low. Do not inflate scores. Judge only
from the evidence provided; do not invent facts.

Lines of business the new site is organized around (for the Alignment score):
${linesOfBusinessPromptBlock()}

Rubric (max points in parentheses):
- alignment (30): fit with a line of business above.
- contentQuality (20): depth, accuracy signals, structure, currency.
- actionable (20): does it let a user DO something (forms, tools, clear next steps, downloads, contacts)?
- seoValue (15): title/description quality, headings, likely search value.
- redundancy (10): 10 = unique; lower as duplicate-cluster size grows / boilerplate.
- userValue (5): supported by traffic (DAP visits/pageviews) when available.

Recommendation rules:
- "Keep": high value, unique, aligned, actionable.
- "Consolidate": overlapping/thin but has salvageable value; name the merge target.
- "Delete": low value, redundant, obsolete, no traffic.

Also set possibleLegalHold=true if the page LOOKS statutorily/legally mandated
(e.g., No FEAR Act, FOIA, privacy, accessibility/508, OIG, vulnerability
disclosure, records/paperwork notices) even if unsure. When in doubt, flag it.

Return ONLY minified JSON with EXACTLY these keys:
{"breakdown":{"alignment":0,"contentQuality":0,"actionable":0,"seoValue":0,"redundancy":0,"userValue":0},"recommendation":"Keep|Consolidate|Delete","justification":"one sentence","consolidateSuggestion":"target if Consolidate else empty","possibleLegalHold":false,"legalHoldReason":""}`;

function clamp(n: unknown, max: number): number {
  const v = typeof n === "number" && Number.isFinite(n) ? n : 0;
  return Math.max(0, Math.min(max, Math.round(v)));
}

function normalizeBreakdown(raw: unknown): ScoreBreakdown {
  const b = (raw ?? {}) as Record<string, unknown>;
  return {
    alignment: clamp(b.alignment, 30),
    contentQuality: clamp(b.contentQuality, 20),
    actionable: clamp(b.actionable, 20),
    seoValue: clamp(b.seoValue, 15),
    redundancy: clamp(b.redundancy, 10),
    userValue: clamp(b.userValue, 5),
  };
}

function totalOf(b: ScoreBreakdown): number {
  return (
    b.alignment +
    b.contentQuality +
    b.actionable +
    b.seoValue +
    b.redundancy +
    b.userValue
  );
}

/** Build the compact evidence payload sent to the model. */
function buildUserPrompt(page: PageInput, s: PageSignals): string {
  const body = s.bodyText.slice(0, config.usai.maxContentChars);
  return JSON.stringify(
    {
      url: page.normalizedUrl,
      title: page.title ?? s.metaTitle ?? "",
      metaDescription: s.metaDescription ?? "",
      headings: s.headings.slice(0, 25),
      wordCount: s.wordCount,
      hasForm: s.hasForm,
      hasDownload: s.hasDownload,
      downloadCount: s.downloadLinks.length,
      hasContactInfo: s.hasContactInfo,
      ctaCount: s.ctaCount,
      duplicateClusterSize: s.duplicateClusterSize ?? 1,
      dapVisits: s.dapVisits ?? null,
      dapPageviews: s.dapPageviews ?? null,
      fetchStatus: s.fetchStatus,
      reviewReasons: s.reviewReasons,
      bodyText: body,
    },
    null,
    0,
  );
}

/** Extract a JSON object from a model response that may include stray text. */
function parseModelJson(content: string): RawScore | undefined {
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(content.slice(start, end + 1));
  } catch {
    return undefined;
  }
  const o = parsed as Record<string, unknown>;
  const rec = o.recommendation;
  const recommendation: RawScore["recommendation"] =
    rec === "Keep" || rec === "Consolidate" || rec === "Delete"
      ? rec
      : "Consolidate";
  return {
    breakdown: normalizeBreakdown(o.breakdown),
    recommendation,
    justification: typeof o.justification === "string" ? o.justification : "",
    consolidateSuggestion:
      typeof o.consolidateSuggestion === "string" &&
      o.consolidateSuggestion.trim()
        ? o.consolidateSuggestion.trim()
        : undefined,
    possibleLegalHold: o.possibleLegalHold === true,
    legalHoldReason:
      typeof o.legalHoldReason === "string" && o.legalHoldReason.trim()
        ? o.legalHoldReason.trim()
        : undefined,
  };
}

async function callUsai(userPrompt: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    config.usai.requestTimeoutMs,
  );
  try {
    const res = await fetch(`${config.usai.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getUsaiKey()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: config.usai.model,
        temperature: 0,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      throw new Error(
        `USAi HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`,
      );
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    return data.choices?.[0]?.message?.content ?? "";
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Score one page: call USAi, then apply the deterministic legal-hold gate and
 * needs-review protections. Cached by normalized URL + model.
 */
export async function scorePage(
  page: PageInput,
  signals: PageSignals,
): Promise<ScoredPage> {
  const cacheKey = `${config.usai.model}:${page.normalizedUrl}`;
  const cached = await cache.get<ScoredPage>("score", cacheKey);
  if (cached) return cached;

  const title = page.title ?? signals.metaTitle ?? page.normalizedUrl;

  // Deterministic legal-hold gate (URL/keyword rules).
  const hold = matchLegalHold(page.normalizedUrl, title, signals.bodyText);
  // Deterministic newsroom/press-release preservation gate (historical records).
  const news = matchNewsroomHold(page.normalizedUrl);

  let raw: RawScore | undefined;
  // Do not spend a model call on a hard fetch failure with no content.
  if (signals.fetchStatus !== "error" && signals.bodyText) {
    const content = await callUsai(buildUserPrompt(page, signals));
    raw = parseModelJson(content);
  }

  const breakdown: ScoreBreakdown = raw?.breakdown ?? {
    alignment: 0,
    contentQuality: 0,
    actionable: 0,
    seoValue: 0,
    redundancy: 0,
    userValue: 0,
  };

  let recommendation: Recommendation = raw?.recommendation ?? "Needs review";
  let justification =
    raw?.justification ??
    "No usable content extracted; routed to manual review.";

  // Needs-review pages are never auto-deleted (fail closed).
  if (signals.needsManualReview && recommendation === "Delete") {
    recommendation = "Needs review";
    justification =
      `Flagged for manual review (${signals.reviewReasons.join(", ")}); not auto-deleted. ${justification}`.trim();
  }

  // Hard legal-hold gate: force Keep, never Delete/Consolidate.
  const possibleLegalHold = hold.legalHold || raw?.possibleLegalHold === true;
  if (hold.legalHold) {
    recommendation = "Keep";
    justification =
      `Legal hold (${hold.reason}): preserved regardless of score. ${justification}`.trim();
  }

  // Newsroom/press-release preservation gate: historical records flow into the
  // searchable Press Releases database, so they are NEVER deleted — but they are
  // also not "live" Keep content. They are reclassified to a distinct Archive
  // bucket so the Keep count reflects only genuinely retained pages. The legal
  // hold above wins (those stay Keep); everything else that matches the newsroom
  // gate becomes Archive.
  if (news.hold && !hold.legalHold) {
    recommendation = "Archive";
    justification =
      `${news.reason}: preserved as historical record (archive), not deleted. ${justification}`.trim();
  }

  const scored: ScoredPage = {
    url: page.normalizedUrl,
    title,
    totalScore: totalOf(breakdown),
    breakdown,
    recommendation,
    justification,
    consolidateSuggestion:
      recommendation === "Consolidate" ? raw?.consolidateSuggestion : undefined,
    legalHold: hold.legalHold,
    possibleLegalHold,
    legalHoldReason: hold.reason ?? raw?.legalHoldReason,
    needsManualReview: signals.needsManualReview,
    reviewReasons: signals.reviewReasons,
    dapVisits: signals.dapVisits,
    dapPageviews: signals.dapPageviews,
    scoredAt: new Date().toISOString(),
  };

  await cache.set("score", cacheKey, scored);
  return scored;
}

// Exported for unit tests.
export const __test = { parseModelJson, normalizeBreakdown, totalOf };
