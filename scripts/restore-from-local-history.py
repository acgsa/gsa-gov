#!/usr/bin/env python3
"""Restore src/ files from VS Code Local History newest snapshots.

Mirrors the logic used to build docs/local-history-recovery-manifest.md:
  - Walk each Local History folder, read entries.json.
  - Map `resource` (file:// URL) to a repo-relative path.
  - Keep only files under src/.
  - Pick the NEWEST snapshot per target file (max timestamp).
  - Restore (copy) that snapshot over the working tree when it DIFFERS
    or is MISSING, matching the manifest.

Approved scope: restore all 153 manifest files EXCEPT SiteHeaderSideBySide.tsx.
Nothing outside the project directory is read for writing; writes are confined
to <repo>/src. Every action is logged to stdout.
"""

import json
import filecmp
import shutil
from pathlib import Path
from typing import Dict, Optional, Tuple
from urllib.parse import unquote, urlparse

REPO = Path(__file__).resolve().parent.parent
HISTORY = Path.home() / "Library/Application Support/Code/User/History"

# Explicitly excluded per owner approval.
# NOTE: SiteHeaderSideBySide.tsx was later restored on request; no longer excluded.
# The 6 (frontend) route pages below are STALE duplicates (Jun 24–Jul 29) that
# collide with NEWER (category) versions already present; never write them.
EXCLUDE = {
    "src/app/(frontend)/1800f/page.tsx",
    "src/app/(frontend)/accountability/savings/page.tsx",
    "src/app/(frontend)/accountability/savings/layout.tsx",
    "src/app/(frontend)/real-estate/page.tsx",
    "src/app/(frontend)/real-estate/oasis/page.tsx",
    "src/app/(frontend)/real-estate/portfolio/page.tsx",
    "src/app/(frontend)/real-estate/workplace-optimization/page.tsx",
    "src/app/(frontend)/real-estate/layout.tsx",
}


def resource_to_relpath(resource):
    """file:///abs/path -> repo-relative path, or None if outside repo."""
    parsed = urlparse(resource)
    abspath = Path(unquote(parsed.path))
    try:
        rel = abspath.relative_to(REPO)
    except ValueError:
        return None
    return str(rel)


def newest_snapshots():
    """relpath -> (timestamp_ms, snapshot_file) for the newest snapshot each."""
    best = {}
    if not HISTORY.is_dir():
        raise SystemExit(f"Local History not found at {HISTORY}")
    for folder in HISTORY.iterdir():
        entries_json = folder / "entries.json"
        if not entries_json.is_file():
            continue
        try:
            data = json.loads(entries_json.read_text())
        except (json.JSONDecodeError, OSError):
            continue
        resource = data.get("resource", "")
        rel = resource_to_relpath(resource)
        if not rel or not rel.startswith("src/"):
            continue
        for entry in data.get("entries", []):
            ts = entry.get("timestamp", 0)
            snap = folder / entry.get("id", "")
            if not snap.is_file():
                continue
            cur = best.get(rel)
            if cur is None or ts > cur[0]:
                best[rel] = (ts, snap)
    return best


def main() -> None:
    snaps = newest_snapshots()
    restored, skipped_same, skipped_excluded = 0, 0, 0
    log = []
    for rel, (ts, snap) in sorted(snaps.items()):
        if rel in EXCLUDE:
            skipped_excluded += 1
            log.append(f"EXCLUDED  {rel}")
            continue
        target = REPO / rel
        if target.exists() and filecmp.cmp(snap, target, shallow=False):
            skipped_same += 1
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        status = "MISSING" if not target.exists() else "DIFF"
        shutil.copyfile(snap, target)
        restored += 1
        log.append(f"RESTORED  [{status:7}] {rel}")

    print("\n".join(log))
    print("\n--- SUMMARY ---")
    print(f"Restored:          {restored}")
    print(f"Skipped (same):    {skipped_same}")
    print(f"Skipped (excluded):{skipped_excluded}")


if __name__ == "__main__":
    main()
