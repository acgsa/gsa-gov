## Context

<!-- What problem does this change solve? Link to related issue(s). -->

Closes #

## What changed

<!-- Brief description of the change. What files/components were modified and why? -->

## AI disclosure

<!-- Was this code generated or assisted by an AI agent? Check all that apply. -->

- [ ] No AI assistance used
- [ ] AI-generated code — I reviewed it against [CODING_PRACTICES.md](../CODING_PRACTICES.md) before submitting
- [ ] AI-assisted (e.g., suggestions, completions) — human-authored overall

## Testing

<!-- How did you verify this works? -->

- [ ] `npm run check` passes (lint + typecheck + tests)
- [ ] Manually tested locally
- [ ] Accessibility checked (`npm run a11y`) — _required for UI changes_

## Accessibility (UI changes only)

- [ ] Semantic HTML used correctly
- [ ] ARIA labels/roles added where needed
- [ ] Keyboard navigation works
- [ ] No color-only information conveyors

## Security impact

<!-- Does this change affect authentication, authorization, data handling, or dependencies? -->

- [ ] No security impact
- [ ] Adds/changes dependencies — `npm audit` passes, no high/critical CVEs
- [ ] Touches access control — CODEOWNERS review required
- [ ] Touches Payload CMS config or collections — super admin review required

## Rollback plan

<!-- How would we revert this if it causes problems in production? -->

Revert commit: `git revert <sha>`
