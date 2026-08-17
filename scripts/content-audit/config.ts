/**
 * Content Relevancy Audit — configuration.
 *
 * All tunable knobs live here. Secrets are read from the environment only
 * (never hard-coded); see .env / .env.example for USAI_* and DAP_API_KEY.
 *
 * Impact: FIPS Low, public data only. See docs/decisions/ADR-006.
 */

export interface AuditConfig {
  /** Input URL export (CSV). Gitignored; owner drops the file here. */
  inputCsvPath: string;
  /** Where cached fetches / DAP / scores are stored (gitignored). */
  cacheDir: string;
  /** Output artifacts. */
  outJsonPath: string;
  outCsvPath: string;
  outHtmlPath: string;
  /** Static scoring-guide / key page (linked from the report header). */
  outGuidePath: string;

  /** Max concurrent page fetches (politeness / rate limit). */
  fetchConcurrency: number;
  /** Delay between fetches to the same host, in ms. */
  perRequestDelayMs: number;
  /** Fetch timeout in ms. */
  fetchTimeoutMs: number;
  /** User-Agent sent when crawling gsa.gov. */
  userAgent: string;

  /** A page with fewer than this many words is flagged thin-content. */
  thinContentWordThreshold: number;

  /** Validation-batch size for the first, owner-reviewed run. */
  validationBatchSize: number;

  /** USAi endpoint config (values from env; blank means "not set"). */
  usai: {
    baseUrl: string;
    model: string;
    apiKeyEnv: "USAI_API_KEY";
    /** Max chars of extracted body text sent to the model per page. */
    maxContentChars: number;
    requestTimeoutMs: number;
  };

  /** DAP traffic config. Per-URL traffic comes from a GA4 "All Pages" export. */
  dap: {
    /**
     * Path to the GA4 "All Pages" CSV export (owner-provided; gitignored).
     * The public DAP report API does not expose per-URL traffic for the full
     * corpus, so this exact-URL export is the authoritative source. See ADR-006.
     */
    ga4CsvPath: string;
  };
}

const requireEnv = (name: string): string => {
  const v = process.env[name];
  if (!v || v.trim() === "" || v.startsWith("replace-with")) {
    throw new Error(
      `Missing required env var ${name}. Set it in your local .env (never commit real values). See .env.example.`,
    );
  }
  return v;
};

/** Read an optional env var with a fallback default. */
const optionalEnv = (name: string, fallback: string): string => {
  const v = process.env[name];
  return v && v.trim() !== "" && !v.startsWith("replace-with") ? v : fallback;
};

export const config: AuditConfig = {
  inputCsvPath: optionalEnv("AUDIT_INPUT_CSV", "data/url-export.csv"),
  cacheDir: "scripts/content-audit/.cache",
  outJsonPath: "docs/content-audit-results.json",
  outCsvPath: "docs/content-audit-results.csv",
  outHtmlPath: "docs/content-audit-report.html",
  outGuidePath: "docs/content-audit-guide.html",

  fetchConcurrency: 4,
  perRequestDelayMs: 250,
  fetchTimeoutMs: 20_000,
  userAgent:
    "GSA.gov-content-audit/1.0 (+https://www.gsa.gov; internal content migration tooling)",

  thinContentWordThreshold: 120,

  validationBatchSize: 100,

  usai: {
    baseUrl: optionalEnv("USAI_BASE_URL", "https://api.gsa.usai.gov/api/v1"),
    model: optionalEnv("USAI_MODEL", "gpt-4o"),
    apiKeyEnv: "USAI_API_KEY",
    maxContentChars: 12_000,
    requestTimeoutMs: 60_000,
  },

  dap: {
    ga4CsvPath: optionalEnv("DAP_GA4_CSV", "data/All_Pages.csv"),
  },
};

/** Resolve the USAi API key at call time (throws if missing). */
export const getUsaiKey = (): string => requireEnv("USAI_API_KEY");
