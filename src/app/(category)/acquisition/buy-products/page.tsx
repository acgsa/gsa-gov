import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardShop from "@/assets/images/ACQUISITION/photo-1564182910280-00e8bae1bfeb.avif";
import cardQuotes from "@/assets/images/ACQUISITION/photo-1554638263-c62cbd0a1dcc.avif";
import cardCategories from "@/assets/images/ACQUISITION/pexels-ramazphotos-7016957.jpg";
import cardRules from "@/assets/images/ACQUISITION/photo-1494412519320-aa613dfb7738.avif";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Buy Products | Acquisition",
  description:
    "Federal agencies can buy products and services through GSA's pre-negotiated contracts and online purchasing platforms.",
};

export default function BuyProductsPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Buying products and services"
      intro="GSA gives federal agencies access to millions of commercial products and services through pre-negotiated contracts and easy-to-use online purchasing platforms."
      cta={{ label: "Shop GSA Advantage!", href: "#" }}
      cards={[
        {
          title: "Shop GSA Advantage!",
          body: "The government's premier online shopping and ordering system — order directly from pre-vetted commercial vendors at pre-negotiated prices.",
          src: cardShop,
          alt: "Warehouse shelves stocked with commercial products",
          ctaText: "Start shopping",
          ctaHref: "#",
        },
        {
          title: "Request quotes on eBuy",
          body: "For larger requirements, eBuy supports competitive request-for-quote processes among vendors already holding GSA contracts.",
          src: cardQuotes,
          alt: "Federal buyer reviewing vendor quotes",
          ctaText: "Post a request",
          ctaHref: "#",
        },
        {
          title: "Browse categories",
          body: "More than 11 million products and services across dozens of categories — from IT and office supplies to facilities maintenance and scientific equipment.",
          src: cardCategories,
          alt: "Commercial products across procurement categories",
          ctaText: "Explore categories",
          ctaHref: "#",
        },
        {
          title: "Ordering rules",
          body: "Orders under $25,000 require only one quote; larger orders typically require competition among multiple vendors to ensure best value.",
          src: cardRules,
          alt: "Contracting officer reviewing order requirements",
          ctaText: "Review the thresholds",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does buying through GSA work?"
      faqs={[
        {
          question: "Who can buy through GSA?",
          answer:
            "Federal agencies are the primary buyers. State, local, and tribal governments can also use specific programs — such as cooperative purchasing for IT and security — where authorized by law.",
        },
        {
          question: "How are prices set?",
          answer:
            "GSA pre-negotiates prices with vendors to be fair and reasonable compared to their commercial pricing, saving agencies the time and cost of individual negotiations.",
        },
        {
          question: "When do I need multiple quotes?",
          answer:
            "Orders under $25,000 require only one quote. Larger orders typically require quotes from multiple vendors to ensure competition at the order level.",
        },
        {
          question: "What can I buy?",
          answer:
            "More than 11 million commercial products and services — information technology, office supplies, facilities maintenance, scientific equipment, professional services, and more.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "GSA's National Customer Service Center supports buyers on ordering, platforms, and vendor questions, and each category has a dedicated acquisition center.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
