/**
 * Static HTML report generator.
 *
 * Renders a single self-contained file (no external assets) with:
 *  - summary stat cards,
 *  - a sortable / filterable table (search, recommendation, flags),
 *  - an expandable per-page card row (justification, breakdown, suggestions).
 *
 * Public data only (ADR-006). All page/model strings are HTML-escaped.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { config } from "./config";
import type { AuditArtifact } from "./artifacts";
import type { ScoredPage } from "./types";
import { esc, num, recClass } from "./reportHelpers";
import { REPORT_CSS, REPORT_JS } from "./reportAssets";
import { suggestIaDestination } from "./iaMapping";
import { writeGuide } from "./guide";

function flags(p: ScoredPage): string {
  const out: string[] = [];
  if (p.legalHold)
    out.push(
      `<span class="flag flag-legal" title="${esc(p.legalHoldReason ?? "Legal hold")}">LEGAL HOLD</span>`,
    );
  else if (p.possibleLegalHold)
    out.push(
      `<span class="flag flag-legal" title="Model flagged possible statutory page">POSSIBLE LEGAL</span>`,
    );
  // Suppress the REVIEW badge when the recommendation is already "Needs review"
  // (it would just duplicate the pill). Still show it on Keep/Consolidate/Delete
  // pages that carry a manual-review flag, where it adds distinct information.
  if (p.needsManualReview && p.recommendation !== "Needs review") {
    out.push(
      `<span class="flag flag-review" title="${esc(p.reviewReasons.join(", "))}">REVIEW</span>`,
    );
  }
  return out.join(" ");
}

/** Suggested new-IA destination label, or an em dash when none is derivable. */
function iaLabel(p: ScoredPage): string {
  const s = suggestIaDestination(p.url, p.consolidateSuggestion);
  return s ? esc(s.label) : "—";
}

function detailRow(p: ScoredPage, i: number): string {
  const b = p.breakdown;
  const consolidate = p.consolidateSuggestion
    ? `<div><strong>Consolidate into:</strong> ${esc(p.consolidateSuggestion)}</div>`
    : "";
  const suggestion = suggestIaDestination(p.url, p.consolidateSuggestion);
  const iaDetail = suggestion
    ? `<div><strong>Suggested new-IA destination:</strong> ${esc(suggestion.label)} <span class="muted">(${esc(suggestion.route)} · ${esc(suggestion.source)})</span></div>`
    : "";
  const legal = p.legalHoldReason
    ? `<div><strong>Legal-hold reason:</strong> ${esc(p.legalHoldReason)}</div>`
    : "";
  const review = p.reviewReasons.length
    ? `<div><strong>Review reasons:</strong> ${esc(p.reviewReasons.join(", "))}</div>`
    : "";
  return `<tr id="d${i}" class="detail" hidden><td colspan="8">
    <div><strong>Justification:</strong> ${esc(p.justification)}</div>
    ${consolidate}${iaDetail}${legal}${review}
    <div class="muted">Breakdown — Alignment ${b.alignment}/30 · Content ${b.contentQuality}/20 · Actionable ${b.actionable}/20 · SEO ${b.seoValue}/15 · Redundancy ${b.redundancy}/10 · User value ${b.userValue}/5</div>
    <div class="muted">DAP visits ${num(p.dapVisits)} · pageviews ${num(p.dapPageviews)} · scored ${esc(p.scoredAt)}</div>
  </td></tr>`;
}

function row(p: ScoredPage, i: number): string {
  const search = `${p.url} ${p.title} ${p.justification}`.toLowerCase();
  const ia = iaLabel(p);
  return `<tr data-group="${i}" data-rec="${esc(p.recommendation)}" data-orig-rec="${esc(p.recommendation)}" data-url="${esc(p.url)}" data-legal="${p.legalHold || p.possibleLegalHold ? "1" : "0"}" data-legalhold="${p.legalHold ? "1" : "0"}" data-possible="${p.possibleLegalHold ? "1" : "0"}" data-review="${p.needsManualReview ? "1" : "0"}" data-search="${esc(search)}">
    <td class="score" data-v="${p.totalScore}">${p.totalScore}</td>
    <td class="url"><a href="${esc(p.url)}" rel="noreferrer noopener" target="_blank">${esc(p.title || p.url)}</a><div class="muted url">${esc(p.url)}</div></td>
    <td class="rec-cell" data-v="${esc(p.recommendation)}"><span class="${recClass(p.recommendation)}">${esc(p.recommendation)}</span> <span class="overridden-badge" hidden>overridden</span> ${flags(p)}</td>
    <td class="ia" data-v="${ia}">${ia}</td>
    <td data-v="${p.dapVisits ?? -1}">${num(p.dapVisits)}</td>
    <td>${esc(p.justification)}</td>
    <td>
      <select class="override" aria-label="Override recommendation for ${esc(p.url)}">
        <option value="">— set —</option>
        <option>Keep</option><option>Consolidate</option><option>Archive</option><option>Delete</option><option>Needs review</option>
      </select>
    </td>
    <td><button type="button" data-target="d${i}" class="toggle">Details</button></td>
  </tr>${detailRow(p, i)}`;
}

function statCards(a: AuditArtifact): string {
  const s = a.summary;
  // Each card carries a data-filter describing which control it drives:
  //   ""            → clear all filters (Pages)
  //   "rec:Keep"    → recommendation dropdown
  //   "flag:legal"  → flag dropdown
  const card = (n: number | string, l: string, filter: string): string =>
    `<button type="button" class="stat" data-filter="${filter}" aria-pressed="false"><div class="n">${n}</div><div class="l">${l}</div></button>`;
  return `<div class="cards">
    ${card(a.totalPages, "Pages", "")}
    ${card(s.keep, "Keep", "rec:Keep")}
    ${card(s.consolidate, "Consolidate", "rec:Consolidate")}
    ${card(s.archive, "Archive", "rec:Archive")}
    ${card(s.delete, "Delete", "rec:Delete")}
    ${card(s.needsReview, "Needs review", "rec:Needs review")}
    ${card(s.legalHold, "Legal hold", "flag:legal")}
    ${card(s.possibleLegalHold, "Possible legal", "flag:possible")}
  </div>`;
}

const TOGGLE_JS = `
Array.prototype.forEach.call(document.querySelectorAll('button.toggle'),function(btn){
  btn.addEventListener('click',function(){
    var d=document.getElementById(btn.getAttribute('data-target'));
    if(d)d.hidden=!d.hidden;
  });
});`;

export function renderReport(a: AuditArtifact): string {
  const rowsHtml = a.pages.map((p, i) => row(p, i)).join("\n");
  const guideName = path.basename(config.outGuidePath);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GSA.gov Content Relevancy Audit</title>
<style>${REPORT_CSS}</style></head>
<body>
<header>
  <h1>GSA.gov Content Relevancy Audit</h1>
  <p>Generated ${esc(a.generatedAt)} · USAi: model ${esc(a.model)} · ${a.totalPages} pages · Public data only — see docs/decisions/ADR-006</p>
  <p><a class="guide-link" href="${esc(guideName)}">Scoring guide &amp; key →</a></p>
</header>
<main>
  ${statCards(a)}
  <div class="controls">
    <input id="q" type="search" placeholder="Search URL, title, justification…" aria-label="Search">
    <select id="rec" aria-label="Filter by recommendation">
      <option value="">All recommendations</option>
      <option>Keep</option><option>Consolidate</option><option>Archive</option><option>Delete</option><option>Needs review</option>
    </select>
    <select id="flag" aria-label="Filter by flag">
      <option value="">All pages</option>
      <option value="legal">Legal / possible legal</option>
      <option value="legalhold">Legal hold (deterministic)</option>
      <option value="possible">Possible legal</option>
      <option value="review">Needs manual review</option>
    </select>
  </div>
  <div class="controls">
    <button type="button" id="dlOverrides" class="dl">Download overrides (JSON)</button>
    <button type="button" id="clearOverrides" class="dl">Clear overrides</button>
    <span class="muted" id="overrideCount">0 overrides</span>
  </div>
  <div class="count" id="count"></div>
  <table id="t">
    <thead><tr>
      <th data-sortable aria-sort="ascending">Score</th>
      <th data-sortable>Page</th>
      <th data-sortable>Recommendation</th>
      <th data-sortable>Suggested resolution</th>
      <th data-sortable>DAP visits</th>
      <th>Justification</th>
      <th>Action</th>
      <th>Details</th>
    </tr></thead>
    <tbody>
${rowsHtml}
    </tbody>
  </table>
</main>
<script>${REPORT_JS}${TOGGLE_JS}</script>
</body></html>`;
}

export async function writeReport(a: AuditArtifact): Promise<void> {
  await fs.mkdir(path.dirname(config.outHtmlPath), { recursive: true });
  await fs.writeFile(config.outHtmlPath, renderReport(a), "utf8");
  await writeGuide(a);
}
