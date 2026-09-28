import type { Metadata } from "next";
import { CategoryPage } from "@/templates/CategoryPage";
import heroImg from "@/assets/images/REAL ESTATE/Print-Primary-Entrance-James-R-Browning-U-S-Court-Of-Appeals-Building_64c6f689-fd92-43d9-8e5b-3015e3095e55.fac96cfd8d3855b794e20e45f4adf2a6.avif";
import story1 from "@/assets/images/IMAGE PANEL/136416728_web1_Rendering---Exterior---Pedestrian-Walkway.jpg";
import story2 from "@/assets/images/REAL ESTATE/huntsville-courthouse-atrium-gallery.jpg";
import story3 from "@/assets/images/REAL ESTATE/exterior-historical-restoration.jpeg";

export const metadata: Metadata = {
  title: "Real Estate",
  description:
    "GSA manages a nationwide portfolio of federal buildings, courthouses, and land ports of entry — delivering workplaces that serve government and the public.",
};

const topics = [
  {
    href: "/real-estate/workplace-optimization",
    eyebrow: "Workplace",
    title: "Workplace Optimization",
    body: "Strategies and tools to help agencies right-size and modernize their federal workspace.",
  },
  {
    href: "/real-estate/oasis",
    eyebrow: "Data",
    title: "Space Inventory System (OASIS)",
    body: "Real-time occupancy and utilization data across the federal real estate portfolio.",
  },
  {
    href: "/real-estate/portfolio",
    eyebrow: "Portfolio",
    title: "Federal Portfolio Overview",
    body: "360 million rentable square feet of federally owned and leased properties nationwide.",
  },
  {
    href: "/real-estate/disposal",
    eyebrow: "Disposal",
    title: "Property Disposition",
    body: "A transparent pipeline of surplus federal properties available for transfer or sale.",
  },
  {
    href: "/real-estate/historic",
    eyebrow: "Preservation",
    title: "Historic Preservation",
    body: "GSA stewards some of America's most architecturally significant federal buildings.",
  },
  {
    href: "/real-estate/sustainability",
    eyebrow: "Sustainability",
    title: "Sustainability & Energy",
    body: "Federal buildings meeting the highest standards for energy efficiency and resilience.",
  },
];

const featured = [
  {
    src: story1,
    alt: "Rendering of the Brownsville-Gateway Land Port of Entry",
    eyebrow: "Ports of Entry",
    headline: "Breaking Ground on a $300M South Texas Port of Entry",
    ctaText: "Read the announcement",
    ctaHref: "/real-estate/1800f",
  },
  {
    src: story2,
    alt: "Atrium gallery at the Huntsville federal courthouse",
    eyebrow: "Design Excellence",
    headline:
      "New Huntsville Courthouse Sets a Standard for Federal Architecture",
    ctaText: "See the project",
    ctaHref: "/real-estate/chattanooga",
  },
  {
    src: story3,
    alt: "Exterior of a federally restored historic building",
    eyebrow: "Historic Preservation",
    headline:
      "Restoring Federal Buildings for the Next Century of Public Service",
    ctaText: "Learn more",
    ctaHref: "/real-estate/historic",
  },
];

export default function RealEstatePage() {
  return (
    <CategoryPage
      section="Real Estate"
      title="Federal Buildings That Serve the American People"
      intro="GSA manages approximately 360 million rentable square feet of federal real estate — delivering safe, efficient, and inspiring workplaces for government agencies across the country."
      heroSrc={heroImg}
      heroAlt="Primary entrance of the James R. Browning U.S. Court of Appeals Building"
      topics={topics}
      featured={featured}
    />
  );
}
