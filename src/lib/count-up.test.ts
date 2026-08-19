import { parseMetricNumber, formatMetric } from "./count-up";

describe("parseMetricNumber", () => {
  it("parses plain integers", () => {
    expect(parseMetricNumber("34")).toBe(34);
  });

  it("parses percentages", () => {
    expect(parseMetricNumber("34%")).toBe(34);
  });

  it("parses currency with suffix", () => {
    expect(parseMetricNumber("$89M")).toBe(89);
  });

  it("parses decimals", () => {
    expect(parseMetricNumber("3.4M")).toBe(3.4);
  });

  it("parses comma-grouped values", () => {
    expect(parseMetricNumber("8,600+")).toBe(8600);
  });

  it("returns null when no number is present", () => {
    expect(parseMetricNumber("N/A")).toBeNull();
  });
});

describe("formatMetric", () => {
  it("preserves a % suffix", () => {
    expect(formatMetric("34%", 12)).toBe("12%");
  });

  it("preserves $ prefix and M suffix", () => {
    expect(formatMetric("$89M", 42)).toBe("$42M");
  });

  it("preserves decimal places", () => {
    expect(formatMetric("3.4M", 1.267)).toBe("1.3M");
  });

  it("re-applies comma grouping", () => {
    expect(formatMetric("8,600+", 4211)).toBe("4,211+");
  });

  it("preserves a trailing plus on plain values", () => {
    expect(formatMetric("1,500+", 1500)).toBe("1,500+");
  });

  it("returns the input unchanged when no number is present", () => {
    expect(formatMetric("N/A", 5)).toBe("N/A");
  });
});
