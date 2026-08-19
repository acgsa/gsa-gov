import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardWhat from "@/assets/images/ACQUISITION/photo-1494412519320-aa613dfb7738.avif";
import cardFind from "@/assets/images/ACQUISITION/photo-1564182910280-00e8bae1bfeb.avif";
import cardOrder from "@/assets/images/ACQUISITION/pexels-ramazphotos-7016957.jpg";
import cardGetOn from "@/assets/images/ACQUISITION/pexels-banananardini-9152408.jpg";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Schedules | Acquisition",
  description:
    "GSA Multiple Award Schedules provide federal agencies with pre-negotiated access to commercial products and services.",
};

export default function SchedulesPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="GSA Multiple Award Schedules"
      intro="Long-term governmentwide contracts with commercial firms that give federal agencies access to millions of products and services at pre-negotiated prices."
      cta={{ label: "Search Schedule vendors", href: "#" }}
      steps={[
        {
          title: "Find your large category",
          body: "Match your products and services to one of the 24 MAS large categories.",
        },
        {
          title: "Submit your offer",
          body: "Prepare pricing support and submit through eOffer for GSA evaluation.",
        },
        {
          title: "Manage your contract",
          body: "Keep pricing current, report sales, and grow your federal business over the contract term.",
        },
      ]}
      cards={[
        {
          title: "What Schedules are",
          body: "Indefinite-delivery, indefinite-quantity contracts that let agencies order directly from pre-vetted commercial vendors at fair and reasonable prices.",
          src: cardWhat,
          alt: "Contract documents for a Multiple Award Schedule",
          ctaText: "Learn the basics",
          ctaHref: "#",
        },
        {
          title: "Find vendors & compare prices",
          body: "Search Schedule vendors and compare pricing through GSA Advantage! and eBuy — vendors have already passed GSA's vetting process.",
          src: cardFind,
          alt: "Buyer comparing Schedule vendor pricing",
          ctaText: "Search vendors",
          ctaHref: "#",
        },
        {
          title: "For contracting officers",
          body: "Order-level rules made simple: one quote under $25,000, three or more for larger orders, with dramatically faster time-to-award than standalone procurements.",
          src: cardOrder,
          alt: "Contracting officer placing a Schedule order",
          ctaText: "Review ordering rules",
          ctaHref: "#",
        },
        {
          title: "Get on Schedule",
          body: "Commercial firms join through GSA's offer process — opening access to buyers across the entire federal government.",
          src: cardGetOn,
          alt: "Vendor preparing a Schedule offer",
          ctaText: "Become a vendor",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do Schedules work?"
      faqs={[
        {
          question: "What is a GSA Schedule?",
          answer:
            "Also known as Federal Supply Schedules, these are long-term governmentwide IDIQ contracts with commercial firms, covering more than 11 million products and services across dozens of categories.",
        },
        {
          question: "How are prices negotiated?",
          answer:
            "GSA pre-negotiates pricing with each vendor to be fair and reasonable, so agencies don't have to negotiate from scratch on every order.",
        },
        {
          question: "What competition is required at the order level?",
          answer:
            "Orders under $25,000 require only one quote; larger orders typically require three or more quotes to ensure competition. Agencies must follow applicable order-level competition rules.",
        },
        {
          question: "Why use a Schedule instead of an open procurement?",
          answer:
            "Vendors are already vetted and prices pre-negotiated, dramatically reducing the time from need to award compared to standalone procurements.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "GSA's National Customer Service Center for buyers, or the Vendor Support Center for firms interested in getting on Schedule.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
