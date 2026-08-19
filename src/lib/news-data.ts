/**
 * News article data — surfaced at gsa.gov/news/[slug] via the DetailPage template
 * and linked from savings milestone panels.
 *
 * Content is editorially sourced and may be revised. Figures align with the
 * placeholder savings milestones in savings-data.ts. No PII.
 */

import type { StaticImageData } from "next/image";

import reEstate1 from "@/assets/images/REAL ESTATE/huntsville-courthouse-atrium-gallery.jpg";
import reEstate2 from "@/assets/images/REAL ESTATE/1st-floor-corridor-james-r-browning-us-court-of-appeals-building-san-francisco-1dc993-1024.jpg";
import reEstate3 from "@/assets/images/REAL ESTATE/denver.jpeg";
import playbook1 from "@/assets/images/ACCOUNTABILITY/watercolor.jpg";
import adminVision1 from "@/assets/images/ED/03252026 - GSA NCR Press Conference-10-Slide1.jpg";
import rightsizing1 from "@/assets/images/REAL ESTATE/SC0011.jpg";
import leaseConsolidation1 from "@/assets/images/REAL ESTATE/DC0523AB.jpg";
import fraudTaskForce1 from "@/assets/images/TASK FORCE/HEf7tqma8AAmh_E.jpg";
import fedramp504m1 from "@/assets/images/TECH/photo-1750055263758-f4b95c4a0814.avif";
import brownsville1 from "@/assets/images/REAL ESTATE/905x0_s3-71426-W-TX-BROWNSVILLE-PORT-1 (1).jpg";
import brownsville2 from "@/assets/images/IMAGE PANEL/136416728_web1_Rendering---Exterior---Pedestrian-Walkway.jpg";
import brownsville3 from "@/assets/images/IMAGE PANEL/9EEBF871-7E3B-43AB-9B50-5BBB286C9C0A_1_201_a-1067x800.jpeg";
import brownsville4 from "@/assets/images/IMAGE PANEL/image (4).jpg";
import acquisition1 from "@/assets/images/ACCOUNTABILITY/pexels-ramazphotos-32314507.jpg";
import fraud1 from "@/assets/images/TASK FORCE/UAIRZ4MK2PG3NUC3Z54YZZ2VNA.avif";
import fraud2 from "@/assets/images/ACCOUNTABILITY/pexels-maximkapytka-17507798.jpg";
import tech1 from "@/assets/images/TECH/photo-1617761141732-d481912af1a9.avif";
import tech2 from "@/assets/images/TECH/photo-1684139517679-032b7213ad2e.avif";
import tech3 from "@/assets/images/TECH/boliviainteligente-w-OurQzRuJ8-unsplash.jpg";
import fedrampLaunch1 from "@/assets/images/TECH/photo-1718011087751-e82f1792aa32.avif";
import fleet1 from "@/assets/images/ACCOUNTABILITY/pexels-rostislav-34281360.jpg";
import travel1 from "@/assets/images/BUILDING/1800FHistoric1.jpg";
import travel2 from "@/assets/images/USA/photo-1501466044931-62695aada8e9.avif";

export interface NewsArticleSection {
  id: string;
  heading: string;
  /** Paragraphs of body copy; rendered as <p> elements by the page */
  paragraphs: string[];
}

export interface NewsArticleImage {
  src: StaticImageData;
  alt: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  /** Short standfirst / deck shown on cards and beneath the title */
  dek: string;
  /** Publication date, human-readable */
  date: string;
  /** Category label (aligns with savings line of business) */
  category: string;
  /** Optional hero image. When absent the card renders the GSA seal on a Steel background. */
  image?: StaticImageData;
  /** Body sections rendered by the DetailPage template */
  sections: NewsArticleSection[];
  /** Optional photo gallery rendered as a final article section */
  gallery?: NewsArticleImage[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "brownsville-gateway-port-groundbreaking",
    title:
      "GSA, CBP and Community Partners Break Ground on $300M South Texas Port Project",
    dek: "New facilities will strengthen border security, support economic growth, and provide lasting value to American taxpayers.",
    date: "May 6, 2026",
    category: "Real Estate",
    image: brownsville1,
    sections: [
      {
        id: "overview",
        heading: "Modernizing a vital border crossing",
        paragraphs: [
          "BROWNSVILLE, Texas — The U.S. General Services Administration (GSA) and U.S. Department of Homeland Security–Customs and Border Protection (CBP) officially broke ground for the modernization of the Brownsville-Gateway Land Port of Entry in Brownsville, Texas. As the nation prepares to commemorate its 250th anniversary, this investment reflects the Administration's commitment to building mission-focused infrastructure that ensures our country remains secure, connected and moving forward.",
          "“GSA continues to fortify the federal portfolio by investing in critical infrastructure,” said GSA Administrator Edward C. Forst. “We are delivering on the President's promise to secure our borders by building new, modernized facilities that ensure our immigration and customs law enforcement officers have the resources they need to keep America safe.”",
          "By enhancing border security, replacing outdated infrastructure, doubling inspection lanes, and delivering purpose-built space for federal partners, GSA will strengthen border operations, support economic growth, and provide lasting value to American taxpayers and the nation.",
        ],
      },
      {
        id: "project",
        heading: "What the project delivers",
        paragraphs: [
          "The project will renovate the current land port of entry by demolishing existing facilities and expanding key areas. A new 48,000-square-foot administration building will replace the current 22,000-square-foot space, providing an updated facility for federal inspection agencies.",
          "The inspection area will expand to ten primary inspection lanes and 24 secondary inspection spaces with canopies — up from five lanes and 15 spaces, respectively. The 500-square-foot headhouse will be upgraded to a new 6,000-square-foot building. Additional upgrades include a new 9,000-square-foot outbound inspection area and new parking lots to accommodate staff and visitors.",
          "“This investment ensures our officers continue to have the necessary facilities, technology, and resources to perform their duties safely, effectively, and efficiently,” said CBP Commissioner Rodney Scott. “We are grateful to our partners for making this possible and look forward to its completion.”",
        ],
      },
      {
        id: "why",
        heading: "Why it matters",
        paragraphs: [
          "This land port of entry is a vital crossing point situated on nine acres in downtown Brownsville. Connecting to the Gateway International Bridge, the facility handles a significant volume of traffic every month — approximately 148,000 passenger vehicles and 157,000 pedestrians in March 2026 alone.",
          "In operation since the 1920s, the land port of entry has seen limited renovations since the 1990s, making this project crucial to update and modernize the facility to enhance security and efficiency.",
          "“Our nation's ports of entry are vital to facilitate trade and travel while protecting against illegal goods and national security threats,” said Senator John Cornyn. “The modernized Brownsville-Gateway Land Port of Entry will streamline operations and the flow of commerce.”",
          "Project completion is scheduled for late 2029.",
        ],
      },
    ],
    gallery: [
      {
        src: brownsville2,
        alt: "Exterior rendering of the new Brownsville-Gateway Land Port of Entry pedestrian walkway",
      },
      {
        src: brownsville1,
        alt: "Brownsville-Gateway Land Port of Entry in South Texas",
      },
      {
        src: brownsville3,
        alt: "Brownsville-Gateway Land Port of Entry federal building",
      },
      {
        src: brownsville4,
        alt: "Groundbreaking ceremony at the Brownsville-Gateway Land Port of Entry",
      },
    ],
  },
  {
    slug: "property-disposal-program-launch",
    title: "GSA Launches Federal Property Disposal Program",
    dek: "The agency begins transferring or selling 45 chronically underutilized federal properties in its most aggressive real estate consolidation in decades.",
    date: "January 14, 2025",
    category: "Real Estate",
    image: reEstate1,
    sections: [
      {
        id: "overview",
        heading: "A leaner federal footprint",
        paragraphs: [
          "The General Services Administration today announced the launch of the Federal Property Disposal Program, an initiative to transfer or sell 45 chronically underutilized federal properties nationwide.",
          "The properties, identified through occupancy and utilization data, have long carried operating and maintenance costs disproportionate to their use. GSA estimates the first phase will free roughly $750 million in capital and avoided costs.",
        ],
      },
      {
        id: "how",
        heading: "How properties were selected",
        paragraphs: [
          "GSA's Public Buildings Service ranked candidate assets using occupancy agreement data, deferred-maintenance liability, and long-term lease obligations.",
          "Proceeds from disposals are returned to the federal government and reinvested in higher-performing assets and mission-critical space.",
        ],
      },
    ],
  },
  {
    slug: "underutilized-buildings-sale",
    title: "First Wave of Underutilized Buildings Heads to Auction",
    dek: "GSA identifies a nationwide portfolio of low-use assets for sale, targeting reduced operating costs and reinvestment in high-performing space.",
    date: "February 3, 2025",
    category: "Real Estate",
    image: reEstate2,
    sections: [
      {
        id: "overview",
        heading: "Assets to market",
        paragraphs: [
          "GSA has begun listing the first tranche of underutilized federal buildings for competitive sale, part of the broader Federal Property Disposal Program announced earlier this quarter.",
          "Each asset was evaluated for occupancy, condition, and long-term cost to the taxpayer before being cleared for disposal.",
        ],
      },
      {
        id: "impact",
        heading: "Expected taxpayer impact",
        paragraphs: [
          "By removing low-use properties from the federal inventory, GSA reduces recurring operating costs and deferred-maintenance obligations.",
          "The agency will publish disposal outcomes as transactions close.",
        ],
      },
    ],
  },
  {
    slug: "onegov-contracting-framework",
    title: "OneGov Contracting Framework Goes Live",
    dek: "Category management reforms eliminate 1,200 duplicative contracts across 18 agencies, driving an average 18% price reduction on common-use goods and services.",
    date: "April 22, 2025",
    category: "Acquisition",
    image: acquisition1,
    sections: [
      {
        id: "overview",
        heading: "Unified purchasing power",
        paragraphs: [
          "GSA today activated the OneGov Contracting Framework, consolidating duplicative agency contracts into unified, government-wide vehicles with standardized terms.",
          "The reform eliminates 1,200 overlapping contracts across 18 agencies and is projected to save $250 million through improved pricing and reduced administrative overhead.",
        ],
      },
      {
        id: "how",
        heading: "What changes for agencies",
        paragraphs: [
          "Agencies purchasing common-use goods and services now transact through consolidated vehicles that leverage aggregate federal demand.",
          "Early data show an average 18% price reduction on covered categories.",
        ],
      },
    ],
  },
  {
    slug: "fedramp-20x-launch",
    title: "FedRAMP 20x Cuts Cloud Authorization Time to Weeks",
    dek: "An automated authorization pathway slashes average time-to-authorization from 18 months to under six weeks.",
    date: "July 9, 2025",
    category: "Technology",
    image: fedrampLaunch1,
    sections: [
      {
        id: "overview",
        heading: "Faster, automated authorizations",
        paragraphs: [
          "GSA's FedRAMP program launched FedRAMP 20x, an automated authorization pathway that reduces the average time-to-authorization for cloud services from 18 months to under six weeks.",
          "The change removes hundreds of millions of dollars in duplicative security assessment costs while accelerating agency access to modern cloud tools.",
        ],
      },
      {
        id: "security",
        heading: "Security posture maintained",
        paragraphs: [
          "FedRAMP 20x preserves rigorous security review through continuous, machine-readable evidence rather than point-in-time paperwork.",
          "Authorizations remain grounded in NIST SP 800-53 controls.",
        ],
      },
    ],
  },
  {
    slug: "it-systems-consolidation",
    title: "GSA Consolidates 340 Redundant Agency IT Systems",
    dek: "Migration to shared GSA infrastructure eliminates duplicative licensing and assessment fees across the federal enterprise.",
    date: "August 5, 2025",
    category: "Technology",
    image: tech2,
    sections: [
      {
        id: "overview",
        heading: "One shared platform",
        paragraphs: [
          "GSA has consolidated 340 redundant agency IT systems onto shared, centrally managed infrastructure, reducing licensing, hosting, and security-assessment costs.",
          "Combined with the FedRAMP 20x pathway, the effort contributes to an estimated $700 million in technology savings.",
        ],
      },
      {
        id: "impact",
        heading: "Reinvesting the savings",
        paragraphs: [
          "Freed resources are redirected toward digital service delivery and modernization of high-impact citizen-facing systems.",
        ],
      },
    ],
  },
  {
    slug: "usai-platform-expansion",
    title: "USAi Brings Secure Generative AI to 3.4 Million Federal Employees",
    dek: "GSA's USAi platform expands government-approved generative AI access to 23 agencies, giving federal staff secure tools to draft, summarize, and automate routine work.",
    date: "September 12, 2025",
    category: "Technology",
    image: tech3,
    sections: [
      {
        id: "overview",
        heading: "AI tools at government scale",
        paragraphs: [
          "GSA today announced that USAi, its secure generative AI platform, now reaches 3.4 million federal employees across 23 agencies — the largest deployment of government-approved AI tools to date.",
          "USAi gives staff vetted access to generative AI for drafting, summarizing, analyzing, and automating routine work, all while meeting federal security and privacy requirements.",
        ],
      },
      {
        id: "how",
        heading: "Vetted once, trusted everywhere",
        paragraphs: [
          "Rather than having each agency independently evaluate and authorize every tool, GSA vets AI capabilities against federal standards so agencies can adopt them with confidence.",
          "The platform is built on FedRAMP-authorized infrastructure and processes no personally identifiable information about the public.",
        ],
      },
    ],
  },
  {
    slug: "improper-payments-recovery",
    title: "GSA Analytics Flag $2.1B in Improper Payments",
    dek: "An AI-powered procurement analytics platform identifies fraudulent vendor activity and duplicate payments across 94 federal agencies.",
    date: "May 28, 2025",
    category: "Fraud Prevention",
    image: fraud1,
    sections: [
      {
        id: "overview",
        heading: "Detecting fraud at scale",
        paragraphs: [
          "GSA's procurement analytics platform, built on real-time data from SAM.gov and USASpending.gov, has flagged $2.1 billion in suspected improper payments and fraudulent vendor activity across 94 federal agencies.",
          "Flagged transactions are routed to agency review teams and, where warranted, referred for recovery and prosecution.",
        ],
      },
      {
        id: "how",
        heading: "How the platform works",
        paragraphs: [
          "The system correlates vendor registration, award, and payment data to surface duplicate payments, unauthorized commitments, and anomalous vendor behavior.",
          "Analysts validate machine-generated flags before any enforcement action.",
        ],
      },
    ],
  },
  {
    slug: "procurement-analytics-platform",
    title: "Inside GSA's Procurement Analytics Platform",
    dek: "A look at the data pipeline connecting SAM.gov and USASpending.gov to catch waste before dollars go out the door.",
    date: "June 11, 2025",
    category: "Fraud Prevention",
    image: fraud2,
    sections: [
      {
        id: "overview",
        heading: "From data to decisions",
        paragraphs: [
          "The platform ingests federal procurement and payment data, normalizes it, and applies detection models tuned to known fraud patterns.",
          "Results feed dashboards used by agency financial managers and inspectors general.",
        ],
      },
      {
        id: "governance",
        heading: "Governance and privacy",
        paragraphs: [
          "The platform processes federal spending records only and contains no personally identifiable information about the public.",
          "Access is role-restricted and audited.",
        ],
      },
    ],
  },
  {
    slug: "federal-fleet-right-sizing",
    title: "Federal Fleet Right-Sizing Returns 12,000 Vehicles",
    dek: "GSA returns surplus vehicles to auction and terminates associated maintenance contracts, avoiding $500M in lifecycle costs.",
    date: "October 17, 2025",
    category: "Fleet",
    image: fleet1,
    sections: [
      {
        id: "overview",
        heading: "A right-sized federal fleet",
        paragraphs: [
          "GSA completed Phase 1 of its federal fleet right-sizing initiative, returning 12,000 surplus vehicles to auction and terminating associated long-term maintenance contracts.",
          "Lifecycle cost modeling confirms $500 million in avoided capital and operating costs through FY2027.",
        ],
      },
      {
        id: "next",
        heading: "What comes next",
        paragraphs: [
          "Subsequent phases will evaluate remaining fleet segments for consolidation and electrification opportunities.",
        ],
      },
    ],
  },
  {
    slug: "federal-travel-reform",
    title: "Federal Travel Spend Falls 40% Under New Reforms",
    dek: "Updated per diem rates, a centralized booking mandate, and a temporary freeze on non-essential travel drive down annual costs.",
    date: "February 24, 2026",
    category: "Travel",
    image: travel1,
    sections: [
      {
        id: "overview",
        heading: "Disciplined federal travel",
        paragraphs: [
          "GSA-led travel reforms reduced annual federal travel spend by 40% across supported agencies, through updated per diem rates, a centralized booking mandate, and a 60-day freeze on non-mission-essential travel.",
          "The measures are projected to save roughly $400 million, reinvested in digital service delivery.",
        ],
      },
    ],
  },
  {
    slug: "per-diem-rate-modernization",
    title: "GSA Modernizes Per Diem Rates for 2026 Travel Season",
    dek: "Updated lodging and meal allowances give federal travelers clearer, data-driven rates while holding down overall travel costs.",
    date: "March 18, 2026",
    category: "Travel",
    sections: [
      {
        id: "overview",
        heading: "Data-driven travel allowances",
        paragraphs: [
          "GSA published modernized per diem rates for the 2026 travel season, using updated market lodging data to set fair, transparent allowances for federal travelers.",
          "The refreshed rates give agencies clearer budgeting guidance while continuing to hold down overall federal travel spend.",
        ],
      },
      {
        id: "how",
        heading: "How rates are set",
        paragraphs: [
          "Per diem rates are based on average daily lodging costs in each locality, adjusted for seasonality and market conditions.",
          "Agencies and travelers can look up current rates by destination through GSA's per diem tools.",
        ],
      },
    ],
  },
  {
    slug: "lease-consolidation-program",
    title: "Lease Consolidation Cuts Deferred-Maintenance Backlog",
    dek: "Terminating 45 long-term leases and disposing 28 owned properties eliminates 6.6% of the federal deferred-maintenance liability.",
    date: "May 6, 2026",
    category: "Real Estate",
    image: leaseConsolidation1,
    sections: [
      {
        id: "overview",
        heading: "Shrinking the liability",
        paragraphs: [
          "GSA's lease consolidation program terminated 45 long-term leases and disposed of 28 owned properties, eliminating 6.6% of the federal government's $50 billion deferred-maintenance liability.",
          "Net proceeds and avoided costs reach $3.3 billion.",
        ],
      },
    ],
  },
  {
    slug: "playbook",
    title: "The Playbook for a Leaner, Smarter Government Is Here",
    dek: "GSA releases its strategic roadmap for reducing the federal footprint, consolidating contracts, and modernizing technology across every agency.",
    date: "June 3, 2026",
    category: "About GSA",
    image: playbook1,
    sections: [
      {
        id: "overview",
        heading: "A roadmap for reform",
        paragraphs: [
          "The U.S. General Services Administration today released its strategic playbook for delivering a leaner, smarter federal government — a comprehensive plan that coordinates real estate consolidation, acquisition reform, and technology modernization under a single, results-driven framework.",
          "\u201cWe are not just identifying problems \u2014 we are executing solutions at scale,\u201d said GSA Administrator Edward C. Forst. \u201cEvery dollar we save, every duplicate contract we eliminate, and every outdated building we dispose of is a direct return to the American taxpayer.\u201d",
          "The playbook represents the most ambitious reform agenda in GSA\u2019s seven-decade history, spanning all five of the agency\u2019s major lines of business.",
        ],
      },
      {
        id: "real-estate",
        heading: "Rightsizing the federal real estate portfolio",
        paragraphs: [
          "GSA will reduce the federal civilian real estate inventory by targeting chronically underutilized properties for disposal, terminating high-cost leases with low occupancy, and consolidating agencies into shared, right-sized campuses.",
          "The agency has already initiated disposal proceedings on 45 properties, with a target of 200 additional assets over the next 18 months.",
        ],
      },
      {
        id: "acquisition",
        heading: "Smarter buying through consolidated contracts",
        paragraphs: [
          "The OneGov Contracting Framework will eliminate thousands of duplicative contracts across the federal enterprise, leveraging the government's collective purchasing power to drive down prices on common-use goods and services.",
          "Early results from the first tranche of consolidated vehicles show an average 18% price reduction and significant reductions in vendor management overhead.",
        ],
      },
      {
        id: "technology",
        heading: "Modernizing federal technology at pace",
        paragraphs: [
          "FedRAMP 20x, the USAi generative AI platform, and a government-wide IT consolidation program form the technology pillar of the playbook.",
          "Together they are projected to save over $700 million while dramatically improving the digital experience for both federal employees and the public they serve.",
        ],
      },
      {
        id: "accountability",
        heading: "Accountability built in",
        paragraphs: [
          "Every initiative in the playbook includes measurable outcomes, published timelines, and quarterly reporting to Congress and the public.",
          "GSA's procurement analytics platform will continuously monitor contract spend for waste and fraud, ensuring savings are real and sustained.",
        ],
      },
    ],
  },
  {
    slug: "administrator-vision",
    title: "GSA Administrator Outlines Vision for a Leaner Federal Government",
    dek: "In remarks at the National Press Club, Administrator Edward C. Forst detailed GSA's agenda to eliminate waste, modernize infrastructure, and deliver measurable savings to taxpayers.",
    date: "March 25, 2026",
    category: "About GSA",
    image: adminVision1,
    sections: [
      {
        id: "overview",
        heading: "Setting the agenda",
        paragraphs: [
          "WASHINGTON, D.C. \u2014 GSA Administrator Edward C. Forst addressed the National Press Club today, laying out a sweeping vision for transforming the U.S. General Services Administration into a leaner, more accountable agency that returns real value to taxpayers.",
          "\u201cGSA touches virtually every corner of the federal government,\u201d Administrator Forst said. \u201cThat gives us an extraordinary opportunity \u2014 and an obligation \u2014 to eliminate waste wherever we find it, modernize what has grown outdated, and deliver the infrastructure that enables the rest of government to do its job.\u201d",
        ],
      },
      {
        id: "real-estate",
        heading: "A smaller, smarter real estate footprint",
        paragraphs: [
          "Administrator Forst announced that GSA would accelerate the disposal of chronically underutilized federal properties, targeting assets where occupancy rates have fallen below 25% for three or more consecutive years.",
          "\u201cWe are not in the business of warehousing empty buildings at taxpayer expense,\u201d he said. \u201cEvery property we dispose of converts a liability into an asset \u2014 for the government and for the communities where those properties sit.\u201d",
          "The administrator committed to publishing a public dashboard tracking disposal progress, occupancy data, and cost savings on a quarterly basis.",
        ],
      },
      {
        id: "acquisition",
        heading: "Buying smarter, not just cheaper",
        paragraphs: [
          "On acquisition, Forst outlined plans to consolidate thousands of duplicative contracts and expand the government\u2019s use of category management principles to leverage collective federal buying power.",
          "\u201cWhen 94 agencies buy the same office supplies under 94 separate contracts, we are leaving money on the table,\u201d he said. \u201cThe OneGov framework changes that.\u201d",
          "He also announced a new supplier integrity initiative, requiring enhanced vendor vetting for contracts above $1 million and expanding use of the procurement analytics platform to flag potential fraud before dollars are obligated.",
        ],
      },
      {
        id: "technology",
        heading: "Technology as a force multiplier",
        paragraphs: [
          "The administrator highlighted GSA\u2019s role as the federal government\u2019s technology backbone, pointing to FedRAMP 20x and the USAi generative AI platform as examples of GSA driving adoption of modern tools at government scale.",
          "\u201cFedRAMP 20x cut authorization time from 18 months to under six weeks,\u201d Forst said. \u201cThat is not a marginal improvement \u2014 that is a transformation in how government accesses secure technology.\u201d",
          "He committed to onboarding 10 additional agencies to the USAi platform by the end of the fiscal year, expanding secure generative AI access to more than four million federal employees.",
        ],
      },
      {
        id: "accountability",
        heading: "Accountability and transparency",
        paragraphs: [
          "Administrator Forst closed his remarks by underscoring a theme of accountability, announcing that GSA would begin publishing a quarterly Taxpayer Savings Report covering all major cost-reduction initiatives.",
          "\u201cThe American people deserve to know what their government is doing with their money,\u201d he said. \u201cWe are going to tell them \u2014 every quarter, in plain language, with real numbers.\u201d",
          "The first report will be released in conjunction with the agency\u2019s annual performance plan submission to Congress.",
        ],
      },
    ],
  },
  {
    slug: "rightsizing-federal-real-estate",
    title: "Rightsizing the Federal Real Estate Portfolio",
    dek: "GSA is executing the most ambitious reduction of the federal civilian real estate footprint in decades \u2014 disposing of underutilized properties, terminating high-cost leases, and consolidating agencies into mission-right spaces.",
    date: "April 7, 2026",
    category: "Real Estate",
    image: rightsizing1,
    sections: [
      {
        id: "overview",
        heading: "A historic portfolio reset",
        paragraphs: [
          "The U.S. General Services Administration is executing a historic reset of the federal civilian real estate portfolio, combining aggressive property disposal, strategic lease consolidation, and utilization-driven space planning to deliver a smaller, smarter footprint for the American taxpayer.",
          "\u201cFor too long, the federal government has been paying to maintain buildings it no longer needs,\u201d said GSA Administrator Edward C. Forst. \u201cWe are fixing that \u2014 property by property, lease by lease \u2014 and putting every dollar of savings back to work for the American people.\u201d",
          "The initiative is the centerpiece of GSA\u2019s Real Estate line of business and is projected to eliminate billions of dollars in deferred maintenance liability and recurring operating costs over the next five years.",
        ],
      },
      {
        id: "disposal",
        heading: "Property disposal at scale",
        paragraphs: [
          "GSA has initiated disposal proceedings on 45 chronically underutilized federal properties in the first phase of the program, with an additional 200 assets targeted over the next 18 months.",
          "Properties are selected based on occupancy data, condition assessments, and long-term cost modeling. Assets where federal occupancy has fallen below 25% for three or more consecutive years are prioritized for disposal.",
          "Proceeds from sales are returned to the federal government and reinvested in higher-performing assets and mission-critical space.",
        ],
      },
      {
        id: "leases",
        heading: "Terminating high-cost leases",
        paragraphs: [
          "GSA\u2019s lease consolidation program has terminated 45 long-term leases and is on track to exit an additional 120 lease agreements by the end of the fiscal year, eliminating recurring costs that provided little mission value.",
          "The consolidation reduces the federal government\u2019s deferred-maintenance exposure and frees agency resources for direct mission delivery.",
        ],
      },
      {
        id: "consolidation",
        heading: "Consolidating into right-sized space",
        paragraphs: [
          "As agencies exit underperforming leases and owned assets, GSA is working with each tenant agency to identify consolidated, right-sized space solutions \u2014 shared campuses, co-location arrangements, and modernized buildings that reflect current federal workforce patterns.",
          "The result is a portfolio that costs less to operate, performs better for federal workers, and serves as a stronger asset base for the government\u2019s long-term real property strategy.",
        ],
      },
    ],
  },
  {
    slug: "gsa-white-house-fraud-task-force",
    title: "GSA Joins the White House Fraud Task Force",
    dek: "The General Services Administration brings its procurement data, analytics capabilities, and contract oversight expertise to the Administration\u2019s whole-of-government effort to eliminate fraud, waste, and abuse.",
    date: "February 18, 2026",
    category: "Acquisition",
    image: fraudTaskForce1,
    sections: [
      {
        id: "overview",
        heading: "A whole-of-government fraud fight",
        paragraphs: [
          "The U.S. General Services Administration today announced its participation in the White House Fraud Task Force, a cross-agency effort to identify and eliminate fraud, waste, and abuse in federal spending.",
          "\u201cGSA sits at the intersection of nearly every federal procurement dollar,\u201d said Administrator Edward C. Forst. \u201cThat gives us a unique ability to see patterns across agencies that no single department could see on its own. We are bringing that capability to bear on behalf of the American taxpayer.\u201d",
          "The task force coordinates intelligence, analytics, and enforcement resources across multiple agencies, with GSA leading the procurement data and contract analytics workstream.",
        ],
      },
      {
        id: "role",
        heading: "GSA\u2019s role in the task force",
        paragraphs: [
          "GSA is contributing its procurement analytics platform \u2014 which ingests data from SAM.gov and USASpending.gov \u2014 to provide the task force with a real-time view of vendor activity, payment anomalies, and duplicate award patterns across the federal enterprise.",
          "The agency is also providing contract expertise to help task force members identify red flags in vendor registration, past-performance records, and bid patterns that may indicate fraudulent intent.",
        ],
      },
      {
        id: "results",
        heading: "Early results",
        paragraphs: [
          "In its first 60 days of operation, the task force flagged over $2.1 billion in suspected improper payments and referred dozens of cases to agency Inspectors General for investigation.",
          "GSA\u2019s analytics workstream identified 47 vendors with anomalous payment patterns across multiple agencies, leading to immediate suspension of payment pending review.",
          "\u201cFraud is not a victimless crime,\u201d Administrator Forst said. \u201cEvery dollar lost to fraud is a dollar stolen from the programs and people that money was meant to serve.\u201d",
        ],
      },
      {
        id: "next",
        heading: "What comes next",
        paragraphs: [
          "The task force will expand its scope in the coming months, adding real-time vendor screening at contract award and integrating debarment data from across the federal government.",
          "GSA will also publish quarterly fraud-prevention metrics as part of its Taxpayer Savings Report, making results publicly available.",
        ],
      },
    ],
  },
  {
    slug: "fedramp-20x-504m-savings",
    title: "FedRAMP 20x Saves $504M Across Agencies",
    dek: "GSA\u2019s automated cloud authorization pathway has delivered more than half a billion dollars in savings while cutting time-to-authorization from 18 months to under six weeks.",
    date: "May 20, 2026",
    category: "Technology",
    image: fedramp504m1,
    sections: [
      {
        id: "overview",
        heading: "Half a billion dollars in savings",
        paragraphs: [
          "FedRAMP 20x, the U.S. General Services Administration\u2019s automated cloud authorization pathway, has saved federal agencies $504 million in security assessment and authorization costs since its launch \u2014 while simultaneously cutting average authorization times from 18 months to under six weeks.",
          "\u201cFedRAMP 20x has changed what it means to authorize cloud technology for government use,\u201d said GSA Administrator Edward C. Forst. \u201cThe old model was slow, expensive, and duplicative. The new model is fast, rigorous, and built for the pace at which technology actually moves.\u201d",
        ],
      },
      {
        id: "how",
        heading: "How FedRAMP 20x works",
        paragraphs: [
          "FedRAMP 20x replaces point-in-time paper-based security assessments with continuous, machine-readable evidence collected directly from cloud service providers\u2019 environments.",
          "Authorizations are grounded in NIST SP 800-53 controls and validated by GSA\u2019s automated review pipeline before any agency can use the authorized service.",
          "The result is a rigorous authorization that takes weeks instead of months and can be updated in real time as a provider\u2019s security posture changes.",
        ],
      },
      {
        id: "savings",
        heading: "Where the savings come from",
        paragraphs: [
          "The $504 million in savings reflects the elimination of duplicative third-party assessment costs that previously had to be repeated for each new agency authorization.",
          "Under the legacy model, a single cloud service might undergo 15 or more separate assessments \u2014 each costing hundreds of thousands of dollars \u2014 as different agencies independently evaluated the same product.",
          "FedRAMP 20x authorizes once and shares the result government-wide, eliminating that redundancy entirely.",
        ],
      },
      {
        id: "next",
        heading: "Expanding the pathway",
        paragraphs: [
          "GSA is working to onboard additional cloud service categories to the FedRAMP 20x pathway, including AI/ML platforms, edge computing services, and next-generation identity solutions.",
          "Agencies seeking to adopt FedRAMP-authorized cloud services can access the full authorized service catalog through GSA\u2019s FedRAMP Marketplace.",
        ],
      },
    ],
  },
];

/** Look up an article by slug. */
export function getArticle(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}
