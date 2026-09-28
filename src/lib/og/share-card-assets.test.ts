/**
 * Guards the share-card asset loader.
 *
 * The valuable assertions here are about *silent* failures. A share card is a
 * raster generated at build time by Satori and then cached by every social
 * platform that scrapes it — nobody looks at it again. So the two ways this
 * module can fail are both invisible without a test:
 *
 *   1. The seal SVG is re-exported from Illustrator with different `.cls-N`
 *      names. Satori ignores `<style>`, so an unresolved class renders a solid
 *      black disc where the seal should be. `readSealDataUri` must throw.
 *   2. An unsupported image format is added to a gallery pool. Satori decodes
 *      neither AVIF nor SVG as a bitmap, so the photo panel comes out blank.
 *
 * Both paths must fail loudly at build time instead of shipping a broken card.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { readImageDataUri, readSealDataUri } from "./share-card-assets";

const SEAL_PATH = "public/logo/GSA_Seal_Updated_2026.svg";

/** Decode back to markup so assertions read against the SVG, not base64. */
function decodeSvgDataUri(dataUri: string): string {
  const prefix = "data:image/svg+xml;base64,";
  expect(dataUri.startsWith(prefix)).toBe(true);
  return Buffer.from(dataUri.slice(prefix.length), "base64").toString("utf8");
}

describe("readSealDataUri", () => {
  it("resolves the seal's class cascade into presentation attributes", async () => {
    const svg = decodeSvgDataUri(await readSealDataUri());

    // Every `class="cls-N"` hook must be gone; Satori would ignore them.
    expect(svg).not.toMatch(/class="cls-/);
    // …and so must the <style> block they referred to.
    expect(svg).not.toMatch(/<style/);
    expect(svg).not.toMatch(/<defs>/);

    // The brand palette has to survive the rewrite, or the seal renders black.
    for (const colour of [
      "#abb4b7",
      "#0e5a99",
      "#f7f4f0",
      "#e8a621",
      "#934124",
    ]) {
      expect(svg).toContain(`fill="${colour}"`);
    }

    // The one non-fill rule in the stylesheet.
    expect(svg).toContain('fill-rule="evenodd"');

    // Still a usable SVG root with its coordinate system intact.
    expect(svg).toMatch(/^<svg/);
    expect(svg).toContain('viewBox="0 0 600 600"');
    expect(svg).not.toMatch(/<\?xml/);
  });

  it("covers every class the shipped seal actually uses", async () => {
    // Asserts the mapping is complete against the real asset rather than
    // against a fixture, so re-exporting the seal is what breaks the build.
    const raw = await readFile(path.join(process.cwd(), SEAL_PATH), "utf8");
    const used = new Set(
      [...raw.matchAll(/class="(cls-\d+)"/g)].map((match) => match[1]),
    );

    expect(used.size).toBeGreaterThan(0);

    const svg = decodeSvgDataUri(await readSealDataUri());
    for (const cls of used) {
      expect(svg).not.toContain(cls);
    }
  });

  it("fails loudly when the seal uses an unmapped class", async () => {
    // Simulates a re-export that introduces `.cls-7`. Uses an isolated module
    // registry because the real seal is memoized after the first read.
    jest.resetModules();
    jest.doMock("node:fs/promises", () => ({
      readFile: jest
        .fn()
        .mockResolvedValue(
          '<svg viewBox="0 0 600 600"><defs><style>.cls-7{fill:#000}</style></defs>' +
            '<path class="cls-7" d="M0 0h1v1H0z"/></svg>',
        ),
    }));

    const { readSealDataUri: isolated } = await import("./share-card-assets");

    await expect(isolated()).rejects.toThrow(/unmapped class "cls-7"/);

    jest.dontMock("node:fs/promises");
    jest.resetModules();
  });
});

describe("readImageDataUri", () => {
  it("inlines a jpeg with the matching mime type", async () => {
    const dataUri = await readImageDataUri(
      "src/assets/images/1800F/1800FHistoric1.jpg",
    );
    expect(dataUri.startsWith("data:image/jpeg;base64,")).toBe(true);
    // Guards against inlining an empty read.
    expect(dataUri.length).toBeGreaterThan(1000);
  });

  it.each([".avif", ".svg", ".tiff"])(
    "rejects %s, which Satori cannot decode as a bitmap",
    async (ext) => {
      await expect(readImageDataUri(`src/assets/fake${ext}`)).rejects.toThrow(
        /unsupported extension/,
      );
    },
  );

  it("names the offending file so the failure is actionable", async () => {
    await expect(
      readImageDataUri(
        "src/assets/images/USA/photo-1557160854-e1e89fdd3286.avif",
      ),
    ).rejects.toThrow(/photo-1557160854-e1e89fdd3286\.avif/);
  });
});
