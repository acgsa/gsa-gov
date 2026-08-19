import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardOccupancies from "@/assets/images/REAL ESTATE/_LEASE/Meeting-Lobby.jpg";
import cardExcess from "@/assets/images/REAL ESTATE/_LEASE/image(9).png";

const newsArticles = [
  getArticle("rightsizing-federal-real-estate"),
  getArticle("lease-consolidation-program"),
  getArticle("underutilized-buildings-sale"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Portfolio Tools | Real Estate",
  description:
    "The Public Buildings Service follows a collaborative and strategic portfolio planning process to address agency occupancy needs while maximizing space utilization.",
};

export default function PortfolioPage() {
  return (
    <TopicPage
      eyebrow="Real Estate"
      eyebrowHref="/real-estate"
      title="Planning for your space needs"
      intro="The Public Buildings Service follows a collaborative and strategic portfolio planning process — addressing agency occupancy needs and excess space with a proactive, government-wide approach."
      cta={{ label: "Submit your space requirements", href: "#" }}
      cards={[
        {
          title: "New or existing occupancies",
          body: "Submit your space requirements for new or existing occupancies — covering space intake, strategic requirements, and client project agreements.",
          src: cardOccupancies,
          alt: "Modern federal office lobby with meeting spaces",
          ctaText: "Submit space requirements",
          ctaHref: "#",
        },
        {
          title: "Underutilized or excess space",
          body: "Notify GSA of underutilized or excess space through space releases and space match. Only authorized agency personnel should enter information.",
          src: cardExcess,
          alt: "Modern open workspace in a federal building",
          ctaText: "Notify GSA of excess space",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does portfolio planning work?"
      faqs={[
        {
          question: "Why follow the portfolio planning process?",
          answer:
            "Following the process matters for both PBS and your agency: it decreases spending, decreases space, and ensures space is used more efficiently as required by the USE IT Act.",
        },
        {
          question: "How are projects prioritized?",
          answer:
            "Together, GSA and your agency prioritize the projects that make the biggest difference for both your agency and the federal government — a more efficient and strategic process for federal real estate requirements.",
        },
        {
          question: "What does the process cover?",
          answer:
            "The process ensures everyone is aligned on deadlines, terminology, and responsibilities as your agency's space needs are addressed — from space intake and strategic requirements through client project agreements.",
        },
        {
          question: "How do I report underutilized or excess space?",
          answer:
            "Authorized agency personnel notify GSA through space releases and space match, which help return underutilized space to productive use across the federal portfolio.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "Your GSA regional Client Solutions team can walk your agency through the portfolio planning process and connect you with the right portfolio specialist.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
