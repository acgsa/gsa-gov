/**
 * Corpus-wide redundancy signal.
 *
 * Uses the per-page content hash (first 5k chars of normalized readable text)
 * to cluster near-identical pages. Each page is annotated with the size of the
 * cluster it belongs to; larger clusters indicate higher redundancy, which
 * feeds the LLM's Redundancy score (10 pts).
 *
 * This is a cheap exact-prefix-hash approach (not full shingling); it reliably
 * catches boilerplate duplicates and republished content, which is the dominant
 * redundancy pattern on large legacy CMS sites.
 */
import type { PageSignals } from "./types";

export function annotateRedundancy(pages: Map<string, PageSignals>): void {
  const clusterCounts = new Map<string, number>();
  for (const signals of pages.values()) {
    if (!signals.contentHash) continue;
    clusterCounts.set(
      signals.contentHash,
      (clusterCounts.get(signals.contentHash) ?? 0) + 1,
    );
  }
  for (const signals of pages.values()) {
    if (!signals.contentHash) {
      signals.duplicateClusterSize = 1;
      continue;
    }
    signals.duplicateClusterSize = clusterCounts.get(signals.contentHash) ?? 1;
  }
}
