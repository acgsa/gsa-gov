import type { StaticImageData } from "next/image";
import { usds } from "@/lib/tokens/colors";

/** Accent keys map 1:1 to the per-category colors defined in tailwind.config.ts */
export type CategoryAccent =
  | "realestate"
  | "acquisition"
  | "technology"
  | "about"
  | "employees";

export interface AccentTheme {
  /** Solid hex — used for inline styles where a Tailwind class can't reach */
  hex: string;
  /** Slightly darker hex for hover / active */
  hexDark: string;
  /** rgba string at low alpha for tint washes */
  tint: string;
}

/**
 * Per-category editorial accents mapped to USDS tokens.
 * @see docs/decisions/ADR-002-usds-color-palette.md
 */
/**
 * All category pages share a single blue-500 highlight color per the site-wide
 * design decision (ADR-005). The per-category keys are retained so that existing
 * CategoryPage consumers compile without changes.
 */
export const ACCENTS: Record<CategoryAccent, AccentTheme> = {
  realestate: {
    hex: usds.blue[500],
    hexDark: usds.blue[600],
    tint: "rgba(114,170,254,0.08)",
  },
  acquisition: {
    hex: usds.blue[500],
    hexDark: usds.blue[600],
    tint: "rgba(114,170,254,0.08)",
  },
  technology: {
    hex: usds.blue[500],
    hexDark: usds.blue[600],
    tint: "rgba(114,170,254,0.08)",
  },
  about: {
    hex: usds.blue[500],
    hexDark: usds.blue[600],
    tint: "rgba(114,170,254,0.08)",
  },
  employees: {
    hex: usds.blue[500],
    hexDark: usds.blue[600],
    tint: "rgba(114,170,254,0.08)",
  },
};

export function resolveAccent(accent?: CategoryAccent): AccentTheme {
  return ACCENTS[accent ?? "acquisition"];
}

export interface CategoryTopic {
  href: string;
  eyebrow?: string;
  title: string;
  body: string;
  /** Optional card image (per the category landing redesign) */
  src?: string | StaticImageData;
  alt?: string;
  /**
   * Controls how the card image is fitted.
   * - "cover" (default): fills the image area; good for photos.
   * - "contain": shows the full image with padding; good for logos.
   */
  imageStyle?: "cover" | "contain";
}

export interface CategoryFeaturedStory {
  src: string | StaticImageData;
  alt: string;
  eyebrow?: string;
  headline: string;
  ctaText: string;
  ctaHref: string;
}

export interface CategoryStat {
  value: string;
  label: string;
}

export interface CategoryPullQuote {
  quote: string;
  attribution?: string;
  /** Optional role / title rendered beneath the attribution */
  role?: string;
}

/** Optional full-bleed photo card (image panel) section */
export interface CategoryImagePanel {
  images: { src: string | StaticImageData; alt: string }[];
  eyebrow?: string;
  title: string;
  body: string;
  ctaText: string;
  ctaHref: string;
}

/** Optional editorial carousel section */
export interface CategoryEditorial {
  eyebrow: string;
  sectionTitle: string;
  cards: {
    src: string | StaticImageData;
    alt: string;
    body: string;
    ctaText: string;
    ctaHref: string;
  }[];
}

export interface CategoryLeader {
  /** Full name */
  name: string;
  /** Role / title */
  title: string;
  /**
   * Optional headshot — either a locally vendored image import or an
   * official gsa.gov URL (allow-listed in next.config.ts). If omitted or
   * the image fails to load, an initials avatar shows instead.
   */
  photoSrc?: string | StaticImageData;
  /** Initials shown in the fallback avatar, e.g. "MC" */
  initials: string;
  /** Optional link to the leader's bio page */
  href?: string;
}
