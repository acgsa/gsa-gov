# GSA.gov Content Relevancy Audit

Standalone, offline-invoked pipeline that scores every page of the existing
GSA.gov corpus (5,331 URLs) against a weighted **100-point relevancy rubric**
and produces reviewable artifacts. It exists to answer one question before the
migration phase: **which pages are worth keeping?**

See [`docs/decisions/ADR-006-content-relevancy-audit.md`](../../docs/decisions/ADR-006-content-relevancy-audit.md)
for the full decision record and [`plans/content-relevancy-audit-plan.md`](../../plans/content-relevancy-audit-plan.md)
for the implementation plan.

> **Data classification:** Public gsa.gov content only — no PII/CUI/PHI.

---

## Artifacts (in `docs/`)

| File                                                                  | What it is                                                                                                                                              |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`content-audit-report.html`](../../docs/content-audit-report.html)   | Self-contained, interactive report: sortable/filterable table, stat cards, per-row reviewer overrides (localStorage-persisted, never mutates the data). |
| [`content-audit-guide.html`](../../docs/content-audit-guide.html)     | Scoring guide / key: rubric, recommendation meanings, and the hard-gate rules.                                                                          |
| [`content-audit-results.json`](../../docs/content-audit-results.json) | Machine-readable results: `summary` totals + per-page `breakdown`, recommendation, justification, flags.                                                |
| [`content-audit-results.csv`](../../docs/content-audit-results.csv)   | Flat CSV for spreadsheet re-sorting.                                                                                                                    |

These four files are also published as a browsable GitHub Pages site via
[`.github/workflows/pages.yml`](../../.github/workflows/pages.yml) (public data
only; repo Pages source must be set to "GitHub Actions").

---

## Current tally (5,331 pages)

| Recommendation   | Count | Meaning                                                                                                                                                         |
| ---------------- | ----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Keep**         | 1,391 | Genuinely retained, actively-maintained live content.                                                                                                           |
| **Consolidate**  |   802 | Overlapping/thin but salvageable; merged into a named target (nothing lost).                                                                                    |
| **Archive**      | 1,853 | Historical records (press releases / newsroom) preserved in the searchable Press Releases database — **not** migrated as live Keep content. Never auto-deleted. |
| **Delete**       |   727 | Low value / redundant / obsolete; candidate for retirement (subject to the hard gates).                                                                         |
| **Needs review** |   558 | Ambiguous or JS-rendered/thin — routed to a human, never auto-deleted.                                                                                          |

Flags (orthogonal to the recommendation): **Legal hold** 266 · **Possible
legal** 1,083.

---

## The two deterministic hard gates

Applied **after** the LLM in [`scorer.ts`](scorer.ts), these override the model:

1. **Legal hold** (statutory/regulatory/litigation) → forces **Keep**; Delete
   and Consolidate are blocked. Configured in [`legal-hold.ts`](legal-hold.ts).
2. **Newsroom / press-release preservation** → reclassifies every
   **non-legal-hold** newsroom match to **Archive** (`matchNewsroomHold`).
   Legal hold wins over Archive (those pages stay Keep).

The system **fails closed**: anything ambiguous between delete and "possible
statutory requirement" goes to **Needs review**, never auto-delete.

---

## Scoring rubric (total = 100)

| Criterion                          | Points |
| ---------------------------------- | -----: |
| Alignment with lines of business   |     30 |
| Content quality and depth          |     20 |
| Actionable content                 |     20 |
| SEO value                          |     15 |
| Redundancy                         |     10 |
| User value from traffic data (GA4) |      5 |

---

## Running the pipeline

**Do not** re-run the network pipeline to change presentation. The full scored
corpus is cached in `content-audit-results.json`; regenerate artifacts from that
cache instead (see "Re-rendering" below).

Prerequisites:

- Node 24, `USAI_API_KEY` and (optionally) `DAP_API_KEY` in local `.env` (never committed).
- GA4 "All Pages" export at `data/All_Pages.csv` (gitignored; owner-provided).
- Behind a Zscaler/TLS-inspection proxy, prefix with `NODE_OPTIONS=--use-system-ca`
  (keeps TLS verification **on** — never disable cert checks).

```bash
# Full run (network: USAi + live gsa.gov fetches; rate-limited, resume-on-failure)
NODE_OPTIONS=--use-system-ca npx tsx scripts/content-audit/run.ts
```

### Re-rendering from cache (no network)

To change the report/guide HTML or apply a transform without re-scoring, write a
temporary `.ts` script that reads `content-audit-results.json`, rebuilds via
`buildArtifact`, and re-emits the artifacts, then delete it. (Inline
`npx tsx -e '...'` fails on top-level `await` under CJS — use a temp file.)

---

## Module map

| File                                                 | Responsibility                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| `run.ts`                                             | Orchestrator / CLI entry; resume-on-failure checkpoints.          |
| `parseUrls.ts`                                       | Parse the URL export.                                             |
| `fetchPage.ts`                                       | Rate-limited static-HTML fetch + content/CTA extraction (cached). |
| `dapClient.ts`                                       | GA4 "All Pages" CSV lookup (exact host+path).                     |
| `redundancy.ts`                                      | Corpus-wide near-duplicate signal.                                |
| `lineOfBusiness.ts`                                  | Mission-alignment taxonomy grounding.                             |
| `iaMapping.ts`                                       | Suggested new-IA destination per page.                            |
| `scorer.ts`                                          | USAi rubric call + the two hard gates.                            |
| `legal-hold.ts`                                      | Legal-hold + newsroom gate config/matchers.                       |
| `artifacts.ts`                                       | `buildArtifact`, `summarize`, JSON/CSV writers.                   |
| `report.ts` / `reportAssets.ts` / `reportHelpers.ts` | HTML report.                                                      |
| `guide.ts` / `guideAssets.ts`                        | HTML scoring guide.                                               |
| `types.ts`                                           | Shared types incl. the `Recommendation` union.                    |
| `config.ts`                                          | Paths + tunables.                                                 |

Tests: `*.test.ts` (run via `npm test`).

---

## Guardrails (AGENTS.md)

- **`.cache/` is gitignored** — never commit fetched HTML.
- Secrets live in `.env` only; keys are never logged or embedded in artifacts.
- Changing scoring behavior, dependencies, or CI/CD requires owner approval + an
  ADR update.
