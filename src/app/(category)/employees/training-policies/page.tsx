import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardTraining from "@/assets/images/ED/Edited-4669.jpg";
import cardMandatory from "@/assets/images/ED/Edited-4794.jpg";
import cardPolicies from "@/assets/images/ED/A6509724-2.webp";
import cardDirectives from "@/assets/images/ED/03252026 - GSA NCR Press Conference-10-Slide1.jpg";

const newsArticles = [
  getArticle("federal-travel-reform"),
  getArticle("per-diem-rate-modernization"),
  getArticle("federal-fleet-right-sizing"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Training & Policies | Resources",
  description:
    "GSA training resources and agency policies for the federal workforce, in one place.",
};

export default function TrainingPoliciesPage() {
  return (
    <TopicPage
      eyebrow="Resources"
      eyebrowHref="/employees"
      title="Training and policies"
      intro="GSA training resources and agency policies that help the federal workforce build skills, meet mandatory requirements, and operate in compliance."
      cta={{ label: "Open the Learning Management System", href: "#" }}
      cards={[
        {
          title: "Training resources",
          body: "Build skills and advance your career in federal service — ethics, information security, leadership development, and more.",
          src: cardTraining,
          alt: "Federal employees in a training session",
          ctaText: "Browse training",
          ctaHref: "/employees/training",
        },
        {
          title: "Mandatory requirements",
          body: "Complete mandatory and elective training through the Learning Management System, working with your supervisor on development priorities.",
          src: cardMandatory,
          alt: "Employee completing required training",
          ctaText: "Check your requirements",
          ctaHref: "#",
        },
        {
          title: "Agency policies",
          body: "Policies, directives, and guidance governing acquisition, travel, real estate, and workplace conduct.",
          src: cardPolicies,
          alt: "GSA policy documents and guidance",
          ctaText: "Find a policy",
          ctaHref: "/employees/policies",
        },
        {
          title: "Directives library",
          body: "The authoritative source for GSA orders and directives — keeping employees and partners consistent and compliant.",
          src: cardDirectives,
          alt: "GSA staff referencing agency directives",
          ctaText: "Search directives",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do training and policies work?"
      faqs={[
        {
          question: "Where do I complete mandatory training?",
          answer:
            "Through the agency's Learning Management System (LMS). Work with your supervisor to identify development priorities alongside required courses.",
        },
        {
          question: "What training is available?",
          answer:
            "Mandatory and elective courses spanning ethics, information security, and leadership development — resources to build skills and advance a federal career.",
        },
        {
          question: "Where are agency policies published?",
          answer:
            "GSA publishes policies, directives, and guidance covering acquisition, travel, real estate, and workplace conduct in the agency's policy and directives libraries.",
        },
        {
          question: "Who do policies apply to?",
          answer:
            "GSA employees and, in many cases, partners operating under GSA programs — helping everyone operate consistently and in compliance with federal regulations.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "Your supervisor for training priorities, or the Office of Human Resources Management for LMS and policy questions.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
