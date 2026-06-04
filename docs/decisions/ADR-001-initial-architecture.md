# ADR-001: Initial Architecture — Next.js 15 + Payload CMS 3.x on cloud.gov

**Date:** 2026-06-04
**Status:** Accepted
**Deciders:** Alison Childs (Project Owner / Lead Developer)
**Reviewed By:** Ed Forst (Approving Official)

---

## Context

The existing GSA.GOV website is built on Drupal. The goal of this project is to rebuild the site using a modern, modular headless CMS architecture that:

1. Allows pages to be composed from reusable content blocks (modules)
2. Enforces role-based access — super admins control the module library; editorial staff create pages from approved templates
3. Deploys to cloud.gov (FedRAMP Moderate) — the GSA-approved hosting platform
4. Is accessible (Section 508 / WCAG 2.1 AA)
5. Supports migration of existing Drupal content

The system handles **public data only** (FIPS Low) — no PII, CUI, PHI, or authentication of general public users.

---

## Decision

**Use Next.js 15 (App Router) with Payload CMS 3.x, backed by PostgreSQL 16, deployed to cloud.gov via Docker.**

### Technology Choices

| Layer      | Choice                  | Rationale                                                                                                                                                                  |
| ---------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Language   | TypeScript 5.x          | Type safety across frontend and CMS configuration reduces runtime errors. Payload CMS is TypeScript-native.                                                                |
| Frontend   | Next.js 15 (App Router) | Modern React with server components. Excellent for server-rendered public-facing pages. Payload CMS 3.x is designed to run inside Next.js — no separate CMS server needed. |
| CMS        | Payload CMS 3.x         | TypeScript-native, block-based content model, granular RBAC, runs inside Next.js. Supports the modular page architecture requirement without a separate service.           |
| Database   | PostgreSQL 16           | Required by Payload CMS. Available as a managed service on cloud.gov via the `aws-rds` marketplace.                                                                        |
| Hosting    | cloud.gov               | GSA-approved FedRAMP Moderate platform. Provides managed PostgreSQL, S3-compatible storage, and deployment pipeline via Cloud Foundry buildpacks or Docker.                |
| CI/CD      | GitHub Actions          | Standard GSA TTS practice. Runs lint, typecheck, test, and security audit on every PR.                                                                                     |
| Containers | Docker                  | Consistent local development environment and production deployments to cloud.gov.                                                                                          |

### Architecture Pattern

Payload CMS 3.x is embedded directly in the Next.js application:

- **Public frontend:** `src/app/(frontend)/` — server-rendered pages consuming Payload data
- **Admin panel:** `src/app/(payload)/admin/` — Payload's built-in admin UI at `/admin`
- **API:** `src/app/api/` — Payload's REST/GraphQL API routes

**Content model:**

- `src/blocks/` — Content block (module) definitions — controlled by super admins
- `src/collections/` — Payload collections (Pages, Media, Users)
- `src/templates/` — Page template definitions
- `src/globals/` — Site-wide config (navigation, footer, site settings)

### Access Control Model

| Role        | Payload Permissions                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| Super Admin | Full access to all collections, blocks, templates, user management                                                    |
| Editor      | Create/edit pages using existing templates; manage content in approved collections; cannot modify blocks or templates |
| Viewer      | Read-only admin access                                                                                                |

This is enforced in Payload's `access` functions in each collection and block definition.

---

## Alternatives Considered

### Alternative 1: Drupal (Status Quo)

- **Rejected because:** The existing Drupal system has high maintenance burden and doesn't support the modular, TypeScript-native architecture needed. The project goal is modernization.

### Alternative 2: Wagtail (Python/Django + React frontend)

- **Rejected because:** Wagtail requires maintaining a separate Python/Django backend service alongside a React frontend. This increases operational complexity and requires Python expertise in addition to TypeScript. Payload CMS 3.x achieves the same block-based CMS goals within a single Next.js runtime.

### Alternative 3: Sanity or Contentful (SaaS CMS)

- **Rejected because:** These are external SaaS services that are not FedRAMP-authorized, and they would put content outside the GSA-controlled cloud.gov boundary. Payload CMS is self-hosted within the FedRAMP boundary.

### Alternative 4: Strapi

- **Rejected because:** Strapi requires a separate Node.js server from the Next.js frontend. Payload CMS 3.x's native Next.js integration is architecturally simpler and reduces the number of running services.

---

## Consequences

### Positive

- Single runtime (Next.js + Payload) reduces operational complexity
- TypeScript throughout — shared types between CMS config and frontend
- Block-based architecture natively supports the modular page composition requirement
- Payload's RBAC system directly implements the super admin / editor access model
- cloud.gov managed PostgreSQL reduces database administration burden
- Open-source, self-hosted — no SaaS vendor lock-in; data stays within the FedRAMP boundary

### Negative / Risks

- Payload CMS 3.x is relatively new (released 2024) — fewer community resources than Drupal or WordPress
- Drupal content migration is non-trivial — requires migration scripts and careful data mapping
- Next.js App Router has a steeper learning curve than the Pages Router for developers unfamiliar with React Server Components
- All-TypeScript stack requires TypeScript expertise across the team

### Mitigations

- Monitor Payload CMS releases for breaking changes; pin to exact versions
- Plan content migration in phases; prioritize high-traffic pages first
- Document server component patterns in project docs as team learns
- Hire/train for TypeScript skill gap if needed

---

## References

- [Payload CMS 3.x Documentation](https://payloadcms.com/docs)
- [Next.js 15 App Router Documentation](https://nextjs.org/docs/app)
- [cloud.gov Documentation](https://cloud.gov/docs/)
- [NIST SP 800-53 Rev 5.2](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [Section 508 Standards](https://www.section508.gov/)
- [GSA FedRAMP Marketplace](https://marketplace.fedramp.gov/)
