import type { Block } from "payload";
import { KPI_ICON_OPTIONS } from "@/lib/kpi-icons";

/**
 * KpiTickerBlock — Payload block config for the KpiTicker component.
 *
 * Editors can place a scrolling KPI ticker anywhere a layout field accepts
 * blocks (e.g. on Pages). Each KPI is plain editorial text (value + label);
 * the display icon is resolved automatically from the text via a deterministic
 * keyword map, with an optional manual override chosen from a curated
 * allow-list.
 *
 * Register in a collection/global layout field:
 *   import { KpiTickerBlock } from '@/blocks/KpiTickerBlock'
 *   { name: 'layout', type: 'blocks', blocks: [KpiTickerBlock] }
 *
 * Corresponding React component:
 *   src/components/modules/KpiTicker.tsx
 *
 * Icon resolution logic (shared, unit-tested):
 *   src/lib/kpi-icons.ts
 */
export const KpiTickerBlock: Block = {
  slug: "kpiTicker",
  labels: {
    singular: "KPI Ticker",
    plural: "KPI Tickers",
  },
  fields: [
    {
      name: "ariaLabel",
      type: "text",
      label: "Accessible label",
      defaultValue: "GSA key performance indicators",
      admin: {
        description:
          "Screen-reader label describing the ticker as a whole. Not shown visually.",
      },
    },
    {
      name: "items",
      type: "array",
      label: "KPI items",
      required: true,
      minRows: 1,
      maxRows: 12,
      admin: {
        description:
          "Each item shows a bold value followed by a label. The icon is chosen automatically from the text unless you set an override.",
      },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
          label: "Value",
          admin: {
            description:
              'The headline figure, e.g. "$89M saved" or "23 agencies".',
          },
        },
        {
          name: "label",
          type: "text",
          required: true,
          label: "Label",
          admin: {
            description: 'Supporting text, e.g. "via OneGov" or "on AI tools".',
          },
        },
        {
          name: "iconOverride",
          type: "select",
          label: "Icon (optional override)",
          options: KPI_ICON_OPTIONS,
          admin: {
            description:
              "Leave blank to auto-select an icon from the value + label text. Choose one here to override.",
          },
        },
      ],
    },
  ],
};
