/**
 * Sample selection for the migration showcase.
 *
 * Chooses a small, hand-reviewable set of real legacy pages that together
 * exercise every new template and every major existing module. Selection is
 * deterministic (no randomness) so the showcase is reproducible and reviewable.
 *
 * Rules, per plans/drupal-content-showcase-plan.md §4:
 *   1. Recency bias — newest `Last Modified` first, so the demo does not
 *      showcase stale copy.
 *   2. Org spread — round-robin across organizations before taking a second
 *      item from any single org.
 *   3. Published only — skip rows Drupal reports as Offline.
 *   4. Substance filter — applied after fetch, in the run step, using the
 *      existing `thinContentWordThreshold`.
 */
import type { LegacyContentType, LegacyRecord } from "./types";

/**
 * How many items to sample per legacy content type.
 *
 * `text_block` is deliberately absent. Reusable text blocks are fragments
 * embedded inside other pages: all 948 rows in `reusable text blocks.csv` carry
 * only a `/node/<id>` alias, and the public site exposes no canonical URL for
 * them, so there is nothing to fetch. The ReusableTextBlock module in the
 * showcase is therefore demonstrated with a section lifted from a real fetched
 * `cmp_page` instead of a fabricated fixture — see
 * plans/drupal-content-showcase-plan.md.
 */
export const SAMPLE_QUOTAS: Record<string, number> = {
  news_product: 4,
  blog_article: 3,
  cmp_page: 4,
  event: 3,
  directive: 2,
  gsa_forms_library: 2,
  technical_document: 1,
  photo_album: 2,
};

/**
 * Over-select this multiple of each quota so the run step can discard pages that
 * 404, redirect, or fall under the thin-content threshold and still fill the
 * quota without a second pass.
 *
 * Set to 6 rather than 3 because directive and forms candidates are resolved by
 * title slug, which does not always match the live path (spot checks resolved 4
 * of 6), so those pools need more depth to fill a small quota.
 */
export const OVERSAMPLE_FACTOR = 6;

/** True when Drupal reports the row as published. */
function isPublished(record: LegacyRecord): boolean {
  // Not every export includes a Status column; absence means "not stated",
  // which we treat as eligible rather than excluded.
  if (!record.status) return true;
  return record.status.trim().toLowerCase() !== "offline";
}

/** Sort newest-first, pushing unknown dates to the end. */
function byRecency(a: LegacyRecord, b: LegacyRecord): number {
  if (a.lastModified && b.lastModified) {
    return b.lastModified.localeCompare(a.lastModified);
  }
  if (a.lastModified) return -1;
  if (b.lastModified) return 1;
  return a.title.localeCompare(b.title);
}

/**
 * Interleave records so that consecutive picks come from different orgs.
 *
 * Records are bucketed by organization, each bucket stays in recency order, and
 * buckets are then drained round-robin. Buckets are visited in order of their
 * newest item so the overall result still leads with recent content.
 */
export function spreadByOrg(records: LegacyRecord[]): LegacyRecord[] {
  const buckets = new Map<string, LegacyRecord[]>();
  for (const record of records) {
    const key = record.organization?.trim().toUpperCase() ?? "UNSPECIFIED";
    const bucket = buckets.get(key);
    if (bucket) bucket.push(record);
    else buckets.set(key, [record]);
  }

  const ordered = [...buckets.values()].sort((a, b) => byRecency(a[0], b[0]));

  const result: LegacyRecord[] = [];
  let drained = false;
  while (!drained) {
    drained = true;
    for (const bucket of ordered) {
      const next = bucket.shift();
      if (next) {
        result.push(next);
        drained = false;
      }
    }
  }
  return result;
}

/**
 * Build the candidate list for one content type: published rows, newest first,
 * spread across organizations, capped at the oversampled quota.
 */
export function candidatesForType(
  records: LegacyRecord[],
  contentType: LegacyContentType,
  quota: number,
): LegacyRecord[] {
  const eligible = records
    .filter((r) => r.contentType === contentType)
    .filter(isPublished)
    .sort(byRecency);

  return spreadByOrg(eligible).slice(0, quota * OVERSAMPLE_FACTOR);
}

/**
 * Build the full candidate set across all sampled content types.
 * Returns a map keyed by content type so the run step can fill each quota
 * independently as fetches succeed or fail.
 */
export function selectCandidates(
  records: LegacyRecord[],
  quotas: Record<string, number> = SAMPLE_QUOTAS,
): Map<LegacyContentType, LegacyRecord[]> {
  const out = new Map<LegacyContentType, LegacyRecord[]>();
  for (const [type, quota] of Object.entries(quotas)) {
    const contentType = type as LegacyContentType;
    out.set(contentType, candidatesForType(records, contentType, quota));
  }
  return out;
}
