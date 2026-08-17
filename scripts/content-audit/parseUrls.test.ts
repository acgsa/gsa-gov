import { normalizeUrl } from "./parseUrls";

describe("normalizeUrl", () => {
  it("lowercases the host and strips the fragment", () => {
    expect(normalizeUrl("https://WWW.GSA.GOV/foo#section")).toBe(
      "https://www.gsa.gov/foo",
    );
  });

  it("removes default ports", () => {
    expect(normalizeUrl("https://www.gsa.gov:443/foo")).toBe(
      "https://www.gsa.gov/foo",
    );
    expect(normalizeUrl("http://www.gsa.gov:80/foo")).toBe(
      "http://www.gsa.gov/foo",
    );
  });

  it("drops a trailing slash except for root", () => {
    expect(normalizeUrl("https://www.gsa.gov/foo/")).toBe(
      "https://www.gsa.gov/foo",
    );
    expect(normalizeUrl("https://www.gsa.gov/")).toBe("https://www.gsa.gov/");
  });

  it("preserves query strings", () => {
    expect(normalizeUrl("https://www.gsa.gov/search?q=lease")).toBe(
      "https://www.gsa.gov/search?q=lease",
    );
  });

  it("recovers protocol-less URLs", () => {
    expect(normalizeUrl("www.gsa.gov/foo")).toBe("https://www.gsa.gov/foo");
  });

  it("rejects non-http protocols", () => {
    expect(normalizeUrl("mailto:foo@gsa.gov")).toBeUndefined();
    expect(normalizeUrl("ftp://gsa.gov/x")).toBeUndefined();
  });

  it("returns undefined for empty input", () => {
    expect(normalizeUrl("   ")).toBeUndefined();
  });
});
