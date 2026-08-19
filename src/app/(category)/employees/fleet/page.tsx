import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardLease from "@/assets/images/USA/photo-1501466044931-62695aada8e9.avif";
import cardEv from "@/assets/images/TECH/photo-1617761141732-d481912af1a9.avif";
import cardRentals from "@/assets/images/USA/photo-1557160854-e1e89fdd3286.avif";
import cardData from "@/assets/images/TECH/FPDS_img_dktp.png";

const newsArticles = [
  getArticle("federal-fleet-right-sizing"),
  getArticle("federal-travel-reform"),
  getArticle("per-diem-rate-modernization"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "GSA Fleet | Resources",
  description:
    "GSA Fleet covers every federal transportation need — leasing, buying, and renting vehicles, moving freight, and training the people who manage it all.",
};

export default function FleetPage() {
  return (
    <TopicPage
      eyebrow="Resources"
      eyebrowHref="/employees"
      title="GSA Fleet"
      intro="Every transportation need, one program — lease, buy, or rent vehicles, move freight, and manage it all with easy online tools."
      cta={{ label: "Lease a vehicle", href: "#" }}
      cards={[
        {
          title: "Lease a vehicle",
          body: "One monthly rate covers acquisition, maintenance, repair, and disposal — no internal fleet management burden for your agency.",
          src: cardLease,
          alt: "Federal fleet vehicles ready for agency lease",
          ctaText: "How leasing works",
          ctaHref: "#",
        },
        {
          title: "Buy a vehicle",
          body: "Purchase vehicles through GSA at the government's negotiated prices, with online tools that make acquisition easy.",
          src: cardEv,
          alt: "New vehicles available for federal purchase",
          ctaText: "Start a purchase",
          ctaHref: "#",
        },
        {
          title: "Rent for the short term",
          body: "Need a vehicle for days instead of years? Short-term rentals cover temporary mission needs without a lease.",
          src: cardRentals,
          alt: "Short-term rental vehicles for federal use",
          ctaText: "See rental options",
          ctaHref: "/employees/rentals",
        },
        {
          title: "Move freight",
          body: "GSA's transportation programs — including the Freight Management Program and TMSS 2.0 — handle federal shipping and logistics.",
          src: cardData,
          alt: "Federal freight and logistics management tools",
          ctaText: "Explore transportation programs",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does GSA Fleet work?"
      faqs={[
        {
          question: "Should we lease or buy?",
          answer:
            "Leasing includes maintenance, repair, and disposal in one monthly rate — best for most ongoing needs. Buying makes sense when your agency wants to own and manage vehicles directly. GSA supports both, at negotiated prices.",
        },
        {
          question: "What if we only need a vehicle for a few days?",
          answer:
            "Use short-term rentals. They cover temporary mission needs — surges, projects, seasonal work — without committing to an annual lease.",
        },
        {
          question: "How do we ship freight?",
          answer:
            "Through GSA's transportation programs: the Freight Management Program and TMSS 2.0 give agencies pre-negotiated rates and online tools for shipping and logistics.",
        },
        {
          question: "How do fleet managers get trained?",
          answer:
            "The Federal Fleet Management Certification Program (FFMCP) is comprehensive training for federal fleet management at every level.",
        },
        {
          question: "What is FedFleet?",
          answer:
            "A week of training that brings fleet management professionals from across government together — a unique, educational experience held annually.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "GSA Fleet's customer service team supports leasing, purchasing, rentals, and freight — or start with your agency's fleet manager.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
