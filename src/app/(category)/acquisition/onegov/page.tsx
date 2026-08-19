import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardApproach from "@/assets/images/ACQUISITION/pexels-dibert-16151394.jpg";
import cardScale from "@/assets/images/ACQUISITION/pexels-frostroomhead-16073667.jpg";
import cardTerms from "@/assets/images/ACQUISITION/pexels-ivan-drazic-20457695-20417783.jpg";
import cardParticipate from "@/assets/images/ACQUISITION/pexels-maximkapytka-17507798.jpg";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "OneGov | Acquisition",
  description:
    "OneGov is GSA's single, government-wide approach to buying that delivers better prices and terms for taxpayers.",
};

export default function OneGovPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="OneGov"
      intro="GSA's single, governmentwide approach to buying commercial products and services — negotiating as one customer to secure better prices, stronger terms, and greater transparency for taxpayers."
      cta={{ label: "See OneGov agreements", href: "#" }}
      cards={[
        {
          title: "A single government-wide approach",
          body: "Agencies used to negotiate separately with the same suppliers. OneGov consolidates that demand so government buys as one coordinated customer.",
          src: cardApproach,
          alt: "Federal buyers coordinating a single procurement approach",
          ctaText: "See how it works",
          ctaHref: "#",
        },
        {
          title: "Category management at scale",
          body: "OneGov applies category management principles at scale, using the government's combined purchasing power to negotiate directly with leading providers.",
          src: cardScale,
          alt: "Team analyzing governmentwide purchasing data",
          ctaText: "Explore category management",
          ctaHref: "/acquisition/category-management",
        },
        {
          title: "Better prices and terms",
          body: "OneGov agreements lock in competitive pricing and standardized conditions any agency can use — predictable, transparent, no renegotiating required.",
          src: cardTerms,
          alt: "Signed governmentwide pricing agreement",
          ctaText: "Review the terms",
          ctaHref: "#",
        },
        {
          title: "How agencies participate",
          body: "Agencies access OneGov pricing through existing channels — Multiple Award Schedules and governmentwide acquisition contracts.",
          src: cardParticipate,
          alt: "Agency contact reviewing OneGov participation options",
          ctaText: "Get started",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does OneGov work?"
      faqs={[
        {
          question: "What is OneGov?",
          answer:
            "GSA's single governmentwide approach to buying commercial products and services, negotiating as one customer.",
        },
        {
          question: "How is this different from before?",
          answer:
            "Agencies previously negotiated separately with the same suppliers; OneGov consolidates that demand into one coordinated purchase.",
        },
        {
          question: "What savings has OneGov produced?",
          answer:
            "Measurable savings for taxpayers and a simpler buying experience through predictable, transparent pricing.",
        },
        {
          question: "How do I access OneGov pricing?",
          answer:
            "Through GSA's existing acquisition channels, including Multiple Award Schedules and governmentwide acquisition contracts.",
        },
        {
          question: "Who should I contact to participate?",
          answer:
            "Your GSA acquisition contacts can help align your purchases with current OneGov agreements.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
