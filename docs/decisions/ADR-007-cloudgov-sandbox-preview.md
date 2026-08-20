# ADR-007: cloud.gov Sandbox Preview — Static Export via Isolated Build Config

- **Status:** Proposed (supersedes the accepted on-platform-buildpack decision below — preview only, not an ATO'd environment)
- **Date:** 2026-08-19 (original) · 2026-08-20 (revised)
- **Deciders:** Alison Childs (Project Owner), Ed Forst (Approving Official)
- **Related:** ADR-001 (initial architecture), [`AGENTS.md`](../../AGENTS.md:1), [`manifest.yml`](../../manifest.yml:1)

---

## Context

The team needs a **shareable, hosted preview** of the redesigned GSA.GOV site
for **internal stakeholder review**. The preview must live inside the cloud.gov
FedRAMP boundary and serve **public content only** (no PII/CUI/PHI).

### What we tried first (and why it failed)

The original decision (below, now superseded) was to deploy the full dynamic
Next.js app via the **cloud.gov Node.js buildpack**, building on-platform with
`command: npm run build && npm run start`. The `cf push` **failed** for two
compounding reasons:

1. **Space memory quota is 1G total** (`sandbox_quota`: `total memory 1G`).
   Staging an app that requests 1G leaves **zero headroom**, so CF reported
   `space's memory limit exceeded: staging requires 1024M memory`.
2. **On-platform `next build` OOMs inside 1G at runtime.** The app entered a
   **39-crash loop**: `next start` ran before `.next` existed
   (`Error: Could not find a production build in the '.next' directory`),
   because the build step could not complete under the memory cap.

Raising the sandbox quota is not within the team's control (it's a platform
default), and even at 2G an on-platform Next.js build is fragile and slow.

### What the preview actually needs

This is an **internal share of existing content**, not a production system.
A **static export** built locally and served by a lightweight static file
server on cloud.gov meets the need with a tiny memory footprint (128M),
removes the build-at-boot fragility, and keeps everything inside the FedRAMP
boundary.

Per `AGENTS.md`, this work triggers governance gates:

- **Modifying infrastructure or deployment configurations** → explicit approval.
- **>3 files changed** → requires an approved plan.
- **Deployment config change** → requires this ADR.

---

## Codebase compatibility analysis (static export)

`output: 'export'` is a **global** Next.js switch. An audit of the app surface
found the following interactions:

| Area                                                               | Status under static export                                                               | Handling                                                                                                                                                                                                          |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/api/weather/route.ts` (`dynamic = "force-dynamic"`)       | **Incompatible** — API routes cannot be statically exported                              | Excluded from the static build; the weather ticker in [`SiteHeader.tsx`](../../src/components/layout/SiteHeader.tsx:55) already **falls back to Washington, DC** when the fetch fails, so it degrades gracefully. |
| `src/app/(search)/search/page.tsx` (server `searchParams`)         | **Incompatible** — dynamic server params aren't available in a static build              | Parse the query **client-side** (read `window.location.search` in the existing `SearchResults` client component).                                                                                                 |
| `src/app/(frontend)/news/[slug]/page.tsx` (`generateStaticParams`) | **Compatible** — already pre-renders every known article                                 | No change.                                                                                                                                                                                                        |
| `src/app/(payload)/admin/`                                         | **Not live** — currently only a `.gitkeep`; no DB is bound                               | No route to export; excluded.                                                                                                                                                                                     |
| `next.config.ts` security headers (`async headers()`)              | **No-op under static hosting** — headers are applied by the server, not baked into files | Documented as a preview limitation; the static buildpack / edge would need to re-add them for production.                                                                                                         |
| Remote image optimization                                          | Requires the Next image server                                                           | Set `images.unoptimized: true` so `<Image>` emits plain `<img>` tags.                                                                                                                                             |

**Conclusion:** the app is _mostly_ export-safe. Only the weather API and the
search page need accommodation, and both have low-risk mitigations.

---

## Decision

Deploy the preview as a **statically exported site**, built **locally** and
served on cloud.gov by a **static file buildpack**, using an **isolated build
configuration** so the core dynamic app (dev, future production, Payload CMS)
is **left untouched**.

### Isolation strategy (why this keeps the core app intact)

Static export conflicts with the dynamic Payload-CMS-backed production target.
To avoid degrading the primary app, the static switch is **opt-in and separate**:

- The static-only settings (`output: 'export'`, `images.unoptimized`,
  `trailingSlash`) are applied **only** when an env flag (e.g.
  `STATIC_EXPORT=true`) is set, read inside [`next.config.ts`](../../next.config.ts:4).
  The default config path — used by `next dev`, `npm run build`, tests, and any
  future dynamic deploy — is **unchanged**.
- A dedicated `build:static` script (`STATIC_EXPORT=true next build`) produces
  `out/`. Normal `npm run build` continues to produce a standard `.next`.
- Search page change is **behavior-preserving**: reading the query from
  `window.location.search` client-side works identically in dev and in the
  static build; no server contract is broken.

This means **no core-app regression**: the dynamic app, dev workflow, and the
production path all keep working exactly as before. The static export is a
parallel, throwaway artifact for the internal preview only.

### Configuration

- [`next.config.ts`](../../next.config.ts:4) — gate `output`, `images.unoptimized`,
  and `trailingSlash` behind `process.env.STATIC_EXPORT === "true"`.
- [`package.json`](../../package.json:6) — add `"build:static": "STATIC_EXPORT=true next build"`.
- [`src/app/(search)/search/page.tsx`](<../../src/app/(search)/search/page.tsx:17>) —
  render the client `SearchResults` with an empty initial query; parse `?q=`
  client-side.
- [`manifest.yml`](../../manifest.yml:1) — switch to the **staticfile buildpack**
  serving `out/`, `memory: 128M`, no build command (artifact is prebuilt).
- [`.cfignore`](../../.cfignore:1) — un-ignore `out/`; keep ignoring `.next` and
  `node_modules`.

### Constraints (fail-closed)

- **Public data only.** No PII/CUI/PHI.
- **No secrets in git or the manifest.** No DB/S3 is bound; no `PAYLOAD_SECRET`.
- **Not ATO'd.** Pre-ATO; MUST NOT be used for production traffic or announced
  as an official GSA.GOV endpoint.
- **Static limitation noted:** security headers from `next.config.ts` do **not**
  apply to static-file responses; acceptable for an internal preview, **not**
  for production.
- **Sandbox is ephemeral** (wiped ~90 days); re-run the build + `cf push`.

---

## Alternatives Considered

- **On-platform Node.js buildpack build** (original decision) — **rejected**:
  fails under the 1G sandbox quota (staging + build-at-boot OOM crash loop).
- **Raise sandbox quota to 2G + prebuilt `.next` + `next start`** — keeps the
  live weather API but still runs a Node server (heavier, ~512M), depends on a
  quota change outside team control, and adds boot fragility. Deferred; revisit
  for a dynamic production ADR.
- **Flip `output: 'export'` globally (no isolation)** — **rejected**: would
  break the dynamic Payload-CMS production target and the `/api/weather` route
  for everyone, not just the preview.
- **GitHub Pages** — **rejected**: outside the cloud.gov FedRAMP boundary.
- **Full Docker + Postgres + S3** — **rejected** for a preview; revisit for
  production.

---

## Consequences

### Positive

- Fits well within the 1G sandbox quota (128M static server); **no build-at-boot
  fragility**, fast and deterministic.
- Shareable URL (`https://<app>.app.cloud.gov/`) inside the FedRAMP boundary.
- **Core dynamic app is untouched** — dev, tests, and the production path keep
  working; static behavior is opt-in via `STATIC_EXPORT`.

### Negative / Risks

- **No live weather** in the preview (ticker shows the DC fallback) — acceptable.
- **Security headers not applied** to static responses — acceptable for an
  internal preview only.
- Preview is a **point-in-time snapshot**; content updates require a rebuild
  and re-`cf push`.
- Sandbox wipe (~90 days) requires re-deploy.

### Rollback / Teardown

- Remove the preview at any time with `cf delete <app> -r`.
- Reverting the file changes returns the repo to its prior state; because the
  static settings are env-gated, **removing `STATIC_EXPORT`** alone reverts to
  the standard dynamic build. No runtime state is lost (no data store).

---

## Superseded Decision (2026-08-19) — retained for history

> Deploy the site as a **preview** via the **cloud.gov Cloud Foundry Node.js
> buildpack** with `command: npm run build && npm run start`, single instance,
> 1G memory, HTTP health check, no DB/S3. **Superseded** because the on-platform
> build exceeds the 1G sandbox memory quota (staging failure) and OOMs at boot
> (39-crash loop, `.next` never produced).
