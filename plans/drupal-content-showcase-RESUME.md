# RESUME — Drupal Content Showcase (session handoff)

**Paused:** 2026-09-03
**Branch:** `recover/local-history-2026-08-19`
**Plan of record:** [`plans/drupal-content-showcase-plan.md`](plans/drupal-content-showcase-plan.md)
**Status:** data pipeline complete and green; **zero UI built yet**

---

## 1. Start-of-session checklist (do these first, in order)

1. `./scripts/ensure-contract.sh` — must exit 0. Non-zero = **STOP**, per [`AGENTS.md`](AGENTS.md).
2. `npx jest scripts/migration-sample src/lib/migration` — expect **111 passed, 4 suites**. This is the known-good baseline.
3. Read §2 below before touching anything, then pick up at §5 (next task).

---

## 2. The one hard constraint

These are **read-only**. The PR diff must show zero changed lines in:

- `src/components/layout/**` (masthead, `MainNav`, `TopbarMegaMenu`, `MobileMenu`, `LiveTicker`, `SiteFooter`, `StickyChrome`)
- `src/app/(frontend)/**`, `src/app/(category)/**`, `src/app/(preview)/**`, `src/app/(search)/**`
- every **pre-existing** file in `src/templates/**` and `src/components/modules/**`

All new UI lands under `src/app/(migration)/`. New templates are added _alongside_ existing ones, never edited in place. The isolation contract is documented in the docblock of [`src/app/(migration)/layout.tsx`](<src/app/(migration)/layout.tsx:14>) — keep it accurate.

The single intentional exception, already made: [`scripts/content-audit/fetchPage.ts`](scripts/content-audit/fetchPage.ts:93) gained an additive, default-off `FetchAndExtractOptions { refetchErrors?: boolean }` (+18/-1). It is a build-time script, not prototype UI.

---

## 3. What already exists and works

### The generator (`scripts/migration-sample/`)

| File                                                                       | Role                                                                                                                                  |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [`types.ts`](scripts/migration-sample/types.ts:32)                         | `LegacyRecord` — one normalized Drupal export row                                                                                     |
| [`parseDrupalExport.ts`](scripts/migration-sample/parseDrupalExport.ts:74) | reads the 11 CSVs in `data/drupalexport/`, de-dups by `${contentType}:${nodeId}`, per-type files beat the master `searchExport-*.csv` |
| [`resolveUrl.ts`](scripts/migration-sample/resolveUrl.ts:77)               | `isNodeAlias`, `resolveCandidateUrls`, `isSoft404`, `absolutizeDownloadUrl`                                                           |
| [`selectSample.ts`](scripts/migration-sample/selectSample.ts:125)          | published-only + recency + org round-robin, `SAMPLE_QUOTAS`, `OVERSAMPLE_FACTOR = 6`                                                  |
| [`sanitize.ts`](scripts/migration-sample/sanitize.ts:81)                   | `toRoleContact`, `orgLabel`, `scrubContactInfo`, `containsContactInfo`                                                                |
| [`normalizeText.ts`](scripts/migration-sample/normalizeText.ts:1)          | `decodeHtmlEntities`, `repairParagraphBreaks`, `normalizeBodyText`                                                                    |
| [`toSample.ts`](scripts/migration-sample/toSample.ts:300)                  | `LegacyRecord` + fetched body → `MigrationSample`; returns `{ok:false, reason}` on reject                                             |
| [`run.ts`](scripts/migration-sample/run.ts:135)                            | orchestrator; fills each quota, writes `samples.generated.ts`                                                                         |
| [`run.sh`](scripts/migration-sample/run.sh:23)                             | **the only correct way to invoke it** — see §4                                                                                        |

### The fixture (`src/lib/migration/`)

- [`types.ts`](src/lib/migration/types.ts:87) — `MigrationSample`, `MigrationSection`, `MigrationProvenance`, `MigrationTypeMeta`, `ShowcaseTemplate`, `CONTENT_TYPE_LABELS`
- `samples.generated.ts` — **generated, do not hand-edit.** 21 samples, ~104 KB
- `samples.test.ts` — fixture-integrity tests (PII, shape, text quality)

Current fixture contents (21 samples, all 8 quotas filled):

| `contentType`        | n   | `template`      |
| -------------------- | --- | --------------- |
| `news_product`       | 4   | `DetailPage`    |
| `blog_article`       | 3   | `DetailPage`    |
| `cmp_page`           | 4   | `TopicPage`     |
| `event`              | 3   | `EventPage`     |
| `directive`          | 2   | `DirectivePage` |
| `gsa_forms_library`  | 2   | `FormPage`      |
| `photo_album`        | 2   | `GalleryPage`   |
| `technical_document` | 1   | `InfoPage`      |

`DetailPage` accounts for 7 (news + blog). Note the fixture already carries the `template` field, so the route can dispatch on it directly.

### Test baseline: 111 tests, 4 suites, all green

- `scripts/migration-sample/sanitize.test.ts` (28)
- `scripts/migration-sample/normalizeText.test.ts` (18)
- `scripts/migration-sample/resolveUrl.test.ts` (28)
- `src/lib/migration/samples.test.ts` (37)

---

## 4. Hard-won gotchas — read before regenerating or debugging

**Regenerate only via the wrapper:**

```bash
./scripts/migration-sample/run.sh
```

1. **Never `npx tsx scripts/migration-sample/run.ts` directly.** Node ignores the macOS keychain, so `fetch()` on gsa.gov dies with `unable to get local issuer certificate`; the fetcher collapses that into `fetchStatus: "error"` and it _looks like every page 404'd_. `run.sh` builds an invocation-scoped `NODE_EXTRA_CA_CERTS` bundle (~305 certs) from the system keychain. Mirrors `agentic-coding-playbook/scripts/ci-local.sh`. **Never set `NODE_TLS_REJECT_UNAUTHORIZED=0`.**
2. **The cache is warm.** Reruns hit `scripts/content-audit/.cache/page/` and make no network calls. Expected output ends with 21 samples and all 8 quotas filled.
3. **The export has no body HTML.** All 11 CSVs are metadata-only; body copy must be fetched from the live public URL. This is the reason the whole fetch layer exists.
4. **`directives.csv` and `reusable text blocks.csv` URLs are untrustworthy.** 1347/1377 directive rows and 948/948 text-block rows carry only a bare `https://gsa.gov/node/<id>` alias. Hence `DISTRUST_EXPORT_URL = new Set(["directive"])` and title-slug candidate resolution in `resolveUrl.ts`. `text_block` is deliberately excluded from `SAMPLE_QUOTAS` — there is no canonical public URL to fetch.
5. **Readability dissolves block boundaries.** `article.textContent` returns one blob (`"...facilities work.For decades,"`), which once collapsed an 890-word article into a single paragraph. `normalizeText.ts` repairs it. Its abbreviation cases are the important tests — over-eager splitting shatters sentences mid-clause.
6. **Do not print full sample bodies in diagnostics.** A probe that echoed an 890-word article verbatim triggered an API error. Truncate body-content output.
7. **Scratch probes live in `scripts/migration-sample/.probe/`** (`q.ts`, `r.ts`, `s.ts`). These are **not gitignored yet** and must not be committed — either add an ignore rule or delete them before staging.
8. **VS Code shows phantom TS errors** (`Cannot find name 'describe'`, ~30–50 of them) in new test files. `npx tsc --noEmit` exits 0. It is a stale language server; restart it rather than "fixing" the code.

---

## 5. Real defects the tests caught (do not regress these)

Each of these was a genuine bug found by writing a test, not a test-authoring artifact. They are the reason §6's first task is worth finishing.

1. **PII leak via regex `lastIndex`.** `EMAIL_RE` was declared `/g` and reused with `.test()`. `.test()` advances `lastIndex`, so the _second_ call returned false, fell through to the `looksLikeOffice` branch, and **returned the cell verbatim including the email**. Fixed by splitting into non-global detection patterns plus `_G` replace-only copies, with a docblock saying _"Do not merge these back into single constants."_ Defense-in-depth guard added: `if (containsContactInfo(value)) return undefined;`
2. **Phone false positives.** The all-optional-separator pattern matched `...Guide-update%2020260819.docx` as a phone number. `PHONE_RE` now requires a separator. 10/10 real phone shapes still match; 3 false positives (URL-encoded filename, bare digit run, solicitation number) fixed.
3. **Relative download hrefs.** `fetchPage.ts` scrapes `a[href]` raw, so downloads came out as `/directives/files/?file=...`. `absolutizeDownloadUrl()` resolves against the page's own `finalUrl` (not a fixed origin, so subdomain attachments stay put), drops `#`-fragments and non-http(s) schemes.
4. **Collapsed article body** — see §4.5.
5. **`&nbsp;` leaking into `dek`** and an over-greedy `authority` regex that captured one metadata label as another's value.

Also settled by decision, not code: a `dek` of `""` is **correct** for metadata-only types (forms/directives). Promoting `"Form Number: GSA1655 Revision Date: 08/2026"` to a lede was rejected as fabrication. `samples.test.ts` therefore asserts "every sample has _something renderable_ (prose OR a document)" and only requires a `dek` on prose samples.

---

## 6. NEXT TASK — pick up exactly here

**Finish todo #9: unit tests for the CSV parser and the sampler.** The PII/contact stripper half of #9 is already done (`sanitize.test.ts`, 28 tests). Two modules remain untested. Both were being read for exactly this purpose when the session paused.

### 6a. `scripts/migration-sample/parseDrupalExport.test.ts` (new)

Test with inline CSV strings — do **not** read `data/drupalexport/`, it is gitignored and CI will not have it.

- `toIsoDate` (exported): `"8/19/2026"` → `"2026-08-19"`; rejects `"13/01/2026"` (month > 12), `"1/32/2026"` (day > 31), `"2026-08-19"` (wrong format), `""`, `undefined`.
- `parseExportCsv`:
  - header lookup is case/whitespace-insensitive — `"Content-Type"`, `"content type"`, `" Node ID "` all resolve
  - counts a row into `skipped` when it lacks any of title / public URL / content-type / node ID (the master export has bare `https://gsa.gov/node/` rows)
  - counts a row into `skipped` when `normalizeUrl` rejects the URL
  - drops an unknown content type via `asContentType` (not in `KNOWN_TYPES`)
  - stamps `sourceFile` on every record
  - honors alternate headers: `"media id"` for `nodeId`, `"point of contact"` for `poc`
- `loadExport`: needs a temp directory (`fs.mkdtemp`). Assert the sort puts per-type files before `searchExport*` so **the per-type row wins de-dup** (write the same `nodeId` into both with different titles, assert the per-type title survives), and that the key is `${contentType}:${nodeId}` so the same node ID under two types yields two records.

### 6b. `scripts/migration-sample/selectSample.test.ts` (new)

Build `LegacyRecord` literals with a small helper. `isPublished` and `byRecency` are module-private — exercise them through `candidatesForType`.

- published filter: `status: "Offline"` excluded; `"Online"` included; **absent `status` included** (absence means "not stated", not "excluded")
- recency: newest `lastModified` first; records with no date sort last; ties break on `title.localeCompare`
- `spreadByOrg`: consecutive picks come from different orgs; each org bucket stays in recency order internally; buckets are visited in order of their newest item; `organization` is keyed case-insensitively (`"fas"` and `"FAS"` are one bucket); missing org lands in `UNSPECIFIED`
- `candidatesForType`: filters to the requested type only; caps at `quota * OVERSAMPLE_FACTOR`
- `selectCandidates`: returns a key for every entry in the quota map, even when the record set yields zero candidates for that type

### 6c. Then close out todo #9 / #10

`npx jest scripts/migration-sample src/lib/migration` — the new suites should push the count well past 111 with nothing failing. Todo #10 (fixture-integrity PII assertion) is in fact already satisfied by the `"generated fixtures: PII"` block in `samples.test.ts`; mark it complete once verified rather than duplicating it.

---

## 7. After that: the UI, in dependency order

Nothing below exists yet. `src/app/(migration)/` currently contains **only** `layout.tsx`.

### Phase A — index + reuse-only templates (fastest proof of value)

1. **`/migration` index** — `src/app/(migration)/migration/page.tsx`. Group `MIGRATION_SAMPLES` by `contentType` using `CONTENT_TYPE_LABELS`; each row shows legacy title, `provenance.nodeId`, `provenance.sourceUrl`, the `template` field, and a link to the rendered page. This is the artifact that gets walked through in review (plan §8).
2. **`DetailPage` route** (7 samples: news + blog). Reuse [`DetailPage`](src/templates/DetailPage.tsx:51) as-is. Follow the existing prop-mapping pattern in [`src/app/(frontend)/news/[slug]/page.tsx`](<src/app/(frontend)/news/[slug]/page.tsx:32>) — it already maps `article.sections` → `DetailPageSection[]`.
3. **`TopicPage` route** (4 `cmp_page` samples) and **`InfoPage` route** (1 `technical_document`). Reuse as-is.

### Phase B — new templates (one commit each, alongside the old)

Each goes in `src/templates/` as a **new file**. New modules go in `src/components/modules/`.

4. `EventPage` + `EventDetailsCard` — 3 samples
5. `DirectivePage` + `DownloadPanel` — 2 samples. `DownloadPanel` consumes `sample.downloads` (already absolutized).
6. `FormPage` — reuses `DownloadPanel`; 2 samples; renders `meta.formNumber` / `meta.revisionDate` / `meta.formStatus`
7. `GalleryPage` — wraps existing [`ArticleGallery`](src/components/ui/ArticleGallery.tsx:1); 2 samples
8. `DocumentMeta` module — for the `technical_document` `InfoPage`
9. `LegacyBreadcrumbTrail` module — driven by `meta.breadcrumbUrl`
10. `ReusableTextBlock` module — demonstrated with a section lifted from a real fetched `cmp_page`; there is deliberately no `text_block` fixture (§4.4)
11. **Directives + forms index pages** via existing [`DataPage`](src/templates/DataPage.tsx:26)

**Styling budget (plan §7):** new modules inherit the existing token vocabulary only — `bg-usds-steel-50/100/200`, `text-usds-steel-600/900`, `bg-gsa-navy`, `focus-visible:ring-gsa-blue`, `font-garamond` display type, the `text-[12px] font-semibold tracking-[0.14em] uppercase` eyebrow, `max-w-[600px]` article measure, `max-w-7xl` page measure. **No new color or type primitive without an entry in [`src/lib/tokens/colors.ts`](src/lib/tokens/colors.ts:1).**

**Images:** the export carries no media. Pair each page with an existing asset from `src/assets/images/**` (`1800F/`, `NEWS/`, `REAL ESTATE/`, `TECH/`, `LEADERSHIP/`).

### Phase C — CMS parity and gates

12. A Payload block for **every** new template/module, following [`ImagePanelBlock`](src/blocks/ImagePanelBlock.ts:16), registered in [`Pages`](src/collections/Pages.ts:57). This is the "offered in a CMS for editorial staff" half of the original request — not optional.
13. `generateStaticParams` on every new dynamic route, then `npm run build:static`.
14. `npm run check` (lint → typecheck → test) must pass.
15. Confirm the isolation contract holds:
    ```bash
    git diff --stat -- src/components/layout src/app/\(frontend\) src/app/\(category\) src/app/\(preview\) src/app/\(search\)
    ```
    Expect empty output. Also confirm `src/templates/` shows only _added_ files.

---

## 8. Approval gates (per `AGENTS.md`) — ask before doing

- installing/upgrading any npm dependency
- any network request (the granted scope is **`www.gsa.gov` via the existing fetcher only**)
- deleting files (including the `.probe/` scratch dir)
- committing or pushing
- editing `.github/workflows/`, `manifest.yml`, `docker-compose.yml`, `.cfignore`
- Payload migrations

**ADR trigger:** new Payload _collections_ for the legacy types (`Directives`, `Forms`, `Events`) change the CMS content model and require an ADR in `docs/decisions/` (MADR + NIST control mappings) **first**. Blocks alone do not. Do blocks now; collections only after an ADR — that is todo #25.

---

## 9. Uncommitted working tree at pause time

```
 M scripts/content-audit/fetchPage.ts        # additive refetchErrors option
?? plans/drupal-content-showcase-plan.md
?? plans/drupal-content-showcase-RESUME.md   # this file
?? scripts/migration-sample/                 # incl. .probe/ — DO NOT COMMIT .probe
?? src/app/(migration)/
?? src/lib/migration/
?? docs/local-history-recovery-manifest.md   # unrelated recovery work
?? docs/recovery-quarantine/                 # unrelated recovery work
?? scripts/restore-from-local-history.py     # unrelated recovery work
```

Nothing is committed. The last three entries belong to a separate local-history recovery effort and are **not** part of this task — do not fold them into a migration-showcase commit.
