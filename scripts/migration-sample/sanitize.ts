/**
 * Contact sanitization for migration fixtures.
 *
 * The Drupal export carries POC and Author columns containing individual staff
 * email addresses. Per AGENTS.md this repository must never introduce PII into
 * content, fixtures, or logs. These helpers reduce a raw contact value to
 * something safe to render in a design prototype:
 *
 *   - `@gsa.gov` addresses are replaced with a role-based office contact.
 *   - Non-`.gov` addresses, phone numbers, and free-text personal names are
 *     dropped entirely.
 *   - Placeholder authoring values ("admin", "Anonymous") are dropped.
 *
 * The goal is a prototype that demonstrates *where* contact information appears
 * in a template without republishing anyone's individual address.
 */

/** Authoring placeholders that carry no editorial meaning. */
const PLACEHOLDER_AUTHORS = new Set(["admin", "anonymous", "unknown", "n/a"]);

/*
 * Two flavours of each pattern, deliberately.
 *
 * A `/g` regex carries mutable `lastIndex` state, and `RegExp.prototype.test`
 * ADVANCES it. Sharing one `/g` instance between `.test()` and `.replace()`
 * makes detection order-dependent: the second `.test()` of the same string
 * resumes past the first match, returns false, and the caller concludes the
 * value is clean. That is a PII-leak failure mode, not a cosmetic one, so the
 * detection patterns below are intentionally non-global and the global copies
 * are used only for `.replace()` (which resets `lastIndex` itself).
 *
 * Do not merge these back into single constants.
 */

/** Matches an email address. Non-global: safe for repeated `.test()`. */
const EMAIL_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/;

/** Global copy of {@link EMAIL_RE}, for `.replace()` only. */
const EMAIL_RE_G = new RegExp(EMAIL_RE.source, "g");

/**
 * Matches North American phone numbers. Non-global: safe for `.test()`.
 *
 * At least one separator is REQUIRED between the groups: either parentheses
 * around the area code, or a space/dot/hyphen after it, plus a separator before
 * the final four digits. An earlier version made every separator optional, which
 * reduced the pattern to "any ten consecutive digits" and false-positived on
 * URL-encoded filenames — e.g. `GWAC%20Ordering%20Guide-update%2020260819.docx`
 * yields the run `2020260819`. Real published phone numbers are always
 * punctuated, so requiring separators loses no true positives.
 */
const PHONE_RE =
  /(?:\+?1[\s.-]?)?(?:\(\d{3}\)\s?|\d{3}[\s.-])\d{3}[\s.-]\d{4}(?:\s?(?:x|ext\.?)\s?\d{1,6})?/i;

/** Global copy of {@link PHONE_RE}, for `.replace()` only. */
const PHONE_RE_G = new RegExp(PHONE_RE.source, "gi");

/**
 * Map a GSA organization code to a role-based, publishable contact label.
 * These are office-level identities, not individuals.
 */
const ORG_CONTACTS: Record<string, string> = {
  FAS: "Federal Acquisition Service",
  PBS: "Public Buildings Service",
  OGP: "Office of Government-wide Policy",
  OAS: "Office of Administrative Services",
  OSC: "Office of Strategic Communication",
  OCFO: "Office of the Chief Financial Officer",
  OCIO: "Office of the Chief Information Officer",
  OHRM: "Office of Human Resources Management",
  GLS: "GSA Legal Services",
};

/**
 * Convert a raw POC/Author cell into a role-based contact label, or undefined
 * when nothing publishable remains.
 *
 * @param raw The raw export value (typically an individual email address).
 * @param organization The owning org code from the same export row.
 */
export function toRoleContact(
  raw: string | undefined,
  organization?: string,
): string | undefined {
  if (!raw) return undefined;
  const value = raw.trim();
  if (!value) return undefined;
  if (PLACEHOLDER_AUTHORS.has(value.toLowerCase())) return undefined;

  // Individual email → office-level contact derived from the org code.
  if (EMAIL_RE.test(value)) {
    const org = organization?.trim().toUpperCase();
    if (org && ORG_CONTACTS[org]) return `${ORG_CONTACTS[org]}, U.S. GSA`;
    return "U.S. General Services Administration";
  }

  // Anything else that is not an email may still be a personal name; only allow
  // values that look like an office/organization rather than a person.
  const looksLikeOffice = /office|service|bureau|division|program|center|team/i;
  if (!looksLikeOffice.test(value)) return undefined;

  // Defense in depth: this branch returns the raw cell, so it must never pass
  // through a residual identifier. A cell like
  // "Jane Doe, Office of Policy, jane.doe@gsa.gov" satisfies looksLikeOffice.
  if (containsContactInfo(value)) return undefined;

  return value;
}

/**
 * Expand an organization code into its full office name for display.
 * Falls back to the raw code when unrecognized.
 */
export function orgLabel(organization?: string): string | undefined {
  if (!organization) return undefined;
  const org = organization.trim().toUpperCase();
  return ORG_CONTACTS[org] ?? organization.trim();
}

/**
 * Remove email addresses and phone numbers from a block of fetched body text.
 *
 * Legacy pages frequently end with a named contact and a direct phone line. The
 * replacement keeps the sentence readable while removing the identifier.
 */
export function scrubContactInfo(text: string): string {
  return text
    .replace(EMAIL_RE_G, "[contact redacted]")
    .replace(PHONE_RE_G, "[phone redacted]");
}

/**
 * True when a string still contains something that looks like personal contact
 * information. Used as a test/assertion guard on generated fixtures.
 *
 * Stateless by construction: both patterns are non-global, so this is safe to
 * call repeatedly and in any order over a batch of fixtures.
 */
export function containsContactInfo(text: string): boolean {
  return EMAIL_RE.test(text) || PHONE_RE.test(text);
}
