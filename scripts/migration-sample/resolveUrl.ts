/**
 * Public-URL resolution for legacy Drupal records.
 *
 * WHY THIS EXISTS
 * ---------------
 * The `Public URL` column in the Drupal export is not uniformly usable:
 *
 *   - `directives.csv` — 1347 of 1377 rows carry a bare node alias
 *     (`https://gsa.gov/node/<id>`), which 404s on the public site. The ~30 rows
 *     that do carry a path are frequently *mismatched* (a directive titled
 *     "Temporary and Term Employment" pointing at an unrelated homelessness
 *     page, another pointing into `sandbox/sherells-fas-test-area/`), so the
 *     column cannot be trusted for this type even when populated.
 *   - `reusable text blocks.csv` — 948 of 948 rows are node aliases. Reusable
 *     blocks are fragments embedded in other pages; they have no canonical
 *     public URL of their own.
 *   - `forms.csv`, `events.csv`, `photos.csv`, news, blog, and cmp exports carry
 *     real, fetchable paths and need no resolution.
 *
 * For the affected types the public site does expose the content under a
 * predictable, title-derived path (`/directives-library/<title-slug>`,
 * `/forms-library/<title-slug>`), which is verifiably correct: spot checks
 * resolved 4 of 6 sampled directives to a 200 with real body content, headings,
 * and the expected PDF download link.
 *
 * SOFT 404s
 * ---------
 * gsa.gov serves its "page not found" page with an HTTP 404 *and* a readable
 * body of exactly 61 words ("We apologize for the inconvenience… The page
 * you're looking for may have gone offline or does not exist"). Because the
 * status code is honest, status alone is enough to reject; the body signature is
 * kept here as a defensive second gate in case a variant is served as a 200.
 */
import { normalizeUrl } from "../content-audit/parseUrls";
import { toSlug } from "./toSample";
import type { LegacyContentType, LegacyRecord } from "./types";

/** Canonical public host. Bare `gsa.gov` redirects here. */
const PUBLIC_ORIGIN = "https://www.gsa.gov";

/**
 * True when a URL is a bare Drupal node alias with no human-readable path.
 * These are internal identifiers and 404 on the public site.
 */
export function isNodeAlias(url: string): boolean {
  try {
    return /^\/node\/\d+$/.test(new URL(url).pathname);
  } catch {
    return false;
  }
}

/**
 * Public section paths to try, per content type, when the export URL is unusable.
 * Ordered most- to least-likely; the first candidate that returns real content
 * wins.
 */
const TITLE_SLUG_BASES: Partial<Record<LegacyContentType, string[]>> = {
  directive: ["/directives-library"],
  gsa_forms_library: ["/forms-library", "/reference/forms"],
};

/**
 * Content types whose export URL is known to be unreliable even when populated.
 * For these, the title-derived candidates are tried *before* the export URL.
 */
const DISTRUST_EXPORT_URL = new Set<LegacyContentType>(["directive"]);

/**
 * Build the ordered list of URLs to try for one record.
 *
 * The first entry is the best guess; callers should fetch in order and stop at
 * the first candidate that yields real content. Returns an empty array when the
 * record has no plausible public URL at all (e.g. a reusable text block, which
 * exists only as a fragment inside other pages).
 */
export function resolveCandidateUrls(record: LegacyRecord): string[] {
  const exportUrl = isNodeAlias(record.publicUrl)
    ? undefined
    : record.publicUrl;
  const bases = TITLE_SLUG_BASES[record.contentType] ?? [];
  const slug = toSlug(record.title);

  const titleUrls = slug
    ? bases
        .map((base) => normalizeUrl(`${PUBLIC_ORIGIN}${base}/${slug}`))
        .filter((u): u is string => Boolean(u))
    : [];

  const ordered = DISTRUST_EXPORT_URL.has(record.contentType)
    ? [...titleUrls, ...(exportUrl ? [exportUrl] : [])]
    : [...(exportUrl ? [exportUrl] : []), ...titleUrls];

  // De-duplicate while preserving order.
  return [...new Set(ordered)];
}

/**
 * Distinctive phrases from the gsa.gov "page not found" body. Used to reject a
 * soft 404 that is served with a success status.
 */
const SOFT_404_MARKERS = [
  /we apologize for the inconvenience/i,
  /may have gone offline or does not exist/i,
];

/** True when body text is the gsa.gov not-found page rather than real content. */
export function isSoft404(bodyText: string): boolean {
  const head = bodyText.slice(0, 600);
  return SOFT_404_MARKERS.some((re) => re.test(head));
}

/** Schemes that are not fetchable documents and must never become a download. */
const NON_DOCUMENT_SCHEME = /^(?:mailto|tel|javascript|data):/i;

/**
 * Resolve a download href scraped from a legacy page into an absolute URL.
 *
 * The extractor returns hrefs exactly as authored, and legacy GSA.gov markup
 * links its attachments relatively — e.g.
 * `/directives/files/?file=2026-07%2F...GSA%20Pathways%20Program.pdf`. Stored
 * verbatim in a fixture, that path is later rendered into an `href` on *our*
 * origin, where it resolves to a route that does not exist. The asset lives on
 * the legacy host, so the host has to be reattached at generation time.
 *
 * Resolution is against the page's own final URL (post-redirect) rather than a
 * fixed origin, so an attachment on a subdomain stays on that subdomain.
 * `new URL()` also percent-encodes any literal spaces the source markup left in.
 *
 * @param href The raw href from the page.
 * @param pageUrl The absolute URL the page was fetched from.
 * @returns An absolute `http(s)` URL, or `undefined` when the href is not a
 *   fetchable document (in-page anchor, `mailto:`, unparseable).
 */
export function absolutizeDownloadUrl(
  href: string,
  pageUrl?: string,
): string | undefined {
  const raw = href.trim();
  if (!raw) return undefined;
  // A bare fragment points inside the page, not at an attachment.
  if (raw.startsWith("#")) return undefined;
  if (NON_DOCUMENT_SCHEME.test(raw)) return undefined;

  // Fall back to the canonical origin when the page URL is missing or itself
  // relative; every affected export row is on the public site.
  const base =
    pageUrl && /^https?:\/\//i.test(pageUrl) ? pageUrl : PUBLIC_ORIGIN;

  try {
    const resolved = new URL(raw, base);
    if (resolved.protocol !== "http:" && resolved.protocol !== "https:") {
      return undefined;
    }
    return resolved.toString();
  } catch {
    return undefined;
  }
}
