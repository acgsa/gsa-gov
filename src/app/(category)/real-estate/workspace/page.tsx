import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardRequest from "@/assets/images/REAL ESTATE/_LEASE/CommCowork(36).png";
import cardPlan from "@/assets/images/REAL ESTATE/_LEASE/06-atrium-a-1875-penn-2.webp";
import cardOa from "@/assets/images/REAL ESTATE/_LEASE/Dais-CMR.jpg";
import cardStandards from "@/assets/images/REAL ESTATE/_LEASE/16-penthouse-int-1875-penn-2-scaled.webp";

const newsArticles = [
  getArticle("rightsizing-federal-real-estate"),
  getArticle("playbook"),
  getArticle("lease-consolidation-program"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Request Workspace | Real Estate",
  description:
    "Submit a space request to GSA for federal agency workspace needs.",
};

export default function WorkspacePage() {
  return (
    <TopicPage
      eyebrow="Real Estate"
      eyebrowHref="/real-estate"
      title="Requesting federal workspace"
      intro="Federal agencies can submit workspace requests to GSA to start the leasing or occupancy process for new or expanded space needs."
      cta={{ label: "Submit a space request", href: "#" }}
      cards={[
        {
          title: "Start a space request",
          body: "Submit your requirements through your GSA regional intake team — location, square footage, timeline, and any mission-specific needs.",
          src: cardRequest,
          alt: "Collaborative coworking space in a federal building",
          ctaText: "Start your request",
          ctaHref: "#",
        },
        {
          title: "Plan your requirements",
          body: "GSA helps agencies develop space plans, statements of requirements, and funding documentation before acquisition begins.",
          src: cardPlan,
          alt: "Atrium of a modern federal workspace",
          ctaText: "See what you'll need",
          ctaHref: "#",
        },
        {
          title: "Occupancy agreements",
          body: "The occupancy agreement is the financial arrangement between GSA and your agency — covering rent, term, and services for your assigned space.",
          src: cardOa,
          alt: "Conference room in a federal office building",
          ctaText: "Learn how OAs work",
          ctaHref: "#",
        },
        {
          title: "Workplace standards",
          body: "Federal workspace follows utilization benchmarks and design standards that keep space efficient, flexible, and mission-ready.",
          src: cardStandards,
          alt: "Modern interior workspace with open seating",
          ctaText: "Review the standards",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do space requests work?"
      faqs={[
        {
          question: "When should we engage GSA?",
          answer:
            "As early as possible — ideally 24 to 36 months before a lease expiration or planned move. Early engagement gives GSA time to develop an acquisition strategy that gets the best outcome.",
        },
        {
          question: "What does a complete request include?",
          answer:
            "An approved space plan, a statement of requirements, agency point-of-contact information, and funding documentation. GSA may also tour your current space to inform planning.",
        },
        {
          question: "Who pays for the space?",
          answer:
            "Agencies pay GSA through an occupancy agreement. For leased space, GSA remits rent to the private landlord; for owned space, payments support building operations and reinvestment.",
        },
        {
          question: "Can we request less space than we have today?",
          answer:
            "Yes. Many agencies consolidate when requirements change. GSA can run a utilization assessment and propose a right-sized footprint as part of the request process.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "Your assigned GSA account manager, or the Client Solutions team in your GSA region.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
