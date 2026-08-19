import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardAdvantage from "@/assets/images/ACQUISITION/pexels-dibert-16151394.jpg";
import cardEbuy from "@/assets/images/ACQUISITION/pexels-frostroomhead-16073667.jpg";
import cardSam from "@/assets/images/ACQUISITION/pexels-ivan-drazic-20457695-20417783.jpg";
import cardGateway from "@/assets/images/ACQUISITION/pexels-maximkapytka-17507798.jpg";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Acquisition Tools | Acquisition",
  description:
    "GSA provides digital tools that help contracting officers and program managers buy smarter and faster.",
};

export default function ToolsPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Acquisition Tools"
      intro="A suite of digital tools that help federal contracting officers, program managers, and vendors navigate the federal marketplace more effectively."
      cta={{ label: "Open GSA Advantage!", href: "#" }}
      cards={[
        {
          title: "GSA Advantage!",
          body: "The federal government's online shopping and ordering system, offering access to more than 11 million products and services from Schedule vendors.",
          src: cardAdvantage,
          alt: "Buyer browsing GSA Advantage! online catalog",
          ctaText: "Shop GSA Advantage!",
          ctaHref: "#",
        },
        {
          title: "eBuy",
          body: "Lets contracting officers solicit competitive quotes from Schedule vendors for services and customized products.",
          src: cardEbuy,
          alt: "Contracting officer requesting quotes on eBuy",
          ctaText: "Post a request",
          ctaHref: "#",
        },
        {
          title: "SAM.gov",
          body: "The official government platform for contractor registration, past performance, and exclusions data — required for all vendors.",
          src: cardSam,
          alt: "Vendor registering in SAM.gov",
          ctaText: "Register in SAM.gov",
          ctaHref: "#",
        },
        {
          title: "Spend analytics & Acquisition Gateway",
          body: "Benchmark spend against governmentwide averages, track savings over time, and browse a curated library of vehicles and guidance by category.",
          src: cardGateway,
          alt: "Analyst reviewing spend analytics dashboards",
          ctaText: "Visit the Acquisition Gateway",
          ctaHref: "#",
        },
      ]}
      faqHeading="Which tool should I use?"
      faqs={[
        {
          question: "What is GSA Advantage!?",
          answer:
            "The government's online shopping and ordering system, with access to more than 11 million products and services.",
        },
        {
          question: "What is eBuy used for?",
          answer:
            "Soliciting competitive quotes from Schedule vendors for services and customized products.",
        },
        {
          question: "Do I need to register in SAM.gov?",
          answer:
            "Yes — every vendor must be registered in SAM.gov to receive federal contracts or grants.",
        },
        {
          question: "What can spend analytics tools show me?",
          answer:
            "Benchmarks against governmentwide averages, opportunities to shift to best-in-class vehicles, and savings tracked over time.",
        },
        {
          question: "What is the Acquisition Gateway?",
          answer:
            "A curated library of contract vehicles, market research tools, and acquisition guidance organized by category.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
