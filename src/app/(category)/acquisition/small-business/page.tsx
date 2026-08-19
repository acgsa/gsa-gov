import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardStats from "@/assets/images/ACQUISITION/photo-1564182910280-00e8bae1bfeb.avif";
import cardVendors from "@/assets/images/ACQUISITION/pexels-ramazphotos-7016957.jpg";
import cardResources from "@/assets/images/ACQUISITION/pexels-banananardini-9152408.jpg";
import cardMentor from "@/assets/images/ACQUISITION/photo-1554638263-c62cbd0a1dcc.avif";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Small Business Programs | Acquisition",
  description:
    "GSA's small business programs help small firms access federal contracting opportunities and grow their federal business.",
};

export default function SmallBusinessPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Small Business Programs"
      intro="GSA is committed to maximizing small business participation in federal contracting — through set-aside requirements, dedicated vehicles, mentoring programs, and outreach to small business communities."
      cta={{ label: "Visit the Small Business Center", href: "#" }}
      cards={[
        {
          title: "Small business at GSA",
          body: "GSA annually awards billions in contracts to small businesses, consistently meeting or exceeding goals for small disadvantaged, women-owned, veteran-owned, and HUBZone firms.",
          src: cardStats,
          alt: "Small business owner reviewing federal contracting goals",
          ctaText: "See the goals",
          ctaHref: "#",
        },
        {
          title: "Thousands of Schedule vendors",
          body: "Every Schedule category includes small business vendors, and contracting officers are encouraged to set aside orders whenever market research supports it.",
          src: cardVendors,
          alt: "Small business vendor on a GSA Schedule",
          ctaText: "Browse small business vendors",
          ctaHref: "#",
        },
        {
          title: "Resources & guidance",
          body: "The Small Business Center offers guidance on getting on Schedule, understanding set-asides, and preparing competitive offers.",
          src: cardResources,
          alt: "Small business owner reviewing GSA guidance materials",
          ctaText: "Get guidance",
          ctaHref: "#",
        },
        {
          title: "Mentor-Protégé Program",
          body: "Pairs large prime contractors with small business protégés to help them build capacity, gain past performance, and grow their federal programs.",
          src: cardMentor,
          alt: "Mentor and protégé business owners meeting",
          ctaText: "Learn about the program",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do small businesses work with GSA?"
      faqs={[
        {
          question: "What small business goals does GSA meet?",
          answer:
            "Goals for small disadvantaged businesses, women-owned small businesses, veteran-owned small businesses, and HUBZone firms.",
        },
        {
          question: "Are there small businesses on Schedule?",
          answer:
            "Yes — thousands of small business vendors across every Schedule category.",
        },
        {
          question: "What does the Small Business Center offer?",
          answer:
            "Guidance on getting on Schedule, understanding set-aside requirements, and preparing competitive offers.",
        },
        {
          question: "What is the Mentor-Protégé Program?",
          answer:
            "A program pairing large prime contractors with small business protégés to build capacity and past performance.",
        },
        {
          question: "How can my small business get started?",
          answer:
            "Start with Sell to GSA and the Small Business Center's resources on eligibility and offers.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
