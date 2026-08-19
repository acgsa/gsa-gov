import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";
import usaiLogo from "@/assets/brands/USAi Logo.png";

// ── Card images ───────────────────────────────────────────────────────────
import cardGuidance from "@/assets/images/TECH/photo-1694327876207-15246f69b411.avif";
import cardProcure from "@/assets/images/TECH/photo-1717501219604-cc1902b5d845.avif";
import cardCommunity from "@/assets/images/TECH/photo-1697033300784-6c9d143a30e2.avif";

const newsArticles = [
  getArticle("usai-platform-expansion"),
  getArticle("fedramp-20x-launch"),
  getArticle("it-systems-consolidation"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Artificial Intelligence | Technology",
  description:
    "GSA provides secure, government-approved AI tools, guidance, and platforms that help federal agencies adopt artificial intelligence responsibly.",
};

export default function ArtificialIntelligencePage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="AI for the federal workforce"
      intro="GSA helps federal agencies adopt artificial intelligence responsibly — secure, government-approved AI tools, practical guidance, and shared platforms that scale across government."
      cta={{ label: "Get access to USAi", href: "#" }}
      cards={[
        {
          title: "USAi",
          body: "Secure, government-approved generative AI at scale — helping federal employees draft, summarize, analyze, and automate routine work.",
          src: usaiLogo,
          alt: "USAi logo",
          ctaText: "Explore the platform",
          ctaHref: "#",
          imageStyle: "contain" as const,
        },
        {
          title: "Guidance & governance",
          body: "Playbooks, use-case libraries, and governance practices aligned with governmentwide policy for responsible AI adoption.",
          src: cardGuidance,
          alt: "Team reviewing AI governance guidance",
          ctaText: "Read the guidance",
          ctaHref: "#",
        },
        {
          title: "Buying AI",
          body: "Support for evaluating AI vendors, structuring pilots, and measuring outcomes so investments deliver real mission value.",
          src: cardProcure,
          alt: "Agency team evaluating AI vendor capabilities",
          ctaText: "Procurement resources",
          ctaHref: "#",
        },
        {
          title: "Community of practice",
          body: "Connect with AI practitioners across government to share lessons, patterns, and working examples.",
          src: cardCommunity,
          alt: "Federal AI community of practice meeting",
          ctaText: "Join the community",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does federal AI adoption work?"
      faqs={[
        {
          question: "What is USAi?",
          answer:
            "GSA's shared platform that gives federal employees secure access to government-approved generative AI tools at scale — meeting federal security and privacy requirements out of the box.",
        },
        {
          question: "Why adopt AI through GSA?",
          answer:
            "GSA vets AI capabilities against federal standards so agencies can adopt with confidence, without each agency independently evaluating and authorizing every tool.",
        },
        {
          question: "What guidance is available?",
          answer:
            "Practical guidance on responsible AI use, procurement of AI capabilities, and governance practices aligned with governmentwide policy — plus playbooks and use-case libraries.",
        },
        {
          question: "How do we start a pilot?",
          answer:
            "GSA supports agencies in structuring pilots, evaluating vendors, and measuring outcomes. Start with your agency's CIO and GSA's AI adoption team.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "GSA's Technology Transformation Services AI team, reachable through your agency's GSA point of contact.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
