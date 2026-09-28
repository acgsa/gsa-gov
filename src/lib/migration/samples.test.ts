/**
 * Fixture-integrity tests for the generated migration showcase data.
 *
 * `samples.generated.ts` is real, fetched GSA.gov copy that is committed to the
 * repository. AGENTS.md prohibits introducing PII into content, fixtures, or
 * logs, so the committed artifact — not just the functions that produce it — has
 * to be asserted over directly. A generator bug that is later fixed does not
 * retroactively clean an artifact that was already committed; only a test that
 * reads the artifact catches that.
 *
 * These assertions also cover the shape guarantees the showcase routes rely on,
 * so a bad regeneration fails here rather than as a runtime render error.
 */
import { containsContactInfo } from "../../../scripts/migration-sample/sanitize";
import { MIGRATION_SAMPLES } from "./samples.generated";
import { CONTENT_TYPE_LABELS } from "./types";

/**
 * Content types whose page value is the attached document, not the page copy.
 * A forms-library page is legitimately a download plus a few labeled key/value
 * pairs, so it may have zero prose sections and no lede. Kept in sync with
 * `DOWNLOAD_IS_CONTENT` in the generator.
 */
const DOWNLOAD_CARRIES_CONTENT = new Set(["gsa_forms_library"]);

/** Every string a sample renders, flattened, for text-level assertions. */
function renderableStrings(
  sample: (typeof MIGRATION_SAMPLES)[number],
): string[] {
  return [
    sample.title,
    sample.dek,
    sample.organization ?? "",
    sample.contact ?? "",
    ...sample.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...sample.downloads,
    ...Object.values(sample.meta).map((v) => v ?? ""),
  ];
}

describe("generated fixtures: PII", () => {
  it("is a non-empty set (guards against an empty regeneration)", () => {
    expect(MIGRATION_SAMPLES.length).toBeGreaterThan(0);
  });

  it.each(MIGRATION_SAMPLES.map((s) => [s.slug, s] as const))(
    "%s carries no email address or phone number",
    (_slug, sample) => {
      const offenders = renderableStrings(sample).filter(containsContactInfo);
      // Report the field, not the surrounding article, to keep failure output
      // readable and to avoid echoing page copy into CI logs.
      expect(offenders.map((o) => o.slice(0, 80))).toEqual([]);
    },
  );

  it("never exposes a contact value that looks like an individual", () => {
    for (const sample of MIGRATION_SAMPLES) {
      if (!sample.contact) continue;
      expect(sample.contact).not.toContain("@");
    }
  });
});

describe("generated fixtures: shape", () => {
  it("has unique slugs so showcase routes cannot collide", () => {
    const slugs = MIGRATION_SAMPLES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has URL-safe slugs", () => {
    for (const sample of MIGRATION_SAMPLES) {
      expect(sample.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("uses only known content types", () => {
    for (const sample of MIGRATION_SAMPLES) {
      expect(CONTENT_TYPE_LABELS[sample.contentType]).toBeDefined();
    }
  });

  it("gives every sample a title", () => {
    for (const sample of MIGRATION_SAMPLES) {
      expect(sample.title.trim()).not.toBe("");
    }
  });

  /**
   * The real invariant is "there is something to render", not "there is prose".
   * Requiring a section for every sample would reject a valid forms-library
   * page, and requiring a dek would pressure the generator into promoting a
   * "Form Number: … Revision Date: …" blob to a lede — inventing editorial copy
   * rather than reflecting the source.
   */
  it("gives every sample something renderable", () => {
    for (const sample of MIGRATION_SAMPLES) {
      const hasProse = sample.sections.length > 0;
      const hasDocument =
        DOWNLOAD_CARRIES_CONTENT.has(sample.contentType) &&
        sample.downloads.length > 0;
      expect(hasProse || hasDocument).toBe(true);
    }
  });

  it("gives every prose sample a dek", () => {
    const missing = MIGRATION_SAMPLES.filter(
      (s) => s.sections.length > 0 && s.dek.trim() === "",
    ).map((s) => s.slug);
    expect(missing).toEqual([]);
  });

  it("gives every section a heading and at least one paragraph", () => {
    for (const sample of MIGRATION_SAMPLES) {
      for (const section of sample.sections) {
        expect(section.heading.trim()).not.toBe("");
        expect(section.paragraphs.length).toBeGreaterThan(0);
        expect(section.id).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });

  it("has unique section anchor ids within each sample", () => {
    for (const sample of MIGRATION_SAMPLES) {
      const ids = sample.sections.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("records provenance for every sample", () => {
    for (const sample of MIGRATION_SAMPLES) {
      expect(sample.provenance.nodeId).not.toBe("");
      expect(sample.provenance.sourceUrl).toMatch(/^https:\/\//);
      expect(sample.provenance.sourceFile).not.toBe("");
      expect(sample.provenance.wordCount).toBeGreaterThan(0);
    }
  });

  /**
   * Download hrefs go straight into a rendered `href`, so an escaped
   * query-string ampersand (`&amp;`) would be sent as a literal parameter name.
   */
  it("emits download URLs that are usable as hrefs", () => {
    for (const sample of MIGRATION_SAMPLES) {
      for (const url of sample.downloads) {
        expect(url).toMatch(/^https?:\/\//);
        expect(url).not.toContain("&amp;");
        expect(url).not.toMatch(/\s/);
      }
    }
  });
});

describe("generated fixtures: text quality", () => {
  /**
   * Readability's text extraction dissolves block boundaries, which once
   * collapsed an 890-word article into a single paragraph. `normalizeText.ts`
   * repairs that; this asserts the repair actually reached the artifact.
   */
  it("does not collapse long bodies into a single paragraph", () => {
    const collapsed = MIGRATION_SAMPLES.filter(
      (s) =>
        s.provenance.wordCount > 400 &&
        s.sections.reduce((n, sec) => n + sec.paragraphs.length, 0) === 1,
    ).map((s) => s.slug);
    expect(collapsed).toEqual([]);
  });

  it("leaves no undecoded HTML entities in rendered copy", () => {
    for (const sample of MIGRATION_SAMPLES) {
      for (const text of renderableStrings(sample)) {
        expect(text).not.toMatch(/&(?:nbsp|amp|quot|ldquo|rdquo|#\d+);/);
      }
    }
  });

  it("leaves no raw HTML tags in rendered copy", () => {
    for (const sample of MIGRATION_SAMPLES) {
      for (const text of renderableStrings(sample)) {
        expect(text).not.toMatch(/<\/?[a-z][^>]*>/i);
      }
    }
  });

  it("does not capture one metadata label as another's value", () => {
    // The inline meta parser reads "Label: value" pairs out of page copy; an
    // over-greedy match swallows the following label into the value.
    const labels = /(Special Instructions|Authority|Revision Date|Form Number)/;
    for (const sample of MIGRATION_SAMPLES) {
      for (const value of Object.values(sample.meta)) {
        if (value) expect(value).not.toMatch(labels);
      }
    }
  });
});
