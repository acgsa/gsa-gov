import type { CollectionConfig } from "payload";
import { KpiTickerBlock } from "@/blocks/KpiTickerBlock";
import { StoryCarouselBlock } from "@/blocks/StoryCarouselBlock";
import { ImagePanelBlock } from "@/blocks/ImagePanelBlock";

/**
 * Pages — editorially composed pages built from reusable content blocks.
 *
 * A page is primarily a URL `slug` plus a `layout` field: an ordered list of
 * blocks (modules) that editorial staff can add, reorder, and configure. The
 * available blocks are the reviewed, super-admin-owned modules registered here.
 *
 * Register in payload.config.ts:
 *   import { Pages } from './collections/Pages'
 *   collections: [Pages, ...]
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    description: "Composed pages built from reusable content blocks.",
  },
  access: {
    // Pages are public-facing informational content.
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      admin: {
        description:
          "Internal/administrative title and browser title for the page.",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "URL slug",
      admin: {
        description:
          'URL path segment, e.g. "about" for /about. Use lowercase, hyphenated text.',
      },
    },
    {
      name: "layout",
      type: "blocks",
      label: "Page layout",
      minRows: 0,
      blocks: [KpiTickerBlock, StoryCarouselBlock, ImagePanelBlock],
      admin: {
        description:
          "Add, reorder, and configure content blocks to compose the page.",
      },
    },
  ],
};
