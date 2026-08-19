import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardImperative from "@/assets/images/TECH/photo-1750055263758-f4b95c4a0814.avif";
import cardReuse from "@/assets/images/TECH/photo-1761058239857-d866c603fafb.avif";
import cardResources from "@/assets/images/TECH/photo-1776947242060-ef7a157a259a.avif";
import cardTmf from "@/assets/images/TECH/boliviainteligente-w-OurQzRuJ8-unsplash.jpg";

const newsArticles = [
  getArticle("usai-platform-expansion"),
  getArticle("fedramp-20x-launch"),
  getArticle("it-systems-consolidation"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "IT Modernization | Technology",
  description:
    "GSA leads federal IT modernization through shared services, cloud migration support, and cross-agency technology strategy.",
};

export default function ModernizationPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="IT Modernization"
      intro="GSA provides shared platforms, procurement vehicles, and technical assistance that help agencies move off legacy systems and deliver better services."
      cta={{ label: "Explore the Technology Modernization Fund", href: "#" }}
      cards={[
        {
          title: "The modernization imperative",
          body: "Most federal IT budget goes to maintaining aging legacy systems, leaving less for new investment and creating growing security and mission risk.",
          src: cardImperative,
          alt: "Federal team assessing legacy IT systems",
          ctaText: "See the challenge",
          ctaHref: "#",
        },
        {
          title: "Reuse over rebuild",
          body: "GSA encourages agencies to adopt proven shared platforms rather than build custom solutions, using cloud-native architectures that evolve with changing needs.",
          src: cardReuse,
          alt: "Team adopting a shared cloud-native platform",
          ctaText: "See the approach",
          ctaHref: "#",
        },
        {
          title: "Modernization resources",
          body: "Cloud migration guidance, procurement vehicles for modern development services, and access to upfront investment capital.",
          src: cardResources,
          alt: "Team reviewing modernization resources and guidance",
          ctaText: "See the resources",
          ctaHref: "#",
        },
        {
          title: "Technology Modernization Fund",
          body: "Loans for high-impact modernization projects, repaid from the savings or efficiencies the project generates.",
          src: cardTmf,
          alt: "Agency team securing Technology Modernization Fund investment",
          ctaText: "Learn about the TMF",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does IT modernization work?"
      faqs={[
        {
          question: "Why does modernization matter?",
          answer:
            "Most of the federal IT budget goes to maintaining legacy systems, leaving less for new investment and growing security and mission risk.",
        },
        {
          question: "What approach does GSA emphasize?",
          answer:
            "Reuse over rebuild — adopting proven shared platforms and modern cloud-native architectures.",
        },
        {
          question: "What resources are available?",
          answer:
            "Cloud migration guidance, procurement vehicles for modern development services, and Technology Modernization Fund investment capital.",
        },
        {
          question: "What is the TMF?",
          answer:
            "The Technology Modernization Fund — loans for high-impact modernization projects, repaid from project savings.",
        },
        {
          question: "Who oversees TMF investments?",
          answer:
            "GSA's Office of Technology Policy, working with OMB to identify the highest-priority investments.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
