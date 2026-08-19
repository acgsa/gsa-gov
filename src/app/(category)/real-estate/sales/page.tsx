import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ─────────────────────────────────────────────────────────────────
import cardAuction from "@/assets/images/REAL ESTATE/Disposition-Strom-Thurmond-FB-CH_final1.jpg";
import cardAgencies from "@/assets/images/REAL ESTATE/photo-1718371309360-866be342a72a.avif";
import cardConveyance from "@/assets/images/REAL ESTATE/making-federal-buildings-beautiful-again-opinion-phineas-harper-dezeen-sq.jpg";
import cardPipeline from "@/assets/images/REAL ESTATE/a44b626c-cb75-449a-806a-272ddc9d90a1_1140x641.jpg";

const newsArticles = [
  getArticle("underutilized-buildings-sale"),
  getArticle("property-disposal-program-launch"),
  getArticle("rightsizing-federal-real-estate"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Property for Sale | Real Estate",
  description:
    "GSA manages the sale and transfer of surplus federal real property through a transparent, competitive process.",
};

export default function PropertyForSalePage() {
  return (
    <TopicPage
      eyebrow="Real Estate"
      eyebrowHref="/real-estate"
      title="Buying federal property"
      intro="When federal agencies no longer need real property, GSA returns surplus assets to productive use — through public sale, transfer, or exchange."
      cta={{ label: "Browse current auctions", href: "#" }}
      cards={[
        {
          title: "Bid at auction",
          body: "Surplus federal properties are sold at public auction through RealEstateSales.gov. Auctions are open to all qualified bidders, from individuals to developers.",
          src: cardAuction,
          alt: "Strom Thurmond Federal Building and Courthouse",
          ctaText: "See current listings",
          ctaHref: "#",
        },
        {
          title: "For federal agencies",
          body: "Agencies report excess real property to GSA, which manages screening, valuation, and disposal — returning proceeds to the Treasury or sponsoring agency.",
          src: cardAgencies,
          alt: "Federal office building exterior",
          ctaText: "Report excess property",
          ctaHref: "#",
        },
        {
          title: "Public benefit conveyances",
          body: "State and local governments and eligible nonprofits can acquire surplus federal property at a discount for parks, education, health, and other public uses.",
          src: cardConveyance,
          alt: "Classical federal building facade with columns",
          ctaText: "Learn about conveyances",
          ctaHref: "#",
        },
        {
          title: "Disposition pipeline",
          body: "GSA maintains a rolling pipeline of properties in every stage of disposal — from initial screening to final sale — across all 11 regions.",
          src: cardPipeline,
          alt: "Aerial view of federal properties in the disposition pipeline",
          ctaText: "View the pipeline",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does disposal work?"
      faqs={[
        {
          question: "Who can buy federal property?",
          answer:
            "Anyone. Public auctions on RealEstateSales.gov are open to all qualified bidders — individuals, businesses, and developers. Registration is free and bidding is conducted entirely online.",
        },
        {
          question: "What happens before a property reaches auction?",
          answer:
            "Federal law sets a screening sequence: properties are first offered to other federal agencies, then to state and local governments and nonprofits for public benefit uses. Only properties that clear those screens go to public sale.",
        },
        {
          question: "How are properties priced?",
          answer:
            "Auction properties sell at fair market value determined by competitive bidding. Each listing includes a starting bid, bid increments, and any deposit requirements set by GSA.",
        },
        {
          question: "Can communities acquire property without bidding?",
          answer:
            "Yes. Through public benefit conveyances, eligible public bodies and nonprofits can acquire surplus property at up to 100 percent discount for approved uses such as parks, schools, and homeless assistance.",
        },
        {
          question: "Where do sale proceeds go?",
          answer:
            "Proceeds flow to the Treasury or to the sponsoring agency as required by law. GSA's accelerated disposal approach has generated an estimated $3 billion in avoided deferred-maintenance costs.",
        },
        {
          question: "Who should I contact with questions?",
          answer:
            "Each auction listing names a GSA realty specialist who can answer questions about the property, inspection dates, and bidding. General questions can go to your GSA regional office.",
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
