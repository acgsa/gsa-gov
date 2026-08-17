import { matchLegalHold, matchNewsroomHold } from "./legal-hold";

describe("matchLegalHold", () => {
  it("matches No FEAR Act by path", () => {
    const r = matchLegalHold(
      "https://www.gsa.gov/no-fear-act",
      "No FEAR Act",
      "",
    );
    expect(r.legalHold).toBe(true);
    expect(r.reason).toMatch(/FEAR/i);
  });

  it("matches FOIA by keyword in body", () => {
    const r = matchLegalHold(
      "https://www.gsa.gov/some-page",
      "Records",
      "You may submit a FOIA request under the Freedom of Information Act.",
    );
    expect(r.legalHold).toBe(true);
  });

  it("matches Section 508 accessibility by path", () => {
    const r = matchLegalHold(
      "https://www.gsa.gov/accessibility",
      "Accessibility",
      "",
    );
    expect(r.legalHold).toBe(true);
  });

  it("does not match ordinary marketing pages", () => {
    const r = matchLegalHold(
      "https://www.gsa.gov/real-estate/leasing",
      "Leasing space",
      "We help agencies lease office space efficiently.",
    );
    expect(r.legalHold).toBe(false);
    expect(r.reason).toBeUndefined();
  });

  it("is case-insensitive on keywords", () => {
    const r = matchLegalHold(
      "https://www.gsa.gov/x",
      "PRIVACY POLICY",
      "SYSTEM OF RECORDS notice",
    );
    expect(r.legalHold).toBe(true);
  });
});

describe("matchNewsroomHold", () => {
  it("holds national news releases", () => {
    const r = matchNewsroomHold(
      "https://www.gsa.gov/about-gsa/newsroom/news-releases/some-release-01012024",
    );
    expect(r.hold).toBe(true);
    expect(r.reason).toMatch(/press release|newsroom/i);
  });

  it("holds press releases", () => {
    const r = matchNewsroomHold(
      "https://www.gsa.gov/about-gsa/newsroom/press-releases",
    );
    expect(r.hold).toBe(true);
  });

  it("holds congressional testimony", () => {
    const r = matchNewsroomHold(
      "https://www.gsa.gov/about-gsa/newsroom/congressional-testimony/x",
    );
    expect(r.hold).toBe(true);
  });

  it("holds administrator speeches", () => {
    const r = matchNewsroomHold(
      "https://www.gsa.gov/about-gsa/newsroom/speeches-by-the-administrator/remarks-01012024",
    );
    expect(r.hold).toBe(true);
  });

  it("holds regional news archive pages", () => {
    const r = matchNewsroomHold(
      "https://www.gsa.gov/about-gsa/newsroom/former-gsa-regional-news-archive/region-1-newsroom/press-releases",
    );
    expect(r.hold).toBe(true);
  });

  it("does not hold ordinary non-newsroom pages", () => {
    const r = matchNewsroomHold("https://www.gsa.gov/real-estate/leasing");
    expect(r.hold).toBe(false);
    expect(r.reason).toBeUndefined();
  });
});
