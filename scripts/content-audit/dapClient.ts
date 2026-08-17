/**
 * DAP (Digital Analytics Program) client — GA4 "All Pages" export source.
 *
 * The public DAP report API (https://open.gsa.gov/api/dap/) does NOT expose
 * per-URL traffic for the full gsa.gov corpus: its per-page reports are capped
 * at the top-N pages and the agency `page` report returns an empty set. To keep
 * this signal dependable and based on EXACT URLs (never fuzzy title matches),
 * this client reads a GA4 "All Pages" CSV export placed in the data folder by
 * the project owner (see DAP_GA4_CSV / config.dap.ga4CsvPath).
 *
 * The export is a Google Analytics 4 report with a leading `#`-comment banner,
 * then a header row, then one row per (page path, hostname). We index every row
 * by `host + path` (host normalized: leading `www.` stripped) and answer
 * per-URL lookups with an exact path match (trailing slash tolerant).
 *
 * Metric mapping (owner-approved):
 *   - DapMetrics.visits    <- GA4 "Active users"
 *   - DapMetrics.pageviews <- GA4 "Views"
 *
 * When the CSV is missing or a URL has no matching row, metrics are returned as
 * `{}` and the caller records the page with no DAP figure (rendered as "—").
 * A missing CSV is surfaced loudly (thrown) so the run fails closed rather than
 * silently producing an all-empty DAP column.
 *
 * Impact: FIPS Low, public data only. See docs/decisions/ADR-006.
 */
import { promises as fs } from "node:fs";
import { config } from "./config";

export interface DapMetrics {
  visits?: number;
  pageviews?: number;
}

/** Normalize a hostname for matching: lowercase, strip a single leading www. */
function normHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, "");
}

/** Normalize a path for matching: strip trailing slashes (except root). */
function normPath(path: string): string {
  const p = path.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

/** A parsed GA4 row keyed by `${normHost}${normPath}`. */
type GaIndex = Map<string, DapMetrics>;

let indexPromise: Promise<GaIndex> | undefined;

/**
 * Parse one CSV line into fields, honoring double-quoted fields that may
 * contain commas. GA4 exports rarely quote, but page paths can theoretically
 * contain commas, so we parse defensively.
 */
function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function toNumber(raw: string | undefined): number | undefined {
  if (raw == null || raw.trim() === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Load and index the GA4 CSV once. Throws (fail closed) if the file is missing
 * or the expected columns are absent, so the run does not silently produce an
 * empty DAP column.
 */
async function loadIndex(): Promise<GaIndex> {
  const csvPath = config.dap.ga4CsvPath;
  let raw: string;
  try {
    raw = await fs.readFile(csvPath, "utf8");
  } catch {
    throw new Error(
      `DAP source CSV not found at "${csvPath}". Place the GA4 "All Pages" export there ` +
        `or set DAP_GA4_CSV. Columns required: "Page path and screen class", "Hostname", ` +
        `"Views", "Active users". See docs/decisions/ADR-006.`,
    );
  }

  // Drop the GA4 comment banner (# lines) and blank lines.
  const lines = raw
    .split(/\r?\n/)
    .filter((l) => l.length > 0 && !l.startsWith("#"));
  if (lines.length === 0)
    throw new Error(`DAP source CSV "${csvPath}" is empty.`);

  const header = splitCsvLine(lines[0]);
  const iPath = header.indexOf("Page path and screen class");
  const iHost = header.indexOf("Hostname");
  const iViews = header.indexOf("Views");
  const iUsers = header.indexOf("Active users");
  if (iPath < 0 || iHost < 0 || iViews < 0 || iUsers < 0) {
    throw new Error(
      `DAP source CSV "${csvPath}" is missing required columns. Found: [${header.join(", ")}]. ` +
        `Expected: "Page path and screen class", "Hostname", "Views", "Active users".`,
    );
  }

  const index: GaIndex = new Map();
  const maxCol = Math.max(iPath, iHost, iViews, iUsers);
  for (let i = 1; i < lines.length; i += 1) {
    const parts = splitCsvLine(lines[i]);
    if (parts.length <= maxCol) continue;
    const key = normHost(parts[iHost]) + normPath(parts[iPath]);
    // First occurrence wins (GA4 exports are pre-aggregated per path+host).
    if (index.has(key)) continue;
    index.set(key, {
      visits: toNumber(parts[iUsers]),
      pageviews: toNumber(parts[iViews]),
    });
  }
  return index;
}

/** Extract the host + path used for matching (undefined if URL is unparseable). */
function toKey(normalizedUrl: string): string | undefined {
  try {
    const u = new URL(normalizedUrl);
    return normHost(u.host) + normPath(u.pathname);
  } catch {
    return undefined;
  }
}

/**
 * Return DAP traffic for a single page URL via an exact host+path match against
 * the GA4 export. Returns `{}` when the URL is unparseable or absent from the
 * export. The CSV is loaded and indexed once and reused for the whole run.
 */
export async function getDapMetrics(
  normalizedUrl: string,
): Promise<DapMetrics> {
  const key = toKey(normalizedUrl);
  if (!key) return {};
  if (!indexPromise) indexPromise = loadIndex();
  const index = await indexPromise;
  return index.get(key) ?? {};
}
