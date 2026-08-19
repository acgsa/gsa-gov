import type { Metadata } from "next";
import { CategoryPage } from "@/templates/CategoryPage";
import { ACQUISITION_WAYFINDER } from "@/lib/wayfinder-data";
import lauraStanton from "@/assets/images/LEADERSHIP/ph-LauraStanton-150x170_2.jpg";
import heroImg from "@/assets/images/ACCOUNTABILITY/pexels-ramazphotos-7016957.jpg";
import story1 from "@/assets/images/ACCOUNTABILITY/pexels-ramazphotos-7016965.jpg";
import story2 from "@/assets/images/ACCOUNTABILITY/photo-1562902982-5542bb25e4b6.avif";
import story3 from "@/assets/images/ACCOUNTABILITY/pexels-dibert-16151394.jpg";

// ── Topic card images ─────────────────────────────────────────────────────
import topicBuy from "@/assets/images/ACQUISITION/photo-1554638263-c62cbd0a1dcc.avif";
import topicSell from "@/assets/images/ACQUISITION/photo-1564182910280-00e8bae1bfeb.avif";
import topicAssisted from "@/assets/images/ACQUISITION/photo-1494412519320-aa613dfb7738.avif";
import topicPolicy from "@/assets/images/ACCOUNTABILITY/photo-1562902982-5542bb25e4b6.avif";
import topicSchedules from "@/assets/images/ACCOUNTABILITY/pexels-ramazphotos-32314507.jpg";

export const metadata: Metadata = {
  title: "Acquisition",
  description:
    "GSA delivers smarter contracting, category management, and acquisition tools that help federal agencies buy better and spend less.",
};

const topics = [
  {
    href: "/acquisition/buy-products",
    eyebrow: "Buy",
    title: "Buy Products",
    body: "Access millions of commercial products and services through GSA's pre-negotiated contracts and online purchasing platforms.",
    src: topicBuy,
    alt: "Commercial products moving through a distribution facility",
  },
  {
    href: "/acquisition/sell-to-government",
    eyebrow: "Sell",
    title: "Sell to Government",
    body: "Learn how to become a GSA contractor and reach thousands of federal buyers actively purchasing in your category.",
    src: topicSell,
    alt: "Business owner preparing products for federal contracts",
  },
  {
    href: "/acquisition/assisted-acquisition",
    eyebrow: "Assisted Acquisition",
    title: "Assisted Acquisition",
    body: "Full-service acquisition support — GSA plans, awards, and manages complex procurements on behalf of agencies.",
    src: topicAssisted,
    alt: "Acquisition professionals collaborating on a procurement",
  },
  {
    href: "/acquisition/policy",
    eyebrow: "Policy",
    title: "Policy",
    body: "Acquisition policy, guidance, and category management resources for federal contracting officers and program managers.",
    src: topicPolicy,
    alt: "Federal acquisition policy documents under review",
  },
  {
    href: "/acquisition/schedules",
    eyebrow: "Schedules",
    title: "Schedules",
    body: "Pre-negotiated Multiple Award Schedules giving federal agencies access to commercial products and services.",
    src: topicSchedules,
    alt: "Contract schedule data and analytics on screen",
  },
];

const featured = [
  {
    src: story1,
    alt: "Federal acquisition professionals reviewing contract documents",
    eyebrow: "Fraud Prevention",
    headline: "GSA Joins the White House Fraud Task Force",
    ctaText: "Read the announcement",
    ctaHref: "/news/gsa-white-house-fraud-task-force",
  },
  {
    src: story2,
    alt: "Contractors and federal staff collaborating on procurement",
    eyebrow: "Fraud Prevention",
    headline: "GSA Analytics Flag $2.1B in Improper Payments",
    ctaText: "Read more",
    ctaHref: "/news/improper-payments-recovery",
  },
  {
    src: story3,
    alt: "Government procurement data and analytics dashboard",
    eyebrow: "Acquisition",
    headline: "OneGov Contracting Framework Goes Live",
    ctaText: "Read more",
    ctaHref: "/news/onegov-contracting-framework",
  },
];

const stats = [
  { value: "$75B+", label: "In annual contract volume" },
  { value: "12,000+", label: "Schedule contract holders" },
  { value: "30%+", label: "Small business participation" },
  { value: "24", label: "MAS large categories" },
];

// FAS roster per gsa.gov "Federal Acquisition Service leadership" section
const leadership = [
  {
    name: "Laura Stanton",
    title: "Acting Commissioner, Federal Acquisition Service",
    initials: "LS",
    photoSrc: lauraStanton,
    href: "/resources/leadership",
  },
  {
    name: "Matthew Batzel",
    title: "Associate Administrator, Office of Government-wide Policy",
    initials: "MB",
  },
  { name: "Stephanie Shutt", title: "Chief of Staff", initials: "SS" },
  {
    name: "Lawrence Hale",
    title:
      "Assistant Commissioner, Office of Acquisitions Solutions Development",
    initials: "LH",
  },
  {
    name: "Pete Burr",
    title: "Assistant Commissioner, Office of Assisted Acquisition Services",
    initials: "PB",
  },
  {
    name: "Joseph Nickerson",
    title: "AAS Army Client Executive",
    initials: "JN",
  },
  {
    name: "Darrick Early",
    title: "AAS Civilian Client Executive",
    initials: "DE",
  },
  {
    name: "Corey Nickens",
    title: "AAS Innovation Client Executive",
    initials: "CN",
  },
  {
    name: "Mark Lee",
    title: "Assistant Commissioner, Office of Business Optimization",
    initials: "ML",
  },
  {
    name: "Thomas Meiron",
    title: "Assistant Commissioner, Office of Centralized Acquisition Services",
    initials: "TM",
  },
  {
    name: "Jeffrey Lau",
    title: "Assistant Commissioner, Office of Shared Services Delivery",
    initials: "JL",
  },
  {
    name: "Christina Kingsland",
    title:
      "Deputy Assistant Commissioner and Executive Director, Fleet Management",
    initials: "CK",
  },
  {
    name: "Wendy Johnston",
    title: "Acting Executive Director, Portfolio Management",
    initials: "WJ",
  },
  {
    name: "Rebecca Koses",
    title: "Acting Executive Director, Contracting Operations",
    initials: "RK",
  },
  {
    name: "Sheri Meadema",
    title: "Executive Director, Shared Program Operations",
    initials: "SM",
  },
  {
    name: "Ryan Schrank",
    title: "Acting Executive Director, Supply Management",
    initials: "RS",
  },
];

export default function AcquisitionPage() {
  return (
    <CategoryPage
      section="Acquisition"
      accent="acquisition"
      title="Smarter Buying for the Federal Government"
      intro="GSA delivers pre-negotiated contracts, category management tools, and acquisition guidance that help federal agencies buy better, faster, and at lower cost."
      heroSrc={heroImg}
      heroAlt="Federal acquisition professionals reviewing contract documents"
      stats={stats}
      wayfinder={ACQUISITION_WAYFINDER}
      topics={topics}
      pullQuote={{
        quote:
          "Every dollar the government spends well is a dollar returned to the mission — and to the taxpayer.",
        attribution: "GSA Federal Acquisition Service",
      }}
      featured={featured}
      leadership={leadership}
      leadershipHeading="Federal Acquisition Service Leadership"
    />
  );
}
