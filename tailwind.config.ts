import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // GSA brand — dark navy header/footer
        "gsa-navy": "#0B1C35",
        "gsa-navy-mid": "#0D2240",
        // Alert ticker background
        "gsa-ticker": "#0f172a",
        // LIVE badge red
        "gsa-live": "#DC2626",
        // Link / accent blue
        "gsa-blue": "#0066CC",
        "gsa-blue-hover": "#0052a3",
        // Taxpayer savings counter green
        "gsa-savings": "#34d399",
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
      },
      animation: {
        "live-pulse": "live-pulse 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
