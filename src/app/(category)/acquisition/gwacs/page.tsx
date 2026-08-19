import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardAbout from "@/assets/images/ACQUISITION/pexels-melih-akkus-679376803-29849777.jpg";
import cardOasis from "@/assets/images/ACQUISITION/pexels-ramazphotos-32314507.jpg";
import cardWhy from "@/assets/images/ACQUISITION/pexels-ramazphotos-7016965.jpg";
import cardPools from "@/assets/images/ACQUISITION/pexels-rostislav-34281360.jpg";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "GWACs & OASIS+ | Acquisition",
  description:
    "Government-wide acquisition contracts and OASIS+ provide flexible vehicles for complex professional services.",
};

export default function GwacsPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="GWACs & OASIS+"
      intro="Flexible, pre-competed vehicles for complex, multi-disciplinary professional services requirements."
      cta={{ label: "Explore OASIS+ pools", href: "#" }}
      cards={[
        {
          title: "About GWACs",
          body: "Task-order contracts for IT services and solutions, pre-competed governmentwide for fast, flexible access to qualified vendors.",
          src: cardAbout,
          alt: "Federal IT team reviewing a task-order contract",
          ctaText: "Browse the GWAC portfolio",
          ctaHref: "#",
        },
        {
          title: "OASIS+ overview",
          body: "GSA's next-generation professional services vehicle, built for complex, integrated requirements across consulting, engineering, financial services, and program support.",
          src: cardOasis,
          alt: "Consultants collaborating on an integrated services contract",
          ctaText: "See OASIS+ domains",
          ctaHref: "#",
        },
        {
          title: "Why agencies use GWACs",
          body: "Reduced procurement lead times, a diverse pool of pre-vetted vendors, and lower administrative burden for contracting officers.",
          src: cardWhy,
          alt: "Contracting officer reviewing pre-vetted GWAC vendors",
          ctaText: "Compare the benefits",
          ctaHref: "#",
        },
        {
          title: "Pools by domain & size",
          body: "OASIS+ pools are organized by domain and business size, making small business set-asides straightforward alongside qualified large-business contractors.",
          src: cardPools,
          alt: "Small business team preparing an OASIS+ set-aside proposal",
          ctaText: "Find your pool",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do GWACs and OASIS+ work?"
      faqs={[
        {
          question: "What is a GWAC?",
          answer:
            "A governmentwide acquisition contract — a pre-competed, task-order vehicle for IT services and solutions.",
        },
        {
          question: "What is OASIS+?",
          answer:
            "One Acquisition Solution for Integrated Services Plus — GSA's next-generation vehicle for complex professional services.",
        },
        {
          question: "Why use a GWAC instead of an open procurement?",
          answer:
            "Competition has already occurred at the vehicle level, so agencies move straight to task order competition among qualified, pre-vetted contractors.",
        },
        {
          question: "Can small businesses compete on OASIS+?",
          answer:
            "Yes — pools are organized by domain and business size, making set-asides straightforward alongside large-business contractors.",
        },
        {
          question: "Where do I start?",
          answer:
            "Contact the GSA program office for the domain you need, or your agency's acquisition center for guidance on the right vehicle.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
