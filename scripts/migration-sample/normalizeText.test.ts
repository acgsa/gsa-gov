/**
 * Tests for legacy body-text repair.
 *
 * The cases are drawn from real fetched GSA.gov pages, because the whole reason
 * this module exists is that Readability's text extraction dissolves block
 * boundaries. The risk is asymmetric: splitting too eagerly shatters sentences
 * mid-clause (visibly broken prose), so the abbreviation cases below are the
 * important ones.
 */
import {
  decodeHtmlEntities,
  normalizeBodyText,
  repairParagraphBreaks,
} from "./normalizeText";

describe("decodeHtmlEntities", () => {
  it("decodes the named entities Drupal leaves in body copy", () => {
    expect(decodeHtmlEntities("a&nbsp;b &amp; c")).toBe("a b & c");
    expect(decodeHtmlEntities("&ldquo;quoted&rdquo;")).toBe(
      "\u201cquoted\u201d",
    );
  });

  it("decodes decimal and hex numeric references", () => {
    expect(decodeHtmlEntities("dash &#8212; here")).toBe("dash \u2014 here");
    expect(decodeHtmlEntities("dash &#x2014; here")).toBe("dash \u2014 here");
  });

  it("leaves unknown entities untouched rather than guessing", () => {
    expect(decodeHtmlEntities("a &notareal; b")).toBe("a &notareal; b");
  });

  it("normalizes non-breaking spaces so trimming works downstream", () => {
    expect(decodeHtmlEntities("text.&nbsp;").trim()).toBe("text.");
  });
});

describe("repairParagraphBreaks", () => {
  it("splits a terminator butted against the next capital letter", () => {
    // Observed on /about-us/newsroom: "...facilities work.For decades,..."
    expect(repairParagraphBreaks("complex facilities work.For decades,")).toBe(
      "complex facilities work.\n\nFor decades,",
    );
  });

  it("keeps a closing quote with the paragraph it ends", () => {
    expect(
      repairParagraphBreaks("more expensive.\u201dEdward C. Forst told"),
    ).toBe("more expensive.\u201d\n\nEdward C. Forst told");
  });

  it("splits on question and exclamation marks too", () => {
    expect(repairParagraphBreaks("Ready?Next steps.")).toBe(
      "Ready?\n\nNext steps.",
    );
  });

  it("leaves prose that already has spaces after terminators alone", () => {
    const prose = "Normal prose. With spaces after periods.";
    expect(repairParagraphBreaks(prose)).toBe(prose);
  });

  it("is a no-op on text that already carries real paragraph breaks", () => {
    const text = "First para.\n\nSecond para.";
    expect(repairParagraphBreaks(text)).toBe(text);
  });

  describe("does not split inside abbreviations", () => {
    // Each of these would produce visibly broken prose if split.
    it.each([
      ["dotted initialism", "The U.S.General Services Administration"],
      ["city abbreviation", "Based in Washington, D.C.The agency said"],
      ["legal citation", "per 40 U.S.C.The rule applies"],
      ["personal suffix", "Smith Jr.The report notes"],
      ["figure reference", "see Fig.Also note"],
      ["honorific", "Dr.Smith presented"],
      ["organization suffix", "Acme Inc.The contract"],
    ])("%s", (_label, input) => {
      expect(repairParagraphBreaks(input)).toBe(input);
    });
  });
});

describe("normalizeBodyText", () => {
  it("decodes entities before repairing breaks", () => {
    expect(normalizeBodyText("Done.&nbsp;Next up.")).toBe("Done. Next up.");
  });

  it("recovers multiple paragraphs from a single extracted blob", () => {
    const blob =
      "First paragraph ends here.Second paragraph starts here.Third one too.";
    expect(normalizeBodyText(blob).split("\n\n")).toHaveLength(3);
  });
});
