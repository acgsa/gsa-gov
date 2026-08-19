import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardStewardship from "@/assets/images/REAL ESTATE/exterior-historical-restoration.jpeg";
import cardProjects from "@/assets/images/REAL ESTATE/making-federal-buildings-beautiful-again-opinion-phineas-harper-dezeen-sq.jpg";
import cardStandards from "@/assets/images/REAL ESTATE/James_R_Browning_Courthouse_Courtroom_1_Wall.jpeg";
import cardAccess from "@/assets/images/REAL ESTATE/1st-floor-corridor-james-r-browning-us-court-of-appeals-building-san-francisco-1dc993-1024.jpg";

const newsArticles = [
  getArticle("underutilized-buildings-sale"),
  getArticle("rightsizing-federal-real-estate"),
  getArticle("brownsville-gateway-port-groundbreaking"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Preservation | Real Estate",
  description:
    "GSA's design excellence and historic preservation standards guide the quality and stewardship of federal buildings nationwide.",
};

export default function PreservationPage() {
  return (
    <TopicPage
      eyebrow="Real Estate"
      eyebrowHref="/real-estate"
      title="Preserving America's civic landmarks"
      intro="GSA stewards more than 480 historic federal properties — courthouses, land ports of entry, and office buildings that represent some of the nation's most significant civic architecture."
      cta={{ label: "Explore historic buildings", href: "#" }}
      cards={[
        {
          title: "Historic stewardship",
          body: "Under the National Historic Preservation Act, GSA identifies, evaluates, and nominates its historic properties to the National Register — and protects them for future generations.",
          src: cardStewardship,
          alt: "Exterior of a federally restored historic building",
          ctaText: "Our preservation mission",
          ctaHref: "#",
        },
        {
          title: "Current restoration projects",
          body: "Façade restorations, seismic upgrades, and system modernizations — completed in a manner that respects and reinforces historic character.",
          src: cardProjects,
          alt: "Classical federal building facade with columns",
          ctaText: "See the projects",
          ctaHref: "#",
        },
        {
          title: "Preservation standards",
          body: "Technical guidance for working on historic federal buildings — from window repair and materials to accessibility and energy retrofits.",
          src: cardStandards,
          alt: "Ornate courtroom in the James R. Browning U.S. Court of Appeals Building",
          ctaText: "Read the standards",
          ctaHref: "#",
        },
        {
          title: "Use a historic building",
          body: "Historic federal buildings offer distinctive space for agencies — and, in some cases, venues for public events and filming.",
          src: cardAccess,
          alt: "First-floor corridor of the James R. Browning U.S. Court of Appeals Building",
          ctaText: "Learn about access",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does preservation work?"
      faqs={[
        {
          question: "How many historic buildings does GSA steward?",
          answer:
            "More than 480 properties listed on or eligible for the National Register of Historic Places — spanning over a century of American architecture, from 1890s Romanesque Revival courthouses to postwar Modernist office buildings.",
        },
        {
          question: "What is Section 106 review?",
          answer:
            "A consultation process required before federal projects that could affect historic properties. GSA works with the Advisory Council on Historic Preservation, State Historic Preservation Offices, and local communities before work begins.",
        },
        {
          question: "Can historic buildings be modernized?",
          answer:
            "Yes. GSA regularly completes seismic upgrades, mechanical modernization, and accessibility improvements using approaches and materials that preserve historic character.",
        },
        {
          question: "Can the public visit historic federal buildings?",
          answer:
            "Many are open to the public during business hours, and several offer tours or host public events. Access varies by building and security requirements.",
        },
        {
          question: "Can historic properties be sold?",
          answer:
            "Yes. When a historic property leaves the federal portfolio, preservation covenants typically run with the deed, ensuring its character is protected under new ownership.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "The regional historic preservation officer in your GSA region, or the Center for Historic Buildings in GSA's Public Buildings Service.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
