import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardCurrent from "@/assets/images/ACQUISITION/pexels-steve-29506613.jpg";
import cardEmod from "@/assets/images/ACQUISITION/photo-1562902982-5542bb25e4b6.avif";
import cardOfficers from "@/assets/images/ACQUISITION/photo-1645811791284-85468ed10a64.avif";
import cardSupport from "@/assets/images/ACQUISITION/photo-1494412519320-aa613dfb7738.avif";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Manage Contracts | Acquisition",
  description:
    "Resources for contractors and agency contracting officers managing active GSA contract vehicles.",
};

export default function ManagePage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Manage Contracts"
      intro="Whether you're a contracting officer managing task orders or a vendor maintaining your Schedule contract, GSA provides the tools and guidance to keep your contracts compliant and current."
      cta={{ label: "Visit the Vendor Support Center", href: "#" }}
      cards={[
        {
          title: "For Schedule vendors",
          body: "Keep your contract current in GSA Advantage!, submit required sales reports, and comply with the Price Reductions clause where it applies.",
          src: cardCurrent,
          alt: "Vendor updating their GSA Schedule contract",
          ctaText: "Review vendor requirements",
          ctaHref: "#",
        },
        {
          title: "Modifications via eMod",
          body: "Add Special Item Numbers, update pricing, or change contract terms — all submitted through the eMod system.",
          src: cardEmod,
          alt: "Vendor submitting a contract modification online",
          ctaText: "Start a modification",
          ctaHref: "#",
        },
        {
          title: "For agency contracting officers",
          body: "Keep task orders within scope, document competition, and maintain proper order files using GSA's guides and templates.",
          src: cardOfficers,
          alt: "Contracting officer documenting a task order file",
          ctaText: "Get ordering guides",
          ctaHref: "#",
        },
        {
          title: "Support for major vehicles",
          body: "Dedicated customer service teams support agencies through the OASIS+ and Alliant task order process, from requirements to award and administration.",
          src: cardSupport,
          alt: "Customer service team supporting a task order award",
          ctaText: "Get vehicle support",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do I manage an active contract?"
      faqs={[
        {
          question: "What must Schedule vendors keep current?",
          answer:
            "GSA Advantage! listings, required sales reports, and an active SAM.gov registration throughout the contract period.",
        },
        {
          question: "How do I modify my Schedule contract?",
          answer:
            "Submit changes — Special Item Numbers, pricing, or terms — through the eMod system.",
        },
        {
          question: "What are contracting officers responsible for?",
          answer:
            "Keeping orders within scope, documenting competition, and maintaining proper order files.",
        },
        {
          question: "Is there help for OASIS+ or Alliant task orders?",
          answer:
            "Yes — dedicated customer service teams support agencies from requirements development through award and administration.",
        },
        {
          question: "Who do I contact with vendor questions?",
          answer:
            "The Vendor Support Center handles modifications, sales reporting, and compliance questions.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
