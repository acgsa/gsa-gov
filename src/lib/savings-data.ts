/**
 * Shared savings milestone data.
 * Imported by SavingsMilestoneScroll, SavingsTotalStrip, SavingsScrollSection.
 */

import type { StaticImageData } from "next/image";
import reEstate1 from "@/assets/images/REAL ESTATE/huntsville-courthouse-atrium-gallery.jpg";
import acquisition1 from "@/assets/images/ACCOUNTABILITY/pexels-ramazphotos-32314507.jpg";
import fraud1 from "@/assets/images/ACCOUNTABILITY/pexels-maximkapytka-17507798.jpg";
import tech1 from "@/assets/images/TECH/photo-1617761141732-d481912af1a9.avif";
import fleet1 from "@/assets/images/ACCOUNTABILITY/pexels-rostislav-34281360.jpg";
import travel1 from "@/assets/images/BUILDING/1800FHistoric1.jpg";
import reEstate2 from "@/assets/images/REAL ESTATE/1st-floor-corridor-james-r-browning-us-court-of-appeals-building-san-francisco-1dc993-1024.jpg";

/** Slug references to news articles related to a milestone. */
export interface Milestone {
  /** Short quarter label, e.g. "Q1" */
  quarter: string;
  year: string;
  /** Category name shown in strip segment tooltip / active label */
  category: string;
  /** Sentence-style headline (retained for accessibility labels) */
  headline: string;
  /** Noun-phrase title used as the primary on-screen milestone name */
  titleNoun: string;
  detail: string;
  /** Human-readable amount, e.g. "$3.0B" */
  amountLabel: string;
  /** Raw value in millions USD — used for cumulative totals and segment widths */
  rawValueM: number;
  /** Optional background image shown subtly behind each milestone panel */
  image?: StaticImageData;
  /** Slugs (into NEWS_ARTICLES) of 1–2 related news stories */
  articleSlugs?: string[];
}

export const MILESTONES: Milestone[] = [
  {
    quarter: "FY25",
    year: "2025",
    category: "Acquisition",
    headline: "$7.1B in FY 2025 Acquisition Savings Delivered to Agencies",
    titleNoun: "Acquisition-Program Savings",
    detail:
      "FY 2025 acquisition-program savings delivered to customer agencies reached $7.1 billion across category management, City Pairs, SmartPay, IT, and Assisted Acquisition programs.",
    amountLabel: "$7.1B",
    rawValueM: 7100,
    image: acquisition1,
    articleSlugs: ["federal-fleet-right-sizing"],
  },
  {
    quarter: "Apr",
    year: "2026",
    category: "Technology",
    headline: "OneGov Saves Taxpayers $1.1B in Its First Year",
    titleNoun: "OneGov Technology Buying",
    detail:
      "Announced April 2026, OneGov consolidated fragmented IT purchasing into about 20 unified agreements with major vendors, with discounts up to 90% — delivering $1.1 billion in first-year savings.",
    amountLabel: "$1.1B",
    rawValueM: 1100,
    image: tech1,
    articleSlugs: ["onegov-contracting-framework"],
  },
  {
    quarter: "FY25",
    year: "2026",
    category: "Acquisition",
    headline: "Regulatory Streamlining Projected to Save ~$900M Over a Decade",
    titleNoun: "Regulatory Streamlining",
    detail:
      "The FAR, Federal Management Regulation, and Travel Regulation rewrites are projected to save roughly $900 million over the next decade — a multi-year projection rather than a single-year cash figure.",
    amountLabel: "$900M",
    rawValueM: 900,
    image: travel1,
    articleSlugs: ["federal-travel-reform"],
  },
  {
    quarter: "FY25",
    year: "2025",
    category: "Real Estate",
    headline: "Lease Renegotiations & Portfolio Reductions Avoid $730M",
    titleNoun: "Lease Portfolio Right-Sizing",
    detail:
      "GSA renegotiated leases and strategically reduced the leased portfolio, avoiding roughly $730 million in future costs from actions already taken.",
    amountLabel: "$730M",
    rawValueM: 730,
    image: reEstate1,
    articleSlugs: [
      "property-disposal-program-launch",
      "underutilized-buildings-sale",
    ],
  },
  {
    quarter: "FY25",
    year: "2025",
    category: "Acquisition",
    headline: ">$500M in Underperforming Contracts Canceled Inside GSA",
    titleNoun: "Contract Cancellations",
    detail:
      "GSA directly canceled more than $500 million in unnecessary or underperforming contracts inside the agency.",
    amountLabel: ">$500M",
    rawValueM: 500,
    image: fleet1,
    articleSlugs: ["fedramp-20x-launch", "it-systems-consolidation"],
  },
  {
    quarter: "FY25",
    year: "2025",
    category: "Real Estate",
    headline:
      "90 Properties Disposed — $415M in Repairs & Operating Costs Avoided",
    titleNoun: "Property Disposition Cost Avoidance",
    detail:
      "GSA disposed of 90 federal properties, reducing the portfolio by more than 3 million square feet and avoiding about $415 million in repairs and operating costs.",
    amountLabel: "$415M",
    rawValueM: 415,
    image: reEstate2,
    articleSlugs: [
      "improper-payments-recovery",
      "procurement-analytics-platform",
    ],
  },
  {
    quarter: "FY25",
    year: "2025",
    category: "Real Estate",
    headline: "$182M in Revenue Generated From Property Sales",
    titleNoun: "Property Sales Revenue",
    detail:
      "The disposition of 90 federal properties generated $182 million in cash proceeds from property sales.",
    amountLabel: "$182M",
    rawValueM: 182,
    image: reEstate1,
    articleSlugs: ["lease-consolidation-program"],
  },
  {
    quarter: "FY25",
    year: "2025",
    category: "Acquisition",
    headline: "MAS Rightsizing — ~1,600 Contracts Eliminated (~$24M/yr)",
    titleNoun: "MAS Rightsizing",
    detail:
      "GSA eliminated approximately 1,600 unnecessary Multiple Award Schedule contracts in FY 2025, an annualized estimated savings of about $24 million per year.",
    amountLabel: "$24M/yr",
    rawValueM: 24,
    image: acquisition1,
    articleSlugs: ["onegov-contracting-framework"],
  },
  {
    quarter: "—",
    year: "2026",
    category: "Accountability",
    headline: "Other GSA-Reported Contract Savings (Not Further Itemized)",
    titleNoun: "Other Reported Contract Savings",
    detail:
      "The remaining ~$49 billion reflects broader government-wide buying-power effects, category management, and pricing improvements that GSA reports but has not published as a detailed line-item list.",
    amountLabel: "~$49B",
    rawValueM: 49049,
    image: reEstate2,
    articleSlugs: ["lease-consolidation-program"],
  },
];

/** Total of all milestone values in millions */
export const TOTAL_M: number = MILESTONES.reduce(
  (sum, m) => sum + m.rawValueM,
  0,
);

/** Pre-computed cumulative totals in millions (index-aligned with MILESTONES) */
export const CUMULATIVE_M: number[] = MILESTONES.reduce<number[]>(
  (acc, m, i) => {
    acc.push((i > 0 ? (acc[i - 1] as number) : 0) + m.rawValueM);
    return acc;
  },
  [],
);

/** Format a millions value as a compact dollar string, e.g. "$3.0B", "$520M" */
export function formatMillions(m: number): string {
  if (m >= 1000) {
    const b = m / 1000;
    return `$${b % 1 === 0 ? b.toFixed(0) : b.toFixed(1)}B`;
  }
  return `$${Math.round(m).toLocaleString("en-US")}M`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fraud-prevention interactive stat — Uncovered / Stopped / Prosecuted
// Placeholder figures; editorial staff may revise. Only the hero big number and
// its sub-caption react to the active stage; nothing else on the page changes.
// ─────────────────────────────────────────────────────────────────────────────

export interface FraudStage {
  /** Toggle button label */
  label: string;
  /** Large display figure, e.g. "$8B+" */
  value: string;
  /** Sub-caption shown beneath the figure */
  caption: string;
}

/**
 * Single source of truth for the headline savings figure (in whole dollars).
 *
 * This drives BOTH the savings-page hero "Stopped" figure ("$60B+") and the
 * global header ticker (OdometerCounter). Update this one constant to change
 * the number everywhere. The hero renders the rounded "$60B+" label
 * (SAVINGS_HEADLINE_LABEL); the ticker seeds its rolling odometer from
 * SAVINGS_HEADLINE_DOLLARS and increments forward from there.
 */
export const SAVINGS_HEADLINE_DOLLARS: number = 60_000_000_000;

/** Rounded display label for the headline figure (hero big number). */
export const SAVINGS_HEADLINE_LABEL = "$60B+";

export const FRAUD_STAGES: FraudStage[] = [
  {
    label: "Stopped",
    value: SAVINGS_HEADLINE_LABEL,
    caption:
      "in federal contract savings driven since January 2025 through cancellations, better pricing, and efficiency reforms — of which roughly $10–11B is itemized in published line items below",
  },
  {
    label: "Uncovered",
    value: "$3B+",
    caption:
      "in potential savings identified but not yet fully realized — including 45 high-cost, underutilized properties (~15M sq ft) flagged for accelerated disposition",
  },
  {
    label: "Prosecuted",
    value: "$90M+",
    caption:
      "in monetary recoveries, settlements, and judgments through GSA OIG actions and False Claims Act settlements referred to the Department of Justice",
  },
];
