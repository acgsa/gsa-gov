/**
 * URL export parser + normalizer.
 *
 * Accepts a CSV with a `url` column (case-insensitive) and an optional `title`
 * column. Extra columns are ignored. Rows without a usable URL are skipped.
 */
import { promises as fs } from "node:fs";
import { parse } from "csv-parse/sync";
import type { PageInput } from "./types";

/**
 * Normalize a URL for stable identity: lowercase host, strip default ports,
 * remove fragments, drop trailing slash (except root), and sort nothing else
 * (query kept as-is because it can be semantically meaningful on Drupal).
 */
export function normalizeUrl(input: string): string | undefined {
  const trimmed = input.trim();
  if (!trimmed) return undefined;
  let u: URL;
  try {
    u = new URL(trimmed);
  } catch {
    // Try to recover protocol-less URLs like "www.gsa.gov/foo".
    try {
      u = new URL(`https://${trimmed}`);
    } catch {
      return undefined;
    }
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return undefined;
  u.hash = "";
  u.hostname = u.hostname.toLowerCase();
  if (
    (u.protocol === "http:" && u.port === "80") ||
    (u.protocol === "https:" && u.port === "443")
  ) {
    u.port = "";
  }
  if (u.pathname.length > 1 && u.pathname.endsWith("/")) {
    u.pathname = u.pathname.replace(/\/+$/, "");
  }
  return u.toString();
}

interface RawRow {
  [key: string]: string;
}

/** Find a column value by trying several case-insensitive header names. */
function pick(row: RawRow, names: string[]): string | undefined {
  const lowerMap = new Map(
    Object.entries(row).map(([k, v]) => [k.toLowerCase().trim(), v]),
  );
  for (const n of names) {
    const v = lowerMap.get(n.toLowerCase());
    if (v && v.trim()) return v.trim();
  }
  return undefined;
}

/**
 * Read a CSV/TSV that may be UTF-8 or UTF-16 (LE/BE) encoded. Siteimprove and
 * some Windows exports use UTF-16 with a BOM; Node's readFile("utf8") mangles
 * those, so we sniff the BOM and decode accordingly.
 */
async function readTextAutoEncoding(csvPath: string): Promise<string> {
  const buf = await fs.readFile(csvPath);
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.toString("utf16le");
  }
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
    // UTF-16 BE — swap byte pairs, then decode as LE.
    const swapped = Buffer.from(buf);
    for (let i = 0; i + 1 < swapped.length; i += 2) {
      const tmp = swapped[i];
      swapped[i] = swapped[i + 1];
      swapped[i + 1] = tmp;
    }
    return swapped.toString("utf16le");
  }
  return buf.toString("utf8");
}

/**
 * Some exports (e.g. Siteimprove) prepend metadata lines ("Created: ...",
 * "Site: ...") and a blank line before the real header row. Detect the header
 * by finding the first line that contains a URL-ish column name.
 */
function stripPreamble(text: string): string {
  const lines = text.split(/\r?\n/);
  const headerIdx = lines.findIndex((line) =>
    /(^|["\t,])\s*"?(url|address|page|loc|link)"?\s*($|["\t,])/i.test(line),
  );
  return headerIdx > 0 ? lines.slice(headerIdx).join("\n") : text;
}

export async function parseUrlExport(csvPath: string): Promise<PageInput[]> {
  const decoded = await readTextAutoEncoding(csvPath);
  const raw = stripPreamble(decoded);
  // Auto-detect delimiter: tab if the header row has more tabs than commas.
  const firstLine = raw.slice(0, raw.indexOf("\n"));
  const delimiter =
    (firstLine.match(/\t/g)?.length ?? 0) > (firstLine.match(/,/g)?.length ?? 0)
      ? "\t"
      : ",";
  const rows = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    relax_quotes: true,
    bom: true,
    delimiter,
  }) as RawRow[];

  const seen = new Set<string>();
  const out: PageInput[] = [];
  for (const row of rows) {
    const urlRaw = pick(row, ["url", "address", "page", "loc", "link"]);
    if (!urlRaw) continue;
    const normalizedUrl = normalizeUrl(urlRaw);
    if (!normalizedUrl || seen.has(normalizedUrl)) continue;
    seen.add(normalizedUrl);
    out.push({
      url: urlRaw,
      normalizedUrl,
      title: pick(row, ["title", "page title", "name"]),
    });
  }
  return out;
}
