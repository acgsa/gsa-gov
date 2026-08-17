import { __test } from "./scorer";

const { parseModelJson, normalizeBreakdown, totalOf } = __test;

describe("normalizeBreakdown", () => {
  it("clamps each criterion to its rubric maximum and rounds", () => {
    const b = normalizeBreakdown({
      alignment: 99,
      contentQuality: 20.4,
      actionable: 20.6,
      seoValue: 15,
      redundancy: 10,
      userValue: 5,
    });
    expect(b.alignment).toBe(30);
    expect(b.contentQuality).toBe(20);
    expect(b.actionable).toBe(20);
    expect(b.seoValue).toBe(15);
    expect(b.redundancy).toBe(10);
    expect(b.userValue).toBe(5);
  });

  it("coerces missing or non-numeric values to 0 and floors negatives", () => {
    const b = normalizeBreakdown({ alignment: -5, contentQuality: "x" });
    expect(b.alignment).toBe(0);
    expect(b.contentQuality).toBe(0);
    expect(b.actionable).toBe(0);
    expect(b.userValue).toBe(0);
  });

  it("treats a null/undefined object as an all-zero breakdown", () => {
    expect(totalOf(normalizeBreakdown(undefined))).toBe(0);
    expect(totalOf(normalizeBreakdown(null))).toBe(0);
  });
});

describe("totalOf", () => {
  it("sums the six criteria", () => {
    const b = normalizeBreakdown({
      alignment: 30,
      contentQuality: 20,
      actionable: 20,
      seoValue: 15,
      redundancy: 10,
      userValue: 5,
    });
    expect(totalOf(b)).toBe(100);
  });
});

describe("parseModelJson", () => {
  it("parses a clean minified JSON response", () => {
    const raw = parseModelJson(
      '{"breakdown":{"alignment":25,"contentQuality":15,"actionable":10,"seoValue":10,"redundancy":8,"userValue":3},"recommendation":"Keep","justification":"Unique, aligned, actionable.","consolidateSuggestion":"","possibleLegalHold":false,"legalHoldReason":""}',
    );
    expect(raw).toBeDefined();
    expect(raw?.recommendation).toBe("Keep");
    expect(totalOf(raw!.breakdown)).toBe(71);
    expect(raw?.justification).toBe("Unique, aligned, actionable.");
    expect(raw?.consolidateSuggestion).toBeUndefined();
    expect(raw?.possibleLegalHold).toBe(false);
  });

  it("extracts JSON when the model wraps it in stray prose or code fences", () => {
    const raw = parseModelJson(
      'Here is the score:\n```json\n{"breakdown":{"alignment":0,"contentQuality":0,"actionable":0,"seoValue":0,"redundancy":0,"userValue":0},"recommendation":"Delete","justification":"Obsolete."}\n```\nDone.',
    );
    expect(raw?.recommendation).toBe("Delete");
    expect(totalOf(raw!.breakdown)).toBe(0);
  });

  it("defaults an invalid recommendation to the conservative Consolidate", () => {
    const raw = parseModelJson(
      '{"breakdown":{},"recommendation":"Nuke","justification":"?"}',
    );
    expect(raw?.recommendation).toBe("Consolidate");
  });

  it("returns undefined when no JSON object is present", () => {
    expect(parseModelJson("no json here")).toBeUndefined();
    expect(parseModelJson("")).toBeUndefined();
  });

  it("returns undefined on malformed JSON", () => {
    expect(parseModelJson('{"breakdown": {,,}')).toBeUndefined();
  });

  it("captures a possibleLegalHold flag and reason from the model", () => {
    const raw = parseModelJson(
      '{"breakdown":{"alignment":10,"contentQuality":10,"actionable":5,"seoValue":5,"redundancy":5,"userValue":2},"recommendation":"Keep","justification":"No FEAR Act notice.","possibleLegalHold":true,"legalHoldReason":"No FEAR Act"}',
    );
    expect(raw?.possibleLegalHold).toBe(true);
    expect(raw?.legalHoldReason).toBe("No FEAR Act");
  });
});
