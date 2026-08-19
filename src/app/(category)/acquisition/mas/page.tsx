import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardIdiq from "@/assets/images/ACQUISITION/photo-1564182910280-00e8bae1bfeb.avif";
import cardCatalog from "@/assets/images/ACQUISITION/pexels-ramazphotos-7016957.jpg";
import cardSearch from "@/assets/images/ACQUISITION/pexels-banananardini-9152408.jpg";
import cardCompetition from "@/assets/images/ACQUISITION/photo-1554638263-c62cbd0a1dcc.avif";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Multiple Award Schedules | Acquisition",
  description:
    "GSA Multiple Award Schedules provide federal agencies with pre-negotiated access to commercial products and services.",
};

export default function MasPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Multiple Award Schedules"
      intro="Also known as Federal Supply Schedules — long-term governmentwide contracts with commercial firms that give agencies access to millions of products and services at pre-negotiated prices."
      cta={{ label: "Browse the 24 MAS categories", href: "#" }}
      cards={[
        {
          title: "IDIQ contracts, explained",
          body: "Indefinite-delivery, indefinite-quantity contracts that let agencies order directly from pre-vetted commercial vendors at pre-negotiated, fair and reasonable prices.",
          src: cardIdiq,
          alt: "Federal buyer reviewing an IDIQ contract",
          ctaText: "Learn the basics",
          ctaHref: "#",
        },
        {
          title: "11 million products & services",
          body: "Dozens of categories — from information technology and professional services to facilities maintenance and scientific equipment.",
          src: cardCatalog,
          alt: "Catalog of commercial products available on Schedule",
          ctaText: "Browse categories",
          ctaHref: "#",
        },
        {
          title: "Search vendors on Advantage! & eBuy",
          body: "Contracting officers search for Schedule vendors and compare prices — every vendor has already passed GSA's vetting process.",
          src: cardSearch,
          alt: "Contracting officer comparing Schedule vendor pricing",
          ctaText: "Search vendors",
          ctaHref: "#",
        },
        {
          title: "Order-level competition rules",
          body: "One quote for orders under $25,000; three or more for larger orders — dramatically faster than a standalone procurement.",
          src: cardCompetition,
          alt: "Contracting officer applying order-level competition rules",
          ctaText: "Review the thresholds",
          ctaHref: "#",
        },
      ]}
      faqHeading="What are GSA Schedules?"
      faqs={[
        {
          question: "What is a Multiple Award Schedule?",
          answer:
            "An indefinite-delivery, indefinite-quantity contract with pre-negotiated, fair and reasonable pricing from a pre-vetted commercial vendor.",
        },
        {
          question: "How many products and services are covered?",
          answer:
            "More than 11 million, across dozens of categories from IT to facilities maintenance to scientific equipment.",
        },
        {
          question: "How do I search for vendors?",
          answer:
            "Through GSA Advantage! and eBuy, where every listed vendor has already passed GSA's vetting process.",
        },
        {
          question: "What competition rules apply at the order level?",
          answer:
            "One quote for orders under $25,000; three or more quotes for larger orders to ensure competition.",
        },
        {
          question: "How much faster is MAS than a standalone procurement?",
          answer:
            "Pre-vetted vendors and pre-negotiated pricing dramatically reduce the time from need to award.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
