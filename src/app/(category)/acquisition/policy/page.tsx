import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardGuidance from "@/assets/images/ACQUISITION/pexels-dibert-16151394.jpg";
import cardCategory from "@/assets/images/ACQUISITION/pexels-melih-akkus-679376803-29849777.jpg";
import cardData from "@/assets/images/ACQUISITION/pexels-rostislav-34281360.jpg";
import cardGuides from "@/assets/images/ACQUISITION/pexels-ramazphotos-7016965.jpg";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("gsa-white-house-fraud-task-force"),
  getArticle("procurement-analytics-platform"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Policy | Acquisition",
  description:
    "Acquisition policy, guidance, and category management resources for federal contracting officers and program managers.",
};

export default function PolicyPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Buying smarter, governmentwide"
      intro="GSA develops and maintains acquisition policy, guidance, and category management practices that help the federal government buy smarter, reduce duplication, and deliver measurable savings."
      cta={{ label: "Browse acquisition guidance", href: "#" }}
      cards={[
        {
          title: "Acquisition guidance",
          body: "Acquisition letters, policy updates, and regulatory guidance that clarify requirements and promote consistent, compliant use of GSA contract vehicles.",
          src: cardGuidance,
          alt: "Contracting officer reviewing acquisition guidance",
          ctaText: "Read the latest",
          ctaHref: "#",
        },
        {
          title: "Category management",
          body: "Managing governmentwide spending in common categories as an enterprise — better prices, improved outcomes, and less duplication.",
          src: cardCategory,
          alt: "Federal spending category analysis",
          ctaText: "How it works",
          ctaHref: "#",
        },
        {
          title: "Data & tools",
          body: "Spend data, benchmarks, and best-in-class contract solutions that agencies use to meet their category management goals.",
          src: cardData,
          alt: "Procurement data dashboard",
          ctaText: "Explore the tools",
          ctaHref: "#",
        },
        {
          title: "Ordering guides",
          body: "Ordering guides and frequently asked questions that keep contracting professionals current with governmentwide requirements.",
          src: cardGuides,
          alt: "Acquisition professional consulting an ordering guide",
          ctaText: "Find your guide",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does acquisition policy work?"
      faqs={[
        {
          question: "What is category management?",
          answer:
            "The practice of managing governmentwide spending in common categories as an enterprise rather than as thousands of individual agency purchases — delivering better prices, improved outcomes, and reduced duplication.",
        },
        {
          question: "Where do I find acquisition letters?",
          answer:
            "GSA publishes acquisition letters, policy updates, and regulatory guidance for contracting officers and program managers, with the latest documents available alongside ordering guides and FAQs.",
        },
        {
          question: "Who does GSA acquisition policy apply to?",
          answer:
            "Guidance governs the use of GSA contract vehicles governmentwide, supporting contracting officers and program managers at every federal agency.",
        },
        {
          question: "How does policy deliver savings?",
          answer:
            "GSA leads several governmentwide categories and provides the data and best-in-class contract solutions that reduce duplicative contracts and leverage the government's collective buying power.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "The Office of Governmentwide Policy and the relevant category management team, reachable through your agency's acquisition career manager or GSA point of contact.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
