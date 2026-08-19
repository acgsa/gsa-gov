import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardBenchmarks from "@/assets/images/REAL ESTATE/DC0523AB.jpg";
import cardConsolidation from "@/assets/images/REAL ESTATE/denver.jpeg";
import cardData from "@/assets/images/REAL ESTATE/NY0131ZZ.jpg";
import cardStart from "@/assets/images/BUILDING/GSA-Building-Blue-scaled.jpg";

const newsArticles = [
  getArticle("rightsizing-federal-real-estate"),
  getArticle("underutilized-buildings-sale"),
  getArticle("lease-consolidation-program"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Workplace Optimization | Real Estate",
  description:
    "GSA helps federal agencies right-size and modernize their workspace through data-driven strategies and federal workplace standards.",
};

export default function WorkplaceOptimizationPage() {
  return (
    <TopicPage
      eyebrow="Real Estate"
      eyebrowHref="/real-estate"
      title="Right-sizing the federal footprint"
      intro="GSA partners with agencies to measure utilization, consolidate space, and deliver workplaces aligned to the modern federal workforce."
      cta={{ label: "See utilization data", href: "#" }}
      cards={[
        {
          title: "Utilization benchmarks",
          body: "Governmentwide targets guide how much space agencies should occupy — 150 square feet or fewer per person in open office environments.",
          src: cardBenchmarks,
          alt: "Federal office building in Washington, D.C.",
          ctaText: "Review the benchmarks",
          ctaHref: "#",
        },
        {
          title: "Consolidation projects",
          body: "Buildings below 60 percent utilization are prioritized for consolidation — cutting rent, maintenance backlogs, and operating costs.",
          src: cardConsolidation,
          alt: "Aerial view of a consolidated federal campus",
          ctaText: "See active projects",
          ctaHref: "#",
        },
        {
          title: "Occupancy data",
          body: "OASIS, GSA's system of record, tracks utilization across more than 8,000 federally occupied buildings using survey and badge-based data.",
          src: cardData,
          alt: "Federal office building in New York",
          ctaText: "Explore the data",
          ctaHref: "#",
        },
        {
          title: "Get started",
          body: "Your GSA regional Client Solutions team will run a baseline assessment, deliver a utilization report, and propose a phased plan.",
          src: cardStart,
          alt: "GSA headquarters building",
          ctaText: "Contact your region",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does optimization work?"
      faqs={[
        {
          question: "What counts as underutilized space?",
          answer:
            "GSA flags buildings below 60 percent utilization for consolidation review. Utilization is measured through occupancy surveys and badge-based access data, adjusted for telework patterns.",
        },
        {
          question: "What are the utilization targets?",
          answer:
            "Current benchmarks call for 150 square feet or fewer per person in open office environments, with telework-adjusted models for hybrid and remote-capable roles.",
        },
        {
          question: "Where does the data come from?",
          answer:
            "The Occupancy Agreement Space Inventory System (OASIS) — GSA's system of record linking space assignments, occupancy agreements, and utilization metrics across the portfolio.",
        },
        {
          question: "What does an optimization project involve?",
          answer:
            "GSA conducts a baseline assessment, develops a utilization report, and proposes a phased consolidation or modernization plan. Major changes require an approved occupancy agreement amendment.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "Your assigned GSA Regional Client Solutions Team, which coordinates assessments and connects you with workplace and portfolio specialists.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
