/**
 * Tests for public-URL resolution and download-href absolutization.
 *
 * Both functions guard against a specific class of bad fixture: a stored URL
 * that looks fine in the data but resolves to the wrong place when rendered.
 * The cases below are taken from real rows and real scraped hrefs in the Drupal
 * export rather than invented shapes.
 */
import {
  absolutizeDownloadUrl,
  isNodeAlias,
  isSoft404,
  resolveCandidateUrls,
} from "./resolveUrl";
import type { LegacyRecord } from "./types";

/** Minimal record with only the fields URL resolution reads. */
function record(overrides: Partial<LegacyRecord>): LegacyRecord {
  return {
    nodeId: "1",
    title: "Example Title",
    contentType: "directive",
    publicUrl: "https://gsa.gov/node/1",
    sourceFile: "directives.csv",
    ...overrides,
  } as LegacyRecord;
}

describe("isNodeAlias", () => {
  it("recognizes a bare node alias on either host form", () => {
    expect(isNodeAlias("https://gsa.gov/node/167825")).toBe(true);
    expect(isNodeAlias("https://www.gsa.gov/node/1")).toBe(true);
  });

  it("does not treat a real path as an alias", () => {
    expect(isNodeAlias("https://www.gsa.gov/directives-library/travel")).toBe(
      false,
    );
    // A node id appearing deeper in a path is a real page, not an alias.
    expect(isNodeAlias("https://www.gsa.gov/about/node/12")).toBe(false);
  });

  it("returns false rather than throwing on an unparseable value", () => {
    expect(isNodeAlias("not a url")).toBe(false);
    expect(isNodeAlias("")).toBe(false);
  });
});

describe("resolveCandidateUrls", () => {
  it("drops a node alias and derives a candidate from the title", () => {
    const urls = resolveCandidateUrls(
      record({ title: "GSAs Pathways Programs" }),
    );
    expect(urls).toEqual([
      "https://www.gsa.gov/directives-library/gsas-pathways-programs",
    ]);
  });

  /**
   * The directives export's populated URLs are frequently mismatched — a
   * directive on term employment pointing at an unrelated page — so the
   * title-derived path must be tried first for this type even when a URL exists.
   */
  it("prefers the title-derived path over a distrusted export URL", () => {
    const urls = resolveCandidateUrls(
      record({
        title: "Temporary and Term Employment",
        publicUrl: "https://www.gsa.gov/some/unrelated/page",
      }),
    );
    expect(urls[0]).toBe(
      "https://www.gsa.gov/directives-library/temporary-and-term-employment",
    );
    expect(urls).toContain("https://www.gsa.gov/some/unrelated/page");
  });

  it("trusts the export URL first for types with reliable paths", () => {
    const urls = resolveCandidateUrls(
      record({
        contentType: "news_product",
        publicUrl: "https://www.gsa.gov/about-us/newsroom/news-releases/x",
        sourceFile: "news.csv",
      }),
    );
    expect(urls[0]).toBe(
      "https://www.gsa.gov/about-us/newsroom/news-releases/x",
    );
  });

  it("offers both library bases for forms", () => {
    const urls = resolveCandidateUrls(
      record({
        contentType: "gsa_forms_library",
        title: "Pre-Exit Clearance Checklist",
        sourceFile: "forms.csv",
      }),
    );
    expect(urls).toEqual([
      "https://www.gsa.gov/forms-library/pre-exit-clearance-checklist",
      "https://www.gsa.gov/reference/forms/pre-exit-clearance-checklist",
    ]);
  });

  /**
   * Reusable text blocks are fragments embedded in other pages. All 948 rows are
   * node aliases and there is no section base to derive a path from, so there is
   * genuinely nothing to fetch — an empty list is the correct answer.
   */
  it("returns nothing for a type with no public URL of its own", () => {
    expect(
      resolveCandidateUrls(
        record({
          contentType: "text_block",
          sourceFile: "reusable text blocks.csv",
        }),
      ),
    ).toEqual([]);
  });

  it("does not emit duplicates when the export URL matches the derived one", () => {
    const urls = resolveCandidateUrls(
      record({
        title: "GSAs Pathways Programs",
        publicUrl:
          "https://www.gsa.gov/directives-library/gsas-pathways-programs",
      }),
    );
    expect(urls).toHaveLength(new Set(urls).size);
    expect(urls).toHaveLength(1);
  });
});

describe("isSoft404", () => {
  it("detects the gsa.gov not-found body", () => {
    const body =
      "Page not found. We apologize for the inconvenience. The page you're " +
      "looking for may have gone offline or does not exist.";
    expect(isSoft404(body)).toBe(true);
  });

  it("does not flag real content that happens to apologize later on", () => {
    // Only the head of the document is examined, so a phrase deep in a long
    // page cannot cause a valid page to be discarded.
    const body = `${"word ".repeat(300)}we apologize for the inconvenience`;
    expect(isSoft404(body)).toBe(false);
  });

  it("returns false for ordinary copy", () => {
    expect(isSoft404("GSA manages federal real property.")).toBe(false);
  });
});

describe("absolutizeDownloadUrl", () => {
  const pageUrl =
    "https://www.gsa.gov/directives-library/gsas-pathways-programs";

  /**
   * The defect this function exists for: legacy attachments are linked
   * relatively, so a verbatim href becomes a link to a nonexistent route on the
   * prototype's own origin.
   */
  it("reattaches the host to a relative attachment path", () => {
    expect(
      absolutizeDownloadUrl(
        "/directives/files/?file=2026-07%2Fdirective_HRM%209362.1A.pdf",
        pageUrl,
      ),
    ).toBe(
      "https://www.gsa.gov/directives/files/?file=2026-07%2Fdirective_HRM%209362.1A.pdf",
    );
  });

  it("resolves against the page it was found on, not a fixed origin", () => {
    expect(
      absolutizeDownloadUrl(
        "/files/guide.pdf",
        "https://www1.eere.energy.gov/femp/pdfs/page.html",
      ),
    ).toBe("https://www1.eere.energy.gov/files/guide.pdf");
  });

  it("resolves a document-relative path against the page directory", () => {
    expect(
      absolutizeDownloadUrl("guide.pdf", "https://www.gsa.gov/a/b/page"),
    ).toBe("https://www.gsa.gov/a/b/guide.pdf");
  });

  it("leaves an already-absolute URL on its own host", () => {
    const absolute = "https://www.gsa.gov/system/files/form.pdf";
    expect(absolutizeDownloadUrl(absolute, pageUrl)).toBe(absolute);
  });

  it("upgrades a protocol-relative href using the page's scheme", () => {
    expect(absolutizeDownloadUrl("//example.gov/f.pdf", pageUrl)).toBe(
      "https://example.gov/f.pdf",
    );
  });

  it("percent-encodes a literal space left in the source markup", () => {
    const result = absolutizeDownloadUrl("/files/my form.pdf", pageUrl);
    expect(result).toBe("https://www.gsa.gov/files/my%20form.pdf");
    expect(result).not.toMatch(/\s/);
  });

  it("preserves an existing query string", () => {
    expect(absolutizeDownloadUrl("/f.pdf?scan=0&filename=x.pdf", pageUrl)).toBe(
      "https://www.gsa.gov/f.pdf?scan=0&filename=x.pdf",
    );
  });

  it("falls back to the canonical origin when the page URL is unusable", () => {
    expect(absolutizeDownloadUrl("/files/form.pdf", undefined)).toBe(
      "https://www.gsa.gov/files/form.pdf",
    );
    expect(absolutizeDownloadUrl("/files/form.pdf", "/relative/page")).toBe(
      "https://www.gsa.gov/files/form.pdf",
    );
  });

  /**
   * These are all real href shapes that the download-extension filter can let
   * through. None of them is a fetchable document, and storing any of them would
   * render a broken or actively unsafe link.
   */
  it.each([
    ["empty", ""],
    ["whitespace only", "   "],
    ["in-page anchor", "#form.pdf"],
    ["mailto", "mailto:someone@gsa.gov?subject=form.pdf"],
    ["tel", "tel:+12025550143"],
    ["javascript", "javascript:openDoc('a.pdf')"],
    ["data URI", "data:application/pdf;base64,AAAA"],
  ])("drops a %s href", (_label, href) => {
    expect(absolutizeDownloadUrl(href, pageUrl)).toBeUndefined();
  });

  it("only ever returns http or https URLs", () => {
    const hrefs = [
      "/a.pdf",
      "https://example.gov/b.pdf",
      "ftp://example.gov/c.pdf",
      "mailto:x@gsa.gov",
    ];
    for (const href of hrefs) {
      const result = absolutizeDownloadUrl(href, pageUrl);
      if (result !== undefined) expect(result).toMatch(/^https?:\/\//);
    }
  });
});
