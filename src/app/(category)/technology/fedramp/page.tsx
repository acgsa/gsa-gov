import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardWhat from "@/assets/images/TECH/photo-1617761141732-d481912af1a9.avif";
import cardReuse from "@/assets/images/TECH/photo-1684139517679-032b7213ad2e.avif";
import card20x from "@/assets/images/TECH/photo-1694327876207-15246f69b411.avif";
import cardFaster from "@/assets/images/TECH/photo-1697033300784-6c9d143a30e2.avif";

const newsArticles = [
  getArticle("fedramp-20x-launch"),
  getArticle("fedramp-20x-504m-savings"),
  getArticle("it-systems-consolidation"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "FedRAMP | Technology",
  description:
    "FedRAMP provides a standardized approach to security authorization for cloud products and services used by the federal government.",
};

export default function FedRampPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="FedRAMP"
      intro="A standardized, governmentwide approach to security assessment, authorization, and continuous monitoring of cloud products and services."
      cta={{ label: "See the FedRAMP marketplace", href: "#" }}
      cards={[
        {
          title: "What FedRAMP does",
          body: "Establishes a common security baseline and authorization process — cloud providers are assessed against NIST 800-53 controls by an accredited 3PAO.",
          src: cardWhat,
          alt: "Assessor reviewing cloud security controls",
          ctaText: "See the process",
          ctaHref: "#",
        },
        {
          title: "Reuse across agencies",
          body: "Once authorized, a cloud service can be reused governmentwide without each agency repeating a full assessment.",
          src: cardReuse,
          alt: "Multiple agencies reusing an authorized cloud service",
          ctaText: "See authorized services",
          ctaHref: "#",
        },
        {
          title: "FedRAMP 20x",
          body: "GSA's modernization of the authorization process, targeting an 80 percent reduction in authorization time through automation and continuous assessment.",
          src: card20x,
          alt: "Dashboard showing continuous FedRAMP assessment",
          ctaText: "Learn about 20x",
          ctaHref: "#",
        },
        {
          title: "Faster authorizations",
          body: "Early FedRAMP 20x pilots show authorization in as little as a few weeks, compared to 12 to 18 months under the legacy process.",
          src: cardFaster,
          alt: "Timeline comparing legacy and 20x authorization speed",
          ctaText: "See the pilot results",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does FedRAMP work?"
      faqs={[
        {
          question: "What does FedRAMP do?",
          answer:
            "Provides standardized security assessment, authorization, and continuous monitoring for cloud products and services.",
        },
        {
          question: "Who assesses cloud providers?",
          answer:
            "Accredited Third Party Assessment Organizations (3PAOs), against NIST 800-53 controls.",
        },
        {
          question: "Can agencies reuse an authorization?",
          answer:
            "Yes — once authorized, a cloud service can be reused across agencies without a repeat full assessment.",
        },
        {
          question: "What is FedRAMP 20x?",
          answer:
            "A modernized authorization process targeting an 80 percent reduction in authorization time through automation.",
        },
        {
          question: "How fast are FedRAMP 20x pilots?",
          answer:
            "As short as a few weeks, compared to 12 to 18 months under the legacy process.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
