import type { Metadata } from "next";
import { CategoryPage } from "@/templates/CategoryPage";
import { REAL_ESTATE_WAYFINDER } from "@/lib/wayfinder-data";
import photoGelber from "@/assets/images/LEADERSHIP/ph-MichaelGelber-150x170.jpg";
import heroImg from "@/assets/images/REAL ESTATE/photo-1658958327132-a80f8a9409fb.avif";
import story1 from "@/assets/images/IMAGE PANEL/136416728_web1_Rendering---Exterior---Pedestrian-Walkway.jpg";
import story2 from "@/assets/images/REAL ESTATE/huntsville-courthouse-atrium-gallery.jpg";
import story3 from "@/assets/images/REAL ESTATE/exterior-historical-restoration.jpeg";
import featuredLead from "@/assets/images/REAL ESTATE/denver.jpeg";

// ── Topic card images ─────────────────────────────────────────────────────
import topicLease from "@/assets/images/REAL ESTATE/55_07035_02_N6_weblg.jpg";
import topicDispose from "@/assets/images/REAL ESTATE/Disposition-Strom-Thurmond-FB-CH_final1.jpg";
import topicConstruction from "@/assets/images/BUILDING/1800FHistoric1.jpg";
import topicPortfolio from "@/assets/images/REAL ESTATE/Print-Primary-Entrance-James-R-Browning-U-S-Court-Of-Appeals-Building_64c6f689-fd92-43d9-8e5b-3015e3095e55.fac96cfd8d3855b794e20e45f4adf2a6.avif";
import topicStandards from "@/assets/images/REAL ESTATE/making-federal-buildings-beautiful-again-opinion-phineas-harper-dezeen-sq.jpg";

// ── Photo card (image panel) images ───────────────────────────────────────
import chat1 from "@/assets/images/NEWS/01-Chattanooga-Rendering.jpg";
import chat2 from "@/assets/images/NEWS/GSA-Chattanooga-Courthouse-View-1-Georgia-Avenue-at-Ceremonial-Entry-Court-1900x1270-1.jpg";
import chat3 from "@/assets/images/NEWS/GSA-Chattanooga-View-3-Eastern-Oval-Overlook-Autumn-1900x1270-1.jpg";
import huntsvilleRendering from "@/assets/images/REAL ESTATE/Rendering-Huntsville-US-Courthouse-Front-View.JPG-scaled.jpg";

export const metadata: Metadata = {
  title: "Real Estate",
  description:
    "GSA manages a nationwide portfolio of federal buildings, courthouses, and land ports of entry — delivering workplaces that serve government and the public.",
};

const topics = [
  {
    href: "/real-estate/leasing",
    eyebrow: "Lease",
    title: "Lease Space",
    body: "GSA leases space on behalf of federal agencies across the country, serving as the government's expert real estate agent to secure safe, functional, and cost-effective workplaces.",
    src: topicLease,
    alt: "Federal office building exterior",
  },
  {
    href: "/real-estate/sales",
    eyebrow: "Disposition",
    title: "Disposition",
    body: "GSA is focused on rightsizing the federal real estate portfolio to reduce the burden on the American taxpayer while also delivering space that enables its agency customers to achieve their missions.",
    src: topicDispose,
    alt: "Strom Thurmond Federal Building and Courthouse",
  },
  {
    href: "/real-estate/design-construction",
    eyebrow: "Construction",
    title: "Construction",
    body: "GSA establishes and maintains design and construction standards for federal facilities through the Facilities Standards for the Public Buildings Service, known as P100.",
    src: topicConstruction,
    alt: "Historic photograph of construction at the 1800 F Street building",
  },
  {
    href: "/real-estate/portfolio",
    eyebrow: "Portfolio",
    title: "Portfolio Tools",
    body: "GSA's Portfolio Tools—including IOLP, the PBS Customer Dashboard, and disposal search tools—help federal agencies analyze, optimize, and right-size their real estate holdings.",
    src: topicPortfolio,
    alt: "Primary entrance of the James R. Browning U.S. Court of Appeals Building",
  },
  {
    href: "/preservation",
    eyebrow: "Preservation",
    title: "Preservation",
    body: "GSA stewards over 480 historic federal properties—courthouses, land ports of entry, and office buildings that represent some of America's most significant civic architecture.",
    src: topicStandards,
    alt: "Classical federal building facade with columns",
  },
];

const featured = [
  {
    src: featuredLead,
    alt: "Aerial view of a consolidated federal campus",
    headline: "Rightsizing the Federal Real Estate Portfolio",
    ctaText: "Read the announcement",
    ctaHref: "/news/rightsizing-federal-real-estate",
  },
  {
    src: story1,
    alt: "Rendering of the Brownsville-Gateway Land Port of Entry",
    headline: "Breaking Ground on a $300M Gateway at the Southern Border",
    ctaText: "Read the announcement",
    ctaHref: "/news/brownsville-gateway-port-groundbreaking",
  },
  {
    src: story2,
    alt: "Atrium gallery at the Huntsville federal courthouse",
    headline: "Lease Consolidation Cuts Deferred-Maintenance Backlog",
    ctaText: "Read more",
    ctaHref: "/news/lease-consolidation-program",
  },
  {
    src: story3,
    alt: "Exterior of a federally restored historic building",
    headline: "First Wave of Underutilized Buildings Heads to Auction",
    ctaText: "Read more",
    ctaHref: "/news/underutilized-buildings-sale",
  },
];

const stats = [
  { value: "360M", label: "Rentable square feet managed" },
  { value: "8,600+", label: "Owned & leased assets" },
  { value: "1,500+", label: "Federal buildings nationwide" },
  { value: "56", label: "States and territories served" },
];

// PBS roster per gsa.gov "Public Buildings Service leadership team" table
const leadership = [
  {
    name: "Michael Gelber",
    title: "Acting Commissioner, Public Buildings Service",
    initials: "MG",
    photoSrc: photoGelber,
    href: "/resources/leadership",
  },
  { name: "Andrew Heller", title: "Deputy Commissioner", initials: "AH" },
  { name: "Donna Dix", title: "Chief of Staff", initials: "DD" },
  { name: "Lisa Jones", title: "Senior Advisor", initials: "LJ" },
  {
    name: "Lisa Hua",
    title: "Director, Enterprise Strategy Division",
    initials: "LH",
  },
  {
    name: "Paige Warren",
    title: "Assistant Commissioner, Office of Portfolio Management",
    initials: "PW",
  },
  {
    name: "Glenn C. Rotondo",
    title: "Assistant Commissioner, Office of Program and Project Management",
    initials: "GR",
  },
  {
    name: "Chuck Hardy",
    title: "Assistant Commissioner, Office of Engineering",
    initials: "CH",
  },
  {
    name: "Crofton Whitfield",
    title: "Assistant Commissioner, Office of Leasing",
    initials: "CW",
  },
  {
    name: "Flavio Peres",
    title: "Assistant Commissioner, Office of Real Property Disposition",
    initials: "FP",
  },
  {
    name: "Liliana Delbonifro",
    title: "Acting Assistant Commissioner, Office of Acquisition Management",
    initials: "LD",
  },
  {
    name: "Aimee Whiteman",
    title: "Assistant Commissioner, Office of Client Strategy",
    initials: "AW",
  },
];

export default function RealEstatePage() {
  return (
    <CategoryPage
      section="Real Estate"
      accent="realestate"
      title="Federal Buildings Serve the American People"
      intro="GSA manages approximately 360 million rentable square feet of federal real estate — delivering safe, efficient, and inspiring workplaces for government agencies across the country."
      heroSrc={heroImg}
      heroAlt="Primary entrance of the James R. Browning U.S. Court of Appeals Building"
      stats={stats}
      wayfinder={REAL_ESTATE_WAYFINDER}
      topics={topics}
      pullQuote={{
        quote:
          "Great federal architecture is a public act — it tells the American people that their government is built to last.",
        attribution: "Edward C. Forst",
        role: "Administrator, U.S. General Services Administration",
      }}
      featured={featured}
      imagePanel={{
        images: [
          {
            src: chat2,
            alt: "Georgia Avenue ceremonial entry court at the Chattanooga courthouse",
          },
          {
            src: chat1,
            alt: "Front rendering of the new Chattanooga federal courthouse",
          },
          {
            src: huntsvilleRendering,
            alt: "Rendering of the new Huntsville U.S. Courthouse",
          },
          {
            src: chat3,
            alt: "Eastern oval overlook at the Chattanooga courthouse in autumn",
          },
        ],
        title: "Breaking Ground on a New Courthouse",
        body: "A classical landmark designed for security, efficiency, and an enduring civic presence.",
        ctaText: "See the latest",
        ctaHref: "/real-estate/design-construction",
      }}
      leadership={leadership}
      leadershipHeading="Public Buildings Service"
    />
  );
}
