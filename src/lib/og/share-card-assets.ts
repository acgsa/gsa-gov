import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Asset loading for Satori-rendered share cards (`ImageResponse`).
 *
 * Satori has no bundler and no network fetch during static generation, so an
 * `<img src="/_next/static/...">` or a webpack `StaticImageData.src` is not
 * resolvable inside a share card. Every asset must arrive as raw bytes, which
 * means reading it off disk and inlining it as a data URI.
 */

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

/**
 * Read a repo-relative image and return it as a data URI.
 *
 * @param relativePath Path from the repository root, e.g.
 *   `src/assets/images/1800F/1800FHistoric1.jpg`.
 * @throws if the extension is not a raster format Satori can decode. AVIF and
 *   SVG are deliberately excluded — Satori decodes neither as a bitmap, and a
 *   silent blank panel is worse than a build-time failure.
 */
export async function readImageDataUri(relativePath: string): Promise<string> {
  const ext = path.extname(relativePath).toLowerCase();
  // eslint-disable-next-line security/detect-object-injection -- read-only lookup in a module-local literal; a miss throws below
  const mime = MIME_BY_EXT[ext];
  if (!mime) {
    throw new Error(
      `readImageDataUri: unsupported extension "${ext}" for ${relativePath}. ` +
        `Share cards accept ${Object.keys(MIME_BY_EXT).join(", ")}.`,
    );
  }
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- paths come from the in-repo asset manifests, never from a request
  const bytes = await readFile(path.join(process.cwd(), relativePath));
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

/* ──────────────────────────────────────────────────────────────────────────
 * The GSA seal
 *
 * `public/logo/GSA_Seal_Updated_2026.svg` colours its 80 paths through a
 * `<style>` block in `<defs>` (`.cls-1 { fill: … }`). Satori implements no CSS
 * cascade for SVG — a `<style>` element is ignored outright — so inlining the
 * file as-is renders a solid black disc.
 *
 * The fix is to resolve that one-level cascade ourselves: rewrite each
 * `class="cls-N"` into the presentation attributes it stood for, then drop the
 * now-unused `<defs>`. This is done at request/build time rather than by
 * editing the source SVG, so the canonical brand asset stays byte-identical to
 * the one shipped to browsers.
 * ────────────────────────────────────────────────────────────────────────── */

const SEAL_PATH = "public/logo/GSA_Seal_Updated_2026.svg";

/** The `<style>` rules from the seal, resolved to presentation attributes. */
const SEAL_CLASS_ATTRS: Record<string, string> = {
  "cls-1": 'fill="#abb4b7"',
  "cls-2": 'fill="#0e5a99"',
  "cls-3": 'fill="#f7f4f0"',
  "cls-4": 'fill="#e8a621"',
  "cls-5": 'fill="#e8a621" fill-rule="evenodd"',
  "cls-6": 'fill="#934124"',
};

let sealCache: string | null = null;

/**
 * The GSA seal as an SVG data URI with all fills inlined, ready for `<img>`
 * inside an `ImageResponse`.
 *
 * Cached after the first read: a share card is generated per page, and the
 * seal is identical on every one.
 */
export async function readSealDataUri(): Promise<string> {
  if (sealCache) return sealCache;

  const raw = await readFile(path.join(process.cwd(), SEAL_PATH), "utf8");

  const inlined = raw
    // Resolve the cascade.
    .replace(/class="(cls-\d+)"/g, (whole, cls: string) => {
      // eslint-disable-next-line security/detect-object-injection -- `cls` is captured by /cls-\d+/ and looked up read-only; an unmapped key throws below
      const attrs = SEAL_CLASS_ATTRS[cls];
      if (!attrs) {
        throw new Error(
          `readSealDataUri: seal SVG uses unmapped class "${cls}". ` +
            `Update SEAL_CLASS_ATTRS after re-exporting the seal.`,
        );
      }
      return attrs;
    })
    // Drop the <defs><style> block the classes came from.
    .replace(/<defs>[\s\S]*?<\/defs>/, "")
    // Satori parses the data URI itself; the XML prolog is noise.
    .replace(/<\?xml[^>]*\?>\s*/, "")
    .trim();

  sealCache = `data:image/svg+xml;base64,${Buffer.from(inlined).toString("base64")}`;
  return sealCache;
}
