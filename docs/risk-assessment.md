# AI Agent Risk Assessment — GSA.GOV Website

**Based on:** Agentic Coding Playbook | **Aligned with:** NIST AI RMF 1.0, NIST SP 800-53 Rev 5.2
**OWASP References:** OWASP Top 10 for LLM Applications 2025, OWASP Top 10 for Agentic Applications 2026

---

## Section 1: System Identification

| Field                   | Value                         |
| ----------------------- | ----------------------------- |
| **System Name**         | GSA.GOV Website               |
| **System Owner**        | Alison Childs, Senior Advisor |
| **ISSO**                | TBD — assign before ATO       |
| **FIPS Impact Level**   | [x] Low                       |
| **ATO Status**          | [x] Pre-ATO development       |
| **Assessment Date**     | 2026-06-04                    |
| **Assessor Name/Title** | Alison Childs, Senior Advisor |
| **Next Review Date**    | 2026-12-04                    |

---

## Section 2: AI Agent Identification

| Field                     | Value                                                                        |
| ------------------------- | ---------------------------------------------------------------------------- |
| **Agent Name/Product**    | GitHub Copilot                                                               |
| **Agent Version**         | Current (subscription-based)                                                 |
| **Agent Vendor**          | Microsoft / GitHub                                                           |
| **Deployment Model**      | [x] Local (developer workstation) + [x] Cloud (GitHub Codespace)             |
| **FedRAMP Status**        | [ ] In process (GitHub Enterprise Cloud FedRAMP pending — verify before ATO) |
| **Data Residency**        | [x] US only (GitHub Enterprise)                                              |
| **Training Data Opt-Out** | Confirm opt-out via GitHub org settings before use                           |

### Agent Capabilities in Use

- [x] Code generation and modification
- [x] File system read access
- [x] File system write access
- [ ] Command/shell execution (requires explicit user approval per AGENTS.md)
- [ ] Network access (external) — requires explicit user approval
- [ ] Database access — agent does not have direct DB credentials
- [x] Git operations (commit, push) — requires explicit user approval
- [ ] CI/CD pipeline interaction — agent cannot trigger workflows
- [x] Package/dependency installation — requires explicit user approval per AGENTS.md

---

## Section 3: Data Classification

### 3.1 Data Types Accessible to the Agent

| Data Type               | Present?                      | Classification    | Agent Needs Access?                |
| ----------------------- | ----------------------------- | ----------------- | ---------------------------------- |
| Source code             | [x] Yes                       | Public / Internal | [x] Yes                            |
| Configuration files     | [x] Yes                       | Internal          | [x] Yes                            |
| Environment variables   | [x] Yes (`.env.example` only) | Internal          | [ ] No — real `.env` is gitignored |
| API keys/tokens/secrets | [ ] No (in source)            | N/A               | [ ] No                             |
| PII                     | [ ] No                        | N/A               | [ ] No                             |
| PHI                     | [ ] No                        | N/A               | [ ] No                             |
| Financial data          | [ ] No                        | N/A               | [ ] No                             |
| CUI                     | [ ] No                        | N/A               | [ ] No                             |
| Classified data         | [ ] No                        | N/A               | [ ] No                             |
| Test/sample data        | [x] Yes (if created)          | Public            | [x] Yes                            |

**Key finding:** This system processes public data only. The risk surface from a data classification perspective is low.

### 3.2 Data Flow

| Destination                       | Authorized?                              | Encrypted?                       |
| --------------------------------- | ---------------------------------------- | -------------------------------- |
| Agent vendor cloud (prompts/code) | [x] Yes (GitHub Copilot)                 | [x] Yes (TLS)                    |
| Agent vendor training pipeline    | [ ] No — confirm opt-out in org settings | N/A                              |
| Local file system                 | [x] Yes                                  | [ ] Depends on device encryption |
| Version control (GitHub)          | [x] Yes                                  | [x] Yes                          |
| CI/CD (GitHub Actions)            | [x] Yes                                  | [x] Yes                          |
| External APIs                     | [ ] No (requires approval per AGENTS.md) | N/A                              |

**Action required:** Confirm GitHub Copilot training data opt-out is enabled at the GitHub organization level before this system goes to production.

---

## Section 4: Threat Analysis

Rate: **Likelihood** 1 (Rare) – 5 (Almost Certain) | **Impact** 1 (Negligible) – 5 (Severe) | **Risk = L × I**

| #   | Threat                                                                                                 | OWASP Ref         | Likelihood | Impact | Risk  | Mitigations                                                                                                   | Residual Risk |
| --- | ------------------------------------------------------------------------------------------------------ | ----------------- | ---------- | ------ | ----- | ------------------------------------------------------------------------------------------------------------- | ------------- |
| T1  | **Prompt injection** — Malicious content from Drupal migration causes agent to take unintended actions | LLM01, Agentic-01 | 2          | 3      | **6** | AGENTS.md prohibitions; human review of all AI output; migration content sanitized before use                 | Low-Medium    |
| T2  | **Sensitive data disclosure** — Agent exposes secrets in generated code                                | LLM02             | 2          | 4      | **8** | `.env` is gitignored; secrets scanning in CI; pre-commit hooks; agent prohibited from hardcoding secrets      | Low-Medium    |
| T3  | **Supply chain compromise** — Agent installs malicious/vulnerable dependency                           | LLM03, Agentic-07 | 2          | 4      | **8** | Dependency installs require user approval; `npm audit` in CI blocks high/critical CVEs; exact version pinning | Low-Medium    |
| T4  | **Insecure code generation** — Agent produces code with vulnerabilities (XSS, injection, etc.)         | LLM05             | 3          | 3      | **9** | CODING_PRACTICES.md enforced; SAST in CI; human review of all AI code; Payload ORM prevents SQL injection     | Medium        |
| T5  | **Excessive agency** — Agent modifies CI, access controls, or infrastructure without approval          | LLM06, Agentic-06 | 2          | 4      | **8** | AGENTS.md explicit prohibited actions; all CI/infrastructure changes require user approval; branch protection | Low-Medium    |
| T6  | **Credential compromise** — Agent token or Copilot credentials are stolen                              | Agentic-02        | 1          | 4      | **4** | Short-lived GitHub tokens; org SSO enforcement; developer machine security (device encryption, MFA)           | Low           |
| T7  | **Unauthorized code execution** — Agent executes untrusted code from external source                   | Agentic-03        | 1          | 4      | **4** | Agent prohibited from executing external code; CI runs in isolated GitHub Actions runners                     | Low           |
| T8  | **Context/memory poisoning** — Agent context is manipulated via malicious content                      | Agentic-08        | 2          | 3      | **6** | Prompt injection defense documented in AGENTS.md; developer reviews agent reasoning                           | Low-Medium    |
| T9  | **Audit trail gaps** — Agent actions cannot be reconstructed from logs                                 | Agentic-02        | 2          | 2      | **4** | All commits have Co-Authored-By attribution; PR descriptions document agent work; Git history is audit trail  | Low           |
| T10 | **Human over-trust** — Developer merges AI code without adequate review                                | Agentic-05        | 3          | 3      | **9** | Branch protection requires 1+ human review; CODING_PRACTICES.md documents review obligations                  | Medium        |

### Risk Tolerance Thresholds

| Level    | Score | Action                         |
| -------- | ----- | ------------------------------ |
| Critical | 20–25 | Block deployment               |
| High     | 12–19 | Mitigate within 30 days        |
| Medium   | 6–11  | Mitigate; document if deferred |
| Low      | 1–5   | Accept with documentation      |

**Highest risks: T4 (9) and T10 (9) — both Medium.** No High or Critical risks identified for this FIPS Low public system.

---

## Section 5: Control Assessment

| Control Area                 | Status              | Notes                                                                        |
| ---------------------------- | ------------------- | ---------------------------------------------------------------------------- |
| **Agent Identity**           | [x] Implemented     | `Co-Authored-By` in commits; AGENTS.md defines identity                      |
| **Least Privilege**          | [x] Implemented     | AGENTS.md defines permitted/prohibited actions; no prod access               |
| **Human-in-the-Loop**        | [x] Implemented     | Destructive/sensitive actions require user approval per AGENTS.md            |
| **Audit Logging**            | [x] Implemented     | Git history + PR descriptions provide audit trail                            |
| **Secrets Scanning**         | [ ] Partial         | CI `npm audit` in place; pre-commit hook for secrets scan not yet configured |
| **SAST/SCA**                 | [ ] Partial         | `npm audit` in CI; full SAST (e.g., CodeQL) not yet configured               |
| **Branch Protection**        | [ ] Partial         | Must be configured in GitHub repo settings before first merge                |
| **Dependency Scanning**      | [x] Implemented     | `npm audit --audit-level=high` in CI                                         |
| **Session Management**       | [x] Implemented     | GitHub Copilot uses short-lived tokens via GitHub auth                       |
| **Incident Response**        | [ ] Not implemented | IR plan for agent scenarios not yet documented                               |
| **Data Handling**            | [x] Implemented     | AGENTS.md data handling rules; `.env` gitignored                             |
| **Configuration Management** | [x] Implemented     | AGENTS.md and CI config are version-controlled                               |

---

## Section 6: Risk Treatment Plan

### T4 — Insecure Code Generation (Risk Score: 9)

| Field                 | Value                                                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Treatment**         | Mitigate                                                                                                                                          |
| **Planned Controls**  | (1) Configure CodeQL SAST scan in CI; (2) Add OWASP Dependency Check; (3) Ensure all AI code is reviewed against CODING_PRACTICES.md before merge |
| **Responsible Party** | Alison Childs                                                                                                                                     |
| **Target Completion** | Before first production deployment                                                                                                                |
| **Verification**      | Zero high/critical findings in CodeQL reports for 30 consecutive days                                                                             |

### T10 — Human Over-Trust (Risk Score: 9)

| Field                 | Value                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Treatment**         | Mitigate                                                                                                                                                                                                   |
| **Planned Controls**  | (1) Enable GitHub branch protection on `main` — require 1 review; (2) Add PR template with AI disclosure and review checklist; (3) Reference CODING_PRACTICES.md AI code review section in CONTRIBUTING.md |
| **Responsible Party** | Alison Childs                                                                                                                                                                                              |
| **Target Completion** | Before first PR merge                                                                                                                                                                                      |
| **Verification**      | Branch protection enabled; PR template in place                                                                                                                                                            |

### Secrets Scanning Gap

| Field                 | Value                                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| **Treatment**         | Mitigate                                                                                            |
| **Planned Controls**  | Add `detect-secrets` or `gitleaks` pre-commit hook; enable GitHub secret scanning on the repository |
| **Responsible Party** | Alison Childs                                                                                       |
| **Target Completion** | Within 2 weeks of first commit                                                                      |
| **Verification**      | Pre-commit hook prevents secret commits; GitHub secret scanning enabled                             |

---

## Section 7: Acceptance and Sign-Off

Based on this assessment, the residual risk of deploying GitHub Copilot as the AI coding agent for the GSA.GOV website redesign is:

[x] **Conditionally Acceptable** — Proceed after completing:

- [ ] Enable GitHub branch protection on `main`
- [ ] Configure CodeQL SAST in CI
- [ ] Add pre-commit secrets scanning hook
- [ ] Enable GitHub secret scanning on the repository
- [ ] Confirm GitHub Copilot training data opt-out at org level
- [ ] Assign ISSO and document IR contact

| Role               | Name          | Signature | Date |
| ------------------ | ------------- | --------- | ---- |
| System Owner       | Alison Childs |           |      |
| ISSO               | TBD           |           |      |
| Approving Official | Ed Forst      |           |      |

---

_NIST AI RMF: GOVERN, MAP, MEASURE, MANAGE | NIST SP 800-53: RA-3, RA-5_
_Last Updated: 2026-06-04_
