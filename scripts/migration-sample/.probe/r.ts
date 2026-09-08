import { MIGRATION_SAMPLES } from "../../../src/lib/migration/samples.generated";
const s = MIGRATION_SAMPLES.find(
  (x) => x.slug === "pre-exit-clearance-checklist-32157",
)!;
console.log(
  "sections:",
  s.sections.length,
  "| downloads:",
  s.downloads.length,
  "| words:",
  s.provenance.wordCount,
);
console.log("dek:", JSON.stringify(s.dek));
console.log("meta:", JSON.stringify(s.meta));
console.log("sections dump:", JSON.stringify(s.sections).slice(0, 300));
