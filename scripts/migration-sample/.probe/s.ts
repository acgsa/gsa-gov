// Does requiring a separator still catch every real-world phone shape, while
// dropping bare digit runs (dates, document numbers, URL-encoded filenames)?
const CURRENT =
  /(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}(?:\s?(?:x|ext\.?)\s?\d{1,6})?/i;
const STRICTER =
  /(?:\+?1[\s.-]?)?(?:\(\d{3}\)\s?|\d{3}[\s.-])\d{3}[\s.-]\d{4}(?:\s?(?:x|ext\.?)\s?\d{1,6})?/i;

const shouldMatch = [
  "(202) 555-0143",
  "(202)555-0143",
  "202-555-0143",
  "202.555.0143",
  "202 555 0143",
  "+1 202 555 0143",
  "+1-202-555-0143",
  "202-555-0143 x1234",
  "202-555-0143 ext. 12",
  "1-202-555-0143",
];
const shouldNotMatch = [
  "2020260819", // URL-encoded filename digits
  "Guide-update%2020260819.docx",
  "$3,960,000",
  "In 2026 across 12 regions",
  "GSA1655",
  "HRM 7800.14B",
  "40 U.S.C. App.3",
  "FY2026 budget 1234567890",
];
let bad = 0;
for (const v of shouldMatch) {
  const c = CURRENT.test(v),
    s = STRICTER.test(v);
  if (!s) {
    console.log("MISS (regression):", v);
    bad++;
  } else if (!c) console.log("newly caught:", v);
}
for (const v of shouldNotMatch) {
  const c = CURRENT.test(v),
    s = STRICTER.test(v);
  if (s) {
    console.log("FALSE POSITIVE remains:", v);
    bad++;
  } else if (c) console.log("fixed false positive:", v);
}
console.log(
  bad === 0
    ? "\nOK: no regressions, no remaining false positives"
    : `\n${bad} problems`,
);
