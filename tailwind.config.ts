import type { Config } from "tailwindcss";
import { gsaColors, usds } from "./src/lib/tokens/colors";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/templates/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── GSA semantic aliases ─────────────────────────────────────────────
        // Values sourced from src/lib/tokens/colors.ts (USDS-mapped)
        // @see docs/decisions/ADR-002-usds-color-palette.md
        ...gsaColors,

        // ── USDS primitive scales ────────────────────────────────────────────
        // Exposed as usds-{family}-{shade} (e.g. bg-usds-steel-200)
        "usds-steel": usds.steel,
        "usds-neutral": usds.neutral,
        "usds-blue": usds.blue,
        "usds-red": usds.red,
        "usds-orange": usds.orange,
        "usds-gold": usds.gold,
        "usds-yellow": usds.yellow,
        "usds-green": usds.green,
        "usds-pink": usds.pink,
        "usds-turquoise": usds.turquoise,
        "usds-violet": usds.violet,
      },
      boxShadow: {
        editorial:
          "0 1px 2px rgba(11,28,53,0.04), 0 12px 32px -12px rgba(11,28,53,0.18)",
        "editorial-lg":
          "0 2px 4px rgba(11,28,53,0.05), 0 28px 60px -20px rgba(11,28,53,0.28)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        garamond: [
          "var(--font-garamond)",
          "EB Garamond",
          "Garamond",
          "Georgia",
          "serif",
        ],
        geist: [
          "var(--font-geist)",
          "Geist",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      keyframes: {
        "live-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "live-pulse": "live-pulse 1.4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        kenburns: "kenburns 18s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
