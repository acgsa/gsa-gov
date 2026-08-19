import type { CollectionConfig } from "payload";

/**
 * Stories — individual story cards managed by editors.
 * Referenced by StoryCarouselBlock so a story can appear
 * in multiple carousels without duplication.
 *
 * Register in payload.config.ts:
 *   import { Stories } from './collections/Stories'
 *   collections: [Stories, ...]
 */
export const Stories: CollectionConfig = {
  slug: "stories",
  labels: { singular: "Story", plural: "Stories" },
  admin: {
    useAsTitle: "headline",
    defaultColumns: ["headline", "ctaText", "updatedAt"],
    description:
      "Individual story cards used in Story Carousels across the site.",
  },
  access: {
    // All stories are public editorial content
    read: () => true,
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
    },
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Image alt text",
      admin: {
        description:
          'Describe the image for screen readers (e.g. "Aerial view of 1800 F Street")',
      },
    },
    {
      name: "headline",
      type: "text",
      required: true,
      label: "Headline",
      maxLength: 120,
      admin: {
        description:
          "Bold card heading — keep under 100 characters for best layout",
      },
    },
    {
      name: "ctaText",
      type: "text",
      required: true,
      label: "CTA link text",
      defaultValue: "Read more",
      admin: {
        description: 'e.g. "See the latest savings" or "Learn how to compete"',
      },
    },
    {
      name: "ctaHref",
      type: "text",
      required: true,
      label: "CTA link URL",
      admin: {
        description: "Relative path (e.g. /savings) or full URL",
      },
    },
  ],
};
