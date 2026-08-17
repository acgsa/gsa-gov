import { annotateRedundancy } from "./redundancy";
import type { PageSignals } from "./types";

function sig(contentHash?: string): PageSignals {
  return {
    fetchStatus: 200,
    redirected: false,
    headings: [],
    bodyText: "x",
    wordCount: 1,
    hasForm: false,
    hasDownload: false,
    hasContactInfo: false,
    ctaCount: 0,
    downloadLinks: [],
    contentHash,
    needsManualReview: false,
    reviewReasons: [],
  };
}

describe("annotateRedundancy", () => {
  it("counts identical content hashes as a cluster", () => {
    const pages = new Map<string, PageSignals>([
      ["a", sig("hash-1")],
      ["b", sig("hash-1")],
      ["c", sig("hash-2")],
    ]);
    annotateRedundancy(pages);
    expect(pages.get("a")?.duplicateClusterSize).toBe(2);
    expect(pages.get("b")?.duplicateClusterSize).toBe(2);
    expect(pages.get("c")?.duplicateClusterSize).toBe(1);
  });

  it("treats pages without a hash as unique (cluster size 1)", () => {
    const pages = new Map<string, PageSignals>([["a", sig(undefined)]]);
    annotateRedundancy(pages);
    expect(pages.get("a")?.duplicateClusterSize).toBe(1);
  });
});
