# ADR-002: Adopt US Design System Color Palette

**Date:** 2026-07-07
**Status:** Implemented
**Deciders:** Alison Childs (Project Owner / Lead Developer)
**Reviewed By:** Ed Forst (Approving Official)

---

## Context

The GSA.GOV redesign was developed using ad-hoc color values mixed from two sources:

1. **Hand-picked GSA brand values** in `tailwind.config.ts` (e.g., `gsa-navy: #0B1C35`).
2. **Informally used USDS hex values** scattered as raw Tailwind arbitrary values throughout components (e.g., `bg-[#E6EAF0]`, `text-[#A7B4C9]`).

This led to an inconsistent token namespace, hardcoded hex duplication across 20+ files, and no single source of truth for the color system.

The agency has adopted the **US Design System** (`acgsa/usds`), a custom design system derived from Figma design tokens. The USDS token file (`vendor/usds/tokens/base.tokens.json`) provides a complete, Figma-exported W3C Design Token Community Group format palette covering all color families the GSA site uses.

An audit of the codebase confirmed that multiple USDS token hex values were **already being used informally** as raw arbitrary values (steel/50: `#FAFAFC`, steel/200: `#E6EAF0`, steel/300: `#D3D9E4`, steel/500: `#A7B4C9`), confirming the design was already converging on this system without a formal contract.

---

## Decision

Adopt the USDS color palette from `vendor/usds/tokens/base.tokens.json` as the **single source of truth** for all colors on the GSA.GOV site.

### Implementation layers

| Layer                 | File                               | Purpose                                                                                                                      |
| --------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Token constants       | `src/lib/tokens/colors.ts`         | Typed TypeScript const — extracts all USDS base hex values; defines GSA semantic aliases on top                              |
| Tailwind config       | `tailwind.config.ts`               | Imports `src/lib/tokens/colors.ts`; exposes full USDS scale as `usds-steel-*`, `usds-blue-*`, etc. plus GSA semantic aliases |
| CSS custom properties | `src/app/globals.css`              | Declares `--usds-steel-*` custom properties for use in inline styles and Framer Motion                                       |
| Category accents      | `src/templates/categoryAccents.ts` | Maps per-category editorial accents to nearest USDS tokens                                                                   |

### Color mapping decisions

#### GSA semantic aliases → USDS tokens

| Alias            | Old value | USDS token       | USDS hex  | Notes                                                                                      |
| ---------------- | --------- | ---------------- | --------- | ------------------------------------------------------------------------------------------ |
| `gsa-navy`       | `#00111C` | _(GSA override)_ | `#00111C` | Kept as GSA-specific; nearest USDS is `blue/950 #0D131C` — not swapped per design decision |
| `gsa-navy-mid`   | `#0D2240` | `blue/900`       | `#131D2B` | Closest dark navy                                                                          |
| `gsa-ticker`     | `#0f172a` | `blue/950`       | `#0D131C` | Near-black navy for ticker background                                                      |
| `gsa-live`       | `#DC2626` | `red/600`        | `#C43148` | Error/live red                                                                             |
| `gsa-blue`       | `#0066CC` | `blue/600`       | `#5C8ACE` | Primary link/action blue                                                                   |
| `gsa-blue-hover` | `#0052a3` | `blue/700`       | `#426393` | Darker blue hover                                                                          |
| `gsa-savings`    | `#34d399` | _(GSA override)_ | `#34d399` | Emerald; USDS has no emerald. Kept as GSA-specific per design decision.                    |

#### Category accent → USDS tokens

| Accent               | Old value | USDS token      | USDS hex              |
| -------------------- | --------- | --------------- | --------------------- |
| `accent-realestate`  | `#B45309` | `orange/600`    | `#CA702D`             |
| `accent-acquisition` | `#0E7490` | `turquoise/700` | `#4A7A89`             |
| `accent-technology`  | `#4338CA` | `violet/700`    | `#56588F`             |
| `accent-about`       | `#9D174D` | `pink/700`      | mapped via pink scale |
| `accent-employees`   | `#047857` | `green/700`     | `#417827`             |

#### USDS steel scale (primary neutral)

The `steel` family is the USDS blue-tinted gray scale used for borders, muted text, and surfaces:

| Token            | Hex       |
| ---------------- | --------- |
| `usds-steel-50`  | `#FAFAFC` |
| `usds-steel-100` | `#F4F5F8` |
| `usds-steel-200` | `#E6EAF0` |
| `usds-steel-300` | `#D3D9E4` |
| `usds-steel-400` | `#B9C3D4` |
| `usds-steel-500` | `#A7B4C9` |
| `usds-steel-600` | `#8792A3` |
| `usds-steel-700` | `#616875` |
| `usds-steel-800` | `#353A40` |
| `usds-steel-900` | `#1C1F22` |
| `usds-steel-950` | `#141618` |

---

## Alternatives Considered

### Alternative 1: Keep all current ad-hoc values

**Rejected.** Leads to growing entropy as the codebase expands. Different developers would independently introduce new hex values with no systematic reference.

### Alternative 2: Use Tailwind CSS default palette (gray/blue/etc.)

**Rejected.** The Tailwind default grays are warm/neutral; the USDS `steel` scale is distinctly blue-tinted and matches the GSA design language. Substituting them would produce a visually different result.

### Alternative 3: Generate CSS custom properties from `base.tokens.json` at build time

**Deferred.** Would require a custom build script or `style-dictionary` dependency. Correct approach for v2 once the token set stabilizes. For now, `src/lib/tokens/colors.ts` provides a hand-maintained typed extract that is sufficient and requires no new dependencies.

---

## Consequences

### Positive

- Single source of truth for all colors — `src/lib/tokens/colors.ts`.
- Eliminates ~60 raw hex arbitrary class values scattered across components.
- Enables future theming (dark mode) by swapping the semantic alias layer.
- Documents design rationale for the two GSA-specific overrides (`gsa-navy`, `gsa-savings`).
- Tailwind IntelliSense surfaces USDS token names directly.

### Negative / Risks

- **Manual maintenance:** `src/lib/tokens/colors.ts` is a hand-extracted copy of `vendor/usds/tokens/base.tokens.json`. If the upstream design system updates, this file must be updated manually.
- **Migration scope:** 21 files updated to replace all Tailwind default `gray-*` classes with `usds-steel-*` equivalents (completed 2026-07-07). Pre-existing lint errors (`react/no-unescaped-entities`, `react-hooks/set-state-in-effect`) in unrelated page/module files remain and are tracked separately.

### Mitigations

- `colors.ts` includes `@see` JSDoc linking back to `vendor/usds/tokens/base.tokens.json`.
- A future ADR should evaluate `style-dictionary` integration for automated token extraction.
- `aria-sort` attribute correctly placed on `<th>` elements (not `<button>` children) in `DataTable.tsx` per ARIA spec.

---

## Migration Log

### 2026-07-07 — Tailwind `gray-*` → `usds-steel-*` sweep

**Scope:** All content-facing components and templates. Tailwind's default `gray` scale (warm/neutral) was still in use in 21 files. Replaced with the USDS `steel` scale (blue-tinted) per the decision in Alternative 2 above.

**Mapping applied:**

| Tailwind gray | → usds-steel     | Notes                                               |
| ------------- | ---------------- | --------------------------------------------------- |
| `gray-50`     | `usds-steel-100` | Nearest tinted light surface                        |
| `gray-100`    | `usds-steel-200` |                                                     |
| `gray-200`    | `usds-steel-300` |                                                     |
| `gray-300`    | `usds-steel-400` |                                                     |
| `gray-400`    | `usds-steel-500` |                                                     |
| `gray-500`    | `usds-steel-600` | gray-500 `#6B7280` → nearest steel is 600 `#8792A3` |
| `gray-600`    | `usds-steel-600` |                                                     |
| `gray-700`    | `usds-steel-700` |                                                     |
| `gray-800`    | `usds-steel-800` |                                                     |
| `gray-900`    | `usds-steel-900` |                                                     |

**Files modified (21):**

- `src/templates/StoryPage.tsx`
- `src/templates/DetailPage.tsx`
- `src/templates/InfoPage.tsx`
- `src/templates/DataPage.tsx`
- `src/templates/MicrositePage.tsx`
- `src/templates/category/CategoryFeatured.tsx`
- `src/templates/category/CategoryTopics.tsx`
- `src/templates/category/CategoryLeadership.tsx`
- `src/components/ui/EditorialCard.tsx`
- `src/components/ui/KpiCard.tsx`
- `src/components/ui/StoryCard.tsx`
- `src/components/ui/FeatureCard.tsx`
- `src/components/ui/ImagePanelCard.tsx`
- `src/components/ui/DataTable.tsx`
- `src/components/modules/EditorialCarousel.tsx`
- `src/components/modules/KpiCards.tsx`
- `src/components/modules/KpiTicker.tsx`
- `src/components/modules/VideoCarousel.tsx`
- `src/components/modules/SearchResults.tsx`
- `src/components/modules/SavingsMilestoneTimeline.tsx`

**Intentional non-migration:**

- Inline `rgba(52,211,153,…)` values in Framer Motion `style=` props — correct use of `BRAND_GREEN` (`gsa-savings`) with opacity; not a `gray-*` issue.
- Scrollbar `rgba(100,116,139,…)` in `globals.css` — browser chrome, not content color.
- `#d1d5db` inline background in `EditorialCarousel.tsx` progress dots — replaced with USDS steel-400 `#B9C3D4`.

---

## References

- `vendor/usds/tokens/base.tokens.json` — USDS primitive token source
- `vendor/usds/tokens/alias/Light Mode.tokens.json` — USDS semantic alias layer
- [AGENTS.md](../../AGENTS.md) — ADR requirements
- [ADR-001](./ADR-001-initial-architecture.md) — Initial architecture decision
