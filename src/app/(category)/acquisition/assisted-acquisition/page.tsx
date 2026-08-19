import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardSupport from "@/assets/images/ACQUISITION/pexels-ramazphotos-32314507.jpg";
import cardAgreements from "@/assets/images/ACQUISITION/photo-1645811791284-85468ed10a64.avif";
import cardVehicles from "@/assets/images/ACQUISITION/pexels-frostroomhead-16073667.jpg";
import cardAdmin from "@/assets/images/ACQUISITION/pexels-maximkapytka-17507798.jpg";

const newsArticles = [
  getArticle("procurement-analytics-platform"),
  getArticle("onegov-contracting-framework"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Assisted Acquisition | Acquisition",
  description:
    "GSA's Assisted Acquisition Services help federal agencies plan, award, and manage complex procurements end to end.",
};

export default function AssistedAcquisitionPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Acquisition support, end to end"
      intro="Through Assisted Acquisition Services, GSA acts as an extension of your acquisition team — handling market research, solicitation, award, and contract administration for complex requirements."
      cta={{ label: "Start an engagement", href: "#" }}
      cards={[
        {
          title: "Full-service support",
          body: "Dedicated acquisition, project management, and financial management professionals manage the procurement lifecycle so your staff can focus on the mission.",
          src: cardSupport,
          alt: "Acquisition professionals collaborating on a procurement",
          ctaText: "See what's included",
          ctaHref: "#",
        },
        {
          title: "Interagency agreements",
          body: "Engagements begin with an interagency agreement defining scope, funding, and performance expectations between GSA and your agency.",
          src: cardAgreements,
          alt: "Agency representatives reviewing an interagency agreement",
          ctaText: "How agreements work",
          ctaHref: "#",
        },
        {
          title: "Contract vehicles",
          body: "GSA executes your acquisition on the most appropriate vehicle — GWACs, OASIS+, or Multiple Award Schedules.",
          src: cardVehicles,
          alt: "Contracting team evaluating acquisition vehicles",
          ctaText: "Compare vehicles",
          ctaHref: "#",
        },
        {
          title: "Ongoing administration",
          body: "Contract administration, invoice review, and performance monitoring throughout the period of performance — accountability built in.",
          src: cardAdmin,
          alt: "Program manager monitoring contract performance",
          ctaText: "Learn about oversight",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does assisted acquisition work?"
      faqs={[
        {
          question: "What is Assisted Acquisition Services?",
          answer:
            "A full-service program where GSA's acquisition professionals plan, award, and administer procurements on your agency's behalf — acting as an extension of your team.",
        },
        {
          question: "When should my agency use it?",
          answer:
            "AAS is especially valuable for agencies with limited in-house contracting capacity, or for large, multi-disciplinary projects that require specialized acquisition expertise.",
        },
        {
          question: "How does an engagement start?",
          answer:
            "Your agency establishes an interagency agreement with GSA that defines the scope, funding, and performance expectations before work begins.",
        },
        {
          question: "Which contract vehicles are used?",
          answer:
            "GSA selects the most appropriate vehicle for your requirement — including governmentwide acquisition contracts (GWACs), OASIS+, and Multiple Award Schedules.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "GSA's Assisted Acquisition Services regional offices handle intake and scoping — your regional Client Solutions team can make the connection.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
