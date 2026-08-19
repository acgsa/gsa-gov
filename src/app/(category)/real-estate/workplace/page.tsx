import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardStrategy from "@/assets/images/REAL ESTATE/_LEASE/17-metting-room-1875-penn-2-scaled.webp";
import cardFitout from "@/assets/images/REAL ESTATE/_LEASE/20-penthouse-ext-b-1875-penn-2-scaled.webp";
import cardLab from "@/assets/images/REAL ESTATE/_LEASE/11-esplanade-option-2-1875-penn-2-scaled.webp";
import cardEvaluation from "@/assets/images/REAL ESTATE/_LEASE/06-atrium-a-1875-penn-2.webp";

const newsArticles = [
  getArticle("playbook"),
  getArticle("rightsizing-federal-real-estate"),
  getArticle("lease-consolidation-program"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Workspace Solutions | Real Estate",
  description:
    "GSA workspace solutions help federal agencies optimize their office environments for modern work.",
};

export default function WorkplacePage() {
  return (
    <TopicPage
      eyebrow="Real Estate"
      eyebrowHref="/real-estate"
      title="Designing the modern workplace"
      intro="GSA helps federal agencies design efficient, flexible workplaces that support hybrid work, reduce costs, and improve employee experience."
      cta={{ label: "Talk to a workplace strategist", href: "#" }}
      cards={[
        {
          title: "Workplace strategy",
          body: "Utilization assessments and strategy consulting that align your space with how your workforce actually works — focused work, collaboration, and virtual connection.",
          src: cardStrategy,
          alt: "Meeting room in a modernized federal workspace",
          ctaText: "Explore services",
          ctaHref: "#",
        },
        {
          title: "Furniture & fit-out",
          body: "Pre-competed furniture schedules, fit-out design assistance, and change-management support for modernization projects of any scale.",
          src: cardFitout,
          alt: "Rooftop terrace of a modernized federal building",
          ctaText: "See procurement options",
          ctaHref: "#",
        },
        {
          title: "Workplace Innovation Lab",
          body: "Test new workspace configurations at GSA's living lab in Washington, D.C. before rolling them out across your agency.",
          src: cardLab,
          alt: "Esplanade concept for a modern federal workplace",
          ctaText: "Visit the lab",
          ctaHref: "#",
        },
        {
          title: "Post-occupancy evaluation",
          body: "Measure what a project delivered. Agencies working with GSA report 20 to 40 percent space reductions alongside improved employee satisfaction.",
          src: cardEvaluation,
          alt: "Atrium of a completed workplace modernization project",
          ctaText: "See the results",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do workplace projects work?"
      faqs={[
        {
          question: "What is activity-based workspace?",
          answer:
            "A flexible environment with a mix of settings — quiet zones, collaboration areas, and shared desks — that employees choose from based on the task at hand, instead of one assigned desk per person.",
        },
        {
          question: "How long does a modernization project take?",
          answer:
            "It scales with scope: a single-floor refresh can complete in months, while a full building modernization runs a year or more. GSA phases work to keep agencies operational throughout.",
        },
        {
          question: "What does GSA charge for workplace services?",
          answer:
            "Services are provided on a reimbursable basis through your occupancy agreement or an interagency agreement, with costs scoped and approved before work begins.",
        },
        {
          question: "Do we need to move out during a renovation?",
          answer:
            "Not always. GSA can phase construction, provide temporary swing space, or schedule disruptive work around your operations depending on the project.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "The Workplace Solutions team in GSA's Public Buildings Service, reachable through your regional Client Solutions contact.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
