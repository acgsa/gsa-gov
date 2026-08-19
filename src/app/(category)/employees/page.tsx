import type { Metadata } from "next";
import { CategoryPage } from "@/templates/CategoryPage";
import heroImg from "@/assets/images/ED/G_MdgwuXQAEOB1l.jpg";
import story1 from "@/assets/images/ED/G_MdgwuXQAEOB1l.jpg";
import story2 from "@/assets/images/ED/G-FtLRmXEAAOSsj.jpg";
import story3 from "@/assets/images/ED/679554348_1512411687598557_6390952340232881774_n.jpg";

// ── Topic card images ─────────────────────────────────────────────────────
import topicInsite from "@/assets/images/BUILDING/GSA-Building-Blue-scaled.jpg";
import topicPolicies from "@/assets/images/ED/G_MdgwuXgAARa8P.jpg";
import topicTraining from "@/assets/images/ED/G-o6YxlX0AAJPD1.jpg";
import topicTools from "@/assets/images/1800F/GettyImages-2196638543.webp";
import topicFleet from "@/assets/images/USA/photo-1501466044931-62695aada8e9.avif";
import goGovLogo from "@/assets/brands/Go.gov Logo_COLOR.png";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Tools, policies, and support services for the GSA workforce — from workplace policies and benefits to training and internal programs.",
};

const topics = [
  {
    href: "/insite",
    eyebrow: "Portal",
    title: "InSite",
    body: "GSA's internal employee portal — your hub for news, resources, and tools to get your work done.",
    src: topicInsite,
    alt: "GSA headquarters building",
  },
  {
    href: "https://go.gov",
    eyebrow: "Travel",
    title: "GO.gov",
    body: "Look up per diem rates, book official travel, and access the Federal Travel Regulation — all through GSA's federal travel resource.",
    src: goGovLogo,
    alt: "GO.gov — the federal government's travel and per diem resource",
    imageStyle: "contain" as const,
  },
  {
    href: "/employees/policies",
    eyebrow: "Policy",
    title: "Workplace Policies",
    body: "Current GSA workplace policies covering telework, conduct, safety, and federal employment standards.",
    src: topicPolicies,
    alt: "GSA staff reviewing workplace policy materials",
  },
  {
    href: "/employees/training",
    eyebrow: "Development",
    title: "Training & Development",
    body: "Learning resources, mandatory training, and career development programs for GSA employees.",
    src: topicTraining,
    alt: "GSA staff in a training session",
  },
  {
    href: "/employees/tools",
    eyebrow: "Support",
    title: "Employee Tools",
    body: "IT support, HR assistance, and the everyday tools GSA employees rely on — all in one place.",
    src: topicTools,
    alt: "GSA employee workspace with everyday tools",
  },
  {
    href: "/employees/fleet",
    eyebrow: "Fleet",
    title: "GSA Fleet",
    body: "Vehicle leasing, maintenance, and fleet management resources for federal agencies and drivers.",
    src: topicFleet,
    alt: "GSA fleet vehicles ready for federal service",
  },
];

const featured = [
  {
    src: story1,
    alt: "GSA employees at a workplace event",
    eyebrow: "Fleet",
    headline: "Federal Fleet Right-Sizing Returns 12,000 Vehicles",
    ctaText: "Read more",
    ctaHref: "/news/federal-fleet-right-sizing",
  },
  {
    src: story2,
    alt: "GSA staff engaged in a training session",
    eyebrow: "Travel",
    headline: "Federal Travel Spend Falls 40% Under New Reforms",
    ctaText: "Read more",
    ctaHref: "/news/federal-travel-reform",
  },
  {
    src: story3,
    alt: "GSA leadership at a press conference",
    eyebrow: "Travel",
    headline: "GSA Modernizes Per Diem Rates for 2026 Travel Season",
    ctaText: "Read more",
    ctaHref: "/news/per-diem-rate-modernization",
  },
];

const stats = [
  { value: "4.6M", label: "Federal travelers supported" },
  { value: "200K+", label: "Vehicles in the federal fleet" },
  { value: "$1B+", label: "In annual travel savings" },
  { value: "24/7", label: "Traveler support" },
];

export default function EmployeesPage() {
  return (
    <CategoryPage
      section="Resources"
      accent="employees"
      title="Empowering the People Who Power Government"
      intro="GSA supports its workforce with the tools, policies, and resources needed to deliver excellent public service — from day one and throughout every career."
      heroSrc={heroImg}
      heroAlt="GSA employees at an event"
      stats={stats}
      topics={topics}
      pullQuote={{
        quote:
          "The people who serve the public deserve tools that work as hard as they do.",
        attribution: "U.S. General Services Administration",
      }}
      featured={featured}
    />
  );
}
