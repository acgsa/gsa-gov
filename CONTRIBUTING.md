# Contributing to GSA.GOV Website

Thank you for contributing to the GSA.GOV redesign. This is an internal GSA project.

## Getting Started

1. Review [AGENTS.md](AGENTS.md) — if you're using an AI coding agent, these are its behavioral rules
2. Review [CODING_PRACTICES.md](CODING_PRACTICES.md) — all code (human and AI-generated) must follow these standards
3. Set up your local environment per the [README](README.md#quick-start)

## Workflow

1. **Create a branch** from `main` — use `feat/`, `fix/`, or `docs/` prefixes
2. **Make your changes** — follow the coding standards
3. **Run checks locally** — `npm run check` must pass
4. **Open a PR** — fill in the PR template (context, plan, testing done, security impact)
5. **Get a review** — at least one review required before merge
6. **Merge** — squash merge to keep history clean

## Branch Naming

| Type          | Pattern                       | Example                  |
| ------------- | ----------------------------- | ------------------------ |
| Feature       | `feat/short-description`      | `feat/hero-block`        |
| Bug fix       | `fix/short-description`       | `fix/nav-keyboard-focus` |
| Documentation | `docs/short-description`      | `docs/adr-002`           |
| Migration     | `migration/short-description` | `migration/drupal-pages` |

## Code Standards

- Follow [CODING_PRACTICES.md](CODING_PRACTICES.md)
- TypeScript strict mode — no untyped `any`
- All UI components must pass WCAG 2.1 AA
- Functions ≤ 50 lines, files ≤ 400 lines
- Write tests for new logic

## Content Block Changes

Changes to blocks (`src/blocks/`) or templates (`src/templates/`) affect editorial workflows and **require super admin review** before merging. Tag `@alisonjchilds` in your PR.

## Architecture Decisions

Significant architecture changes need an ADR in `docs/decisions/`. See the [ADR template](docs/decisions/ADR-001-initial-architecture.md) for format. Create `ADR-NNN-description.md` and get it reviewed before implementation.

## Security Issues

Do not open public GitHub issues for security vulnerabilities. See [SECURITY.md](SECURITY.md).

## Questions

Contact the project team via GSA internal channels.
