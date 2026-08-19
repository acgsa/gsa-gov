import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardCourses from "@/assets/images/ACQUISITION/pexels-melih-akkus-679376803-29849777.jpg";
import cardTopics from "@/assets/images/ACQUISITION/pexels-ramazphotos-32314507.jpg";
import cardDpa from "@/assets/images/ACQUISITION/pexels-ramazphotos-7016965.jpg";
import cardRequest from "@/assets/images/ACQUISITION/pexels-rostislav-34281360.jpg";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Training & DPA | Acquisition",
  description:
    "Acquisition training and Delegation of Procurement Authority resources for federal contracting professionals.",
};

export default function TrainingPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Training & DPA"
      intro="Acquisition training, certification support, and Delegation of Procurement Authority guidance to help federal contracting professionals use GSA contract vehicles correctly and confidently."
      cta={{ label: "Browse training courses", href: "#" }}
      cards={[
        {
          title: "Acquisition training",
          body: "From introductory courses on using GSA Schedules to advanced vehicle-specific training, available online through the Acquisition Gateway and Vendor Support Center.",
          src: cardCourses,
          alt: "Contracting professional taking an online acquisition course",
          ctaText: "Browse courses",
          ctaHref: "#",
        },
        {
          title: "Training topics",
          body: "MAS ordering procedures, OASIS+ task order competition, small business set-aside requirements, and best practices for scope and competition.",
          src: cardTopics,
          alt: "Training session on federal acquisition topics",
          ctaText: "See all topics",
          ctaHref: "#",
        },
        {
          title: "Delegation of Procurement Authority",
          body: "Some GSA contract vehicles require agencies to hold a current DPA before placing orders, ensuring officers understand their responsibilities under each vehicle.",
          src: cardDpa,
          alt: "Contracting officer reviewing DPA requirements",
          ctaText: "Learn about DPA",
          ctaHref: "#",
        },
        {
          title: "Requesting DPA",
          body: "Agencies request DPA for specific vehicles through the relevant GSA program office — requirements vary from formal certification to simple registration.",
          src: cardRequest,
          alt: "Agency requesting Delegation of Procurement Authority",
          ctaText: "Request DPA",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do training and DPA work?"
      faqs={[
        {
          question: "Where can I find acquisition training?",
          answer:
            "Through the Acquisition Gateway and GSA's Vendor Support Center, with many courses available online.",
        },
        {
          question: "What topics are covered?",
          answer:
            "MAS ordering procedures, OASIS+ task order competition, small business set-asides, and scope and competition best practices.",
        },
        {
          question: "What is DPA?",
          answer:
            "Delegation of Procurement Authority — required by some GSA vehicles before an agency can place orders.",
        },
        {
          question: "How do I request DPA?",
          answer:
            "Through the relevant GSA program office for the vehicle you need.",
        },
        {
          question: "Does DPA require certification?",
          answer:
            "It varies by vehicle — some require formal training and certification, others require only registration.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
