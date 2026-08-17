/**
 * Content Relevancy Audit — shared types.
 * See docs/decisions/ADR-006 for the scoring rubric and legal-hold rules.
 */

/** One row parsed from the URL export. */
export interface PageInput {
  url: string;
  /** Normalized absolute URL used as the cache/identity key. */
  normalizedUrl: string;
  title?: string;
}

/** Reasons a page is routed to manual review rather than auto-scored/deleted. */
export type ReviewReason =
  | "thin-content"
  | "js-rendered"
  | "fetch-error"
  | "redirect"
  | "gone-410"
  | "not-found-404";

/** Deterministic signals extracted locally and fed into the LLM. */
export interface PageSignals {
  fetchStatus: number | "error";
  finalUrl?: string;
  redirected: boolean;
  contentType?: string;

  /** Extracted readable content. */
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
  headings: string[];
  bodyText: string;
  wordCount: number;

  /** Actionability signals. */
  hasForm: boolean;
  hasDownload: boolean;
  hasContactInfo: boolean;
  ctaCount: number;
  downloadLinks: string[];

  /** Redundancy signal (filled in by the corpus pass). */
  contentHash?: string;
  duplicateClusterSize?: number;

  /** DAP traffic signal (filled in by the DAP pass). */
  dapVisits?: number;
  dapPageviews?: number;

  /** Flags. */
  needsManualReview: boolean;
  reviewReasons: ReviewReason[];
}

export type Recommendation =
  | "Keep"
  | "Consolidate"
  | "Archive"
  | "Delete"
  | "Needs review";

/** The strict per-criterion breakdown from the rubric. */
export interface ScoreBreakdown {
  alignment: number; // /30
  contentQuality: number; // /20
  actionable: number; // /20
  seoValue: number; // /15
  redundancy: number; // /10
  userValue: number; // /5
}

/** Final scored page record persisted to JSON/CSV and rendered in the report. */
export interface ScoredPage {
  url: string;
  title: string;
  totalScore: number; // /100
  breakdown: ScoreBreakdown;
  recommendation: Recommendation;
  justification: string;
  consolidateSuggestion?: string;

  /** Legal-hold override outcomes. */
  legalHold: boolean;
  possibleLegalHold: boolean;
  legalHoldReason?: string;

  /** Carried-through review flags. */
  needsManualReview: boolean;
  reviewReasons: ReviewReason[];

  /** Traffic snapshot for transparency in the report. */
  dapVisits?: number;
  dapPageviews?: number;

  /** ISO timestamp when this page was scored. */
  scoredAt: string;
}

/** Raw LLM output shape (before legal-hold override is applied). */
export interface RawScore {
  breakdown: ScoreBreakdown;
  recommendation: Exclude<Recommendation, "Needs review">;
  justification: string;
  consolidateSuggestion?: string;
  possibleLegalHold: boolean;
  legalHoldReason?: string;
}
