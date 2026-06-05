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
      {/* TODO: redesign skip-to-content before re-adding */}
      <HeroCarousel />
      <VideoCarousel />
    </>
  );
}
