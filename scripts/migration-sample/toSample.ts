/**
 * Transform fetched page signals + export metadata into a renderable fixture.
 *
 * The fetcher returns one long readable text blob plus the page's heading list.
 * Legacy GSA.gov pages are heading-structured, so we re-split the body on those
 * headings to recover sections the new templates can render.
 */
import type { PageSignals } from "../content-audit/types";
import type {
  MigrationSample,
  MigrationSection,
  MigrationTypeMeta,
  ShowcaseTemplate,
  LegacyContentType as FixtureContentType,
} from "../../src/lib/migration/types";
import { decodeHtmlEntities, normalizeBodyText } from "./normalizeText";
import { absolutizeDownloadUrl, isSoft404 } from "./resolveUrl";
import { orgLabel, scrubContactInfo, toRoleContact } from "./sanitize";
import type { LegacyContentType, LegacyRecord } from "./types";

/** Which new-design template renders each legacy content type. */
export const TEMPLATE_FOR_TYPE: Record<string, ShowcaseTemplate> = {
  news_product: "DetailPage",
  blog_article: "DetailPage",
  cmp_page: "TopicPage",
  technical_document: "InfoPage",
  event: "EventPage",
  directive: "DirectivePage",
  gsa_forms_library: "FormPage",
  photo_album: "GalleryPage",
  text_block: "InfoPage",
};

/**
 * Minimum body word count for a page to count as substantive, by content type.
 *
 * The audit-wide `thinContentWordThreshold` (120 words) is the right default for
 * prose pages, but it is the wrong gate for library types whose value is the
 * attached document rather than the page copy. A forms-library page such as
 * `/forms-library/pre-exit-clearance-checklist` is a legitimate, complete page
 * at 23 words: it carries "Form Number", "Current Revision Date", "Authority or
 * Regulation", and the PDF itself. Rejecting it as thin would mean the FormPage
 * template had nothing real to render.
 *
 * Types absent from this map use the audit-wide default.
 */
const MIN_WORDS_FOR_TYPE: Partial<Record<LegacyContentType, number>> = {
  // Value is the attached form; the page is a metadata wrapper.
  gsa_forms_library: 15,
  // Albums are caption-led, so the prose is short by design.
  photo_album: 40,
  // Event pages are logistics (date, place, registration), not essays.
  event: 40,
};

/**
 * Types where a document download is itself sufficient content, so a fixture is
 * kept even when heading-based sectionizing yields nothing renderable.
 */
const DOWNLOAD_IS_CONTENT = new Set<LegacyContentType>(["gsa_forms_library"]);

/**
 * Every label legacy forms and directives print inline in their body copy.
 *
 * Used to terminate a field capture. Without a full label list a lazy capture
 * runs past an *empty* field into the next one — observed on
 * `/directives-library/congressional-notification-of-contract-awards`, where an
 * absent "Authority or Regulation" caused the following "Special Instructions"
 * sentence to be stored as the authority.
 */
const META_LABELS = [
  "Form Number",
  "Current Revision Date",
  "Authority or Regulation",
  "Special Instructions",
  "Form Status",
  "Directive Number",
  "Signed Date",
  "Expiration Date",
  "Superseded",
  "Related Links",
];

/**
 * Ends a field capture at a double space, the next known label, or end of text.
 * A field value never contains a label, so reaching one means the field we were
 * reading was empty.
 */
const META_VALUE_END = `(?=\\s{2,}|\\s*(?:${META_LABELS.join("|")})\\b|\\s*$)`;

/**
 * Labeled publication fields that legacy forms and directives print inline in
 * the body rather than exposing as structured data. Captured so the new
 * templates can render them as real metadata instead of leaving them buried in a
 * paragraph.
 *
 * Each capture is `{0,N}?` — allowed to match empty — so an absent field yields
 * nothing rather than swallowing the next label's value.
 */
const INLINE_META_PATTERNS: Array<[keyof MigrationTypeMeta, RegExp]> = [
  [
    "formNumber",
    new RegExp(`Form Number:\\s*([^\\n]{0,40}?)${META_VALUE_END}`, "i"),
  ],
  ["revisionDate", /Current Revision Date:\s*([0-9/\-.]{4,10})/i],
  [
    "authority",
    new RegExp(
      `Authority or Regulation:\\s*([^\\n]{0,80}?)${META_VALUE_END}`,
      "i",
    ),
  ],
];

/**
 * Pull inline publication metadata out of the fetched body text.
 * Returns only the fields actually present.
 */
export function parseInlineMeta(bodyText: string): MigrationTypeMeta {
  const found: MigrationTypeMeta = {};
  for (const [key, re] of INLINE_META_PATTERNS) {
    const value = re.exec(bodyText)?.[1]?.trim();
    // Defense in depth: a value that still contains a label is a mis-capture.
    if (!value || META_LABELS.some((label) => value.includes(`${label}:`))) {
      continue;
    }
    found[key] = value;
  }
  return found;
}

/**
 * Chrome headings that appear on every legacy page and carry no page content.
 * They come from the legacy site's nav, per-diem widget, and promo rails.
 */
const CHROME_HEADINGS = [
  /^featured topics/i,
  /^per diem look-?up$/i,
  /^\d+\s+choose a (location|date)$/i,
  /^rate review$/i,
  /^search$/i,
  /^menu$/i,
  /^breadcrumb$/i,
  /^footer$/i,
  /^sign up for updates?$/i,
  /^connect with us$/i,
];

function isChromeHeading(heading: string): boolean {
  return CHROME_HEADINGS.some((re) => re.test(heading.trim()));
}

/** Build a stable, URL-safe anchor id from arbitrary heading text. */
export function toSlug(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      // Drop combining marks left behind by decomposition.
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80)
  );
}

/**
 * Build the showcase slug for a record: a readable title slug plus the node ID,
 * which guarantees uniqueness even when two legacy pages share a title.
 */
export function sampleSlug(record: LegacyRecord): string {
  const base = toSlug(record.title) || "page";
  return `${base}-${record.nodeId}`;
}

/**
 * Is a split fragment real body copy rather than leftover page chrome?
 *
 * A bare character-length floor is too blunt once block boundaries are repaired:
 * it discards legitimate short paragraphs such as a one-line lede or a terse
 * list item. Prose is instead recognized by having several words *and* either
 * real length or sentence punctuation, which excludes chrome scraps like
 * "Home", "Share this page", and stray link labels.
 */
function isProseFragment(fragment: string): boolean {
  const words = fragment.split(/\s+/).filter(Boolean).length;
  if (words < 4) return false;
  return fragment.length > 40 || /[.!?:]$/.test(fragment);
}

/** Split body text into paragraphs, dropping chrome and whitespace fragments. */
function toParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}|\n(?=\s*[A-Z])/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(isProseFragment);
}

/**
 * Re-split a body blob into sections using the page's own headings.
 *
 * Headings are matched positionally in the body text. Content before the first
 * real heading becomes the lead section.
 */
export function sectionize(
  bodyText: string,
  headings: string[],
): MigrationSection[] {
  // Decode headings with the same pass applied to the body, or a heading holding
  // a stray entity would never be found by `indexOf` against the decoded text.
  const usable = headings
    .map((h) => decodeHtmlEntities(h).replace(/\s+/g, " ").trim())
    .filter((h) => h.length > 2 && h.length < 120 && !isChromeHeading(h));

  // Locate each heading in the body, in order, so sections do not overlap.
  const marks: Array<{ heading: string; index: number }> = [];
  let cursor = 0;
  for (const heading of usable) {
    const index = bodyText.indexOf(heading, cursor);
    if (index === -1) continue;
    marks.push({ heading, index });
    cursor = index + heading.length;
  }

  if (marks.length === 0) {
    const paragraphs = toParagraphs(bodyText);
    return paragraphs.length
      ? [{ id: "overview", heading: "Overview", paragraphs }]
      : [];
  }

  const sections: MigrationSection[] = [];

  const lead = toParagraphs(bodyText.slice(0, marks[0].index));
  if (lead.length) {
    sections.push({ id: "overview", heading: "Overview", paragraphs: lead });
  }

  marks.forEach((mark, i) => {
    const start = mark.index + mark.heading.length;
    const end = i + 1 < marks.length ? marks[i + 1].index : bodyText.length;
    const paragraphs = toParagraphs(bodyText.slice(start, end));
    if (!paragraphs.length) return;
    sections.push({
      id: toSlug(mark.heading) || `section-${i + 1}`,
      heading: mark.heading,
      paragraphs,
    });
  });

  return sections;
}

/**
 * Derive a short lead sentence for the page: prefer the fetched meta
 * description, otherwise the first body paragraph, truncated on a word boundary.
 *
 * Returns `""` when the legacy page genuinely has neither. That is the correct
 * answer for the metadata-only types (forms, some directives), whose pages are a
 * download plus a few labeled key/value pairs and no prose lede at all. The
 * alternative — promoting that key/value blob to a lede, so a page opens with
 * "Form Number: GSA1655 Revision Date: 08/2026" — is worse than an absent dek,
 * and inventing a summary would be fabricating content. Templates must therefore
 * treat `dek` as optional in practice.
 */
export function deriveDek(
  signals: PageSignals,
  sections: MigrationSection[],
): string {
  const raw =
    signals.metaDescription?.trim() || sections[0]?.paragraphs[0] || "";
  // Meta descriptions come straight from the document head, where Drupal leaves
  // entities like `&nbsp;` intact; decode before they can reach a fixture.
  const clean = scrubContactInfo(
    decodeHtmlEntities(raw).replace(/\s+/g, " ").trim(),
  );
  if (clean.length <= 240) return clean;
  const cut = clean.slice(0, 240);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : 240)}…`;
}

/**
 * Why a candidate was rejected. Returned instead of a bare `undefined` so the
 * runner can report an actionable reason per skipped page.
 */
export type RejectReason =
  | "fetch-status"
  | "soft-404"
  | "thin-content"
  | "no-sections"
  | "no-template";

/** Either a usable fixture or the reason it was rejected. */
export type SampleResult =
  | { ok: true; sample: MigrationSample }
  | { ok: false; reason: RejectReason };

/**
 * Build a fixture from one export row plus its fetched signals.
 *
 * @param defaultMinWordCount Audit-wide thin-content threshold, used for types
 *   without an entry in {@link MIN_WORDS_FOR_TYPE}.
 */
export function toSample(
  record: LegacyRecord,
  signals: PageSignals,
  defaultMinWordCount: number,
): SampleResult {
  if (signals.fetchStatus !== 200) return { ok: false, reason: "fetch-status" };

  // Defensive: reject the not-found page even if it is ever served as a 200.
  if (isSoft404(signals.bodyText)) return { ok: false, reason: "soft-404" };

  const minWordCount =
    MIN_WORDS_FOR_TYPE[record.contentType] ?? defaultMinWordCount;
  if (signals.wordCount < minWordCount) {
    return { ok: false, reason: "thin-content" };
  }

  const template = TEMPLATE_FOR_TYPE[record.contentType];
  if (!template) return { ok: false, reason: "no-template" };

  // Repair extraction damage (dissolved block boundaries, stray entities) before
  // any splitting or metadata parsing runs against the text.
  const cleanBody = scrubContactInfo(normalizeBodyText(signals.bodyText));
  const sections = sectionize(cleanBody, signals.headings).map((section) => ({
    ...section,
    heading: scrubContactInfo(section.heading),
  }));

  // Download hrefs need two repairs before they are safe to store, because they
  // are rendered directly into an `href`:
  //
  //   1. Legacy markup escapes query-string ampersands and the extractor keeps
  //      the escaped form (`?scan=0&amp;filename=…`), which a browser would send
  //      as a literal `&amp;` parameter name.
  //   2. Attachments are linked relatively (`/directives/files/?file=…`), so
  //      without the legacy host reattached they resolve against *our* origin.
  //
  // Resolution happens against the page's own final URL, and non-document hrefs
  // (fragments, `mailto:`) are dropped rather than stored as broken links.
  const pageUrl = signals.finalUrl ?? record.publicUrl;
  const downloads = signals.downloadLinks
    .map((href) => absolutizeDownloadUrl(decodeHtmlEntities(href), pageUrl))
    .filter((url): url is string => Boolean(url))
    .filter((url, i, all) => all.indexOf(url) === i)
    .slice(0, 8);
  const downloadCarriesContent =
    DOWNLOAD_IS_CONTENT.has(record.contentType) && downloads.length > 0;

  if (sections.length === 0 && !downloadCarriesContent) {
    return { ok: false, reason: "no-sections" };
  }

  const sample: MigrationSample = {
    slug: sampleSlug(record),
    title: record.title,
    contentType: record.contentType as FixtureContentType,
    template,
    organization: orgLabel(record.organization),
    contact: toRoleContact(record.poc ?? record.author, record.organization),
    dek: deriveDek(signals, sections),
    sections,
    downloads,
    meta: {
      // Inline body metadata first, so an explicit export column always wins.
      ...parseInlineMeta(cleanBody),
      directiveNumber: record.directiveNumber,
      directiveStatus: record.directiveStatus,
      formStatus: record.formStatus,
      breadcrumbUrl: record.breadcrumbUrl,
      leftNavTitle: record.leftNavTitle,
    },
    provenance: {
      nodeId: record.nodeId,
      sourceUrl: signals.finalUrl ?? record.publicUrl,
      lastModified: record.lastModified,
      sourceFile: record.sourceFile,
      wordCount: signals.wordCount,
    },
  };

  return { ok: true, sample };
}
