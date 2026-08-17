/**
 * Artifact writers: JSON + CSV.
 *
 * The JSON artifact is the source of truth (full records, resume-safe input to
 * the HTML report). The CSV is a flattened view for spreadsheet re-sorting by
 * the owner. Both are public data only (ADR-006).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { stringify } from "csv-stringify/sync";
import { config } from "./config";
import type { ScoredPage } from "./types";

export interface AuditArtifact {
  generatedAt: string;
  model: string;
  totalPages: number;
  summary: {
    keep: number;
    consolidate: number;
    archive: number;
    delete: number;
    needsReview: number;
    legalHold: number;
    possibleLegalHold: number;
  };
  pages: ScoredPage[];
}

export function summarize(pages: ScoredPage[]): AuditArtifact["summary"] {
  const s = {
    keep: 0,
    consolidate: 0,
    archive: 0,
    delete: 0,
    needsReview: 0,
    legalHold: 0,
    possibleLegalHold: 0,
  };
  for (const p of pages) {
    if (p.recommendation === "Keep") s.keep += 1;
    else if (p.recommendation === "Consolidate") s.consolidate += 1;
    else if (p.recommendation === "Archive") s.archive += 1;
    else if (p.recommendation === "Delete") s.delete += 1;
    else s.needsReview += 1;
    if (p.legalHold) s.legalHold += 1;
    if (p.possibleLegalHold) s.possibleLegalHold += 1;
  }
  return s;
}

export function buildArtifact(pages: ScoredPage[]): AuditArtifact {
  const sorted = [...pages].sort((a, b) => a.totalScore - b.totalScore);
  return {
    generatedAt: new Date().toISOString(),
    model: config.usai.model,
    totalPages: sorted.length,
    summary: summarize(sorted),
    pages: sorted,
  };
}

export async function writeJson(artifact: AuditArtifact): Promise<void> {
  await fs.mkdir(path.dirname(config.outJsonPath), { recursive: true });
  await fs.writeFile(
    config.outJsonPath,
    JSON.stringify(artifact, null, 2),
    "utf8",
  );
}

export async function writeCsv(pages: ScoredPage[]): Promise<void> {
  const rows = pages.map((p) => ({
    url: p.url,
    title: p.title,
    total_score: p.totalScore,
    alignment_30: p.breakdown.alignment,
    content_quality_20: p.breakdown.contentQuality,
    actionable_20: p.breakdown.actionable,
    seo_value_15: p.breakdown.seoValue,
    redundancy_10: p.breakdown.redundancy,
    user_value_5: p.breakdown.userValue,
    recommendation: p.recommendation,
    justification: p.justification,
    consolidate_suggestion: p.consolidateSuggestion ?? "",
    legal_hold: p.legalHold ? "yes" : "",
    possible_legal_hold: p.possibleLegalHold ? "yes" : "",
    legal_hold_reason: p.legalHoldReason ?? "",
    needs_manual_review: p.needsManualReview ? "yes" : "",
    review_reasons: p.reviewReasons.join("; "),
    dap_visits: p.dapVisits ?? "",
    dap_pageviews: p.dapPageviews ?? "",
    scored_at: p.scoredAt,
  }));
  const csv = stringify(rows, { header: true });
  await fs.mkdir(path.dirname(config.outCsvPath), { recursive: true });
  await fs.writeFile(config.outCsvPath, csv, "utf8");
}
