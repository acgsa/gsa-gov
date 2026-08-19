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
    headline: "GSA Analytics Flag $2.1B in Improper Payments",
    ctaText: "Read more",
    ctaHref: "/news/improper-payments-recovery",
  },
  {
    src: acc2,
    alt: "Federal property dashboard",
    headline: "Inside GSA\u2019s Procurement Analytics Platform",
    ctaText: "Read more",
    ctaHref: "/news/procurement-analytics-platform",
  },
  {
    src: acc3,
    alt: "GSA leadership meeting",
    headline: "GSA Joins the White House Fraud Task Force",
    ctaText: "Read the announcement",
    ctaHref: "/news/gsa-white-house-fraud-task-force",
  },
  {
    src: acc4,
    alt: "Open data initiative",
    headline: "FedRAMP 20x Saves $504M Across Agencies",
    ctaText: "Read more",
    ctaHref: "/news/fedramp-20x-504m-savings",
  },
  {
    src: acc5,
    alt: "Agency performance review",
    headline: "The Playbook for a Leaner, Smarter Government Is Here",
    ctaText: "Read more",
    ctaHref: "/news/playbook",
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
