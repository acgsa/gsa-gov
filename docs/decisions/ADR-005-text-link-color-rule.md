# ADR-005: Text Link Color Rule on Light Backgrounds

**Date:** 2026-07-20
**Status:** Implemented
**Deciders:** Alison Childs (Project Owner / Lead Developer)
**Reviewed By:** Ed Forst (Approving Official)

---

## Context

The GSA.GOV redesign moves away from the traditional "blue hyperlink" visual
language in favor of a restrained, editorial (New York Times–style) reading
experience. During the build of the plain informational / article template
([`DetailPage`](../../src/templates/DetailPage.tsx)), blue link and hover
colors (`gsa-blue`, `usds-blue-700`) were introduced for contact links and
related-article links.

Design review determined that blue links create a dated, "government portal"
feel that conflicts with the editorial direction. An audit of the codebase
found that **nearly every other text link already followed a neutral Steel
pattern** (`text-usds-steel-700` default → `hover:text-usds-steel-900`),
established organically across templates, cards, carousels, and navigation.
Only two places diverged:

1. The new `DetailPage` contact / related links (blue) — since corrected.
2. [`SearchResults.tsx`](../../src/components/modules/SearchResults.tsx) result
   title links, still using `text-gsa-blue hover:text-gsa-blue-hover`.

We need a single documented rule so this convergence is intentional and
enforceable rather than incidental.

---

## Decision

**On light backgrounds, all text links use a neutral Steel color scheme — never
blue.**

### The rule

| State   | Token                                               | Hex       |
| ------- | --------------------------------------------------- | --------- |
| Default | `usds-steel-700`                                    | `#616875` |
| Hover   | `usds-steel-900`                                    | `#1C1F22` |
| Focus   | `gsa-blue` ring (`focus-visible:ring-2`) — see note | `#5C8ACE` |

> **Focus ring:** the color rule governs the _link text_ color only. The
> keyboard focus ring MAY remain blue (`focus-visible:ring-gsa-blue`) for
> visibility; a Steel focus ring is also acceptable. Blue is permitted here
> because it is a focus affordance, not the link's resting/hover text color.

- **Body / inline links** should additionally carry an `underline` with a muted
  `decoration-usds-steel-300` that darkens to `decoration-usds-steel-900` on
  hover, to preserve affordance without relying on color alone (Section 508 /
  WCAG 2.1 AA — do not convey information by color only).
- **Navigational / CTA-style links** (cards, "Read more" rows, related links)
  may omit the underline when another affordance is present (e.g. a `MoveRight`
  chevron), but MUST still use the Steel 700 → Steel 900 transition. Any
  accompanying chevron/icon transitions from `usds-steel-400` to
  `usds-steel-900` on `group-hover`.

### Scope

- **Applies to:** all text links rendered on white / light Steel (`steel-50`,
  `steel-100`) backgrounds.
- **Does not apply to:**
  - Links on dark backgrounds (navy header/footer/nav), which use white /
    `white/70` treatments.
  - The `gsa-blue` / `gsa-blue-hover` tokens themselves, which are **retained**
    in [`colors.ts`](../../src/lib/tokens/colors.ts) for non-link interactive
    accents (e.g. focus rings on controls, badges) but are no longer used as a
    text-link color.

---

## Consequences

### Positive

- Consistent, editorial link treatment across the entire site.
- Improved 508/WCAG compliance for inline links (underline affordance, not
  color-only).
- Removes the last ad-hoc blue text links; the pattern is now documented and
  enforceable in review.

### Negative / trade-offs

- Links are lower-contrast against body copy than the classic blue, relying on
  underline + weight for inline affordance. Mitigated by keeping the underline
  requirement for inline body links.
- `gsa-blue` remains defined but its usage is now narrowly scoped; reviewers
  must watch for it creeping back into text links.

### Follow-up

- Convert [`SearchResults.tsx`](../../src/components/modules/SearchResults.tsx)
  result title links to the Steel 700 → Steel 900 rule (tracked with this ADR).
- Future: consider a shared `<TextLink>` primitive to centralize the rule
  rather than repeating the utility classes (Rule of Three — revisit once a
  third distinct link variant appears).

---

## Alternatives Considered

1. **Keep blue links (USDS `blue/600`).** Rejected — conflicts with the
   editorial design direction and the already-dominant Steel pattern.
2. **Underline-only, inherit text color.** Rejected — insufficient hover
   affordance and inconsistent with the established Steel hover transition.
3. **Introduce a new dedicated link token.** Deferred — the existing
   `usds-steel-700` / `usds-steel-900` tokens already express the rule; adding a
   token would duplicate values without benefit (YAGNI).
