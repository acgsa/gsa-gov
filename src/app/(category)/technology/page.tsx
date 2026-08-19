import type { Metadata } from "next";
import { CategoryPage } from "@/templates/CategoryPage";
import { TECHNOLOGY_WAYFINDER } from "@/lib/wayfinder-data";
import { getSolutionsFor } from "@/lib/gsa-solutions";
import davidShive from "@/assets/images/LEADERSHIP/ph-DavidShive-150x170.jpg";
import gregBarbaccia from "@/assets/images/LEADERSHIP/bio-gregb.jpeg";
import heroImg from "@/assets/images/TECH/photo-1684139517679-032b7213ad2e.avif";
import story1 from "@/assets/images/TECH/photo-1717501219604-cc1902b5d845.avif";
import story2 from "@/assets/images/TECH/photo-1718011087751-e82f1792aa32.avif";
import story3 from "@/assets/images/TECH/photo-1694327876207-15246f69b411.avif";

// ── Topic card images ─────────────────────────────────────────────────────
import topicAi from "@/assets/images/TECH/photo-1731845417447-1d249f5c5ffa.avif";
import topicTransformation from "@/assets/images/TECH/photo-1697033300784-6c9d143a30e2.avif";
import topicPlatforms from "@/assets/images/TECH/photo-1717501219716-b93a67d2f7b2.avif";
import topicServices from "@/assets/images/TECH/photo-1750055263758-f4b95c4a0814.avif";
import topicIt from "@/assets/images/TECH/photo-1761058239857-d866c603fafb.avif";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "GSA modernizes federal technology through secure cloud platforms, AI enablement, and shared services that scale government capabilities nationwide.",
};

const topics = [
  {
    href: "/technology/ai",
    eyebrow: "AI",
    title: "Artificial Intelligence",
    body: "Secure, government-approved AI tools, guidance, and platforms that help agencies adopt artificial intelligence responsibly.",
    src: topicAi,
    alt: "Abstract visualization of artificial intelligence systems",
  },
  {
    href: "/technology/it",
    eyebrow: "IT",
    title: "Information Technology",
    body: "Pre-competed IT contract vehicles and professional services for fast, compliant technology acquisition.",
    src: topicIt,
    alt: "Abstract visualization of federal IT infrastructure",
  },
  {
    href: "/technology/services",
    eyebrow: "Services",
    title: "Shared Services",
    body: "Shared technology services any agency can adopt to serve the public faster, safer, and at lower cost.",
    src: topicServices,
    alt: "Abstract network of shared digital services",
  },
  {
    href: "/technology/tts",
    eyebrow: "TTS",
    title: "TTS",
    body: "GSA's Technology Transformation Services helps agencies build and buy technology that serves people — faster, better, and at lower cost.",
    src: topicTransformation,
    alt: "Abstract representation of digital transformation",
  },
  {
    href: "/technology/platforms",
    eyebrow: "Platforms",
    title: "Powered by GSA",
    body: "Shared technology platforms — identity, hosting, and publishing — that reduce duplication and accelerate delivery.",
    src: topicPlatforms,
    alt: "Abstract cloud platform infrastructure visualization",
  },
];

const featured = [
  {
    src: story1,
    alt: "Abstract visualization of AI systems and data networks",
    eyebrow: "Technology",
    headline: "FedRAMP 20x Saves $504M Across Agencies",
    ctaText: "Read the announcement",
    ctaHref: "/news/fedramp-20x-504m-savings",
  },
  {
    src: story2,
    alt: "Cloud infrastructure and security visualization",
    eyebrow: "Technology",
    headline: "FedRAMP 20x Cuts Cloud Authorization Time to Weeks",
    ctaText: "Read more",
    ctaHref: "/news/fedramp-20x-launch",
  },
  {
    src: story3,
    alt: "Digital identity and secure access visualization",
    eyebrow: "Technology",
    headline:
      "USAi Brings Secure Generative AI to 3.4 Million Federal Employees",
    ctaText: "Read more",
    ctaHref: "/news/usai-platform-expansion",
  },
];

const stats = [
  { value: "3.4M", label: "Federal employees on AI tools" },
  { value: "80%", label: "Faster cloud authorization" },
  { value: "50M", label: "Verified Login.gov accounts" },
  { value: "200+", label: "Agencies served" },
];

const leadership = [
  {
    name: "David A. Shive",
    title: "Chief Information Officer, Office of the Chief Information Officer",
    initials: "DS",
    photoSrc: davidShive,
    href: "/resources/leadership",
  },
  {
    name: "Gregory Barbaccia",
    title:
      "Acting Director and Senior Advisor to the Administrator, Technology Transformation Services",
    initials: "GB",
    photoSrc: gregBarbaccia,
    href: "/resources/leadership",
  },
  {
    name: "Pete Waterman",
    title: "Acting Deputy Director for Technology",
    initials: "PW",
  },
  {
    name: "Cristina Brydges",
    title: "Acting Deputy Director for Operations",
    initials: "CB",
  },
  {
    name: "Jennifer Rostami",
    title: "Assistant Commissioner, Office of Technology Talent",
    initials: "JR",
  },
  {
    name: "Akanksha Sharma",
    title:
      "Assistant Commissioner, Office of Awards, Regulatory & Oversight Systems",
    initials: "AS",
  },
  {
    name: "Gregory Hogan",
    title: "Acting Assistant Commissioner, Office of Login",
    initials: "GH",
  },
  { name: "Zach Whitman", title: "Chief AI Scientist", initials: "ZW" },
];

export default function TechnologyPage() {
  return (
    <CategoryPage
      section="Technology"
      accent="technology"
      title="Modern Technology for a Modern Government"
      intro="GSA accelerates AI adoption, secures cloud infrastructure, and builds shared platforms that help federal agencies deliver faster, safer, and more effective public services."
      heroSrc={heroImg}
      heroAlt="Abstract visualization representing federal cloud modernization and AI enablement"
      stats={stats}
      wayfinder={TECHNOLOGY_WAYFINDER}
      topics={topics}
      solutions={getSolutionsFor("/technology")}
      pullQuote={{
        quote:
          "When one agency solves a hard technology problem, every agency should benefit. That's the promise of shared services.",
        attribution: "GSA Technology Transformation Services",
      }}
      featured={featured}
      leadership={leadership}
      leadershipHeading="Technology Transformation Services Leadership"
    />
  );
}
