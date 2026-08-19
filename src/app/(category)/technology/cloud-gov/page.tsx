import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardFedramp from "@/assets/images/TECH/photo-1717501219604-cc1902b5d845.avif";
import cardControls from "@/assets/images/TECH/photo-1717501219716-b93a67d2f7b2.avif";
import cardWorkflows from "@/assets/images/TECH/photo-1718011087751-e82f1792aa32.avif";
import cardStart from "@/assets/images/TECH/photo-1731845417447-1d249f5c5ffa.avif";

const newsArticles = [
  getArticle("usai-platform-expansion"),
  getArticle("fedramp-20x-launch"),
  getArticle("it-systems-consolidation"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Cloud.gov | Technology",
  description:
    "Cloud.gov is a FedRAMP-authorized cloud hosting platform built specifically for federal government applications.",
};

export default function CloudGovPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="Cloud.gov"
      intro="A FedRAMP-authorized platform-as-a-service built for federal teams — handling compliance, security patching, and infrastructure so developers can focus on delivering applications."
      cta={{ label: "Start a Cloud.gov sandbox", href: "#" }}
      cards={[
        {
          title: "FedRAMP-authorized hosting",
          body: "Runs on AWS GovCloud with FedRAMP Moderate authorization, satisfying the security baseline for most civilian agency applications.",
          src: cardFedramp,
          alt: "Federal team reviewing FedRAMP-authorized hosting",
          ctaText: "See the authorization",
          ctaHref: "/technology/fedramp",
        },
        {
          title: "Inherited controls",
          body: "Teams deploying on Cloud.gov inherit a significant portion of the controls needed for their own Authority to Operate.",
          src: cardControls,
          alt: "Security controls dashboard for a federal application",
          ctaText: "See what's inherited",
          ctaHref: "#",
        },
        {
          title: "Modern deployment workflows",
          body: "Containers, continuous deployment pipelines, and infrastructure-as-code let teams deploy new applications in hours, not months.",
          src: cardWorkflows,
          alt: "Developer deploying an application through a CI/CD pipeline",
          ctaText: "See the workflows",
          ctaHref: "#",
        },
        {
          title: "Getting started",
          body: "Sign up for a free sandbox to evaluate the platform; production environments run under a simple inter-agency agreement.",
          src: cardStart,
          alt: "Team starting a Cloud.gov sandbox environment",
          ctaText: "Request a sandbox",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does Cloud.gov work?"
      faqs={[
        {
          question: "What is Cloud.gov?",
          answer:
            "A FedRAMP-authorized platform-as-a-service built specifically for federal teams.",
        },
        {
          question: "Does Cloud.gov reduce ATO time?",
          answer:
            "Yes — teams inherit a significant portion of the controls needed for their own Authority to Operate.",
        },
        {
          question: "What deployment workflows are supported?",
          answer:
            "Containers, continuous deployment pipelines, and infrastructure-as-code.",
        },
        {
          question: "How do I try it?",
          answer:
            "Sign up for a free Cloud.gov sandbox to evaluate the platform at no cost.",
        },
        {
          question: "Is there support available?",
          answer:
            "Documentation, an active community Slack, and hands-on help from GSA's technology adoption team.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
