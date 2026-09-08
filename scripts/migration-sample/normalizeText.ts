/**
 * Text repair for legacy body blobs, scoped to the migration showcase.
 *
 * WHY THIS EXISTS (and why it is not a fix to the audit fetcher)
 * -------------------------------------------------------------
 * `scripts/content-audit/fetchPage.ts` extracts readable text via Readability's
 * `article.textContent`. That property concatenates the article's text nodes and
 * discards element boundaries, so `<p>A.</p><p>B.</p>` arrives as `"A.B."` with
 * zero newlines. For the audit that is harmless — it only needs a word count, a
 * content hash, and a blob to hand the model.
 *
 * It is not harmless here. The showcase re-splits the blob into paragraphs, and
 * with no newlines to split on an 890-word news article collapses into a single
 * paragraph, which renders as an unreadable wall of text.
 *
 * The fix deliberately lives in this directory instead of in the audit
 * extractor. Changing `extractReadable` would alter `bodyText` for every audit
 * page, and `contentHash` is derived from `bodyText` — that would silently shift
 * the audit's duplicate-cluster detection, which is out of scope for this work
 * and would invalidate the existing 5,331-page result set. This module is
 * additive and only the migration pipeline calls it.
 */

/**
 * Named entities Drupal's WYSIWYG emits into body copy. Readability returns
 * text, not HTML, so anything double-escaped in the source survives as a
 * literal `&nbsp;` and would otherwise reach a fixture verbatim.
 */
const NAMED_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  quot: '"',
  apos: "'",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201c",
  rdquo: "\u201d",
  ndash: "\u2013",
  mdash: "\u2014",
  hellip: "\u2026",
  lt: "<",
  gt: ">",
};

/**
 * Decode the HTML entities that survive text extraction, then collapse the
 * non-breaking spaces they introduce so downstream trimming behaves normally.
 */
export function decodeHtmlEntities(text: string): string {
  return (
    text
      .replace(/&([a-z]+);/gi, (match, name: string) => {
        const decoded = NAMED_ENTITIES[name.toLowerCase()];
        return decoded ?? match;
      })
      .replace(/&#(\d{1,5});/g, (match, code: string) => {
        const point = Number.parseInt(code, 10);
        return point > 0 && point < 0x110000
          ? String.fromCodePoint(point)
          : match;
      })
      .replace(/&#x([0-9a-f]{1,5});/gi, (match, hex: string) => {
        const point = Number.parseInt(hex, 16);
        return point > 0 && point < 0x110000
          ? String.fromCodePoint(point)
          : match;
      })
      // Non-breaking space is whitespace for our purposes.
      .replace(/\u00a0/g, " ")
  );
}

/**
 * A sentence terminator (optionally followed by a closing quote or bracket)
 * butted directly against a capital letter or an opening quote, with no
 * intervening whitespace.
 *
 * Whitespace-free adjacency is the signal: real prose always puts a space after
 * a terminator, so its absence means an element boundary was dissolved. Observed
 * on live pages as `oversight.”Some in the Judiciary` and `work.For decades,`.
 */
const LOST_BLOCK_BOUNDARY = /([.!?])([”’"')\]]?)(?=[A-Z“"'(])/g;

/**
 * A single letter standing alone before the period — a personal initial or one
 * segment of a dotted initialism.
 *
 * This must be checked per-period, not across the whole abbreviation. In
 * `The U.S.General`, the period after `U` is its own boundary candidate, and a
 * pattern that only recognizes the complete `U.S.` would let that first period
 * through and split the acronym in half.
 */
const SINGLE_LETTER_INITIAL = /(?:^|[^A-Za-z])[A-Za-z]\.$/;

/**
 * Abbreviations that legitimately end in a period and are routinely followed by
 * a capitalized word with no space in extracted text. Splitting after one would
 * shatter a sentence mid-clause.
 */
const PROTECTED_ABBREVIATIONS =
  /(?:^|[^A-Za-z])(?:Inc|Ltd|Co|Corp|Jr|Sr|Mr|Mrs|Ms|Dr|Prof|Gov|Sen|Rep|Gen|Adm|Capt|Col|Lt|Sgt|St|Ave|Blvd|Rd|No|Nos|vs|etc|al|approx|Dept|Div|Est|Fig|Vol|Ch|Sec|Art|Pub|Stat|Reg|Rev|Ed|Eds|Mt|Ft)\.$/i;

/** Longest lookback needed to cover any protected pattern above. */
const LOOKBACK_CHARS = 12;

/**
 * Reinsert the paragraph breaks that text extraction dissolved.
 *
 * Only whitespace-free boundaries are touched, so text that already carries
 * real newlines passes through unchanged and the function is safe to apply
 * unconditionally.
 */
export function repairParagraphBreaks(text: string): string {
  return text.replace(
    LOST_BLOCK_BOUNDARY,
    (match, terminator: string, closer: string, offset: number) => {
      // Only a period can be part of an abbreviation; `!` and `?` never are.
      if (terminator === ".") {
        // Tail of the text up to and including this period. The closing quote is
        // excluded so both `work.` and `oversight.”` present the same shape.
        const tail = text.slice(
          Math.max(0, offset - LOOKBACK_CHARS),
          offset + 1,
        );
        if (SINGLE_LETTER_INITIAL.test(tail)) return match;
        if (PROTECTED_ABBREVIATIONS.test(tail)) return match;
      }
      return `${terminator}${closer}\n\n`;
    },
  );
}

/**
 * Full normalization pass applied to a legacy body blob before it is split into
 * paragraphs: decode stray entities, then restore lost block boundaries.
 */
export function normalizeBodyText(text: string): string {
  return repairParagraphBreaks(decodeHtmlEntities(text));
}
