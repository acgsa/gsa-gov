#!/usr/bin/env node
/**
 * build-static.mjs — produce a static export (`out/`) for the cloud.gov
 * internal preview WITHOUT altering the core dynamic app.
 *
 * Why this script exists
 * ----------------------
 * `output: 'export'` (set in next.config.ts when STATIC_EXPORT=true) is
 * fundamentally incompatible with Next.js API route handlers. The project's
 * only API route, `src/app/api/weather/route.ts`, declares
 * `export const dynamic = "force-dynamic"`, which makes `next build` fail hard
 * under static export:
 *
 *   Error: export const dynamic = "force-dynamic" on page "/api/weather"
 *   cannot be used with "output: export".
 *
 * Rather than mutate that route (which the running app depends on), this
 * script temporarily relocates `src/app/api` out of the App Router tree for
 * the duration of the static build, then restores it unconditionally — even
 * if the build fails. The weather widget in SiteHeader.tsx already degrades
 * gracefully (its client fetch is wrapped in .catch()), so the static preview
 * simply shows no live temperature, which is acceptable for internal review.
 *
 * The core app is untouched after this script runs: `git status` shows no
 * changes, because the relocation is fully reversed in a finally block.
 */

import { existsSync, renameSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const projectRoot = process.cwd();
const apiDir = join(projectRoot, "src", "app", "api");
const apiStash = join(projectRoot, "src", "app", "__api.static-stash");

let stashed = false;

function stashApi() {
  if (existsSync(apiDir)) {
    if (existsSync(apiStash)) {
      throw new Error(
        `Stash target already exists: ${apiStash}. A previous build may have been interrupted. Manually restore it to src/app/api before retrying.`,
      );
    }
    renameSync(apiDir, apiStash);
    stashed = true;
    console.log("[build-static] Relocated src/app/api out of the export tree.");
  }
}

function restoreApi() {
  if (stashed && existsSync(apiStash)) {
    renameSync(apiStash, apiDir);
    stashed = false;
    console.log("[build-static] Restored src/app/api.");
  }
}

// Ensure restoration even on Ctrl-C / SIGTERM.
process.on("SIGINT", () => {
  restoreApi();
  process.exit(130);
});
process.on("SIGTERM", () => {
  restoreApi();
  process.exit(143);
});

try {
  stashApi();

  const result = spawnSync("next", ["build"], {
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "true" },
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
  }
} catch (err) {
  console.error(
    "[build-static] Build failed:",
    err instanceof Error ? err.message : err,
  );
  process.exitCode = 1;
} finally {
  restoreApi();
}
