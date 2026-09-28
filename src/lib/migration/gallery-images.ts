import { type StaticImageData } from "next/image";

/* ──────────────────────────────────────────────────────────────────────────
 * Stand-in imagery for the GalleryPage showcase
 *
 * The Drupal export carries metadata and body text only — no media. Per
 * plans/drupal-content-showcase-plan.md §7, each legacy page is paired with an
 * existing asset from src/assets/images/**. These are PLACEHOLDERS chosen to
 * match subject matter (border station / courthouse construction); they are
 * not the photographs that appear on the legacy pages.
 *
 * This module exists because the imagery is needed in two places that cannot
 * share a representation:
 *
 *   1. The page (`app/(migration)/migration/gallery/[slug]/page.tsx`) needs
 *      `StaticImageData` so `next/image` can size and optimize each photo.
 *   2. The share-card route (`opengraph-image.tsx`) runs through Satori, which
 *      cannot resolve a webpack asset URL — it needs the raw bytes. So each
 *      entry also records its path on disk, relative to the repository root.
 *
 * Keeping both on one record is what makes them impossible to drift apart: a
 * photo cannot be added to the page without also being readable by the share
 * card.
 * ────────────────────────────────────────────────────────────────────────── */

// ── Historic / border-station stand-ins (Norton, VT land port of entry) ──
import hist1 from "@/assets/images/1800F/1800FHistoric1.jpg";
import hist3 from "@/assets/images/1800F/1800FHistoric3.jpg";
import hist4 from "@/assets/images/1800F/1800FHistoric4.jpg";
import hist6 from "@/assets/images/1800F/1800FHistoric6.jpg";
import hist10 from "@/assets/images/1800F/1800FHistoric10.jpg";
import hist11 from "@/assets/images/1800F/1800FHistoric11.jpg";
import hist13 from "@/assets/images/1800F/1800FHistoric13.jpg";
import hist14 from "@/assets/images/1800F/1800FHistoric14.jpg";
import hist16 from "@/assets/images/1800F/1800FHistoric16.jpg";
import hist18 from "@/assets/images/1800F/1800FHistoric18.jpg";
import arch2 from "@/assets/images/1800F/1800FArchitecture2.jpg";
import arch4 from "@/assets/images/1800F/1800FArchitecture4.jpg";
import brownsvillePort from "@/assets/images/REAL ESTATE/905x0_s3-71426-W-TX-BROWNSVILLE-PORT-1 (1).jpg";

// ── Courthouse-construction stand-ins (Fort Lauderdale USCH) ──
import chatt1 from "@/assets/images/NEWS/01-Chattanooga-Rendering.jpg";
import chatt2 from "@/assets/images/NEWS/GSA-Chattanooga-Courthouse-View-1-Georgia-Avenue-at-Ceremonial-Entry-Court-1900x1270-1.jpg";
import chatt3 from "@/assets/images/NEWS/GSA-Chattanooga-View-3-Eastern-Oval-Overlook-Autumn-1900x1270-1.jpg";
import huntsvilleRender from "@/assets/images/REAL ESTATE/Rendering-Huntsville-US-Courthouse-Front-View.JPG-scaled.jpg";
import huntsvilleAtrium from "@/assets/images/REAL ESTATE/huntsville-courthouse-atrium-gallery.jpg";
import browningCorridor from "@/assets/images/REAL ESTATE/1st-floor-corridor-james-r-browning-us-court-of-appeals-building-san-francisco-1dc993-1024.jpg";
import strom from "@/assets/images/REAL ESTATE/Disposition-Strom-Thurmond-FB-CH_final1.jpg";
import restoration from "@/assets/images/REAL ESTATE/exterior-historical-restoration.jpeg";

export interface GalleryStandIn {
  /** Webpack-processed import, for `next/image` in the page. */
  image: StaticImageData;
  /** Path on disk relative to the repository root, for `fs.readFile`. */
  file: string;
}

const ASSETS = "src/assets/images";

/**
 * Per-sample stand-in pools, cycled in caption order across the page.
 *
 * Keyed by the sample's slug, which carries the legacy Drupal node id suffix
 * (e.g. `norton-photo-gallery-166988`) — the same slug the route resolves.
 */
export const GALLERY_IMAGE_POOLS: Record<string, GalleryStandIn[]> = {
  "norton-photo-gallery-166988": [
    { image: hist1, file: `${ASSETS}/1800F/1800FHistoric1.jpg` },
    { image: hist3, file: `${ASSETS}/1800F/1800FHistoric3.jpg` },
    { image: hist4, file: `${ASSETS}/1800F/1800FHistoric4.jpg` },
    { image: hist6, file: `${ASSETS}/1800F/1800FHistoric6.jpg` },
    { image: hist10, file: `${ASSETS}/1800F/1800FHistoric10.jpg` },
    { image: hist11, file: `${ASSETS}/1800F/1800FHistoric11.jpg` },
    { image: hist13, file: `${ASSETS}/1800F/1800FHistoric13.jpg` },
    { image: hist14, file: `${ASSETS}/1800F/1800FHistoric14.jpg` },
    { image: hist16, file: `${ASSETS}/1800F/1800FHistoric16.jpg` },
    { image: hist18, file: `${ASSETS}/1800F/1800FHistoric18.jpg` },
    { image: arch2, file: `${ASSETS}/1800F/1800FArchitecture2.jpg` },
    { image: arch4, file: `${ASSETS}/1800F/1800FArchitecture4.jpg` },
    {
      image: brownsvillePort,
      file: `${ASSETS}/REAL ESTATE/905x0_s3-71426-W-TX-BROWNSVILLE-PORT-1 (1).jpg`,
    },
  ],
  "fort-lauderdale-usch-construction-progress-165895": [
    { image: chatt1, file: `${ASSETS}/NEWS/01-Chattanooga-Rendering.jpg` },
    {
      image: chatt2,
      file: `${ASSETS}/NEWS/GSA-Chattanooga-Courthouse-View-1-Georgia-Avenue-at-Ceremonial-Entry-Court-1900x1270-1.jpg`,
    },
    {
      image: chatt3,
      file: `${ASSETS}/NEWS/GSA-Chattanooga-View-3-Eastern-Oval-Overlook-Autumn-1900x1270-1.jpg`,
    },
    {
      image: huntsvilleRender,
      file: `${ASSETS}/REAL ESTATE/Rendering-Huntsville-US-Courthouse-Front-View.JPG-scaled.jpg`,
    },
    {
      image: huntsvilleAtrium,
      file: `${ASSETS}/REAL ESTATE/huntsville-courthouse-atrium-gallery.jpg`,
    },
    {
      image: browningCorridor,
      file: `${ASSETS}/REAL ESTATE/1st-floor-corridor-james-r-browning-us-court-of-appeals-building-san-francisco-1dc993-1024.jpg`,
    },
    {
      image: strom,
      file: `${ASSETS}/REAL ESTATE/Disposition-Strom-Thurmond-FB-CH_final1.jpg`,
    },
    {
      image: restoration,
      file: `${ASSETS}/REAL ESTATE/exterior-historical-restoration.jpeg`,
    },
  ],
};

/** The pool for a slug, or an empty pool when the slug is unknown. */
export function getGalleryPool(slug: string): GalleryStandIn[] {
  // eslint-disable-next-line security/detect-object-injection -- read-only lookup in a module-local literal, with a `?? []` fallback for any key
  return GALLERY_IMAGE_POOLS[slug] ?? [];
}
