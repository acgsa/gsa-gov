import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardHow from "@/assets/images/TECH/photo-1617761141732-d481912af1a9.avif";
import cardPortfolio from "@/assets/images/TECH/photo-1684139517679-032b7213ad2e.avif";
import cardModel from "@/assets/images/TECH/photo-1694327876207-15246f69b411.avif";
import cardOngoing from "@/assets/images/TECH/photo-1697033300784-6c9d143a30e2.avif";

const newsArticles = [
  getArticle("usai-platform-expansion"),
  getArticle("fedramp-20x-launch"),
  getArticle("it-systems-consolidation"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Adoption Support | Technology",
  description:
    "GSA helps federal agencies adopt shared technology platforms through hands-on implementation support and change management.",
};

export default function AdoptionPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="Adoption Support"
      intro="GSA's technology adoption team works directly with federal agencies to plan, implement, and scale shared technology platforms — reducing risk and accelerating time to value."
      cta={{ label: "Request adoption support", href: "#" }}
      cards={[
        {
          title: "How we help",
          body: "Adopting new technology in a federal environment takes more than integration — our team has guided dozens of agencies through procurement, security review, and change management.",
          src: cardHow,
          alt: "Team planning a federal technology adoption",
          ctaText: "See how it works",
          ctaHref: "#",
        },
        {
          title: "Full platform portfolio",
          body: "Support is available across GSA's platform portfolio, including Login.gov, Cloud.gov, and shared digital services infrastructure.",
          src: cardPortfolio,
          alt: "Federal platforms available for adoption support",
          ctaText: "Browse the portfolio",
          ctaHref: "/technology/platforms",
        },
        {
          title: "Our support model",
          body: "Engagements begin with discovery, move to a tailored implementation plan, and continue with hands-on assistance through deployment.",
          src: cardModel,
          alt: "Team building a technology implementation plan",
          ctaText: "See the process",
          ctaHref: "#",
        },
        {
          title: "Ongoing support",
          body: "After deployment, agencies get community support, documentation, and direct channels to platform teams for issue resolution.",
          src: cardOngoing,
          alt: "Agency team using ongoing platform support",
          ctaText: "Get support",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does adoption support work?"
      faqs={[
        {
          question: "What does adoption support include?",
          answer:
            "Technical integration alongside procurement, security reviews, change management, and stakeholder alignment.",
        },
        {
          question: "Which platforms are covered?",
          answer:
            "Login.gov, Cloud.gov, and shared digital services infrastructure across GSA's platform portfolio.",
        },
        {
          question: "How does an engagement start?",
          answer:
            "With a discovery engagement to understand your agency's current state, constraints, and goals.",
        },
        {
          question: "What happens after deployment?",
          answer:
            "Ongoing community support, documentation, and direct channels to platform teams for issue resolution.",
        },
        {
          question: "How is success measured?",
          answer:
            "Through usage metrics and regular check-ins with agency partners.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
