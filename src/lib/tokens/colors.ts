/**
 * US Design System color tokens — GSA.GOV
 *
 * Single source of truth for all color values used on gsa.gov.
 *
 * Layer 1 — USDS primitive palette
 *   Hand-extracted from vendor/usds/tokens/base.tokens.json
 *   @see vendor/usds/tokens/base.tokens.json
 *
 * Layer 2 — GSA semantic aliases
 *   Maps GSA brand tokens to USDS primitives.
 *   Two GSA-specific overrides that have no USDS equivalent are documented.
 *
 * Consumed by:
 *   - tailwind.config.ts   (Tailwind custom colors)
 *   - src/app/globals.css  (CSS custom properties)
 *   - src/templates/categoryAccents.ts
 *   - Any component that needs a hex value in an inline style or JS constant
 *
 * @see docs/decisions/ADR-002-usds-color-palette.md
 */

// ─────────────────────────────────────────────────────────────────────────────
// Layer 1 — USDS primitive palette
// Source: vendor/usds/tokens/base.tokens.json
// ─────────────────────────────────────────────────────────────────────────────

export const usds = {
  white: "#FFFFFF",
  black: "#000000",

  // ── Steel (blue-tinted gray — primary neutral scale) ──────────────────────
  steel: {
    50: "#FAFAFC",
    100: "#F4F5F8",
    200: "#E6EAF0",
    300: "#D3D9E4",
    400: "#B9C3D4",
    500: "#A7B4C9",
    600: "#8792A3",
    700: "#616875",
    800: "#353A40",
    900: "#1C1F22",
    950: "#141618",
  },

  // ── Neutral (pure gray scale) ─────────────────────────────────────────────
  neutral: {
    50: "#FAFAFA",
    100: "#F3F3F3",
    200: "#E6E6E6",
    300: "#D3D3D3",
    400: "#B8B8B8",
    500: "#A6A6A6",
    600: "#868686",
    700: "#606060",
    800: "#424242",
    900: "#252525",
    950: "#121212",
  },

  // ── Blue ──────────────────────────────────────────────────────────────────
  blue: {
    50: "#F7FAFF",
    100: "#EDF4FF",
    200: "#D8E7FF",
    300: "#B8D5FF",
    400: "#8EBBFE",
    500: "#72AAFE",
    600: "#5C8ACE",
    700: "#426393",
    800: "#243651",
    900: "#131D2B",
    950: "#0D131C",
  },

  // ── Red ───────────────────────────────────────────────────────────────────
  red: {
    50: "#FFF5F7",
    100: "#FFE8EC",
    200: "#FFCDD4",
    300: "#FFA3B0",
    400: "#FF6E82",
    500: "#F23D59",
    600: "#C43148",
    700: "#8C2334",
    800: "#5C1521",
    900: "#340B12",
    950: "#1F070B",
  },

  // ── Orange ────────────────────────────────────────────────────────────────
  orange: {
    50: "#FFF8F0",
    100: "#FFEED9",
    200: "#FFD9A8",
    300: "#FFBE6E",
    400: "#FCA44B",
    500: "#F98A37",
    600: "#CA702D",
    700: "#914F20",
    800: "#5E3215",
    900: "#361C0B",
    950: "#201006",
  },

  // ── Gold ──────────────────────────────────────────────────────────────────
  gold: {
    50: "#FFFDF0",
    100: "#FFF9D1",
    200: "#FFEF96",
    300: "#FAE051",
    400: "#F7CE2B",
    500: "#F5C32C",
    600: "#C69E24",
    700: "#8E711A",
    800: "#4E3E0E",
    900: "#2C2308",
    950: "#191304",
  },

  // ── Yellow ────────────────────────────────────────────────────────────────
  yellow: {
    50: "#FEFFF0",
    100: "#FDFFD1",
    200: "#FAFFA3",
    300: "#F5FF6E",
    400: "#EDFF3C",
    500: "#E8FF1A",
    600: "#BACC14",
    700: "#84910E",
    800: "#4C5308",
    900: "#2A2E04",
    950: "#171A02",
  },

  // ── Green ─────────────────────────────────────────────────────────────────
  green: {
    50: "#F3FFF0",
    100: "#E1FFD9",
    200: "#BBFFAA",
    300: "#88FF6E",
    400: "#70CF44",
    500: "#70CF44",
    600: "#5BA837",
    700: "#417827",
    800: "#275019",
    900: "#142D0D",
    950: "#0B1907",
  },

  // ── Pink ──────────────────────────────────────────────────────────────────
  pink: {
    50: "#FFF5FA",
    100: "#FFE8F4",
    200: "#FFCDE7",
    300: "#FFA3D0",
    400: "#FF6EB3",
    500: "#F23D90",
    600: "#C43174",
    700: "#8C2353",
    800: "#5C1535",
    900: "#340B1E",
    950: "#1F0711",
  },

  // ── Turquoise ─────────────────────────────────────────────────────────────
  turquoise: {
    50: "#F0FEFF",
    100: "#D9FCFF",
    200: "#A8F5FF",
    300: "#6BE9F9",
    400: "#A5D8E9",
    500: "#80D2ED",
    600: "#68AAC0",
    700: "#4A7A89",
    800: "#2E4E59",
    900: "#192B32",
    950: "#0E191D",
  },

  // ── Violet ────────────────────────────────────────────────────────────────
  violet: {
    50: "#F5F5FF",
    100: "#EBEBFF",
    200: "#D3D3FF",
    300: "#ADADFF",
    400: "#8282FF",
    500: "#9598F7",
    600: "#797BC8",
    700: "#56588F",
    800: "#35365C",
    900: "#1D1E34",
    950: "#10111E",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Layer 2 — GSA semantic aliases
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GSA semantic color tokens. These are the values consumed by tailwind.config.ts
 * as named Tailwind utilities (e.g. `bg-gsa-navy`, `text-gsa-blue`).
 *
 * Decision notes:
 *   - gsa-navy: KEPT as GSA-specific override (#00111C). Nearest USDS is
 *     blue/950 (#0D131C) but the design uses this specific value for all
 *     header/footer/nav backgrounds. @see ADR-002.
 *   - gsa-savings: KEPT as GSA-specific override (#34d399). USDS has no
 *     emerald green. @see ADR-002.
 */
export const gsaColors = {
  // ── Brand (GSA-specific overrides — no exact USDS equivalent) ────────────
  /** GSA brand navy — header, footer, nav backgrounds. GSA override; nearest USDS: blue/950 #0D131C */
  "gsa-navy": "#00111C",
  /** Slightly lighter navy for dropdown/overlay layers */
  "gsa-navy-mid": usds.blue[900],

  // ── Status / badges ───────────────────────────────────────────────────────
  /** Alert ticker background — near-black navy */
  "gsa-ticker": usds.blue[950],
  /** LIVE badge red */
  "gsa-live": usds.red[600],
  /** Brightest LIVE indicator red — most saturated USDS red */
  "gsa-live-bright": usds.red[500],

  // ── Interactive blue ──────────────────────────────────────────────────────
  /** Primary link/action blue — maps to USDS blue/600 */
  "gsa-blue": usds.blue[600],
  /** Darker blue for hover/active states — maps to USDS blue/700 */
  "gsa-blue-hover": usds.blue[700],

  // ── Savings counter ───────────────────────────────────────────────────────
  /** Taxpayer savings counter green — GSA-specific emerald; no USDS equivalent */
  "gsa-savings": "#34d399",

  // ── Per-category editorial accents ───────────────────────────────────────
  /** Real Estate — mapped to USDS orange/600 */
  "accent-realestate": usds.orange[600],
  /** Acquisition — mapped to USDS turquoise/700 */
  "accent-acquisition": usds.turquoise[700],
  /** Technology — mapped to USDS violet/700 */
  "accent-technology": usds.violet[700],
  /** About GSA — mapped to USDS pink/700 */
  "accent-about": usds.pink[700],
  /** Employee resources — mapped to USDS green/700 */
  "accent-employees": usds.green[700],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Convenience re-exports for JS constants (e.g. chart / animation colors)
// ─────────────────────────────────────────────────────────────────────────────

/** Brand green used for taxpayer savings visualizations */
export const BRAND_GREEN = gsaColors["gsa-savings"];

/** Brand navy used in gradient overlays and box-shadows */
export const BRAND_NAVY = gsaColors["gsa-navy"];
