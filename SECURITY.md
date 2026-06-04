# Security Policy

## Scope

This repository contains the source code for the GSA.GOV website, built on Next.js 15, Payload CMS 3.x, and PostgreSQL 16, deployed to cloud.gov.

**Data Classification:** Public — no PII, no CUI, no PHI is stored or processed.

**FIPS Impact Level:** Low

## Reporting Security Vulnerabilities

Do **not** open public GitHub issues for security vulnerabilities.

### Process

1. **Email the security contact:** Contact the GSA ISSO assigned to this system (see project documentation for current contact).
2. **Include:** A description of the vulnerability, steps to reproduce, potential impact, and any suggested remediation.
3. **Response time:** We aim to acknowledge within 2 business days and provide a remediation plan within 10 business days.
4. **Fix and disclose:** After remediation, we will coordinate disclosure timing with the reporter.

For GSA infrastructure or platform issues (cloud.gov, GitHub Enterprise), follow standard GSA security reporting procedures.

## Secure Development Practices

All code in this repository follows [CODING_PRACTICES.md](CODING_PRACTICES.md), which is aligned with:

- NIST SP 800-53 Rev 5.2
- OWASP Top 10 (Web and LLM/Agentic)
- CISA Secure by Design principles
- NIST SP 800-218A (Secure Software Development Framework)

## Dependency Vulnerabilities

- We use `npm audit` in CI — all PRs are blocked if critical or high CVEs are present
- Dependencies are pinned to exact versions
- Dependabot is enabled for automated security updates

## AI-Generated Code

This project uses AI coding agents under the behavioral rules in [AGENTS.md](AGENTS.md). All AI-generated code is reviewed by a human developer before merge and is subject to the same security requirements as human-authored code.

## Secrets Management

- No secrets are stored in this repository
- Local development uses `.env` (gitignored)
- Production uses cloud.gov user-provided services and environment variables
- Pre-commit hooks and CI scan for accidentally committed secrets

## Supported Versions

Security patches are applied to the current `main` branch. We do not maintain separate security branches.

---

_Last Updated: 2026-06-04_
