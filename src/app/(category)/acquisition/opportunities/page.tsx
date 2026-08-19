import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ───────────────────────────────────────────────────────────
import cardWhere from "@/assets/images/ACQUISITION/pexels-melih-akkus-679376803-29849777.jpg";
import cardRfi from "@/assets/images/ACQUISITION/pexels-ramazphotos-32314507.jpg";
import cardRespond from "@/assets/images/ACQUISITION/pexels-ramazphotos-7016965.jpg";
import cardReady from "@/assets/images/ACQUISITION/pexels-rostislav-34281360.jpg";

const newsArticles = [
  getArticle("onegov-contracting-framework"),
  getArticle("procurement-analytics-platform"),
  getArticle("improper-payments-recovery"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Current Opportunities | Acquisition",
  description:
    "Browse current federal contracting opportunities available through GSA vehicles.",
};

export default function OpportunitiesPage() {
  return (
    <TopicPage
      eyebrow="Acquisition"
      eyebrowHref="/acquisition"
      title="Current Opportunities"
      intro="Active federal contracting opportunities across GSA's portfolio of contract vehicles — from Schedule RFQs to large-scale GWAC task order competitions."
      cta={{ label: "Search SAM.gov", href: "#" }}
      cards={[
        {
          title: "Where to find opportunities",
          body: "SAM.gov is the official source above the simplified acquisition threshold; eBuy covers Schedule solicitations, and OASIS+ has its own ordering portal.",
          src: cardWhere,
          alt: "Vendor searching federal contracting opportunities",
          ctaText: "Browse open solicitations",
          ctaHref: "#",
        },
        {
          title: "Pre-solicitation notices & RFIs",
          body: "GSA publishes requests for information ahead of major acquisitions — vendors are encouraged to respond and help shape requirements.",
          src: cardRfi,
          alt: "Team responding to a request for information",
          ctaText: "Read current RFIs",
          ctaHref: "#",
        },
        {
          title: "Responding to solicitations",
          body: "Vendors must hold an active Schedule or be on-ramp eligible, and should address every evaluation factor with current, accurate pricing.",
          src: cardRespond,
          alt: "Vendor preparing a solicitation response",
          ctaText: "See response requirements",
          ctaHref: "#",
        },
        {
          title: "Stay ready",
          body: "Register early, set up automated SAM.gov notifications, and keep your GSA Advantage! profile current to stay visible to federal buyers.",
          src: cardReady,
          alt: "Vendor monitoring SAM.gov notifications",
          ctaText: "Set up notifications",
          ctaHref: "#",
        },
      ]}
      faqHeading="How do I find and win opportunities?"
      faqs={[
        {
          question: "Where are federal opportunities posted?",
          answer:
            "SAM.gov, eBuy, or the OASIS+ ordering portal, depending on the vehicle and dollar threshold.",
        },
        {
          question: "What is an RFI?",
          answer:
            "A request for information, published ahead of major acquisitions so vendors can respond and help shape requirements.",
        },
        {
          question: "Who can respond to GSA solicitations?",
          answer:
            "Vendors holding an active GSA Schedule, or on-ramp eligible contractors for the relevant vehicle.",
        },
        {
          question: "What should a response include?",
          answer:
            "Every evaluation factor stated in the solicitation, with current and accurate pricing from your Schedule contract.",
        },
        {
          question: "How can I stay ready for new opportunities?",
          answer:
            "Register early, set up automated SAM.gov notifications, and keep your SAM.gov and GSA Advantage! profiles current.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
