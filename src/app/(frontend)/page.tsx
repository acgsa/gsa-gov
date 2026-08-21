import {
  FullBleedHero,
  type FullBleedHeroSlide,
} from "@/components/modules/FullBleedHero";
import { KpiTicker } from "@/components/modules/KpiTicker";
import { QuoteBlock } from "@/components/modules/QuoteBlock";
import { NewsSpotlight } from "@/components/modules/NewsSpotlight";
import { StoryCarousel } from "@/components/modules/StoryCarousel";
import { EditorialCarousel } from "@/components/modules/EditorialCarousel";
import { SolutionsTicker } from "@/components/modules/SolutionsTicker";
import { ImagePanelCard } from "@/components/ui/ImagePanelCard";
import type { StoryCardProps } from "@/components/ui/StoryCard";
import type { EditorialCardProps } from "@/components/ui/EditorialCard";
import type { Metadata } from "next";

// ── Hero 1 (Real Estate) — media carried over from the Option B hero ───────

// ── Hero 2 (Acquisition) — task force imagery ───────────────────────────────
import tf1 from "@/assets/images/TASK FORCE/HJRuzmJWAAAibBy.jpeg";
import tf2 from "@/assets/images/TASK FORCE/HJRuzmRWsAAQ65X.jpeg";
import tf3 from "@/assets/images/TASK FORCE/jd.jpeg";

// ── Hero 3 (Technology) ─────────────────────────────────────────────────────
import tech1 from "@/assets/images/TECH/photo-1684139517679-032b7213ad2e.avif";
import tech2 from "@/assets/images/TECH/photo-1694327876207-15246f69b411.avif";
import tech3 from "@/assets/images/TECH/photo-1717501219604-cc1902b5d845.avif";

// ── News spotlight ──────────────────────────────────────────────────────────
import newsLead from "@/assets/images/REAL ESTATE/denver.jpeg";
import newsSide1 from "@/assets/images/REAL ESTATE/905x0_s3-71426-W-TX-BROWNSVILLE-PORT-1 (1).jpg";
import newsSide2 from "@/assets/images/REAL ESTATE/Rendering-Huntsville-US-Courthouse-Front-View.JPG-scaled.jpg";
import newsSide3 from "@/assets/images/REAL ESTATE/exterior-historical-restoration.jpeg";

// ── Photo Card (image panel — Brownsville port of entry, from Option B) ────
import re1 from "@/assets/images/IMAGE PANEL/9EEBF871-7E3B-43AB-9B50-5BBB286C9C0A_1_201_a-1067x800.jpeg";
import re3 from "@/assets/images/IMAGE PANEL/136416728_web1_Rendering---Exterior---Pedestrian-Walkway.jpg";
import re6 from "@/assets/images/IMAGE PANEL/image (4).jpg";

// ── Acquisition news carousel ───────────────────────────────────────────────
// All four use ACQUISITION folder images not used in the editorial card slides.
import acq1 from "@/assets/images/ACQUISITION/pexels-rostislav-34281360.jpg";
import acq2 from "@/assets/images/ACQUISITION/pexels-ivan-drazic-20457695-20417783.jpg";
import acq3 from "@/assets/images/ACQUISITION/pexels-frostroomhead-16073667.jpg";
import acq4 from "@/assets/images/ACQUISITION/pexels-ramazphotos-7016957.jpg";

// ── Editorial card ──────────────────────────────────────────────────────────
import edAcq2 from "@/assets/images/ACQUISITION/photo-1554638263-c62cbd0a1dcc.avif";
import edAcq3 from "@/assets/images/ACQUISITION/photo-1564182910280-00e8bae1bfeb.avif";
import edAlt3 from "@/assets/images/ACCOUNTABILITY/pexels-dibert-16151394.jpg";

// ── Technology carousel ─────────────────────────────────────────────────────
import techCard1 from "@/assets/images/TECH/photo-1617761141732-d481912af1a9.avif";
import techCard2 from "@/assets/images/TECH/photo-1697033300784-6c9d143a30e2.avif";
import techCard3 from "@/assets/images/TECH/photo-1718011087751-e82f1792aa32.avif";
import techCard4 from "@/assets/images/TECH/photo-1731845417447-1d249f5c5ffa.avif";

export const metadata: Metadata = {
  title: "Home",
  description:
    "The U.S. General Services Administration delivers value and savings in real estate, acquisition, technology, and other mission-support services across government.",
};

// ── Hero slide sets ─────────────────────────────────────────────────────────
const realEstateHeroSlides: FullBleedHeroSlide[] = [
  { type: "video", src: "/assets/videos/grok-video.mp4", alt: "American flag" },
];

const acquisitionHeroSlides: FullBleedHeroSlide[] = [
  { type: "image", image: tf1, alt: "White House fraud task force meeting" },
  {
    type: "image",
    image: tf2,
    alt: "Task force members at the conference table",
  },
  {
    type: "image",
    image: tf3,
    alt: "GSA leadership at the fraud task force announcement",
  },
];

const technologyHeroSlides: FullBleedHeroSlide[] = [
  {
    type: "image",
    image: tech1,
    alt: "Abstract blue technology visualization",
  },
  {
    type: "image",
    image: tech2,
    alt: "Abstract rendering of secure cloud infrastructure",
  },
  { type: "image", image: tech3, alt: "Flowing abstract data visualization" },
];

// ── News spotlight (Real Estate) ────────────────────────────────────────────
const newsSpotlightLead: StoryCardProps = {
  src: newsSide1,
  alt: "Brownsville-Gateway Land Port of Entry in South Texas",
  headline:
    "GSA, CBP and Community Partners Break Ground on $300M South Texas Port Project",
  ctaText: "Read the announcement",
  ctaHref: "/news/brownsville-gateway-port-groundbreaking",
};

const newsSpotlightItems: StoryCardProps[] = [
  {
    src: newsSide2,
    alt: "Rendering of the new Huntsville U.S. Courthouse",
    headline: "GSA Launches Federal Property Disposal Program",
    ctaText: "Read more",
    ctaHref: "/news/property-disposal-program-launch",
  },
  {
    src: newsSide3,
    alt: "Historic federal building restoration",
    headline: "First Wave of Underutilized Buildings Heads to Auction",
    ctaText: "Read more",
    ctaHref: "/news/underutilized-buildings-sale",
  },
  {
    src: newsLead,
    alt: "Aerial view of a consolidated federal campus",
    headline: "Lease Consolidation Cuts Deferred-Maintenance Backlog",
    ctaText: "Read more",
    ctaHref: "/news/lease-consolidation-program",
  },
];

// ── Acquisition (small card carousel) ───────────────────────────────────────
const acquisitionStories: StoryCardProps[] = [
  {
    src: acq1,
    alt: "Federal acquisition professional reviewing a contract",
    headline:
      "GSA Administrator Outlines Vision for a Leaner Federal Government",
    ctaText: "See the announcement",
    ctaHref: "/news/administrator-vision",
  },
  {
    src: acq2,
    alt: "Federal contracting and acquisition services",
    headline: "GSA Analytics Flag $2.1B in Improper Payments",
    ctaText: "Read more",
    ctaHref: "/news/improper-payments-recovery",
  },
  {
    src: acq3,
    alt: "Government procurement and buying",
    headline: "Inside GSA\u2019s Procurement Analytics Platform",
    ctaText: "Read more",
    ctaHref: "/news/procurement-analytics-platform",
  },
  {
    src: acq4,
    alt: "Federal acquisition and contracting",
    headline: "OneGov Contracting Framework Goes Live",
    ctaText: "See the updates",
    ctaHref: "/news/onegov-contracting-framework",
  },
];

// ── Editorial (American-made buying) ────────────────────────────────────────
const editorialSlides: EditorialCardProps[] = [
  {
    src: edAcq2,
    alt: "American manufacturing facility floor",
    body: "GSA is calling on industry, manufacturers, and the public for ideas to strengthen American-made purchasing across the federal government. The request for information seeks practical ways to expand domestic sourcing through the government's buying power.",
    ctaText: "Read more",
    ctaHref: "/news/onegov-contracting-framework",
  },
  {
    src: edAcq3,
    alt: "Workers producing American-made goods",
    body: "From raw materials to finished products, GSA wants input on how federal contracts can better prioritize domestic manufacturers — supporting American jobs while delivering value for taxpayers.",
    ctaText: "Share your ideas",
    ctaHref: "/news/onegov-contracting-framework",
  },
  {
    src: edAlt3,
    alt: "American-made products ready for federal procurement",
    body: "Responses to the RFI will shape upcoming acquisition policy, helping GSA channel the government's purchasing power toward products made in the United States.",
    ctaText: "Learn about the RFI",
    ctaHref: "/news/onegov-contracting-framework",
  },
];

// ── Technology (small card carousel) ────────────────────────────────────────
const technologyStories: StoryCardProps[] = [
  {
    src: techCard1,
    alt: "Abstract technology visualization representing cloud authorization",
    headline: "FedRAMP 20x Cuts Cloud Authorization Time to Weeks",
    ctaText: "Learn more",
    ctaHref: "/news/fedramp-20x-launch",
  },
  {
    src: techCard2,
    alt: "Abstract visualization of federal cloud services",
    headline: "GSA Consolidates 340 Redundant Agency IT Systems",
    ctaText: "Read more",
    ctaHref: "/news/it-systems-consolidation",
  },
  {
    src: techCard3,
    alt: "Green technology growth visualization",
    headline:
      "USAi Brings Secure Generative AI to 3.4 Million Federal Employees",
    ctaText: "Learn more",
    ctaHref: "/news/usai-platform-expansion",
  },
  {
    src: techCard4,
    alt: "The Playbook for a Leaner, Smarter Government",
    headline: "The Playbook for a Leaner, Smarter Government Is Here",
    ctaText: "See the playbook",
    ctaHref: "/news/playbook",
  },
];

/**
 * GSA.GOV Homepage — Option A.
 *
 * Phase 1 visual layout with placeholder content; Payload CMS wiring in
 * Phase 2. The previous homepage design is preserved at /option-b.
 *
 * Section order:
 * 1. Full-bleed heroes ×3 — Real Estate (Option B hero media), Acquisition,
 *    Technology
 * 2. KPI Ticker (marquee)
 * 3. Quote — light variant with GSA seal
 * 4. News Spotlight — 1 lead story + 3 stacked side stories
 * 5. Photo Card (image panel) — Brownsville port of entry (from Option B)
 * 6. Acquisition (small card carousel)
 * 7. Editorial — GSA Seeks Ideas to Boost American-Made Buying
 * 8. Technology (small card carousel)
 * 9. GSA Solutions Ticker (Discover GSA)
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Full-bleed heroes — separated by 4px gaps */}
      <div className="flex flex-col gap-1">
        <FullBleedHero
          slides={realEstateHeroSlides}
          eyebrow="Real Estate"
          eyebrowHref="/real-estate"
          heading="Optimizing the Federal Real Estate Portfolio"
          ctaText="Read the announcement"
          ctaHref="/news/rightsizing-federal-real-estate"
          priority
          tall
        />
        <FullBleedHero
          slides={acquisitionHeroSlides}
          eyebrow="Acquisition"
          eyebrowHref="/acquisition"
          heading="GSA Joins the White House Fraud Task Force"
          ctaText="Read more"
          ctaHref="/news/gsa-white-house-fraud-task-force"
        />
        <FullBleedHero
          slides={technologyHeroSlides}
          eyebrow="Technology"
          eyebrowHref="/technology"
          heading="FedRAMP 20x Saves $504M Across Agencies"
          ctaText="Read more"
          ctaHref="/news/fedramp-20x-504m-savings"
        />
      </div>

      {/* 2. KPI Ticker */}
      <KpiTicker />

      {/* 3. Quote — light mode with GSA seal */}
      <QuoteBlock
        variant="light"
        seal={{ src: "/logo/New.svg", alt: "GSA Seal" }}
        quote="GSA is the engine of the federal government—powering agency missions while carefully stewarding taxpayer resources."
        attribution="Edward C. Forst"
        role="Administrator, U.S. General Services Administration"
      />

      {/* 4. News Spotlight */}
      <NewsSpotlight
        eyebrow="Real Estate"
        lead={newsSpotlightLead}
        items={newsSpotlightItems}
      />

      {/* 5. Photo Card — image panel (same content as Option B) */}
      <ImagePanelCard
        eyebrow="Real Estate"
        images={[
          {
            src: newsSide1,
            alt: "Brownsville-Gateway Land Port of Entry in South Texas",
          },
          {
            src: re3,
            alt: "Exterior rendering of the new Brownsville-Gateway Land Port of Entry pedestrian walkway",
          },
          {
            src: re1,
            alt: "Brownsville-Gateway Land Port of Entry federal building",
          },
          {
            src: re6,
            alt: "Groundbreaking ceremony at the Brownsville-Gateway Land Port of Entry",
          },
        ]}
        title="Breaking Ground on a $300M South Texas Port of Entry"
        body="GSA and CBP are modernizing the Brownsville-Gateway Land Port of Entry — doubling inspection capacity, replacing outdated infrastructure, and delivering purpose-built facilities that secure the border and serve the American people."
        ctaText="Read the announcement"
        ctaHref="/news/brownsville-gateway-port-groundbreaking"
      />

      {/* 6. Acquisition */}
      <StoryCarousel sectionTitle="Acquisition" cards={acquisitionStories} />

      {/* 7. Editorial */}
      <EditorialCarousel
        eyebrow="Acquisition"
        sectionTitle="GSA Seeks Ideas to Boost American-Made Buying"
        cards={editorialSlides}
      />

      {/* 8. Technology */}
      <StoryCarousel sectionTitle="Technology" cards={technologyStories} />

      {/* 9. Discover GSA */}
      <SolutionsTicker />
    </>
  );
}
