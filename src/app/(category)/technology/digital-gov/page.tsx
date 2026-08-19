import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardGuidance from "@/assets/images/TECH/photo-1750055263758-f4b95c4a0814.avif";
import cardCommunity from "@/assets/images/TECH/photo-1761058239857-d866c603fafb.avif";
import cardStandards from "@/assets/images/TECH/photo-1776947242060-ef7a157a259a.avif";
import cardUswds from "@/assets/images/TECH/boliviainteligente-w-OurQzRuJ8-unsplash.jpg";

const newsArticles = [
  getArticle("usai-platform-expansion"),
  getArticle("fedramp-20x-launch"),
  getArticle("it-systems-consolidation"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Digital.gov Resources | Technology",
  description:
    "Digital.gov provides guidance, community, and resources for federal digital teams building better government websites and services.",
};

export default function DigitalGovPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="Digital.gov Resources"
      intro="GSA's hub for guidance, community, and resources for federal digital practitioners — helping teams across government build accessible, effective, and trustworthy digital services."
      cta={{ label: "Join a community of practice", href: "#" }}
      cards={[
        {
          title: "Practical guidance",
          body: "Web accessibility, plain language, UX research, content strategy, and performance measurement — produced by GSA and contributed by practitioners governmentwide.",
          src: cardGuidance,
          alt: "Team reviewing digital guidance materials",
          ctaText: "Read the guidance",
          ctaHref: "#",
        },
        {
          title: "Communities of practice",
          body: "Federal employees working on digital services connect, share knowledge, and get help — covering web managers, UX, accessibility, and multilingual content.",
          src: cardCommunity,
          alt: "Federal digital practitioners collaborating",
          ctaText: "Find a community",
          ctaHref: "#",
        },
        {
          title: "Federal website standards",
          body: "Requirements under the 21st Century IDEA Act — mobile optimization, accessibility, HTTPS, and search — that every public-facing federal site must meet.",
          src: cardStandards,
          alt: "Federal website meeting accessibility standards",
          ctaText: "Review the standards",
          ctaHref: "#",
        },
        {
          title: "U.S. Web Design System",
          body: "A library of accessible, tested components and design patterns for building consistent, trustworthy government websites and applications.",
          src: cardUswds,
          alt: "Components from the U.S. Web Design System",
          ctaText: "Explore USWDS",
          ctaHref: "#",
        },
      ]}
      faqHeading="What does Digital.gov offer?"
      faqs={[
        {
          question: "What guidance does Digital.gov provide?",
          answer:
            "Accessibility, plain language, UX research, content strategy, and performance measurement guidance.",
        },
        {
          question: "Are there communities I can join?",
          answer:
            "Yes — active communities of practice for web managers, UX, accessibility, and multilingual content.",
        },
        {
          question: "What are the Federal Website Standards?",
          answer:
            "Baseline requirements under the 21st Century IDEA Act, covering mobile, accessibility, HTTPS, and search.",
        },
        {
          question: "What is USWDS?",
          answer:
            "The U.S. Web Design System — GSA's library of accessible components and patterns for government sites.",
        },
        {
          question: "Who contributes to Digital.gov?",
          answer: "GSA and practitioners across the federal government.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
