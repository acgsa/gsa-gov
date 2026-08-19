import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardOffer from "@/assets/images/ACQUISITION/pexels-steve-29506613.jpg";
import cardTerm from "@/assets/images/ACQUISITION/photo-1562902982-5542bb25e4b6.avif";
import cardEligible from "@/assets/images/ACQUISITION/photo-1645811791284-85468ed10a64.avif";
import cardSupport from "@/assets/images/ACQUISITION/photo-1494412519320-aa613dfb7738.avif";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Sell to GSA | Acquisition",
  description:
    "Learn how to become a GSA Schedule vendor and sell your products or services to the federal government.",
};

export default function SellPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Sell to GSA"
      intro="Becoming a GSA Schedule contractor opens your business to the federal marketplace — access to thousands of federal buyers actively purchasing in your category."
      cta={{ label: "Start your eOffer", href: "#" }}
      cards={[
        {
          title: "Submit an offer",
          body: "Offers go through GSA's eOffer system, with pricing, terms, and documentation showing your prices are fair and reasonable versus commercial customers.",
          src: cardOffer,
          alt: "Business owner preparing a GSA Schedule offer",
          ctaText: "Start your offer",
          ctaHref: "#",
        },
        {
          title: "Award & contract term",
          body: "GSA reviews, negotiates, and awards contracts on a rolling basis. Contracts start with a five-year term and can extend up to 20 years total.",
          src: cardTerm,
          alt: "Signed federal Schedule contract",
          ctaText: "See the award process",
          ctaHref: "#",
        },
        {
          title: "Who can apply",
          body: "Any U.S. business showing prior commercial sales and competitive pricing can apply — SAM.gov registration is required before submitting an offer.",
          src: cardEligible,
          alt: "Small business owner reviewing eligibility requirements",
          ctaText: "Check eligibility",
          ctaHref: "#",
        },
        {
          title: "Support for small businesses",
          body: "The Vendor Support Center and a network of category-specific acquisition centers offer dedicated help throughout the process.",
          src: cardSupport,
          alt: "Small business team getting acquisition support",
          ctaText: "Get vendor support",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do I become a GSA vendor?"
      faqs={[
        {
          question: "How do I get on a GSA Schedule?",
          answer:
            "Submit an offer through GSA's eOffer system, including pricing, terms, and fair-and-reasonable pricing documentation.",
        },
        {
          question: "How long does a Schedule contract last?",
          answer:
            "An initial five-year period, with options to extend up to 20 years total.",
        },
        {
          question: "Who is eligible to apply?",
          answer:
            "Any U.S. business — large or small — with prior commercial sales, competitive pricing, and an active SAM.gov registration.",
        },
        {
          question: "Is there help for small businesses?",
          answer:
            "Yes — the Vendor Support Center and a network of acquisition centers specialize in specific product and service categories.",
        },
        {
          question: "Who reviews and negotiates offers?",
          answer:
            "GSA contracting officers review offers, negotiate pricing, and award contracts on a rolling basis.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
