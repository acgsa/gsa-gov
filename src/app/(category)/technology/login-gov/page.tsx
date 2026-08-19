import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardOneAccount from "@/assets/images/TECH/photo-1717501219604-cc1902b5d845.avif";
import cardAssurance from "@/assets/images/TECH/photo-1717501219716-b93a67d2f7b2.avif";
import cardIntegration from "@/assets/images/TECH/photo-1718011087751-e82f1792aa32.avif";
import cardScale from "@/assets/images/TECH/photo-1731845417447-1d249f5c5ffa.avif";

const newsArticles = [
  getArticle("usai-platform-expansion"),
  getArticle("fedramp-20x-launch"),
  getArticle("it-systems-consolidation"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Login.gov | Technology",
  description:
    "Login.gov is the public's one account for government — a single sign-on platform that provides secure, simple access to participating federal agency services.",
};

export default function LoginGovPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="Login.gov"
      intro="The public's one account for government — a secure, government-run identity platform that lets Americans use one username and password across participating federal agencies."
      cta={{ label: "Integrate Login.gov", href: "#" }}
      cards={[
        {
          title: "One account for government",
          body: "A single, trusted identity credential that works across more than 40 federal agencies and hundreds of applications.",
          src: cardOneAccount,
          alt: "Person signing in once to access multiple government services",
          ctaText: "See participating agencies",
          ctaHref: "#",
        },
        {
          title: "Strong identity assurance",
          body: "Two-factor authentication and identity proofing against authoritative data sources, built to the NIST 800-63 framework.",
          src: cardAssurance,
          alt: "Two-factor authentication on a mobile device",
          ctaText: "See the assurance levels",
          ctaHref: "#",
        },
        {
          title: "Simple integration",
          body: "Agencies integrate through a standard OpenID Connect or SAML interface — typically weeks, not months, with a dedicated partnership team.",
          src: cardIntegration,
          alt: "Developer integrating a single sign-on interface",
          ctaText: "Start integrating",
          ctaHref: "#",
        },
        {
          title: "Proven at scale",
          body: "More than 50 million verified accounts and millions of daily authentications, on infrastructure built for peak demand.",
          src: cardScale,
          alt: "Dashboard showing Login.gov authentication volume",
          ctaText: "See the numbers",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does Login.gov work?"
      faqs={[
        {
          question: "What is Login.gov?",
          answer:
            "The public's one account for government — a single sign-on platform across participating federal agencies.",
        },
        {
          question: "How many agencies use it?",
          answer: "More than 40 federal agencies and hundreds of applications.",
        },
        {
          question: "How does identity verification work?",
          answer:
            "Two-factor authentication plus identity proofing against authoritative sources, per the NIST 800-63 framework.",
        },
        {
          question: "How do agencies integrate?",
          answer:
            "Through a standard OpenID Connect or SAML interface, typically in weeks with GSA's partnership team.",
        },
        {
          question: "How big is Login.gov?",
          answer:
            "More than 50 million verified accounts, processing millions of authentications daily.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
