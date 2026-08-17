# ADR-006: Content Relevancy Audit & Scoring Pipeline

- **Status:** Accepted (implemented; full corpus scored 2026-08-17)
- **Date:** 2026-08-13 (revised 2026-08-17: Archive bucket + GitHub Pages)
- **Deciders:** Alison Childs (Project Owner), Ed Forst (Approving Official)
- **Related:** ADR-001 (initial architecture), [`PROJECT_PLAN.md`](../../PROJECT_PLAN.md:73) (Req. 4 — content migration), [`plans/content-relevancy-audit-plan.md`](../../plans/content-relevancy-audit-plan.md:1)

---

## Context

The redesign must migrate content from the existing ~5,000-page GSA.GOV site
(`PROJECT_PLAN.md` Requirement 4). Before migrating, the owner needs to know
**which pages are worth keeping**. We have:

- A data download of all URLs (plus possibly titles).
- A **DAP** API key (`https://open.gsa.gov/api/dap/`) for traffic data.
- A **USAi** API key (GSA-approved LLM service) for qualitative judgement.

The task is to score every page against a weighted 100-point relevancy rubric,
produce a reviewable report, and hand off a "Keep" list for a **separate,
later** migration phase.

Per `AGENTS.md`, this work triggers several gates:

- **Adding dependencies** → requires approval + this ADR.
- **Network requests to external services** (USAi, DAP, live gsa.gov page
  fetches) → requires approval.
- **>3 files changed** → requires an approved plan (done — see
  [`plans/content-relevancy-audit-plan.md`](../../plans/content-relevancy-audit-plan.md:1)).

This ADR is submitted for approval **before** any `npm install` or network call.

---

## Decision (Proposed)

Build a standalone, offline-invoked audit pipeline under `scripts/content-audit/`
that:

1. Parses the URL export.
2. Fetches DAP traffic per URL (cached).
3. Fetches each live page's HTML (rate-limited, cached) and extracts readable
   content plus deterministic signals (word count, headings, CTA / form /
   download / contact detection, meta tags).
4. Computes a corpus-wide redundancy / near-duplicate signal locally.
5. Sends the content + injected deterministic signals to **USAi**, which applies
   the strict 100-point rubric and returns a per-page breakdown with a
   Keep / Consolidate / Delete recommendation.
6. Writes raw results to **JSON + CSV** and generates a **static HTML report**
   plus a **scoring guide / key** page (`docs/content-audit-guide.html`, linked
   from the report header) in `docs/`.

The pipeline runs a **validation batch (~100 representative URLs) first**,
stops for owner review, then scales to all 5,000 with resume-on-failure.

**Migration is explicitly out of scope** for this ADR. No changes to
`src/collections/`, `src/blocks/`, `src/templates/`, `payload.config.ts`, or
access-control rules.

### DAP traffic source (revised): GA4 "All Pages" export

The public DAP report API (`https://open.gsa.gov/api/dap/`) does **not** expose
per-URL traffic for the full gsa.gov corpus: its per-page reports are capped at
the top-N pages, and the agency `page` report returns an empty set. An initial
implementation queried the API and silently degraded to empty metrics, so the
report's traffic column was blank for every page.

The corpus-scale, exact-URL source is a **GA4 "All Pages" CSV export** provided
by the owner (`data/All_Pages.csv`, GA4 property "GSA Agency"). The pipeline
now loads that export once and answers per-URL lookups by an **exact host+path
match** — never a fuzzy title match — matching 5,330 of 5,331 corpus URLs:

- `visits` ← GA4 **Active users**
- `pageviews`← GA4 **Views**

The CSV path is configurable via `DAP_GA4_CSV` (default `data/All_Pages.csv`).
A missing/empty/mis-columned CSV now **fails closed** (throws) rather than
silently producing an all-empty column. Because the score cache key does not
include DAP, enabling this source required clearing the score cache and
**re-scoring the full corpus** so real traffic feeds the `userValue` criterion.

### Newsroom / press-release preservation → **Archive** (historical records)

Press releases, news releases, congressional testimony, speeches, and the
regional newsroom archives are **historical records** that will flow into the
new site's searchable Press Releases database. They MUST NOT be deleted
regardless of relevancy score or traffic. The pipeline treats this as a second
deterministic **hard gate** (`matchNewsroomHold` in
[`scripts/content-audit/legal-hold.ts`](../../scripts/content-audit/legal-hold.ts:1)).

**Revision (2026-08-17): a distinct `Archive` recommendation.** The gate
originally downgraded only `Delete` → `Keep`, which inflated the Keep bucket to
3,170 pages and obscured how many pages are _actively retained, live content_
versus _preserved historical records_. The gate now reclassifies **every
non-legal-hold newsroom match** to a new **`Archive`** recommendation
(`scorer.ts`), regardless of the model's original Keep/Consolidate/Delete call,
with a preservation justification. Semantics:

- **Archive** = preserved in the searchable Press Releases database as a
  historical record, but **not** migrated as live, maintained Keep content.
  Never auto-deleted.
- **Legal-hold newsroom pages stay `Keep`** — the statutory legal-hold gate
  runs first and wins; Archive only applies when `!legalHold`.
- The report, guide, JSON summary, and CSV all carry Archive as a first-class
  bucket (stat card, filter, per-row override, badge).

Effect on the full-corpus tally (5,331 pages), applied as a **transform of the
cached results — no re-run / no new network calls**:

| Recommendation | Before | After     |
| -------------- | ------ | --------- |
| Keep           | 3,170  | **1,391** |
| Consolidate    | 876    | 802       |
| Archive        | —      | **1,853** |
| Delete         | 727    | 727       |
| Needs review   | 558    | 558       |

(Legal hold 266 and possible-legal 1,083 flags are unchanged; 22 legal-hold
newsroom pages remained Keep.) The Keep count now reflects only genuinely
retained pages, which was the owner's motivating question.

### Legal-hold override (statutorily-required pages)

Some pages are **required to exist by statute, regulation, or litigation /
consent decree** (e.g. court-ordered postings, mandated disclosures). These
MUST be preserved and flowed into the new templates **regardless of their
relevancy score**. The owner does not yet know the full list.

The pipeline treats legal hold as a **hard gate that overrides the LLM**:

- A `legal-hold` list (URL exact matches + URL glob patterns + keyword/title
  patterns) is loaded from a reviewable config file
  (`scripts/content-audit/legal-hold.ts`, owner-editable).
- Any page matching the list is force-flagged `legalHold: true`, its
  recommendation is forced to **Keep**, and Delete/Consolidate is **blocked**
  for that page no matter what the model returns.
- Additionally, the LLM is instructed to emit a `possibleLegalHold` flag with a
  reason when a page _reads like_ a mandated disclosure (e.g. FOIA, No FEAR Act,
  privacy/accessibility statements, OIG, court-ordered notices), so unknown
  statutory pages surface for human confirmation rather than being silently
  deleted.
- The report visibly marks legal-hold and possible-legal-hold pages and
  provides a filter, so the owner can confirm/expand the list before the full
  5,000 run and before any migration.

Because the true list is unknown, the system **fails closed**: when a page is
ambiguous between "delete" and "possible statutory requirement", it is routed to
**needs-review**, never auto-deleted.

### Fetch limitations (static-only) and thin/JS-rendered flagging

Fetching is **static HTML only** (no headless browser). Pages that render
primarily via client-side JavaScript, or that return very little extractable
text, are flagged `needsManualReview: true` with a reason (e.g.
`thin-content`, `js-rendered`, `fetch-error`, `redirect`, `410-gone`) and are
**not** auto-deleted on the basis of missing content alone.

### Scoring rubric (total = 100)

| Criterion                          | Points |
| ---------------------------------- | ------ |
| Alignment with lines of business   | 30     |
| Content quality and depth          | 20     |
| Actionable content                 | 20     |
| SEO value                          | 15     |
| Redundancy                         | 10     |
| User value from traffic data (DAP) | 5      |

"Lines of business" are grounded in the site's own taxonomy (Real Estate,
Acquisition, Technology) plus "general public information" and "information for
federal employees", derived from
[`src/lib/wayfinder-data.ts`](../../src/lib/wayfinder-data.ts:1) and nav data,
so Alignment scoring matches official mission language.

---

## Proposed Dependencies (approval-gated)

All pinned to exact versions; MIT/Apache-2.0/BSD only; `npm audit` clean before
commit. Verified against typosquatting.

| Package                          | Purpose                                                                                      | License          |
| -------------------------------- | -------------------------------------------------------------------------------------------- | ---------------- |
| `undici`                         | Rate-limitable HTTP client for page + API fetches (already a Node dep; may not need install) | MIT              |
| `cheerio`                        | Server-side HTML parsing / content + CTA extraction                                          | MIT              |
| `@mozilla/readability` + `jsdom` | Extract main readable article text, strip chrome                                             | Apache-2.0 / MIT |
| `p-limit`                        | Concurrency / rate limiting for polite crawling                                              | MIT              |
| `csv-parse` / `csv-stringify`    | Parse URL export + write CSV artifact                                                        | MIT              |

> USAi is called over plain HTTPS (OpenAI-compatible or documented REST shape) —
> no vendor SDK is installed unless the owner specifies one. This keeps the
> dependency surface minimal.

These are **devDependencies / scripts-only**; they are not shipped in the
Next.js runtime bundle.

---

## Data Handling & Security

- **Data classification:** Public only. gsa.gov page content, public URLs, and
  aggregate traffic (GA4 "All Pages" export) — no PII/CUI/PHI.
- **DAP/GA4 export:** `data/All_Pages.csv` is gitignored (owner-provided).
  It contains only aggregate page-level counts, no user-level data.
- **Secrets:** `USAI_API_KEY` and `DAP_API_KEY` added to `.env.example` as
  placeholders only. Real values live in local `.env` (gitignored). Keys are
  **never** logged, embedded in artifacts, or committed.
- **Cache directory** `scripts/content-audit/.cache/` is gitignored to avoid
  committing large fetched HTML.
- **Network:** TLS 1.2+; endpoints limited to npmjs.com (installs), USAi,
  DAP, and gsa.gov page fetches. Crawling is rate-limited and polite.
- **Locked region:** [`SiteHeader.tsx`](../../src/components/layout/SiteHeader.tsx:1)
  is untouched.
- **Public GitHub Pages publishing (2026-08-17):** the static report, guide,
  JSON, and CSV are published as a browsable site via
  [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml:1)
  (`actions/deploy-pages@v4`, least-privilege `pages: write` + `id-token:
write`, no build/install step, no secrets). Only the four reviewed audit
  artifacts are copied into the published site — nothing else from `docs/`.
  **All published data is public gsa.gov content (no PII/CUI/PHI).** The
  scored _recommendations_ (including Delete candidates) become publicly
  browsable; this was explicitly approved by the owner. The repo Pages source
  must be set to "GitHub Actions" for the workflow to publish.

---

## Consequences

**Positive**

- Owner gets an evidence-based, reviewable Keep/Consolidate/Delete list before
  investing in migration.
- Deterministic signals injected into the LLM keep scoring grounded, cheaper,
  and more consistent; JSON/CSV artifacts allow independent re-sorting.
- Validation-batch gate limits cost and lets the owner tune the rubric prompt
  before the full 5,000 run.

**Negative / risks**

- LLM scoring is inherently subjective; mitigated by injected signals, a strict
  prompt, and human review of the validation batch.
- Live crawling may hit stale/redirected/410 URLs; the pipeline records fetch
  status and degrades gracefully (scores what it can, flags the rest).
- USAi/DAP rate limits and cost at 5,000 pages; mitigated by caching,
  concurrency limits, and resume-on-failure checkpoints.

**Alternatives considered**

- **Deterministic heuristic-only scorer (no LLM):** cheaper and fully offline
  but too weak on the subjective criteria (Alignment, Content quality,
  Actionable). Rejected for this phase; heuristics instead _feed_ the LLM.
- **Traffic-only triage:** fast but ignores mission alignment and quality.
  Retained as an optional pre-filter, not the scoring model.

---

## Approval Checklist (owner)

- [ ] Approve the listed dependencies for `npm install`.
- [ ] Confirm USAi base URL + model identifier + request shape.
- [ ] Confirm `USAI_API_KEY` and `DAP_API_KEY` are set in local `.env`.
- [ ] Confirm the URL export file path and columns.
- [ ] Approve authorizing gsa.gov live page fetches (polite, rate-limited).
