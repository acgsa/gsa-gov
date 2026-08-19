import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardExcellence from "@/assets/images/REAL ESTATE/James_R_Browning_Courthouse_Courtroom_1_Wall.jpeg";
import cardStandards from "@/assets/images/BUILDING/1800FArchitecture2.jpg";
import cardProjects from "@/assets/images/NEWS/01-Chattanooga-Rendering.jpg";
import cardArt from "@/assets/images/REAL ESTATE/1st-floor-corridor-james-r-browning-us-court-of-appeals-building-san-francisco-1dc993-1024.jpg";

const newsArticles = [
  getArticle("brownsville-gateway-port-groundbreaking"),
  getArticle("rightsizing-federal-real-estate"),
  getArticle("lease-consolidation-program"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Construction | Real Estate",
  description:
    "GSA designs and constructs federal buildings, courthouses, and land ports of entry that serve their communities and stand the test of time.",
};

export default function DesignConstructionPage() {
  return (
    <TopicPage
      eyebrow="Real Estate"
      eyebrowHref="/real-estate"
      title="Building for the public"
      intro="GSA designs and constructs federal buildings, courthouses, and land ports of entry that serve their communities and stand the test of time."
      cta={{ label: "Explore current projects", href: "#" }}
      cards={[
        {
          title: "Design Excellence",
          body: "GSA pairs world-class architects and artists with federal building projects to create lasting civic landmarks that reflect the dignity of public service.",
          src: cardExcellence,
          alt: "Ornate courtroom in the James R. Browning U.S. Court of Appeals Building",
          ctaText: "About the program",
          ctaHref: "#",
        },
        {
          title: "Facilities Standards (P100)",
          body: "The P100 sets mandatory design and construction criteria for every GSA project — architecture, structural systems, mechanical and electrical, accessibility, and security.",
          src: cardStandards,
          alt: "Architectural detail of the 1800 F Street building",
          ctaText: "Read the standards",
          ctaHref: "#",
        },
        {
          title: "Projects under construction",
          body: "From new courthouses to modernized land ports of entry, GSA manages a nationwide construction pipeline in every stage from design to occupancy.",
          src: cardProjects,
          alt: "Rendering of the Chattanooga federal courthouse",
          ctaText: "See the pipeline",
          ctaHref: "#",
        },
        {
          title: "Art in Architecture",
          body: "GSA reserves a portion of construction costs to commission American artists, building one of the nation's largest public art collections.",
          src: cardArt,
          alt: "First-floor corridor of the James R. Browning U.S. Court of Appeals Building",
          ctaText: "Explore the collection",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does federal construction work?"
      faqs={[
        {
          question: "What is the P100?",
          answer:
            "The Facilities Standards for the Public Buildings Service — P100 — establishes mandatory design criteria for all GSA projects: new construction, major renovations, and leased space. It is updated on a regular cycle to reflect current codes, energy requirements, and lessons learned.",
        },
        {
          question: "How are architects and builders selected?",
          answer:
            "Through competitive procurement. Design Excellence projects use a qualifications-based selection that pairs outstanding architects with federal projects, with peer review throughout design.",
        },
        {
          question: "Do federal buildings follow local building codes?",
          answer:
            "GSA acts as its own code authority. The P100 incorporates national model codes and often exceeds local requirements for accessibility, energy, and resilience.",
        },
        {
          question: "How are projects funded?",
          answer:
            "Construction is funded through congressional appropriations to the Federal Buildings Fund. Larger prospectus-level projects require specific authorization by Congress.",
        },
        {
          question: "Can my firm work on GSA projects?",
          answer:
            "Yes. Design, construction, and construction-management opportunities are advertised on SAM.gov. Small business set-asides apply to many procurements.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "The Office of Design and Construction in GSA's Public Buildings Service, or the project team listed in the relevant SAM.gov solicitation.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
