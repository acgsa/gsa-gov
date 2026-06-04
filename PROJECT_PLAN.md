---
title: "Project Plan"
description: "Starting point for a new federal coding project — fill this out and let the AI agent set up everything else"
status: canonical
tier: 3
load_priority: reference-only
audience: ["developers", "tech-leads", "managers"]
---

# Project Plan

> **Instructions:** Fill out each section below. Your AI coding agent will use this to automatically set up the repository, generate compliance documentation, and create the initial project structure. Be specific — the more detail you provide, the better the agent can help.

## Project Identity

| Field                   | Value                                  |
| ----------------------- | -------------------------------------- |
| **Project Name**        | <!-- GSA.GOV Website -->               |
| **Repository Name**     | <!-- gsa-gov -->                       |
| **Organization/Agency** | <!-- GSA -->                           |
| **Project Owner**       | <!-- Alison Childs, Senior Advisor --> |
| **Start Date**          | <!-- June 4, 2026 -->                  |
| **Target Completion**   | <!-- Ongoing -->                       |

## Business Objective

<!-- 2-3 sentences describing what this project does and why it matters. This becomes the README description and feeds into risk documentation. -->

## Tech Stack

| Component              | Choice                                        | Rationale                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Language**           | <!-- TypeScript 5.x -->                       | <!-- Primary language for frontend and CMS configuration. -->                                                                                                                                                                                                                                                                              |
| **Frontend Framework** | <!-- Next.js 15 (App Router) -->              | <!-- Preferred modern React framework. Excellent support for consuming headless CMS data and building modular page layouts. -->                                                                                                                                                                                                            |
| **Headless CMS**       | <!-- Payload CMS, or Wagtail if preferred --> | <!-- Payload CMS is preferred because it offers excellent support for modular block-based content, granular access control, and TypeScript-native development. It allows super admins to manage modules while restricting editors to approved page templates. Wagtail is a strong alternative if a Python/Django backend is preferred. --> |
| **Database**           | <!-- PostgreSQL 16 -->                        | <!-- Required by chosen CMS. Easy to provision via cloud.gov marketplace. -->                                                                                                                                                                                                                                                              |
| **Cloud/Hosting**      | <!-- cloud.gov -->                            | <!-- Deployment target -->                                                                                                                                                                                                                                                                                                                 |
| **CI/CD**              | <!-- e.g., GitHub Actions -->                 | <!-- Build pipeline -->                                                                                                                                                                                                                                                                                                                    |
| **Container Runtime**  | <!-- Docker -->                               | <!-- Supports consistent local development and running AI agents safely in sandboxes. -->                                                                                                                                                                                                                                                  |

## Compliance Level

<!-- Check ONE: -->

- [x] **FIPS Low** — Public-facing informational content, no PII, no CUI
- [ ] **FIPS Moderate** — Most federal systems: PII, financial data, internal tools
- [ ] **FIPS High** — National security systems, critical infrastructure

## Data Classification

<!-- Check all that apply: -->

- [x] Public data only
- [ ] PII (Personally Identifiable Information)
- [ ] CUI (Controlled Unclassified Information)
- [ ] PHI (Protected Health Information)
- [ ] Financial data (FTI, payment info)
- [ ] Authentication credentials/secrets

## Key Requirements

<!-- List the 3-5 most important functional requirements. These help the agent understand what to build. -->

1. **Modular Page Architecture**  
   The website must be built using a modular system where pages are composed of reusable **modules** (content blocks/components). Editors should assemble pages from these modules rather than building pages from scratch.

2. **Super Admin Module Control**  
   Only super admins (initially just the designer/developer) can create, edit, and manage the library of available modules. Regular editorial and content staff should **not** have access to create or modify modules directly.

3. **Page Templates for Editorial Staff**  
   Pre-defined **page templates** (composed of approved modules) must be available so that editorial and content design staff can quickly create new pages by selecting and configuring from existing templates, without needing to build module structures themselves.

4. **Content Migration from Existing Drupal Site**  
   Existing content from the current Drupal website must be migrated into the new headless CMS. This includes pages, structured content, media, and metadata, while preserving as much structure and relationships as possible.

5. **Role-Based Access Control**  
   The system must enforce clear separation of responsibilities:
   - Super admins: Full control over modules and templates
   - Editorial staff: Ability to create pages from approved templates, edit content, and publish

## Constraints

<!-- List any hard constraints the project must work within. -->

- [ ] Must use FedRAMP-authorized services only
- [x] Must support Section 508 accessibility
- [ ] Must integrate with existing system: <!-- name -->
- [ ] Must support offline/air-gapped operation
- [ ] Other: <!-- describe -->

## Team

| Role               | Person                 | Access Level  |
| ------------------ | ---------------------- | ------------- |
| Project Owner      | <!-- Alison Childs --> | Admin         |
| Lead Developer     | <!-- Alison Childs --> | Write         |
| Security/ISSO      | <!-- name -->          | Read + Review |
| Approving Official | <!-- Ed Forst -->      | Read          |

## Agent Environment

<!-- Where will the AI coding agent run? Check all that apply: -->

- [x] **Local machine** — developer's workstation with CLI access
- [x] **GitHub Codespace** — cloud-hosted dev environment
- [ ] **Sandboxed container** — isolated Docker/Podman environment
- [ ] **CI/CD only** — agent runs in GitHub Actions, no local access

<!-- What services does the agent need access to? Check all that apply: -->

- [x] **GitHub** — push code, create PRs, manage issues
- [x] **cloud.gov** — deploy applications
- [ ] **workshop.cloud.gov (GitLab)** — alternative code hosting
- [ ] **npm/PyPI** — publish packages
- [ ] **Container registry** — push images

<!-- The `agent-permissions` skill will configure minimal-scope credentials for each checked service. -->

## Implementation Approach

<!-- Describe at a high level how you plan to build this. 3-5 sentences. The AI agent will use this to generate ADR-001 (Initial Architecture Decision). -->

## What Happens Next

After you fill out this template and place it in your repository:

1. **The AI agent reads this file** and understands your project
2. **It runs the project-bootstrap skill** which:
   - Creates the directory structure appropriate for your stack
   - Generates AGENTS.md (behavioral contract for AI agents)
   - Copies CODING_PRACTICES.md (secure coding standards)
   - Creates ADR-001 from your implementation approach
   - Generates a risk assessment from your compliance level + data classification
   - Sets up CI/CD workflows for your stack
   - Creates SECURITY.md, CONTRIBUTING.md, LICENSE
3. **You review the generated files** and adjust as needed
4. **Start building** — the agent follows the standards automatically

The entire setup takes about 5 minutes of human input and 2 minutes of agent work.
