import type { Metadata } from "next";
import Link from "next/link";
import { ArticleGallery } from "@/components/ui/ArticleGallery";

// ── Buildings & architecture ──────────────────────────────────────────────
import bldg1 from "@/assets/images/REAL ESTATE/Print-Primary-Entrance-James-R-Browning-U-S-Court-Of-Appeals-Building_64c6f689-fd92-43d9-8e5b-3015e3095e55.fac96cfd8d3855b794e20e45f4adf2a6.avif";
import bldg2 from "@/assets/images/BUILDING/1800FArchitecture2.jpg";
import bldg3 from "@/assets/images/BUILDING/GSA-Building-Blue-scaled.jpg";
import bldg4 from "@/assets/images/REAL ESTATE/exterior-historical-restoration.jpeg";
import bldg5 from "@/assets/images/REAL ESTATE/huntsville-courthouse-atrium-gallery.jpg";
import bldg6 from "@/assets/images/REAL ESTATE/James_R_Browning_Courthouse_Courtroom_1_Wall.jpeg";

// ── Projects & renderings ─────────────────────────────────────────────────
import proj1 from "@/assets/images/NEWS/01-Chattanooga-Rendering.jpg";
import proj2 from "@/assets/images/NEWS/GSA-Chattanooga-Courthouse-View-1-Georgia-Avenue-at-Ceremonial-Entry-Court-1900x1270-1.jpg";
import proj3 from "@/assets/images/NEWS/GSA-Chattanooga-View-3-Eastern-Oval-Overlook-Autumn-1900x1270-1.jpg";
import proj4 from "@/assets/images/IMAGE PANEL/136416728_web1_Rendering---Exterior---Pedestrian-Walkway.jpg";
import proj5 from "@/assets/images/REAL ESTATE/Rendering-Huntsville-US-Courthouse-Front-View.JPG-scaled.jpg";

// ── People & events ───────────────────────────────────────────────────────
import evt1 from "@/assets/images/ED/03252026 - GSA NCR Press Conference-10-Slide1.jpg";
import evt2 from "@/assets/images/ED/674965705_1512411624265230_3630569890519666896_n.jpg";
import evt3 from "@/assets/images/ED/Edited-4794.jpg";
import evt4 from "@/assets/images/ED/Take Your Child to Work Day 2026-7-Slide1.jpg";
import evt5 from "@/assets/images/ED/HESOrVVXwAAeJOZ.jpg";

export const metadata: Metadata = {
  title: "Photo Gallery | Media",
  description:
    "Browse high-resolution GSA photography of federal buildings, leadership, and events available for editorial use.",
};

const collections = [
  {
    id: "buildings",
    heading: "Buildings & architecture",
    images: [
      {
        src: bldg1,
        alt: "Primary entrance of the James R. Browning U.S. Court of Appeals Building",
      },
      { src: bldg2, alt: "Architectural detail of the 1800 F Street building" },
      { src: bldg3, alt: "GSA headquarters building in Washington, D.C." },
      { src: bldg4, alt: "Exterior of a federally restored historic building" },
      {
        src: bldg5,
        alt: "Atrium gallery at the Huntsville federal courthouse",
      },
      {
        src: bldg6,
        alt: "Ornate courtroom in the James R. Browning U.S. Court of Appeals Building",
      },
    ],
  },
  {
    id: "projects",
    heading: "Projects & renderings",
    images: [
      {
        src: proj1,
        alt: "Front rendering of the new Chattanooga federal courthouse",
      },
      {
        src: proj2,
        alt: "Georgia Avenue ceremonial entry court at the Chattanooga courthouse",
      },
      {
        src: proj3,
        alt: "Eastern oval overlook at the Chattanooga courthouse in autumn",
      },
      {
        src: proj4,
        alt: "Rendering of the Brownsville-Gateway Land Port of Entry pedestrian walkway",
      },
      {
        src: proj5,
        alt: "Rendering of the Huntsville U.S. Courthouse front view",
      },
    ],
  },
  {
    id: "events",
    heading: "People & events",
    images: [
      { src: evt1, alt: "GSA press conference at the National Capital Region" },
      { src: evt2, alt: "GSA public event with press in attendance" },
      { src: evt3, alt: "GSA employees at an agency event" },
      { src: evt4, alt: "Take Your Child to Work Day at GSA headquarters" },
      { src: evt5, alt: "GSA communications staff at work" },
    ],
  },
];

export default function PhotoGalleryPage() {
  return (
    <div className="bg-usds-steel-50 min-h-screen pb-16 lg:pb-24">
      {/* ── Centered hero ── */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-16 pb-12 sm:pb-16">
        <Link
          href="/media"
          className="inline-block text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 hover:text-usds-steel-900 transition-colors duration-150 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
        >
          Media
        </Link>
        <h1
          className="font-garamond text-usds-steel-900 text-[44px] leading-[1.05] sm:text-[56px] sm:leading-[1.04] mb-5"
          style={{ fontWeight: 474 }}
        >
          Photo gallery
        </h1>
        <p className="text-[16px] sm:text-[17px] leading-relaxed text-usds-steel-600 max-w-[560px] mx-auto">
          High-resolution GSA photography — federal buildings, project
          renderings, and event coverage — for approved editorial and media use.
        </p>
      </header>

      {/* ── Collections ── */}
      {collections.map((collection) => (
        <section
          key={collection.id}
          aria-labelledby={`${collection.id}-heading`}
          className="mb-16 sm:mb-20"
        >
          <h2
            id={`${collection.id}-heading`}
            className="font-garamond text-usds-steel-900 text-[28px] sm:text-[32px] leading-tight text-center mb-8"
            style={{ fontWeight: 474 }}
          >
            {collection.heading}
          </h2>
          <ArticleGallery images={collection.images} />
        </section>
      ))}
    </div>
  );
}
