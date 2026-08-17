/**
 * Tiny file-backed JSON cache for the audit pipeline.
 * Keys are hashed to safe filenames. Public data only (ADR-006) — but we still
 * never write secrets here.
 */
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export class JsonCache {
  constructor(private readonly dir: string) {}

  private keyPath(namespace: string, key: string): string {
    const hash = createHash("sha256").update(key).digest("hex").slice(0, 32);
    return path.join(this.dir, namespace, `${hash}.json`);
  }

  async get<T>(namespace: string, key: string): Promise<T | undefined> {
    try {
      const raw = await fs.readFile(this.keyPath(namespace, key), "utf8");
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  }

  async set<T>(namespace: string, key: string, value: T): Promise<void> {
    const p = this.keyPath(namespace, key);
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, JSON.stringify(value), "utf8");
  }
}

/** Simple sleep helper for polite rate limiting. */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
