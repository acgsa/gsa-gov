import { MIGRATION_SAMPLES } from "../../../src/lib/migration/samples.generated";

// 1. Which samples have an empty dek, and what do they look like?
const emptyDek = MIGRATION_SAMPLES.filter((s) => !s.dek.trim());
console.log("empty-dek count:", emptyDek.length);
for (const s of emptyDek) {
  console.log(
    "  slug:",
    s.slug,
    "| type:",
    s.contentType,
    "| words:",
    s.provenance.wordCount,
  );
  console.log(
    "  first para:",
    JSON.stringify(s.sections[0]?.paragraphs[0]?.slice(0, 100)),
  );
}

// 2. Every string that the current phone pattern flags, so I can tell
//    genuine phone numbers from digit runs inside URLs/filenames.
const PHONE =
  /(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}(?:\s?(?:x|ext\.?)\s?\d{1,6})?/gi;
const hits = new Set<string>();
for (const s of MIGRATION_SAMPLES) {
  const strings = [
    s.title,
    s.dek,
    ...s.sections.flatMap((x) => [x.heading, ...x.paragraphs]),
    ...s.downloads,
  ];
  for (const t of strings) {
    for (const m of t.matchAll(PHONE)) {
      hits.add(
        `${m[0]}  <<in>>  ...${t.slice(Math.max(0, (m.index ?? 0) - 25), (m.index ?? 0) + m[0].length + 15)}...`,
      );
    }
  }
}
console.log("\nphone-pattern hits:", hits.size);
for (const h of hits) console.log("  ", h);

// 3. Download URLs carrying HTML entities.
const ent = MIGRATION_SAMPLES.flatMap((s) => s.downloads).filter((d) =>
  /&[a-z]+;|&#\d+;/i.test(d),
);
console.log("\ndownloads with entities:", ent.length);
for (const d of ent) console.log("  ", d.slice(0, 140));
