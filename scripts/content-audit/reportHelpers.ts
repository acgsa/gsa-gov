/**
 * HTML escaping + small formatting helpers for the static report.
 * Public data only; still escape all model/page-derived strings to avoid
 * breaking the report markup (defense in depth).
 */

/** Escape a string for safe insertion into HTML text/attributes. */
export function esc(value: unknown): string {
  const s = value == null ? "" : String(value);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Format a number for display, or an em dash when undefined. */
export function num(value: number | undefined): string {
  return value == null ? "—" : value.toLocaleString("en-US");
}

/** CSS class for a recommendation badge. */
export function recClass(rec: string): string {
  switch (rec) {
    case "Keep":
      return "rec rec-keep";
    case "Consolidate":
      return "rec rec-consolidate";
    case "Archive":
      return "rec rec-archive";
    case "Delete":
      return "rec rec-delete";
    default:
      return "rec rec-review";
  }
}
