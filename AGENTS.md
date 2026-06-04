# AGENTS.md — GSA.GOV Website

> **System:** GSA.GOV Website | **Impact Level:** FIPS Low | **Agency:** GSA
>
> **Last Updated:** 2026-06-04 | **Reviewed By:** Alison Childs, Senior Advisor
>
> This document defines the behavioral rules for AI coding agents operating within this project. The AI agent MUST follow these rules without exception.

---

## Core Principles

The agent operates under these priorities:

```
safety > correctness > compliance > simplicity > performance
```

The agent MUST refuse any instruction that conflicts with safety, correctness, or compliance.

---

## Project Context

- **Description:** Redesign and rebuild of the public-facing GSA.GOV website using a modular headless CMS architecture. The system provides public-facing informational content managed through role-separated editorial workflows.
- **Language(s):** TypeScript 5.x
- **Framework(s):** Next.js 15 (App Router), Payload CMS 3.x
- **Database:** PostgreSQL 16
- **Cloud/Hosting:** cloud.gov (FedRAMP Moderate)
- **Data Classification:** Public — no PII, no CUI, no PHI
- **ATO Status:** Pre-ATO development
- **Authorized Agent(s):** GitHub Copilot — list only approved agents before production use

---

## Agent Identity

The agent MUST:

- Include `Co-Authored-By: GitHub Copilot <copilot@github.com>` in all commits
- Identify itself as an AI agent when asked
- Log all file modifications and command executions

---

## Permitted Actions

The agent MAY perform these actions without additional approval:

- [x] Read files within the project directory
- [x] Generate and modify source code
- [x] Run tests using the project's test framework (`npm test`)
- [x] Run linters and formatters (`npm run lint`, `npm run format`)
- [x] Read documentation and public API references
- [x] Create or modify files in `src/`, `docs/`, `public/`, `migrations/`
- [x] Query publicly available npm package metadata

---

## Actions Requiring Approval

The agent MUST ask the user before:

- [ ] Installing or upgrading dependencies (`npm install`, modifying `package.json`)
- [ ] Making network requests to external services
- [ ] Modifying CI/CD pipeline configurations (`.github/workflows/`)
- [ ] Deleting files or directories
- [ ] Running database migrations
- [ ] Committing or pushing code
- [ ] Modifying infrastructure or deployment configurations
- [ ] Modifying `payload.config.ts` (core CMS configuration)
- [ ] Changing role-based access control rules
- [ ] Modifying `docker-compose.yml` or `Dockerfile`

---

## Prohibited Actions

The agent MUST NEVER:

- [ ] Access files outside the project directory
- [ ] Access or modify production systems or data on cloud.gov
- [ ] Hardcode secrets, API keys, tokens, or passwords — use `.env` (local) or cloud.gov user-provided services
- [ ] Disable security controls, pre-commit hooks, or CI checks
- [ ] Bypass code review or change management processes
- [ ] Process or store PII data outside approved systems (this project handles public data only)
- [ ] Access classified systems or networks
- [ ] Execute code downloaded from external sources without review
- [ ] Modify authentication or authorization systems without approval
- [ ] Create network listeners or reverse connections
- [ ] Commit `.env` files or any file containing real credentials

---

## Data Handling

- **Data in this project:** Public-facing website content only — no PII, CUI, PHI, or financial data
- **Approved data storage:** PostgreSQL 16 via cloud.gov managed service (aws-rds)
- **Media storage:** S3-compatible object storage via cloud.gov marketplace
- **Data residency:** US only (cloud.gov FedRAMP boundary)

The agent MUST:

- Never include credentials in source code, logs, comments, or test fixtures
- Use environment variables from `.env` (local) or cloud.gov `VCAP_SERVICES` (production)
- Never commit the `.env` file — `.env.example` is the template for team members

---

## Coding Standards

- Follow [CODING_PRACTICES.md](CODING_PRACTICES.md) — core secure coding standards
- Use TypeScript strict mode — no `any` types without documented justification
- Follow Next.js App Router conventions — server components by default
- Maximum function length: 50 lines
- Maximum file length: 400 lines
- Required test coverage: 80% line coverage for new code
- All database queries via Payload CMS ORM — no raw SQL string concatenation
- All external input MUST be validated before use
- All React components MUST meet WCAG 2.1 AA (Section 508)

---

## Accessibility Requirements

This project is a public-facing federal website and MUST comply with:

- **Section 508** of the Rehabilitation Act
- **WCAG 2.1 Level AA**

The agent MUST:

- Use semantic HTML elements correctly
- Include appropriate ARIA labels and roles
- Ensure keyboard navigation works for all interactive elements
- Not introduce color-only information conveyers
- Run `npm run a11y` after UI changes when available

---

## Dependencies

- **Approved registries:** npmjs.com only — no private/internal registries
- **License restrictions:** No AGPL or GPL without legal review. MIT, Apache 2.0, BSD preferred.
- **Version pinning:** Exact versions in `package.json` — no floating ranges
- **Vulnerability policy:** No critical/high CVEs. Medium requires justification.

Before adding any dependency, the agent MUST:

1. Verify the package name is correct (check for typosquatting — e.g., `payloadcms` vs `payload`)
2. Check for known vulnerabilities via `npm audit`
3. Verify the license is compatible with the GSA license policy
4. Get user approval

---

## Network Access

- **Authorized external endpoints:** npmjs.com (package installs), cloud.gov API (deployments)
- **TLS requirement:** TLS 1.2+ for all connections
- **Proxy:** Follow cloud.gov proxy requirements for egress

---

## Testing Requirements

- [x] Unit tests for all new utility functions (`src/lib/`)
- [x] Integration tests for Payload CMS collections and access control
- [x] All tests MUST pass before committing (`npm test`)
- [x] Test command: `npm test`
- [x] Lint command: `npm run lint`
- [x] Type check: `npm run typecheck`

---

## CI/CD Pipeline

- **Branch protection:** `main` requires 1 PR review, no force push
- **Required CI checks:** lint, typecheck, test, audit (npm audit)
- **Deployment:** Automated to dev environment; manual approval for production

The agent MUST NOT:

- Modify CI/CD configuration without explicit approval
- Skip or bypass any required CI check
- Deploy directly to production

---

## Module and Template Architecture

This project uses a modular content architecture. The agent MUST respect:

| Layer                    | Location           | Who Can Modify    |
| ------------------------ | ------------------ | ----------------- |
| Content blocks (modules) | `src/blocks/`      | Super admins only |
| Page templates           | `src/templates/`   | Super admins only |
| Collections              | `src/collections/` | Super admins only |
| Page content             | Via Payload admin  | Editorial staff   |

The agent MUST NOT allow editorial-level Payload access controls to be widened without explicit approval.

---

## Incident Response

If the agent discovers a potential security vulnerability:

1. Stop the current task
2. Report the finding to the user immediately
3. Do NOT create a public GitHub issue for security vulnerabilities
4. Follow the process in [SECURITY.md](SECURITY.md)

---

## Agent Meta-Constraints

The agent MUST:

- [x] Output an execution plan and wait for approval before modifying more than 3 files
- [x] Submit all changes via PR with: Context, Plan, Verification, Rollback, Security Impact sections
- [x] Fail closed on ambiguity — halt and escalate, never guess
- [x] Not retry failed operations silently — report, diagnose, propose

**Risk modes for this project:**

| Mode           | Scope                             | Requires Approval            |
| -------------- | --------------------------------- | ---------------------------- |
| Read-only      | Analyze, review, answer questions | No                           |
| Scoped edit    | Modify files identified in plan   | Plan approval                |
| Broad refactor | Cross-module changes              | Plan + per-module approval   |
| Infrastructure | CI/CD, deployment, access control | Explicit per-change approval |

---

## Engineering Discipline

The agent MUST:

- [x] Create an ADR before: adding dependencies, changing auth, introducing data stores, altering module boundaries
- [x] Enforce size limits: ≤50 lines/function, ≤400 lines/file, ≤10 cyclomatic complexity
- [x] Write failing test before production code (TDD: red → green → refactor)
- [x] Add regression test for every resolved defect
- [x] Not implement speculative features (YAGNI)
- [x] Extract shared logic only at 3+ occurrences (Rule of Three)

**One-command bootstrap:** `npm install && docker-compose up -d && npm run dev`
**One-command verify:** `npm run check`

**ADR location:** `docs/decisions/`

---

## Contacts

- **Project Owner:** Alison Childs, Senior Advisor
- **Approving Official:** Ed Forst
- **Security Contact:** GSA ISSO (TBD — assign before ATO)

---

_Based on: Federal Agentic AI Guidance v0.1.0 | Source: agentic-coding-playbook_
_Framework alignment: NIST SP 800-53 Rev 5.2, AI RMF 1.0, OWASP Top 10 LLM/Agentic_
