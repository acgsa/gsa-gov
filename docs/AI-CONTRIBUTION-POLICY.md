# AI-Assisted Contribution Policy — GSA.GOV Website

> This project follows the **canonical AI-Assisted Contribution Policy** from the
> pinned [`agentic-coding-playbook`](../agentic-coding-playbook/docs/AI-CONTRIBUTION-POLICY.md)
> submodule (v0.14.1). To avoid drift, the full policy is **not** duplicated here —
> the submodule copy is the single source of truth.

## Canonical source

- **Full policy:** [`agentic-coding-playbook/docs/AI-CONTRIBUTION-POLICY.md`](../agentic-coding-playbook/docs/AI-CONTRIBUTION-POLICY.md)
- **Upstream:** <https://github.com/GSA-TTS/agentic-coding-playbook/blob/v0.14.1/docs/AI-CONTRIBUTION-POLICY.md>

## Project-specific notes

- **Commit attribution:** AI-assisted commits MUST include the canonical trailer
  `Co-authored-by: GitHub Copilot <copilot@github.com>` (or the approved agent's
  address). See [`AGENTS.md`](../AGENTS.md) → *Project-Specific Identity*.
- **Contract prerequisite:** the universal behavioral contract must be present
  before any agent work — enforced by `scripts/ensure-contract.sh` at session
  start, and by the `Contract Prerequisite` CI workflow
  (`.github/workflows/contract-check.yml`). See [`AGENTS.md`](../AGENTS.md) →
  *Prerequisite: Universal Behavioral Contract*.
- **Data classification:** this repository is **public** — no PII/CUI may be
  introduced by AI or human contributors.
