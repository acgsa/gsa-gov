import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardOverview from "@/assets/images/ACQUISITION/pexels-dibert-16151394.jpg";
import cardVehicles from "@/assets/images/ACQUISITION/pexels-frostroomhead-16073667.jpg";
import cardImpact from "@/assets/images/ACQUISITION/pexels-ivan-drazic-20457695-20417783.jpg";
import cardOneGov from "@/assets/images/ACQUISITION/pexels-maximkapytka-17507798.jpg";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Category Management | Acquisition",
  description:
    "Category management helps the federal government buy smarter by managing common spend as a portfolio.",
};

export default function CategoryManagementPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Category Management"
      intro="Managing government-wide spending in common categories as an enterprise, rather than thousands of individual agency purchases — delivering better prices, improved outcomes, and reduced duplication."
      cta={{ label: "Explore category teams", href: "#" }}
      cards={[
        {
          title: "How it works",
          body: "The government spends over $700 billion annually on goods and services. Category management organizes that spend into ten common areas and assigns category leaders to drive smarter buying.",
          src: cardOverview,
          alt: "Federal buyers reviewing spend categories",
          ctaText: "See the categories",
          ctaHref: "#",
        },
        {
          title: "Best-in-class vehicles",
          body: "Category teams develop contract vehicles, publish buying guidance, and track spend under management to measure adoption and impact governmentwide.",
          src: cardVehicles,
          alt: "Contracting team developing a best-in-class vehicle",
          ctaText: "Browse vehicles",
          ctaHref: "#",
        },
        {
          title: "Results and impact",
          body: "Consolidating demand and leveraging the government's full purchasing power has delivered billions in savings and cost avoidance since launch.",
          src: cardImpact,
          alt: "Chart showing procurement savings over time",
          ctaText: "Review the results",
          ctaHref: "#",
        },
        {
          title: "OneGov: the next evolution",
          body: "OneGov uses data and automation to match agency requirements to the best available contract vehicle in real time.",
          src: cardOneGov,
          alt: "Dashboard matching agency requirements to contract vehicles",
          ctaText: "Learn about OneGov",
          ctaHref: "/acquisition/onegov",
        },
      ]}
      faqHeading="How does category management work?"
      faqs={[
        {
          question: "What is category management?",
          answer:
            "The practice of managing governmentwide spend in common categories as an enterprise, instead of thousands of individual agency purchases.",
        },
        {
          question: "How many categories are there?",
          answer:
            "Ten common areas — including IT, professional services, facilities, and transportation — each with an assigned category leader.",
        },
        {
          question: "Who leads category management?",
          answer:
            "GSA leads several governmentwide categories and plays a central coordinating role across the program.",
        },
        {
          question: "What results has it produced?",
          answer:
            "Billions of dollars in savings and cost avoidance by consolidating demand and leveraging the government's full purchasing power.",
        },
        {
          question: "How does OneGov relate to category management?",
          answer:
            "OneGov is the next evolution — using data and automation to match agency requirements to the best available vehicles in real time.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
