# ADR-004: Savings Page as a CMS-Composed Page with Modules

- **Status:** Proposed (awaiting approval)
- **Date:** 2026-07-20
- **Deciders:** Alison Childs (Project Owner), Ed Forst (Approving Official)
- **Related:** ADR-001 (initial architecture), `src/collections/Pages.ts`, `src/blocks/*`

---

## Context

Today the Taxpayer Savings page is a hard-coded React route:

- Route: [`src/app/(category)/accountability/savings/page.tsx`](<../../src/app/(category)/accountability/savings/page.tsx:1>)
  (and a mirror at [`src/app/(category)/savings/page.tsx`](<../../src/app/(category)/savings/page.tsx:1>))
- It statically composes a fixed sequence of modules:
  1. [`SavingsHero`](../../src/components/modules/SavingsHero.tsx:224)
  2. [`SavingsScrollSection`](../../src/components/modules/SavingsScrollSection.tsx:22) → milestone scroll + tracker strip
  3. [`StoryCarousel`](../../src/components/modules/StoryCarousel.tsx:1)
  4. [`SavingsMethodology`](../../src/components/modules/SavingsMethodology.tsx:127)
- All figures come from the single source of truth
  [`src/lib/savings-data.ts`](../../src/lib/savings-data.ts:1), including the new
  `SAVINGS_HEADLINE_DOLLARS` / `SAVINGS_HEADLINE_LABEL` that now also drive the
  global header ticker ([`OdometerCounter`](../../src/components/ui/OdometerCounter.tsx:60)
  via [`LiveTicker`](../../src/components/layout/LiveTicker.tsx:75)).

The request: make the savings page **a CMS page in Payload with the ability to
add modules**, so editorial staff can add/reorder/configure content blocks
without a code deploy — consistent with the existing modular architecture
(`Pages` collection with a `layout` blocks field).

Per `AGENTS.md`, this change:

- Modifies `payload.config.ts` and `Pages.ts` (approval-gated).
- Adds new blocks / touches module boundaries (super-admin owned; ADR required).
- Requires a DB migration for the new `pages` content (migration = approval-gated).
- Must NOT widen editorial-level access controls without approval.

Therefore this ADR is submitted for approval **before** any implementation.

---

## Decision (Proposed)

Convert the Taxpayer Savings page from a static route into a Payload
`pages`-collection entry rendered by a dynamic catch-all route, composed from a
curated, super-admin-owned block library. Editorial staff can add, remove,
reorder, and configure blocks; they cannot introduce new block types or widen
access.

### Key design constraints

1. **Figures stay code-owned.** The headline figure, milestone data, and fraud
   stages remain in [`savings-data.ts`](../../src/lib/savings-data.ts:1). Blocks
   that render these (hero, milestone scroll, methodology) read from that source,
   NOT from editor-entered numbers. This preserves the single-source guarantee
   for the $60B figure that the ticker now depends on, and avoids editors
   silently desyncing the ticker from the page. Editors control **composition
   and copy around** the figures, not the audited figures themselves.
2. **Accessibility (Section 508 / WCAG 2.1 AA)** must be preserved by each block
   regardless of ordering. Blocks are individually compliant; composition cannot
   break semantics.
3. **Access control unchanged.** `pages.read = () => true` (public). Create/
   update remain restricted to authenticated editorial staff per existing
   collection defaults; block _definitions_ remain super-admin-owned in
   `src/blocks/`.

---

## Proposed Implementation Plan (phased, each phase gated)

### Phase 1 — Block wrappers for savings modules (code only, no config)

Create Payload `Block` configs mirroring the existing components, in `src/blocks/`:

| Block                        | Wraps component        | Editable fields (proposed)                                     |
| ---------------------------- | ---------------------- | -------------------------------------------------------------- |
| `SavingsHeroBlock`           | `SavingsHero`          | eyebrow text, intro copy (figures read from `savings-data.ts`) |
| `SavingsScrollBlock`         | `SavingsScrollSection` | section aria-label only (milestones from data)                 |
| `SavingsMethodologyBlock`    | `SavingsMethodology`   | intro copy (FAQ items may stay code-owned initially)           |
| (reuse) `StoryCarouselBlock` | `StoryCarousel`        | already exists                                                 |

A **block renderer** maps `layout[].blockType` → React component:
`src/components/modules/PageBlocks.tsx` (new).

### Phase 2 — Register blocks + dynamic route (config + route)

- Add the new blocks to the `layout` field in
  [`Pages.ts`](../../src/collections/Pages.ts:55). _(approval-gated file)_
- Add a dynamic route `src/app/(category)/[...slug]/page.tsx` (or a dedicated
  `pages/[slug]`) that fetches the `pages` doc by slug via the Payload local API
  and renders `PageBlocks`. Falls back to `notFound()` for unknown slugs.
- Keep `metadata` (title/description) sourced from the page's `title` field, so
  the browser tab stays "Taxpayer Savings | GSA" via the root template.

### Phase 3 — Seed + migration (migration = approval-gated)

- Add a seed/migration that creates the `savings` page doc with the default
  block ordering (hero → scroll → story carousel → methodology), reproducing
  today's layout exactly.
- Provide a rollback: the static route files remain in git history; revert the
  route + seed to restore.

### Phase 4 — Cutover

- Point `/accountability/savings` (and `/savings`) at the CMS-rendered page.
- Decide whether to keep both URLs or add a redirect in
  [`next.config.ts`](../../next.config.ts:28). _(redirect config = approval-gated)_

---

## Verification

- `npm run typecheck`, `npm run lint`, `npm test` green.
- `npm run a11y` on the rendered CMS page — parity with current static page.
- Manual: editor can reorder/remove/add allowed blocks in Payload admin; figures
  and ticker remain in sync ($60B single source unchanged).
- Confirm unknown slugs 404 and access controls are not widened.

## Rollback

- Revert the dynamic route + block registrations; restore static
  `page.tsx`. Remove/rollback the seed migration. No data loss (public content).

## Security / Compliance Impact

- Data classification unchanged (public content only; no PII/CUI).
- No new external network calls; Payload local API only.
- Access controls unchanged; block library stays super-admin-owned.
- Migration touches the `pages` table only — requires explicit approval to run.

---

## Consequences

**Positive:** Editorial staff gain add/reorder/configure control over the
savings page composition; consistent with the modular `Pages` architecture; the
audited $60B figure and ticker stay code-owned and in sync.

**Negative / risks:** More moving parts (dynamic route + block renderer); risk
of editors producing an incoherent ordering (mitigated by keeping figures
code-owned and blocks individually 508-compliant); a DB migration is required.

---

## Open Questions (for approver)

1. Should FAQ/methodology items and story-carousel cards become editor-editable,
   or stay code-owned initially?
2. One canonical URL (`/accountability/savings`) with a redirect from `/savings`,
   or keep both?
3. Confirm no new editorial roles/permissions are introduced (fail-closed default).
