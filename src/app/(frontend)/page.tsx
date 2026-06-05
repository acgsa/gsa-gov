import { HeroCarousel } from "@/components/modules/HeroCarousel";
import { VideoCarousel } from "@/components/modules/VideoCarousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "The U.S. General Services Administration delivers value and savings in real estate, acquisition, technology, and other mission-support services across government.",
};

/**
 * GSA.GOV Homepage — Phase 1 visual layout with placeholder content.
 * Payload CMS wiring added in Phase 2.
 */
export default function HomePage() {
  return (
    <>
      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-gsa-navy focus:px-4 focus:py-2 focus:rounded focus:font-semibold"
      >
        Skip to main content
      </a>

      <HeroCarousel />
      <VideoCarousel />
    </>
  );
}
