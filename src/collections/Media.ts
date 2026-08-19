import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Media — Payload upload collection for images used across the site.
 *
 * Files are stored in public/media/ and served as static assets.
 * Register in payload.config.ts:
 *   import { Media } from './collections/Media'
 *   collections: [Media, ...]
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media", plural: "Media" },
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
    ],
    imageSizes: [
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 1920, height: 1080, position: "centre" },
    ],
  },
  access: {
    // All media is public — site handles no PII/CUI
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt text",
      admin: {
        description: "Describe the image for screen readers and SEO",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Caption (optional)",
    },
  ],
};
