/**
 * Legal-hold matcher.
 *
 * Some pages are required to exist by statute, regulation, or litigation /
 * consent decree and MUST be preserved regardless of relevancy score
 * (ADR-006). This is a HARD gate that overrides the LLM.
 *
 * The list below is OWNER-EDITABLE and intentionally conservative. It starts
 * with well-known mandated federal disclosures. Add exact URLs, glob patterns,
 * or title/keyword patterns as legal counsel confirms them.
 *
 * Because the true list is unknown, the pipeline ALSO asks the LLM to raise a
 * `possibleLegalHold` flag so unknown statutory pages surface for human review
 * rather than being silently deleted.
 */

export interface LegalHoldRule {
  /** Human-readable reason shown in the report. */
  reason: string;
  /** Exact normalized URLs (optional). */
  urls?: string[];
  /**
   * Path globs matched against the URL pathname, case-insensitive.
   * `*` matches within a path segment, `**` matches across segments.
   */
  pathGlobs?: string[];
  /** Case-insensitive substrings matched against title + body text. */
  keywords?: string[];
}

/**
 * Starter rules for common mandated federal disclosures. These are STRONG
 * candidates; the owner/legal must confirm and extend. Nothing here is deleted.
 */
export const LEGAL_HOLD_RULES: LegalHoldRule[] = [
  {
    reason: "No FEAR Act data (mandated disclosure)",
    pathGlobs: ["**/no-fear-act**", "**/nofear**"],
    keywords: [
      "no fear act",
      "notification and federal employee antidiscrimination",
    ],
  },
  {
    reason: "FOIA program page (5 U.S.C. § 552 required posting)",
    pathGlobs: ["**/foia**", "**/freedom-of-information**"],
    keywords: ["freedom of information act", "foia request"],
  },
  {
    reason: "Accessibility / Section 508 statement (required)",
    pathGlobs: ["**/accessibility**", "**/section-508**", "**/508**"],
    keywords: ["section 508", "accessibility statement"],
  },
  {
    reason: "Privacy policy / Privacy Act notice (required)",
    pathGlobs: ["**/privacy**", "**/privacy-policy**"],
    keywords: ["privacy act", "privacy policy", "system of records"],
  },
  {
    reason: "Office of Inspector General (statutory)",
    pathGlobs: ["**/oig**", "**/inspector-general**"],
    keywords: ["office of inspector general", "report fraud waste and abuse"],
  },
  {
    reason: "Vulnerability disclosure / security policy (BOD 20-01)",
    pathGlobs: ["**/vulnerability-disclosure**", "**/.well-known/security.txt"],
    keywords: ["vulnerability disclosure policy"],
  },
  {
    reason: "Digital accessibility / plain writing / open government reporting",
    pathGlobs: [
      "**/plain-language**",
      "**/open-government**",
      "**/digital-strategy**",
    ],
    keywords: ["plain writing act", "open government"],
  },
  {
    reason: "Records / information quality / paperwork reduction notices",
    pathGlobs: ["**/information-quality**", "**/paperwork-reduction**"],
    keywords: ["information quality act", "paperwork reduction act"],
  },
];

function globToRegExp(glob: string): RegExp {
  // Escape regex metachars, then translate ** and *.
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const pattern = escaped
    .replace(/\*\*/g, "\u0000")
    .replace(/\*/g, "[^/]*")
    .replace(/\u0000/g, ".*");
  return new RegExp(`^${pattern}$`, "i");
}

export interface LegalHoldMatch {
  legalHold: boolean;
  reason?: string;
}

/**
 * Evaluate the known legal-hold rules against a page. This is the deterministic
 * hard gate — a match forces Keep and blocks Delete/Consolidate.
 */
export function matchLegalHold(
  normalizedUrl: string,
  title: string,
  bodyText: string,
): LegalHoldMatch {
  let pathname = "/";
  try {
    pathname = new URL(normalizedUrl).pathname.toLowerCase();
  } catch {
    /* keep default */
  }
  const haystack = `${title}\n${bodyText}`.toLowerCase();

  for (const rule of LEGAL_HOLD_RULES) {
    if (
      rule.urls?.some((u) => u.toLowerCase() === normalizedUrl.toLowerCase())
    ) {
      return { legalHold: true, reason: rule.reason };
    }
    if (rule.pathGlobs?.some((g) => globToRegExp(g).test(pathname))) {
      return { legalHold: true, reason: rule.reason };
    }
    if (rule.keywords?.some((k) => haystack.includes(k.toLowerCase()))) {
      return { legalHold: true, reason: rule.reason };
    }
  }
  return { legalHold: false };
}

/**
 * Newsroom / press-release preservation gate.
 *
 * Press releases, news releases, congressional testimony, speeches, and the
 * regional newsroom archives are HISTORICAL records that will flow into the new
 * site's searchable Press Releases database. They MUST NOT be marked Delete
 * regardless of relevancy score or traffic. Like the legal-hold gate, this is a
 * deterministic hard gate applied AFTER the model: a match forces Keep.
 *
 * Owner-editable. Path globs are matched (case-insensitive) against the URL
 * pathname; the index/landing pages themselves are also preserved.
 */
export const NEWSROOM_HOLD_GLOBS: string[] = [
  "**/newsroom/news-releases**",
  "**/newsroom/press-releases**",
  "**/newsroom/congressional-testimony**",
  "**/newsroom/speeches**",
  "**/newsroom/speeches-by-the-administrator**",
  "**/newsroom/**press-releases**",
  "**/newsroom/**news-releases**",
  "**/newsroom/**feature-stories**",
  "**/former-gsa-regional-news-archive**",
];

export interface NewsroomHoldMatch {
  hold: boolean;
  reason?: string;
}

/**
 * Evaluate the newsroom/press-release preservation rules against a page URL.
 * A match forces Keep and blocks Delete (historical record for the searchable
 * Press Releases database).
 */
export function matchNewsroomHold(normalizedUrl: string): NewsroomHoldMatch {
  let pathname = "/";
  try {
    pathname = new URL(normalizedUrl).pathname.toLowerCase();
  } catch {
    /* keep default */
  }
  if (NEWSROOM_HOLD_GLOBS.some((g) => globToRegExp(g).test(pathname))) {
    return {
      hold: true,
      reason: "Press release / newsroom historical record (searchable archive)",
    };
  }
  return { hold: false };
}
