import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";
import samLogo from "@/assets/brands/SAM_slab.svg";

// ── Card images ───────────────────────────────────────────────────────────
import cardOffer from "@/assets/images/ACQUISITION/pexels-banananardini-9152408.jpg";
import cardSmallBiz from "@/assets/images/ACQUISITION/pexels-ivan-drazic-20457695-20417783.jpg";
import cardOpportunities from "@/assets/images/ACQUISITION/pexels-steve-29506613.jpg";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("gsa-white-house-fraud-task-force"),
  getArticle("procurement-analytics-platform"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Sell to Government | Acquisition",
  description:
    "Learn how to become a GSA contractor and sell your products or services to the federal government.",
};

export default function SellToGovernmentPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Selling to the government"
      intro="Becoming a GSA contractor opens your business to the federal marketplace — thousands of federal buyers actively purchasing in your category."
      cta={{ label: "Submit an offer", href: "#" }}
      steps={[
        {
          title: "Register your business",
          body: "Create your free entity registration on SAM.gov and identify the categories that match what you sell.",
        },
        {
          title: "Prepare your offer",
          body: "Assemble pricing, past performance, and the required documents for your Schedule or solicitation.",
        },
        {
          title: "Submit and start selling",
          body: "Submit through eOffer, negotiate award, and reach thousands of federal buyers.",
        },
      ]}
      cards={[
        {
          title: "Get on contract",
          body: "Submit an offer through GSA's eOffer system with your pricing, terms, and documentation showing your prices are fair and reasonable.",
          src: cardOffer,
          alt: "Business owner preparing a federal contract offer",
          ctaText: "Start in eOffer",
          ctaHref: "#",
        },
        {
          title: "Register in SAM.gov",
          body: "Registration in SAM.gov is required before submitting an offer. It's free, and it's where federal opportunities are advertised.",
          src: samLogo,
          alt: "SAM.gov logo",
          ctaText: "Register your business",
          ctaHref: "#",
          imageStyle: "contain" as const,
        },
        {
          title: "Small business support",
          body: "GSA's Vendor Support Center and acquisition centers offer dedicated help for small businesses entering the federal marketplace.",
          src: cardSmallBiz,
          alt: "Small business team collaborating",
          ctaText: "Get support",
          ctaHref: "#",
        },
        {
          title: "Find opportunities",
          body: "Once on contract, respond to agency requests through eBuy and compete for orders across the federal government.",
          src: cardOpportunities,
          alt: "Vendor reviewing federal contract opportunities",
          ctaText: "See how ordering works",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does selling to GSA work?"
      faqs={[
        {
          question: "How do I become a GSA contractor?",
          answer:
            "Submit an offer through the eOffer system, including pricing, terms and conditions, and documentation demonstrating your prices are fair and reasonable compared to your commercial customers.",
        },
        {
          question: "Who can apply?",
          answer:
            "Any U.S. business — large or small — offering commercial products or services, provided you can demonstrate prior commercial sales and competitive pricing. SAM.gov registration is required first.",
        },
        {
          question: "How long does a contract last?",
          answer:
            "Contracts are awarded for an initial five-year period, with options to extend up to 20 years total. GSA reviews offers and awards on a rolling basis.",
        },
        {
          question: "What support is available for small businesses?",
          answer:
            "GSA's Vendor Support Center and a network of acquisition centers specializing in specific categories provide dedicated guidance through the offer process.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "The Vendor Support Center is the first stop for prospective contractors — from offer preparation to post-award contract management.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
