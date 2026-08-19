import { HeroCarousel } from "@/components/modules/HeroCarousel";
import { KpiTicker } from "@/components/modules/KpiTicker";
// Temporarily removed from the homepage (component file retained for later use).
// import { SavingsTeaserScroll } from "@/components/modules/SavingsTeaserScroll";
import { StoryCarousel } from "@/components/modules/StoryCarousel";
// Retained (referenced in the commented comparison block in the JSX) for
// side-by-side evaluation against NewsGrid.
import { FeatureCarousel } from "@/components/modules/FeatureCarousel";
import { NewsGrid } from "@/components/modules/NewsGrid";
import { EditorialCarousel } from "@/components/modules/EditorialCarousel";
import { SolutionsTicker } from "@/components/modules/SolutionsTicker";
import { ImagePanelCard } from "@/components/ui/ImagePanelCard";
import type { StoryCardProps } from "@/components/ui/StoryCard";
import type { FeatureCardProps } from "@/components/ui/FeatureCard";
import type { EditorialCardProps } from "@/components/ui/EditorialCard";
import type { Metadata } from "next";

// ── ED / News images ───────────────────────────────────────────────────────
import img1 from "@/assets/images/ED/674965705_1512411624265230_3630569890519666896_n.jpg";
import img2 from "@/assets/images/ED/G-FslWVWsAAxY2H.jpeg";
import newsRE1 from "@/assets/images/REAL ESTATE/901afd12-2895-4eb1-a305-a80514fc50d2-PROJECTMARVEL_frame_0.jpeg";
import newsRE1b from "@/assets/images/REAL ESTATE/Rendering-Huntsville-US-Courthouse-Front-View.JPG-scaled.jpg";
import newsRE2 from "@/assets/images/REAL ESTATE/905x0_s3-71426-W-TX-BROWNSVILLE-PORT-1 (1).jpg";
import newsRE3 from "@/assets/images/REAL ESTATE/exterior-historical-restoration.jpeg";

// ── Feature / In Focus images ──────────────────────────────────────────────
import feat1 from "@/assets/images/ED/55116423320_59b60aae9b_o-92d73f830fa5465dba92ced217762b6a.webp";
import feat3 from "@/assets/images/REAL ESTATE/denver.jpeg";
import feat4 from "@/assets/images/ED/Edited-4669.jpg";

// ── Editorial carousel images (Chattanooga) ────────────────────────────────
import chat1 from "@/assets/images/NEWS/01-Chattanooga-Rendering.jpg";
import chat2 from "@/assets/images/NEWS/GSA-Chattanooga-Courthouse-View-1-Georgia-Avenue-at-Ceremonial-Entry-Court-1900x1270-1.jpg";
import chat3 from "@/assets/images/NEWS/GSA-Chattanooga-View-3-Eastern-Oval-Overlook-Autumn-1900x1270-1.jpg";

// ── REAL ESTATE images (image panel) ─────────────────────────────────────
import re1 from "@/assets/images/IMAGE PANEL/9EEBF871-7E3B-43AB-9B50-5BBB286C9C0A_1_201_a-1067x800.jpeg";
import re3 from "@/assets/images/IMAGE PANEL/136416728_web1_Rendering---Exterior---Pedestrian-Walkway.jpg";
import re5 from "@/assets/images/REAL ESTATE/a44b626c-cb75-449a-806a-272ddc9d90a1_1140x641.jpg";
import re6 from "@/assets/images/IMAGE PANEL/image (4).jpg";

export const metadata: Metadata = {
  title: "Home — Option B",
  description:
    "The U.S. General Services Administration delivers value and savings in real estate, acquisition, technology, and other mission-support services across government.",
};

// ── GSA IN THE NEWS ───────────────────────────────────────────────────────
const newsStories: StoryCardProps[] = [
  {
    src: img1,
    alt: "GSA press conference",
    headline:
      "GSA Administrator Outlines Vision for a Leaner Federal Government",
    ctaText: "See the announcement",
    ctaHref: "/news/administrator-vision",
  },
  {
    src: newsRE2,
    alt: "Brownsville land port of entry",
    headline:
      "GSA, CBP and Community Partners Break Ground on $300M South Texas Port Project",
    ctaText: "Read the announcement",
    ctaHref: "/news/brownsville-gateway-port-groundbreaking",
  },
  {
    src: img2,
    alt: "Federal employees at laptops",
    headline: "FedRAMP 20x Cuts Cloud Authorization Time to Weeks",
    ctaText: "Learn more",
    ctaHref: "/news/fedramp-20x-launch",
  },
  {
    src: newsRE3,
    alt: "Historic federal building",
    headline: "Lease Consolidation Cuts Deferred-Maintenance Backlog",
    ctaText: "Read more",
    ctaHref: "/news/lease-consolidation-program",
  },
  {
    src: newsRE1b,
    alt: "Rendering of the new Huntsville U.S. Courthouse",
    headline: "GSA Launches Federal Property Disposal Program",
    ctaText: "Read more",
    ctaHref: "/news/property-disposal-program-launch",
  },
];

// ── IN FOCUS ──────────────────────────────────────────────────────────────
// Retained for the commented FeatureCarousel comparison in the JSX below.
const inFocusCards: FeatureCardProps[] = [
  {
    src: feat1,
    alt: "GSA and USDA leadership at the Ag South disposition announcement",
    headline:
      "GSA and USDA Unlock $1.6 Billion in Savings with Ag South Disposition",
    ctaHref: "/real-estate/sales",
  },
  {
    src: newsRE1,
    alt: "Rendering of the proposed San Antonio arena development",
    headline:
      "$30M Federal Property Sold to San Antonio, Clearing Way for New Spurs Arena",
    ctaHref: "/real-estate/sales",
  },
  {
    src: feat3,
    alt: "Aerial view of the Denver Federal Center in Lakewood, Colorado",
    headline:
      "GSA and FDA Break Ground on $228M Cutting-Edge Lab at the Denver Federal Center",
    ctaHref: "/news/rightsizing-federal-real-estate",
  },
  {
    src: feat4,
    alt: "GSA leadership discussing federal office space consolidation",
    headline: "GSA Consolidates Federal Office Space to Cut Leasing Costs",
    ctaHref: "/news/lease-consolidation-program",
  },
];

// ── ACCOUNTABILITY images ─────────────────────────────────────────────────
import acc1 from "@/assets/images/ACCOUNTABILITY/pexels-dibert-16151394.jpg";
import acc2 from "@/assets/images/ACCOUNTABILITY/photo-1562902982-5542bb25e4b6.avif";
import acc3 from "@/assets/images/ACCOUNTABILITY/pexels-ramazphotos-32314507.jpg";
import acc4 from "@/assets/images/ACCOUNTABILITY/pexels-frostroomhead-16073667.jpg";
import acc5 from "@/assets/images/ACCOUNTABILITY/pexels-maximkapytka-17507798.jpg";

// ── ACCOUNTABILITY ────────────────────────────────────────────────────────
const accountabilityStories: StoryCardProps[] = [
  {
    src: acc1,
    alt: "Federal accountability review",
    headline: "$8.4 Billion in Wasteful Spending Identified and Eliminated",
    ctaText: "See the report",
    ctaHref: "/savings",
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

// ── Editorial (Chattanooga courthouse) ────────────────────────────────────
const chattanoogaSlides: EditorialCardProps[] = [
  {
    src: chat1,
    alt: "Front rendering of the new Chattanooga federal courthouse",
    body: "A landmark courthouse designed for the next century. GSA releases the first architectural renderings of the Joel W. Solomon Federal Building and U.S. Courthouse expansion—classical in form, modern in function.",
    ctaText: "See the latest",
    ctaHref: "/news/brownsville-gateway-port-groundbreaking",
  },
  {
    src: chat2,
    alt: "Georgia Avenue ceremonial entry court at the Chattanooga courthouse",
    body: "The Georgia Avenue entry court anchors the new courthouse's civic presence on the street. The design honors Chattanooga's architectural heritage while meeting modern federal workplace and security standards for the 21st century.",
    ctaText: "Explore the design",
    ctaHref: "/news/brownsville-gateway-port-groundbreaking",
  },
  {
    src: chat3,
    alt: "Eastern oval overlook at the Chattanooga courthouse in autumn",
    body: "The eastern oval overlook transforms underused federal land into a public green space for the Chattanooga community. Seasonal plantings, accessible pathways, and gathering areas reflect GSA's commitment to buildings that serve both government and the public.",
    ctaText: "Learn about the project",
    ctaHref: "/news/brownsville-gateway-port-groundbreaking",
  },
];

/**
 * GSA.GOV Homepage — Option B.
 *
 * The original Phase 1 homepage design, preserved verbatim at /option-b for
 * side-by-side evaluation against the Option A design now on the homepage.
 *
 * Section order:
 * 1. Hero Carousel (with per-slide CTA)
 * 2. KPI Ticker (marquee)
 * 3. In Focus (feature carousel, 4 cards)
 * 4. GSA in the News (story carousel, 5 cards)
 * 5. Savings Teaser (scroll-scrub expand/collapse card → savings page)
 * 6. Editorial — Breaking Ground in Chattanooga
 * 7. GSA Solutions Ticker
 * 8. Real Estate Image Panel
 * 9. Accountability (story carousel, 5 cards)
 */
export default function OptionBHomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroCarousel />

      {/* 2. KPI Ticker */}
      <KpiTicker />

      {/* 3 + 4. GSA IN THE NEWS — candidate module replacing the paired
          FeatureCarousel + StoryCarousel below. 2 large lead cards on top,
          3 smaller cards beneath. */}
      <NewsGrid sectionTitle="GSA IN THE NEWS" cards={newsStories} />

      {/* Previous top-of-page carousels — retained (commented) for side-by-side
          comparison while evaluating the NewsGrid replacement.
      <FeatureCarousel sectionTitle="GSA TOP NEWS" cards={inFocusCards} />
      <StoryCarousel sectionTitle="IN FOCUS" cards={newsStories} />
      */}

      {/* 5. Savings Teaser — temporarily removed from the homepage.
          Component retained at src/components/modules/SavingsTeaserScroll.tsx. */}
      {/* <SavingsTeaserScroll /> */}

      {/* 6. Editorial */}
      <EditorialCarousel
        eyebrow="Real Estate"
        sectionTitle="Breaking Ground in Chattanooga"
        cards={chattanoogaSlides}
      />

      {/* 7. GSA Solutions */}
      <SolutionsTicker />

      {/* 8. Real Estate — image panel */}
      <ImagePanelCard
        eyebrow="Real Estate"
        images={[
          {
            src: re5,
            alt: "Aerial view of the Brownsville-Gateway Land Port of Entry site in South Texas",
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
        ctaHref="https://www.gsa.gov/about-gsa/newsroom/news-releases/gsa-cbp-and-community-partners-break-ground-on-300m-south-texas-port-project-05062026"
      />

      {/* 9. Accountability */}
      <StoryCarousel
        sectionTitle="Accountability"
        cards={accountabilityStories}
      />
    </>
  );
}
