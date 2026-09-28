/**
 * Drupal export parser.
 *
 * Reads the metadata-only CSVs in `data/drupalexport/` and normalizes all 11
 * shapes into a single `LegacyRecord` type. Header names differ slightly between
 * exports (and are quoted with smart punctuation in some rows), so lookups are
 * case- and whitespace-insensitive.
 *
 * The export directory is gitignored; this parser is a build-time tool only and
 * is never bundled into the site.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { normalizeUrl } from "../content-audit/parseUrls";
import type { LegacyContentType, LegacyRecord, ParseResult } from "./types";

/** Default location of the owner-provided export. */
export const DEFAULT_EXPORT_DIR = "data/drupalexport";

interface RawRow {
  [key: string]: string;
}

/** Look up a column by any of several candidate header names. */
function pick(row: RawRow, names: string[]): string | undefined {
  const lower = new Map(
    Object.entries(row).map(([k, v]) => [k.toLowerCase().trim(), v]),
  );
  for (const n of names) {
    const v = lower.get(n.toLowerCase());
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

const KNOWN_TYPES = new Set<string>([
  "blog_article",
  "cmp_page",
  "event",
  "news_product",
  "directive",
  "gsa_forms_library",
  "technical_document",
  "photo_album",
  "text_block",
  "file_asset",
]);

/** Narrow a raw content-type string to the known union, or undefined. */
function asContentType(raw: string | undefined): LegacyContentType | undefined {
  if (!raw) return undefined;
  const v = raw.trim().toLowerCase();
  return KNOWN_TYPES.has(v) ? (v as LegacyContentType) : undefined;
}

/**
 * Convert the export's `MM/DD/YYYY` dates into ISO `YYYY-MM-DD`.
 * Returns undefined for anything that does not parse cleanly, so downstream
 * sorting can treat it as "unknown" rather than guessing.
 */
export function toIsoDate(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(raw.trim());
  if (!m) return undefined;
  const [, mm, dd, yyyy] = m;
  const month = Number(mm);
  const day = Number(dd);
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

/** Parse a single export CSV into normalized records. */
export function parseExportCsv(csv: string, sourceFile: string): ParseResult {
  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    bom: true,
  }) as RawRow[];

  const records: LegacyRecord[] = [];
  let skipped = 0;

  for (const row of rows) {
    const title = pick(row, ["title"]);
    const rawPublic = pick(row, ["public url", "publicurl", "url"]);
    const contentType = asContentType(
      pick(row, ["content-type", "content type"]),
    );
    const nodeId = pick(row, ["node id", "nodeid", "media id", "mediaid"]);

    // The master search export contains structural blank rows (e.g. a bare
    // "https://gsa.gov/node/" with no title). Those carry no content.
    if (!title || !rawPublic || !contentType || !nodeId) {
      skipped += 1;
      continue;
    }

    const publicUrl = normalizeUrl(rawPublic);
    if (!publicUrl) {
      skipped += 1;
      continue;
    }

    records.push({
      title,
      contentType,
      cmpUrl: pick(row, ["cmp url", "cmpurl"]),
      publicUrl,
      nodeId,
      lastModified: toIsoDate(pick(row, ["last modified", "lastmodified"])),
      organization: pick(row, ["organization", "org"]),
      status: pick(row, ["status"]),
      poc: pick(row, ["poc", "point of contact"]),
      author: pick(row, ["author"]),
      breadcrumbUrl: pick(row, ["breadcrumb url", "breadcrumburl"]),
      leftNavTitle: pick(row, ["left navigation title", "left nav title"]),
      directiveNumber: pick(row, ["number"]),
      directiveStatus: pick(row, ["directive status"]),
      formStatus: pick(row, ["form status"]),
      fileType: pick(row, ["file type"]),
      sourceFile,
    });
  }

  return { records, skipped };
}

/**
 * Read every CSV in the export directory and merge the results.
 *
 * The master `searchExport-*.csv` duplicates rows found in the per-type files,
 * so records are de-duplicated by node ID, preferring the per-type file (which
 * carries the richer columns).
 */
export async function loadExport(
  exportDir: string = DEFAULT_EXPORT_DIR,
): Promise<LegacyRecord[]> {
  const entries = await fs.readdir(exportDir);
  const csvFiles = entries
    .filter((f) => f.toLowerCase().endsWith(".csv"))
    // Per-type files first so they win de-duplication against the master export.
    .sort((a, b) => {
      const aMaster = a.startsWith("searchExport") ? 1 : 0;
      const bMaster = b.startsWith("searchExport") ? 1 : 0;
      return aMaster - bMaster || a.localeCompare(b);
    });

  const byNodeId = new Map<string, LegacyRecord>();

  for (const file of csvFiles) {
    const csv = await fs.readFile(path.join(exportDir, file), "utf8");
    const { records } = parseExportCsv(csv, file);
    for (const record of records) {
      const key = `${record.contentType}:${record.nodeId}`;
      if (!byNodeId.has(key)) byNodeId.set(key, record);
    }
  }

  return [...byNodeId.values()];
}
