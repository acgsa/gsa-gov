import type { Metadata } from "next";
import type { StoryCardProps } from "@/components/ui/StoryCard";

import { SavingsScrollSection } from "@/components/modules/SavingsScrollSection";
import { SavingsMethodology } from "@/components/modules/SavingsMethodology";
import { StoryCarousel } from "@/components/modules/StoryCarousel";
import { SavingsHero } from "@/components/modules/SavingsHero";

// ── Accountability story images ───────────────────────────────────────────
import acc1 from "@/assets/images/ACCOUNTABILITY/pexels-dibert-16151394.jpg";
import acc2 from "@/assets/images/ACCOUNTABILITY/photo-1562902982-5542bb25e4b6.avif";
import acc3 from "@/assets/images/ACCOUNTABILITY/pexels-ramazphotos-32314507.jpg";
import acc4 from "@/assets/images/ACCOUNTABILITY/pexels-frostroomhead-16073667.jpg";
import acc5 from "@/assets/images/ACCOUNTABILITY/pexels-maximkapytka-17507798.jpg";

export const metadata: Metadata = {
  title: "Taxpayer Savings",
  description:
    "Current view of savings delivered across federal real estate, acquisition, technology, and more since January 2025.",
};

// ── Accountability stories ─────────────────────────────────────────────────
const accountabilityStories: StoryCardProps[] = [
  {
    src: acc1,
    alt: "Federal accountability review",
    headline: "$8 Billion in Wasteful Spending Identified and Eliminated",
    ctaText: "See the report",
    ctaHref: "/accountability/savings",
  },
  {
    src: acc2,
    alt: "Federal property dashboard",
    headline:
      "New Federal Property Dashboard Makes Government Real Estate Transparent",
    ctaText: "View the data",
    ctaHref: "/real-estate/portfolio",
  },
  {
    src: acc3,
    alt: "GSA leadership meeting",
    headline:
      "Inspector General Reports: GSA's Accountability Framework at Work",
    ctaText: "Read more",
    ctaHref: "/savings",
  },
  {
    src: acc4,
    alt: "Open data initiative",
    headline:
      "Open Data Initiative: GSA Publishes All Contract Awards in Real Time",
    ctaText: "Explore the data",
    ctaHref: "/savings",
  },
  {
    src: acc5,
    alt: "Agency performance review",
    headline:
      "Performance Scorecards Now Public for All GSA-Supported Agencies",
    ctaText: "See scorecards",
    ctaHref: "/savings",
  },
];

/**
 * Taxpayer Savings Dashboard
 *
 * Sections:
 * 1. Full-viewport scroll-highlight hero (SavingsHero)
 * 2. SavingsScrollSection — sticky tracker strip + milestone scroll panels
 * 3. Accountability story carousel
 * 4. Methodology accordion
 */
export default function TaxpayerSavingsPage() {
  return (
    <div className="bg-gsa-ticker text-white">
      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <SavingsHero />

      {/* ── 2. Milestone scroll with tracker strip ───────────────────────── */}
      <SavingsScrollSection />

      {/* ── 3. Accountability story carousel ────────────────────────────── */}
      <div className="border-b border-white/[0.06]">
        <StoryCarousel
          sectionTitle="Accountability in the News"
          cards={accountabilityStories}
          darkMode
        />
      </div>

      {/* ── 4. Methodology accordion (includes transparency callout) ─────── */}
      <section className="py-16 sm:py-20 border-b border-white/[0.06] px-4 sm:px-6">
        <SavingsMethodology />
      </section>
    </div>
  );
}
