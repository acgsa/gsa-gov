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
          title: "Fifty years of improving access",
          body: "GSA has worked to improve access to government services for over 50 years — applying modern methods to improve the lives of the public and public servants.",
          src: cardFunding,
          alt: "Public-facing government services improved by TTS",
          ctaText: "Our vision",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does TTS work?"
      faqs={[
        {
          question: "What is TTS?",
          answer:
            "GSA's Technology Transformation Services exists to design and deliver a digital government with and for the American public. Its vision: trusted modern government experiences for all.",
        },
        {
          question: "What services does TTS include?",
          answer:
            "Centers of Excellence, Presidential Innovation Fellows, FedRAMP, USAGov, Digital.gov, Cloud.gov, Login.gov, SAM.gov, and more.",
        },
        {
          question: "How does TTS help agencies?",
          answer:
            "By applying modern methodologies and technologies — helping agencies make their services more accessible, efficient, and effective with modern applications, platforms, processes, personnel, and software solutions.",
        },
        {
          question: "How do we engage TTS?",
          answer:
            "Agencies can adopt TTS platforms directly, or partner with TTS teams like the Centers of Excellence for hands-on modernization support scoped through an interagency agreement.",
        },
        {
          question: "Who should I contact with questions?",
          answer: (
            <>
              Email{" "}
              <a
                href="mailto:tts-info@gsa.gov"
                className="text-usds-steel-700 underline decoration-usds-steel-300 underline-offset-2 hover:text-usds-steel-900 hover:decoration-usds-steel-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
              >
                tts-info@gsa.gov
              </a>
              .
            </>
          ),
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
