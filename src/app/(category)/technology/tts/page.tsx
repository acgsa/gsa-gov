import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardModernize from "@/assets/images/TECH/photo-1761058239857-d866c603fafb.avif";
import cardDelivery from "@/assets/images/TECH/photo-1617761141732-d481912af1a9.avif";
import cardCapacity from "@/assets/images/TECH/boliviainteligente-w-OurQzRuJ8-unsplash.jpg";
import cardFunding from "@/assets/images/TECH/photo-1776947242060-ef7a157a259a.avif";

const newsArticles = [
  getArticle("it-systems-consolidation"),
  getArticle("fedramp-20x-launch"),
  getArticle("usai-platform-expansion"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Technology Transformation Services | Technology",
  description:
    "GSA's Technology Transformation Services (TTS) designs and delivers a digital government with and for the American public.",
};

export default function TransformationPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="Technology Transformation Services"
      intro="Every interaction with the public is an opportunity to improve trust in government. TTS designs and delivers digital government with and for the American public."
      cta={{ label: "Work with TTS", href: "#" }}
      cards={[
        {
          title: "Modern applications & platforms",
          body: "TTS helps agencies make services more accessible, efficient, and effective — modern applications, platforms, processes, and software solutions, from Login.gov to Cloud.gov.",
          src: cardModernize,
          alt: "Modern government digital services and platforms",
          ctaText: "Explore Powered by GSA",
          ctaHref: "/technology/platforms",
        },
        {
          title: "Centers of Excellence",
          body: "CoE teams partner with agencies to accelerate IT modernization — cloud adoption, data analytics, contact centers, and infrastructure optimization.",
          src: cardDelivery,
          alt: "Centers of Excellence team working with an agency",
          ctaText: "About the CoE",
          ctaHref: "#",
        },
        {
          title: "Presidential Innovation Fellows",
          body: "Top technologists and designers serve tours of duty in government, pairing with federal leaders on the nation's hardest technology problems.",
          src: cardCapacity,
          alt: "Presidential Innovation Fellows collaborating",
          ctaText: "Meet the Fellows",
          ctaHref: "#",
        },
        {
          title: "Careers at TTS",
          body: "Join the technologists, designers, and product leaders building trusted modern government experiences for the American public.",
          src: cardFunding,
          alt: "TTS team members collaborating on digital services",
          ctaText: "See open roles",
          ctaHref: "#",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
