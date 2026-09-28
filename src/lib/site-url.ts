/**
 * The canonical origin for this deployment.
 *
 * Absolute URLs are required in exactly one place: social share previews.
 * `og:image`, `og:url` and `twitter:image` are read by crawlers that have no
 * page context, so a root-relative path is meaningless to them — Next resolves
 * those against `metadata.metadataBase`, and warns (then guesses
 * `http://localhost:3000`) when it is unset.
 *
 * Resolution order:
 *   1. `NEXT_PUBLIC_SITE_URL` — set per environment (cloud.gov preview, prod).
 *   2. `https://$CF_PAGES_URL`-style hosts are intentionally NOT auto-detected;
 *      an implicit origin that changes per deploy would silently publish share
 *      cards pointing at a sandbox.
 *   3. Local dev fallback.
 *
 * Kept as a module rather than an inline literal so the value cannot drift
 * between the root layout and any route that needs to build a canonical URL.
 */
const FALLBACK_ORIGIN = "http://localhost:3000";

function normalize(origin: string): string {
  // A trailing slash on metadataBase makes Next join paths as
  // `https://host//path`, so strip it once here.
  return origin.replace(/\/+$/, "");
}

export const SITE_ORIGIN = normalize(
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_ORIGIN,
);

export const SITE_URL = new URL(SITE_ORIGIN);

/** Absolute URL for a root-relative path, e.g. `/migration/gallery/x`. */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}
