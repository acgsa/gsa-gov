/**
 * Static "Scoring guide & key" page generator.
 *
 * Renders a single self-contained HTML file (no external assets) that documents
 * the 100-point rubric, the recommendation definitions, the flags/badges used
 * in the report, the two deterministic hard gates (legal-hold and newsroom
 * preservation), and the DAP traffic source. Linked from the report header.
 *
 * Public data only (ADR-006). All dynamic strings are HTML-escaped.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { config } from "./config";
import type { AuditArtifact } from "./artifacts";
import { esc } from "./reportHelpers";
import { GUIDE_CSS } from "./guideAssets";

/** Rubric criteria shown in the guide (mirrors the scorer SYSTEM_PROMPT). */
const RUBRIC: ReadonlyArray<{ name: string; max: number; desc: string }> = [
  {
    name: "Alignment",
    max: 30,
    desc: "Fit with a GSA line of business (Real Estate, Acquisition, Technology) or general public / federal-employee information.",
  },
  {
    name: "Content quality",
    max: 20,
    desc: "Depth, accuracy signals, structure, and currency of the content.",
  },
  {
    name: "Actionable",
    max: 20,
    desc: "Does the page let a user DO something — forms, tools, clear next steps, downloads, contacts?",
  },
  {
    name: "SEO value",
    max: 15,
    desc: "Title / description quality, heading structure, and likely search value.",
  },
  {
    name: "Redundancy",
    max: 10,
    desc: "10 = unique; scored lower as the near-duplicate cluster size grows or the page is boilerplate.",
  },
  {
    name: "User value (DAP)",
    max: 5,
    desc: "Supported by real traffic (DAP visits / pageviews) when available.",
  },
];

const RECOMMENDATIONS: ReadonlyArray<{
  label: string;
  cls: string;
  desc: string;
}> = [
  {
    label: "Keep",
    cls: "rec rec-keep",
    desc: "High value, unique, aligned, and actionable. Migrate as-is into the new templates.",
  },
  {
    label: "Consolidate",
    cls: "rec rec-consolidate",
    desc: "Overlapping or thin, but has salvageable value. The report names a merge target; the page still flows into the new site (nothing is lost).",
  },
  {
    label: "Archive",
    cls: "rec rec-archive",
    desc: "Historical record (press releases / newsroom) preserved in the searchable Press Releases database, but NOT migrated as live Keep content. Set deterministically by the newsroom preservation gate — never auto-deleted. Separated from Keep so the Keep count reflects only genuinely retained, actively-maintained pages.",
  },
  {
    label: "Delete",
    cls: "rec rec-delete",
    desc: "Low value, redundant, or obsolete with little/no traffic. Candidate for retirement — subject to the hard gates below.",
  },
  {
    label: "Needs review",
    cls: "rec rec-review",
    desc: "The model could not score confidently, or a deterministic signal (thin content, JS-rendered, fetch error) requires a human decision. Never auto-deleted.",
  },
];

const FLAGS: ReadonlyArray<{ label: string; cls: string; desc: string }> = [
  {
    label: "LEGAL HOLD",
    cls: "flag flag-legal",
    desc: "Deterministic hard gate. The URL/keywords match the owner-editable legal-hold list of statutorily-required pages (No FEAR Act, FOIA, privacy, Section 508, OIG, vulnerability disclosure, records/paperwork notices). Recommendation is FORCED to Keep and Delete/Consolidate is blocked — regardless of the model's score.",
  },
  {
    label: "POSSIBLE LEGAL",
    cls: "flag flag-legal",
    desc: "Model-raised soft flag. The page READS like a mandated disclosure but did not match the deterministic list. Surfaced for human confirmation so unknown statutory pages are never silently deleted — it does not by itself change the recommendation.",
  },
  {
    label: "REVIEW",
    cls: "flag flag-review",
    desc: "The page carries a manual-review reason (e.g. thin-content, js-rendered, fetch-error, redirect, 410-gone) even though it received a Keep/Consolidate/Delete recommendation.",
  },
];

function rubricRows(): string {
  return RUBRIC.map(
    (r) =>
      `<tr><td><strong>${esc(r.name)}</strong></td><td class="pts">${r.max}</td><td>${esc(r.desc)}</td></tr>`,
  ).join("\n");
}

function recRows(): string {
  return RECOMMENDATIONS.map(
    (r) =>
      `<tr><td><span class="${r.cls}">${esc(r.label)}</span></td><td>${esc(r.desc)}</td></tr>`,
  ).join("\n");
}

function flagRows(): string {
  return FLAGS.map(
    (f) =>
      `<tr><td><span class="${f.cls}">${esc(f.label)}</span></td><td>${esc(f.desc)}</td></tr>`,
  ).join("\n");
}

export function renderGuide(a: AuditArtifact): string {
  const reportName = path.basename(config.outHtmlPath);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GSA.gov Content Audit — Scoring Guide &amp; Key</title>
<style>${GUIDE_CSS}</style></head>
<body>
<header>
  <h1>Scoring Guide &amp; Key</h1>
  <p>GSA.gov Content Relevancy Audit · USAi model ${esc(a.model)} · Public data only — see docs/decisions/ADR-006</p>
  <p><a class="back" href="${esc(reportName)}">&larr; Back to the audit report</a></p>
</header>
<main>
  <section>
    <h2>How each page is scored (100 points)</h2>
    <p class="lede">Every live page is fetched, its readable content and deterministic
      signals extracted, then scored by USAi against a strict 100-point rubric. Scores
      are intentionally conservative — most legacy pages score low.</p>
    <table>
      <thead><tr><th>Criterion</th><th class="pts">Max</th><th>What it measures</th></tr></thead>
      <tbody>${rubricRows()}</tbody>
      <tfoot><tr><td><strong>Total</strong></td><td class="pts"><strong>100</strong></td><td></td></tr></tfoot>
    </table>
  </section>

  <section>
    <h2>Recommendations</h2>
    <table>
      <thead><tr><th>Recommendation</th><th>Meaning</th></tr></thead>
      <tbody>${recRows()}</tbody>
    </table>
  </section>

  <section>
    <h2>Flags &amp; badges</h2>
    <p class="lede">The key difference: <strong>Legal hold</strong> is a deterministic,
      URL/keyword-matched gate that <em>forces</em> preservation; <strong>Possible legal</strong>
      is the model's best-guess flag for pages that only <em>look</em> mandated, surfaced for
      a human to confirm.</p>
    <table>
      <thead><tr><th>Flag</th><th>Meaning</th></tr></thead>
      <tbody>${flagRows()}</tbody>
    </table>
    <h3>The <span class="flag flag-review">OVERRIDDEN</span> badge</h3>
    <p><strong>Overridden</strong> means a human reviewer manually changed that page's
      recommendation away from what the audit produced. Using a row's <strong>Action</strong>
      dropdown to pick a value different from the model's original recommendation reveals the
      <span class="flag flag-review">OVERRIDDEN</span> badge next to the pill — it is a visual
      audit trail marking rows whose displayed recommendation no longer matches the model's raw
      output.</p>
    <p><strong>Important:</strong> overrides live only in this browser view. They do
      <em>not</em> write back into the JSON/CSV artifacts (use <strong>Download overrides
      (JSON)</strong> to export them) and they do <em>not</em> change the deterministic
      legal-hold gate — a <span class="flag flag-legal">LEGAL HOLD</span> page is still forced to
      <span class="rec rec-keep">Keep</span> regardless of any override set here.</p>
  </section>

  <section>
    <h2>Deterministic hard gates</h2>
    <p>Two gates run <em>after</em> the model and override it — they can only make the
      outcome more conservative (never delete more):</p>
    <ol>
      <li><strong>Legal-hold gate.</strong> Statutorily-required pages are forced to
        <span class="rec rec-keep">Keep</span>; Delete/Consolidate is blocked. The list is
        owner-editable in <code>scripts/content-audit/legal-hold.ts</code>.</li>
      <li><strong>Newsroom / press-release preservation gate.</strong> News releases, press
        releases, congressional testimony, administrator speeches, and the regional news
        archives are historical records destined for the new searchable Press Releases
        database. These URLs are reclassified to <span class="rec rec-archive">Archive</span>
        — preserved as historical records but not counted as live Keep content. (Pages that
        also match the legal-hold gate stay <span class="rec rec-keep">Keep</span>.)</li>
    </ol>
  </section>

  <section>
    <h2>Traffic data (DAP)</h2>
    <p>The <strong>DAP visits</strong> column is sourced from a GA4 "All Pages" export
      (<code>${esc(path.basename(config.dap.ga4CsvPath))}</code>), matched to each URL by an
      exact host + path lookup (never a fuzzy title match). <em>visits</em> ← GA4 Active users,
      <em>pageviews</em> ← GA4 Views. A page with no exact match shows an em dash and simply
      contributes no traffic signal to its score.</p>
  </section>

  <section>
    <h2>Report tips</h2>
    <ul>
      <li>Click any summary card to filter the table by that recommendation or flag.</li>
      <li>Click a column header to sort; the detail row moves with its page.</li>
      <li>Use the <strong>Action</strong> dropdown to record a manual override, then
        <strong>Download overrides (JSON)</strong> — the source results file is never mutated.</li>
    </ul>
  </section>
</main>
</body></html>`;
}

export async function writeGuide(a: AuditArtifact): Promise<void> {
  await fs.mkdir(path.dirname(config.outGuidePath), { recursive: true });
  await fs.writeFile(config.outGuidePath, renderGuide(a), "utf8");
}
