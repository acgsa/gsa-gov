import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";
import { getSolutionsFor } from "@/lib/gsa-solutions";

// ── Card images ───────────────────────────────────────────────────────────
import cardIdentity from "@/assets/images/TECH/photo-1697033300784-6c9d143a30e2.avif";
import cardHosting from "@/assets/images/TECH/photo-1718011087751-e82f1792aa32.avif";
import cardDigital from "@/assets/images/TECH/photo-1694327876207-15246f69b411.avif";
import cardOnboard from "@/assets/images/TECH/photo-1717501219604-cc1902b5d845.avif";

const newsArticles = [
  getArticle("fedramp-20x-504m-savings"),
  getArticle("usai-platform-expansion"),
  getArticle("it-systems-consolidation"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Services | Technology",
  description:
    "GSA delivers shared technology services — identity, cloud, and digital delivery — that federal agencies can adopt to serve the public.",
};

export default function ServicesPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="Shared services for every agency"
      intro="GSA provides shared technology services any federal agency can adopt — from secure identity and cloud hosting to digital delivery support — reducing duplication and improving the public's experience of government."
      cta={{ label: "Talk to the shared services team", href: "#" }}
      cards={[
        {
          title: "Identity & authentication",
          body: "Secure sign-in for government services that meets federal security, accessibility, and compliance requirements out of the box.",
          src: cardIdentity,
          alt: "Secure digital identity verification",
          ctaText: "Explore identity services",
          ctaHref: "#",
        },
        {
          title: "Cloud hosting",
          body: "Compliant hosting for public-facing services — launch and scale reliably without building your own stack.",
          src: cardHosting,
          alt: "Cloud hosting infrastructure",
          ctaText: "See hosting options",
          ctaHref: "#",
        },
        {
          title: "Digital delivery",
          body: "Website publishing and digital delivery consulting that help agencies ship reliable public-facing services quickly.",
          src: cardDigital,
          alt: "Digital delivery team building a public service",
          ctaText: "Get delivery support",
          ctaHref: "#",
        },
        {
          title: "Onboard your agency",
          body: "Adopt what you need and pay only for usage — most services offer tiered pricing with no upfront cost for evaluation.",
          src: cardOnboard,
          alt: "Agency onboarding to a shared service",
          ctaText: "Start onboarding",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do shared services work?"
      faqs={[
        {
          question: "Why use shared services?",
          answer:
            "Rather than each agency building and operating its own technology stack, GSA's governmentwide services meet federal security, accessibility, and compliance requirements — agencies adopt what they need and pay only for usage.",
        },
        {
          question: "What services are available?",
          answer:
            "Identity and authentication, cloud hosting, website publishing, and digital delivery consulting — all designed to help agencies launch and scale reliable public-facing services quickly.",
        },
        {
          question: "How does onboarding work?",
          answer:
            "Agencies onboard through an agreement with the relevant program office. Most services offer tiered pricing with no upfront cost for evaluation, plus implementation support and training.",
        },
        {
          question: "Is adoption required?",
          answer:
            "Adoption of shared services is encouraged by OMB policy and often required for new investments — engage GSA early in the planning process.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "The relevant GSA program office, or your agency's GSA point of contact for a guided introduction to the portfolio.",
        },
      ]}
      solutions={getSolutionsFor("/technology")}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
