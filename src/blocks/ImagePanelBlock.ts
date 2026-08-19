import type { Block } from "payload";

/**
 * ImagePanelBlock — Payload block config for the ImagePanelCard component.
 *
 * Editors can place a full-bleed expandable image panel anywhere a layout
 * field accepts blocks. Supports 1–5 images per card.
 *
 * Register in a collection/global layout field:
 *   import { ImagePanelBlock } from '@/blocks/ImagePanelBlock'
 *   { name: 'layout', type: 'blocks', blocks: [ImagePanelBlock] }
 *
 * Corresponding React component:
 *   src/components/ui/ImagePanelCard.tsx
 */
export const ImagePanelBlock: Block = {
  slug: "imagePanel",
  labels: {
    singular: "Image Panel Card",
    plural: "Image Panel Cards",
  },
  fields: [
    {
      name: "images",
      type: "array",
      label: "Images",
      required: true,
      minRows: 1,
      maxRows: 5,
      admin: {
        description: "Add 1–5 images. The middle image is expanded by default.",
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
          label: "Alt text",
        },
      ],
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      maxLength: 120,
    },
    {
      name: "body",
      type: "textarea",
      required: true,
      label: "Body text",
      admin: {
        description: "Short descriptive paragraph below the title.",
      },
    },
    {
      name: "ctaText",
      type: "text",
      required: true,
      label: "CTA link text",
      defaultValue: "See the latest",
    },
    {
      name: "ctaHref",
      type: "text",
      required: true,
      label: "CTA link URL",
    },
  ],
};
