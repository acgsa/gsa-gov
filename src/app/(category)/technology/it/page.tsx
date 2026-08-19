import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardVehicles from "@/assets/images/TECH/photo-1717501219716-b93a67d2f7b2.avif";
import cardCloud from "@/assets/images/TECH/photo-1718011087751-e82f1792aa32.avif";
import cardSupport from "@/assets/images/TECH/photo-1731845417447-1d249f5c5ffa.avif";
import cardAssisted from "@/assets/images/TECH/photo-1750055263758-f4b95c4a0814.avif";

const newsArticles = [
  getArticle("it-systems-consolidation"),
  getArticle("fedramp-20x-504m-savings"),
  getArticle("usai-platform-expansion"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Information Technology | Technology",
  description:
    "GSA offers pre-competed IT contract vehicles and professional services that help agencies acquire technology quickly and compliantly.",
};

export default function InformationTechnologyPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="Buying federal IT"
      intro="GSA gives federal agencies fast, compliant access to information technology products and professional services through pre-competed contract vehicles and expert acquisition support."
      cta={{ label: "Find an IT contract vehicle", href: "#" }}
      cards={[
        {
          title: "IT contract vehicles",
          body: "GWACs and IT-focused Multiple Award Schedules let agencies acquire hardware, software, and services without lengthy standalone procurements.",
          src: cardVehicles,
          alt: "Data center infrastructure acquired through GSA vehicles",
          ctaText: "Compare vehicles",
          ctaHref: "#",
        },
        {
          title: "Cloud & cybersecurity",
          body: "Pre-competed options covering cloud migration, cybersecurity, software development, and IT support — flexible and best-in-class.",
          src: cardCloud,
          alt: "Cloud and cybersecurity technology visualization",
          ctaText: "Explore the categories",
          ctaHref: "#",
        },
        {
          title: "Acquisition expertise",
          body: "Help scoping requirements, structuring competitions, and managing complex multi-vendor IT engagements through delivery.",
          src: cardSupport,
          alt: "IT acquisition team scoping requirements",
          ctaText: "Get expert support",
          ctaHref: "#",
        },
        {
          title: "Assisted acquisition",
          body: "For the most complex programs, GSA can manage the full IT procurement lifecycle on your agency's behalf.",
          src: cardAssisted,
          alt: "GSA specialists managing an IT procurement",
          ctaText: "Learn about AAS",
          ctaHref: "/acquisition/assisted-acquisition",
        },
      ]}
      faqHeading="How does IT acquisition work?"
      faqs={[
        {
          question: "What IT contract vehicles does GSA offer?",
          answer:
            "A portfolio of pre-competed vehicles including governmentwide acquisition contracts (GWACs) and IT-focused Multiple Award Schedules — covering everything from cloud and cybersecurity to software development and IT support.",
        },
        {
          question:
            "Why use a GSA vehicle instead of a standalone procurement?",
          answer:
            "Vehicles are already competed and compliant with federal requirements, giving contracting officers flexible, best-in-class options and dramatically shorter time-to-award.",
        },
        {
          question: "What support does GSA provide beyond contracts?",
          answer:
            "Acquisition expertise for scoping requirements, structuring competitions, and managing engagements through delivery — especially valuable for complex, multi-vendor technology programs.",
        },
        {
          question: "Can GSA run the procurement for us?",
          answer:
            "Yes. Through Assisted Acquisition Services, GSA manages the full IT procurement lifecycle on your behalf under an interagency agreement.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "GSA's IT Category team, reachable through the National Customer Service Center or your agency's GSA account manager.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
