/**
 * Migration showcase — fixture types.
 *
 * These describe a legacy GSA.gov page after it has been parsed from the Drupal
 * metadata export, fetched, sanitized, and normalized for rendering in the new
 * design. The generator that produces them lives in `scripts/migration-sample/`;
 * the generated data lives in `samples.generated.ts`.
 *
 * Everything here is public content. Individual staff emails and phone numbers
 * from the legacy pages are removed during generation — see
 * `scripts/migration-sample/sanitize.ts`.
 */

/** The legacy Drupal content types represented in the showcase. */
export type LegacyContentType =
  | "blog_article"
  | "cmp_page"
  | "event"
  | "news_product"
  | "directive"
  | "gsa_forms_library"
  | "technical_document"
  | "photo_album"
  | "text_block";

/** Which new-design template renders a given sample. */
export type ShowcaseTemplate =
  | "DetailPage"
  | "TopicPage"
  | "InfoPage"
  | "EventPage"
  | "DirectivePage"
  | "FormPage"
  | "GalleryPage"
  | "DataPage";

/** A heading-delimited chunk of the fetched page body. */
export interface MigrationSection {
  /** Stable anchor id derived from the heading. */
  id: string;
  heading: string;
  paragraphs: string[];
}

/** Provenance for a sample, surfaced in the showcase index. */
export interface MigrationProvenance {
  /** Drupal node ID. */
  nodeId: string;
  /** The legacy public URL the content was read from. */
  sourceUrl: string;
  /** Last modified date from the export, ISO `YYYY-MM-DD`. */
  lastModified?: string;
  /** Which export CSV the metadata row came from. */
  sourceFile: string;
  /** Word count of the fetched body, used for the substance filter. */
  wordCount: number;
}

/**
 * Type-specific editorial metadata.
 *
 * Most fields come from the Drupal export row. The form/directive publication
 * fields (`formNumber`, `revisionDate`, `authority`) are not in the export — they
 * are labeled key/value pairs rendered in the body of the legacy page itself, so
 * they are parsed out of the fetched text.
 */
export interface MigrationTypeMeta {
  /** Directive number, e.g. "9362.1B HRM". */
  directiveNumber?: string;
  /** Directive workflow status, e.g. "Validated". */
  directiveStatus?: string;
  /** Form status code from the forms library export. */
  formStatus?: string;
  /** Official form number as printed on the legacy page, e.g. "GSA1655". */
  formNumber?: string;
  /** Current revision date as printed on the legacy page, e.g. "08/2026". */
  revisionDate?: string;
  /** Governing authority or regulation, e.g. "HRM 7800.14B". */
  authority?: string;
  /** Legacy breadcrumb path, e.g. "/technology/gwacs/polaris". */
  breadcrumbUrl?: string;
  /** Left-nav label used by the legacy page. */
  leftNavTitle?: string;
}

/** One legacy page, ready to render. */
export interface MigrationSample {
  /** URL-safe slug used for the showcase route. */
  slug: string;
  /** Legacy page title, verbatim from the export. */
  title: string;
  /** Legacy content type. */
  contentType: LegacyContentType;
  /** Which new template renders this sample. */
  template: ShowcaseTemplate;
  /** Owning organization, expanded to its full office name where known. */
  organization?: string;
  /** Role-based contact label. Never an individual's address. */
  contact?: string;
  /** Short lead paragraph derived from the fetched body or meta description. */
  dek: string;
  /** Body content, split on the page's own headings. */
  sections: MigrationSection[];
  /** Downloadable assets discovered on the legacy page. */
  downloads: string[];
  /** Type-specific editorial metadata. */
  meta: MigrationTypeMeta;
  /** Where this content came from. */
  provenance: MigrationProvenance;
}

/** Human-readable labels for each legacy content type. */
export const CONTENT_TYPE_LABELS: Record<LegacyContentType, string> = {
  blog_article: "Blog article",
  cmp_page: "Topic page",
  event: "Event",
  news_product: "News release",
  directive: "Directive",
  gsa_forms_library: "Form",
  technical_document: "Technical procedure",
  photo_album: "Photo album",
  text_block: "Reusable text block",
};
