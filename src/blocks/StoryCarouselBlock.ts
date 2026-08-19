import type { Block } from "payload";

/**
 * StoryCarouselBlock — Payload block config.
 *
 * Allows editors to place a titled story carousel anywhere a
 * layout field accepts blocks (e.g. on Pages or the Home global).
 *
 * Usage in a collection/global layout field:
 *   import { StoryCarouselBlock } from '@/blocks/StoryCarouselBlock'
 *   { name: 'layout', type: 'blocks', blocks: [StoryCarouselBlock] }
 *
 * The corresponding React component is:
 *   src/components/modules/StoryCarousel.tsx
 */
export const StoryCarouselBlock: Block = {
  slug: "storyCarousel",
  labels: {
    singular: "Story Carousel",
    plural: "Story Carousels",
  },
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      required: true,
      label: "Section title",
      admin: {
        description:
          'Heading displayed above the carousel, e.g. "Securing the Mission"',
      },
    },
    {
      name: "stories",
      type: "relationship",
      relationTo: "stories",
      hasMany: true,
      required: true,
      minRows: 2,
      maxRows: 8,
      label: "Stories",
      admin: {
        description:
          "Select 2–8 stories to display. Order here controls display order.",
      },
    },
  ],
};
