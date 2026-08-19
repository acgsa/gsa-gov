import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";

// ── Card images ─────────────────────────────────────────────────────────────────
import cardAgencies from "@/assets/images/REAL ESTATE/_LEASE/Meeting-Lobby.jpg";
import cardOffer from "@/assets/images/REAL ESTATE/_LEASE/22-building-ouside1-1875-penn-2-scaled.webp";
import cardManage from "@/assets/images/REAL ESTATE/_LEASE/17-metting-room-1875-penn-2-scaled.webp";
import cardInventory from "@/assets/images/REAL ESTATE/55_07035_02_N6_weblg.jpg";

const newsArticles = [
  getArticle("rightsizing-federal-real-estate"),
  getArticle("brownsville-gateway-port-groundbreaking"),
  getArticle("lease-consolidation-program"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Leasing | Real Estate",
  description:
    "GSA leases commercial space on behalf of federal agencies when existing government-owned buildings cannot meet their needs.",
};

export default function LeasingPage() {
  return (
    <TopicPage
      eyebrow="Real Estate"
      eyebrowHref="/real-estate"
      title="Leasing federal workspace"
      intro="GSA leases commercial space on behalf of federal agencies when existing government-owned buildings cannot meet their needs."
      cta={{ label: "Manage your lease", href: "#" }}
      steps={[
        {
          title: "Define your requirement",
          body: "Your agency submits its space, location, and security needs through a workspace request.",
        },
        {
          title: "GSA competes the lease",
          body: "We survey the market, run a competitive procurement, and negotiate terms on your behalf.",
        },
        {
          title: "Move in",
          body: "Sign the occupancy agreement, complete build-out, and settle into your new space.",
        },
      ]}
      cards={[
        {
          title: "For federal agencies",
          body: "GSA acts as your real estate agent — developing space requirements, soliciting offers, negotiating terms, and managing the lease through its full term.",
          src: cardAgencies,
          alt: "Modern federal office lobby with meeting spaces",
          ctaText: "Contact your regional team",
          ctaHref: "#",
        },
        {
          title: "Offer space to the government",
          body: "Building owners and brokers can offer commercial space for federal lease. Opportunities are advertised publicly and awarded through a competitive process.",
          src: cardOffer,
          alt: "Exterior of a modern commercial office building",
          ctaText: "Offer your space",
          ctaHref: "#",
        },
        {
          title: "Lease management",
          body: "Lessors manage active leases, submit invoices, and coordinate maintenance and inspections with GSA lease administration through a single portal.",
          src: cardManage,
          alt: "Conference room in a modern leased federal workspace",
          ctaText: "Manage your lease",
          ctaHref: "#",
        },
        {
          title: "Current inventory",
          body: "GSA manages more than 8,000 lease actions covering over 180 million square feet nationwide. Explore the current leased inventory and upcoming expirations.",
          src: cardInventory,
          alt: "Federal office building in GSA's leased inventory",
          ctaText: "See the inventory",
          ctaHref: "#",
        },
      ]}
      faqHeading="How does leasing work?"
      faqs={[
        {
          question: "How do I offer space to the federal government?",
          answer:
            "Most opportunities are advertised on SAM.gov. You submit offers through the Leasing Portal. Registration is free.",
        },
        {
          question: "How do I manage an existing lease?",
          answer:
            "Current lessors use the Leasing Portal to submit tax adjustment requests, upload documents, and request ownership changes.",
        },
        {
          question: "Where can I find current lease opportunities?",
          answer:
            "Lease opportunities are posted on SAM.gov. You can also view them on the Lease Contract Opportunities Map inside the Leasing Portal.",
        },
        {
          question: "What is the Leasing Desk Guide?",
          answer:
            "The Leasing Desk Guide is the primary source of GSA leasing policy and procedures. It covers the full acquisition process, from requirements development through lease administration. Updates are issued through Leasing Alerts and Lease Acquisition Circulars.",
        },
        {
          question: "Can federal agencies lease space themselves?",
          answer:
            "Most agencies work through GSA. Some agencies may request a formal delegation of leasing authority for certain types of space. Contact your GSA regional team or see the Lease Delegations page for details.",
        },
        {
          question: "Where can I find lease inventory data?",
          answer:
            "GSA publishes a monthly inventory of its leased portfolio, including location, lease number, expiration, square footage, and rent information. Historical files and fiscal year prospectuses are also available.",
        },
        {
          question: "Who should I contact with questions?",
          answer: (
            <>
              Email{" "}
              <a
                href="mailto:leasing@gsa.gov"
                className="text-usds-steel-700 underline decoration-usds-steel-300 underline-offset-2 hover:text-usds-steel-900 hover:decoration-usds-steel-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
              >
                leasing@gsa.gov
              </a>
              .
            </>
          ),
        },
      ]}
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
