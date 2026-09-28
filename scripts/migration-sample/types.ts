/**
 * Migration sample — shared types.
 *
 * The Drupal export in `data/drupalexport/` is metadata-only: it carries the
 * title, content type, node ID, public URL, and per-type editorial fields, but
 * no body HTML. These types model that metadata, plus the fetched body content
 * that the existing content-audit fetcher supplies.
 *
 * See plans/drupal-content-showcase-plan.md.
 */

/** The legacy Drupal content types represented in the export. */
export type LegacyContentType =
  | "blog_article"
  | "cmp_page"
  | "event"
  | "news_product"
  | "directive"
  | "gsa_forms_library"
  | "technical_document"
  | "photo_album"
  | "text_block"
  | "file_asset";

/**
 * One row of the Drupal export, normalized across all 11 CSVs.
 *
 * Columns that only appear in some exports are optional. `publicUrl` is
 * normalized via the content-audit `normalizeUrl` so it can be used as the
 * fetch/cache identity key.
 */
export interface LegacyRecord {
  title: string;
  contentType: LegacyContentType;
  /** Authoring-environment URL (cmp.gsa.gov). Not fetched. */
  cmpUrl?: string;
  /** Public gsa.gov URL, normalized. This is the fetch key. */
  publicUrl: string;
  /** Drupal node ID (or media ID for file assets). */
  nodeId: string;
  /** Last modified date as an ISO `YYYY-MM-DD` string, when parseable. */
  lastModified?: string;
  /** Owning organization, e.g. FAS, PBS, OGP, OAS, OSC. */
  organization?: string;
  /** Publication status as reported by Drupal, e.g. "Online" / "Offline". */
  status?: string;
  /** Point of contact (an email in the raw export; sanitized downstream). */
  poc?: string;
  /** Author (an email or username in the raw export; sanitized downstream). */
  author?: string;
  /** Legacy breadcrumb path, e.g. "/technology/...". */
  breadcrumbUrl?: string;
  /** Left-nav label used by the legacy page. */
  leftNavTitle?: string;
  /** Directive number, e.g. "9362.1B HRM". */
  directiveNumber?: string;
  /** Directive workflow status, e.g. "Validated". */
  directiveStatus?: string;
  /** Form status code as exported by the forms library. */
  formStatus?: string;
  /** File type for file assets, e.g. "document". */
  fileType?: string;
  /** Which CSV this row came from (provenance for the showcase). */
  sourceFile: string;
}

/** Result of parsing one export CSV. */
export interface ParseResult {
  records: LegacyRecord[];
  /** Rows skipped because they had no usable title or URL. */
  skipped: number;
}
