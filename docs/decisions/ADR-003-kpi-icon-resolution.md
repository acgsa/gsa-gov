# ADR-003: KPI Ticker Icon Resolution — Curated Keyword Map + Manual Override

**Date:** 2026-07-20
**Status:** Accepted
**Deciders:** Alison Childs (Project Owner / Lead Developer)
**Reviewed By:** Ed Forst (Approving Official)

---

## Context

The KPI Ticker module (`src/components/modules/KpiTicker.tsx`) displays a
scrolling row of key performance indicators, each rendered as a Lucide icon
plus a value and label. Previously the KPI list — including the specific icon
component per item — was hardcoded in the component.

We are moving the KPI text fields into the CMS so editorial staff can author
them via a reusable "KPI Ticker" block. Editors author plain text (a `value`
and a `label`); they do not (and should not) write code or import React
components. We therefore need a way to determine which icon to show for each
CMS-authored KPI.

Constraints from `AGENTS.md`:

- Public data only; deterministic behavior preferred for a FedRAMP boundary.
- No new dependencies and no network calls without explicit approval.
- TDD with ≥80% coverage on new code.
- Editorial staff must not be able to widen access or reach arbitrary code
  paths; icon selection must stay within a reviewed allow-list.

## Decision

**Resolve KPI icons with a deterministic, curated keyword map, plus an optional
manual override chosen from a fixed allow-list.** No AI, no network, no new
dependencies.

Implemented in `src/lib/kpi-icons.ts`:

1. **`KPI_ICONS`** — the single source of truth mapping a stable string key
   (e.g. `"dollar-sign"`) to a specific Lucide component. Only these icons are
   imported, preserving tree-shaking and avoiding any untrusted
   `string → component` lookup at runtime.
2. **`KPI_ICON_OPTIONS`** — human-readable `{ label, value }` options derived
   from the map, used to populate the CMS `select` dropdown for the manual
   override. A config-integrity test asserts the options and the map stay in
   sync.
3. **`resolveKpiIconName(value, label)`** — an ordered list of keyword rules
   matched (case-insensitively) against the combined value + label text; the
   first matching rule wins, falling back to a neutral default
   (`trending-up`). Short/ambiguous tokens like `ai`/`ml` use whole-word
   matching to avoid false positives (e.g. "tr**ai**ned").
4. **`resolveKpiIcon(value, label, override?)`** — a valid override key always
   wins; otherwise the keyword auto-mapper runs.

The `KpiTickerBlock` (`src/blocks/KpiTickerBlock.ts`) exposes `value`, `label`,
and an optional `iconOverride` select sourced from the allow-list. Blank
override = auto-map. The block is registered on a minimal `Pages` collection
(`src/collections/Pages.ts`) via a blocks-based `layout` field, alongside the
existing Story Carousel and Image Panel blocks.

### Alternatives Considered

- **B — LLM classification at save time:** Would require network egress and an
  external model call. Rejected: adds a dependency and non-deterministic
  behavior inside the FedRAMP boundary; needs explicit approval and an ATO
  review that is not warranted for icon selection.
- **C — LLM classification at render time:** Same concerns as B, plus latency
  and runtime cost on every page render. Rejected.
- **Full dynamic Lucide lookup (`string → any Lucide icon`):** Rejected —
  breaks tree-shaking (imports the entire icon set) and allows arbitrary,
  unreviewed icon strings from content.

## Consequences

### Positive

- Deterministic, fast, and fully unit-testable (20 tests in
  `src/lib/kpi-icons.test.ts`).
- No new dependencies, no network calls — stays within `AGENTS.md` constraints.
- Tree-shaking preserved; only curated icons are bundled.
- Editors get zero-config sensible icons, with a simple dropdown override when
  the auto-choice is wrong.

### Negative / Risks

- Keyword rules are heuristic; unusual phrasing may map to the default icon.
  Mitigated by the manual override dropdown.
- The curated icon set must be extended in code (super-admin change) when new
  themes arise. This is intentional — icons stay within a reviewed allow-list.

### Mitigations

- Config-integrity test prevents the dropdown and the icon map from drifting.
- Rule ordering is documented in-code (e.g. `badge-check` before
  `shield-check`; `zap` before `dollar-sign`) with regression coverage.

## References

- `src/lib/kpi-icons.ts`, `src/lib/kpi-icons.test.ts`
- `src/blocks/KpiTickerBlock.ts`, `src/collections/Pages.ts`
- `src/components/modules/KpiTicker.tsx`
- AGENTS.md — dependency, network, and TDD constraints
