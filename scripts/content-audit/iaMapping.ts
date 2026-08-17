/**
 * Deterministic mapping from an audited legacy URL to a suggested destination
 * in the NEW site information architecture (the route tree under
 * src/app/(category)/ + src/lib/wayfinder-data.ts).
 *
 * This is REPORT-ONLY. It never mutates docs/content-audit-results.json; it is
 * used purely to render a "Suggested Resolution" column so reviewers can see a
 * proposed new-IA home for each page before the (separate) migration phase.
 *
 * Strategy (fails safe, no network, no model calls):
 *  1. If the scorer already produced a consolidateSuggestion, prefer it.
 *  2. Otherwise match the legacy URL's path/slug against keyword rules that map
 *     to the redesigned route tree.
 *  3. If nothing matches, return undefined (report shows an em dash).
 */

/** A single keyword → new-IA-route rule. */
interface IaRule {
  /** Lowercased substrings; any match on the legacy URL triggers the rule. */
  keywords: string[];
  /** Destination route in the new IA. */
  route: string;
  /** Human-readable destination label for the report. */
  label: string;
}

/**
 * Ordered rules — first match wins, so put more specific rules before
 * broad ones. Routes are validated against the real (category) tree.
 */
const IA_RULES: IaRule[] = [
  // ---- Real Estate ----
  {
    keywords: ["/leasing", "lease", "lease-space", "leasing-policy"],
    route: "/real-estate/leasing",
    label: "Real Estate › Leasing",
  },
  {
    keywords: [
      "design-construction",
      "/design",
      "construction-excellence",
      "architecture",
    ],
    route: "/real-estate/design-construction",
    label: "Real Estate › Design & Construction",
  },
  {
    keywords: ["historic", "preservation", "fine-arts", "arts-culture"],
    route: "/preservation",
    label: "Historic Preservation",
  },
  {
    keywords: [
      "property-disposal",
      "real-property-sales",
      "auctions",
      "/sales",
      "realestatesales",
    ],
    route: "/real-estate/sales",
    label: "Real Estate › Property Sales",
  },
  {
    keywords: ["workplace", "workspace", "space-planning", "total-workplace"],
    route: "/real-estate/workplace",
    label: "Real Estate › Workplace",
  },
  {
    keywords: [
      "portfolio",
      "asset-management",
      "building",
      "federal-buildings",
      "reit",
    ],
    route: "/real-estate/portfolio",
    label: "Real Estate › Portfolio",
  },
  { keywords: ["1800f", "1800-f"], route: "/1800f", label: "1800 F Street" },

  // ---- Acquisition ----
  {
    keywords: ["schedule", "mas", "multiple-award", "gsa-schedule"],
    route: "/acquisition/schedules",
    label: "Acquisition › Schedules",
  },
  {
    keywords: [
      "gwac",
      "governmentwide-acquisition",
      "8a-stars",
      "alliant",
      "vets-2",
    ],
    route: "/acquisition/gwacs",
    label: "Acquisition › GWACs",
  },
  {
    keywords: ["small-business", "smallbusiness", "osdbu"],
    route: "/acquisition/small-business",
    label: "Acquisition › Small Business",
  },
  {
    keywords: ["category-management", "category-mgmt", "best-in-class"],
    route: "/acquisition/category-management",
    label: "Acquisition › Category Management",
  },
  {
    keywords: ["assisted-acquisition", "aas", "gsa-assist"],
    route: "/acquisition/assisted-acquisition",
    label: "Acquisition › Assisted Acquisition",
  },
  {
    keywords: [
      "acquisition-policy",
      "far",
      "acquisition-gateway",
      "acqgateway",
    ],
    route: "/acquisition/policy",
    label: "Acquisition › Policy",
  },
  {
    keywords: ["acquisition-training", "acquisition/training", "ftaa"],
    route: "/acquisition/training",
    label: "Acquisition › Training",
  },
  {
    keywords: ["sell-to", "selling", "vendor", "getting-on-schedule", "sell"],
    route: "/acquisition/sell-to-government",
    label: "Acquisition › Sell to Government",
  },
  {
    keywords: ["opportunities", "sam-gov-opportunities", "forecast"],
    route: "/acquisition/opportunities",
    label: "Acquisition › Opportunities",
  },
  {
    keywords: ["buy-products", "purchasing", "buying", "products-services"],
    route: "/acquisition/buy-products",
    label: "Acquisition › Buy Products & Services",
  },
  {
    keywords: ["/acquisition", "procurement", "contracting"],
    route: "/acquisition",
    label: "Acquisition (landing)",
  },

  // ---- Technology ----
  {
    keywords: ["login.gov", "login-gov", "logindotgov"],
    route: "/technology/login-gov",
    label: "Technology › Login.gov",
  },
  {
    keywords: ["cloud.gov", "cloud-gov"],
    route: "/technology/cloud-gov",
    label: "Technology › cloud.gov",
  },
  {
    keywords: ["digital.gov", "digital-gov", "web-standards"],
    route: "/technology/digital-gov",
    label: "Technology › digital.gov",
  },
  {
    keywords: ["fedramp"],
    route: "/technology/fedramp",
    label: "Technology › FedRAMP",
  },
  {
    keywords: ["/ai", "artificial-intelligence", "machine-learning"],
    route: "/technology/ai",
    label: "Technology › AI",
  },
  {
    keywords: ["modernization", "legacy", "tmf", "technology-modernization"],
    route: "/technology/modernization",
    label: "Technology › Modernization",
  },
  {
    keywords: ["it-purchasing", "buy-it", "eis", "telecommunications", "/it"],
    route: "/technology/it",
    label: "Technology › IT",
  },
  {
    keywords: [
      "tts",
      "technology-transformation",
      "18f",
      "presidential-innovation",
    ],
    route: "/technology/tts",
    label: "Technology › TTS",
  },
  {
    keywords: ["/technology", "digital-services"],
    route: "/technology",
    label: "Technology (landing)",
  },

  // ---- Federal employees / travel ----
  {
    keywords: ["per-diem", "perdiem"],
    route: "/employees/per-diem",
    label: "Employees › Per Diem",
  },
  {
    keywords: ["smartpay", "smart-pay", "gsa-smartpay"],
    route: "/employees/tools",
    label: "Employees › Tools (SmartPay)",
  },
  {
    keywords: ["fleet", "gsa-fleet", "vehicle"],
    route: "/employees/fleet",
    label: "Employees › Fleet",
  },
  {
    keywords: ["lodging", "hotel", "fedrooms"],
    route: "/employees/lodging",
    label: "Employees › Lodging",
  },
  {
    keywords: ["city-pair", "airfare", "e-gov-travel", "travel-management"],
    route: "/employees/travel-management",
    label: "Employees › Travel Management",
  },
  {
    keywords: ["travel", "relocation", "pcs"],
    route: "/employees/travel",
    label: "Employees › Travel",
  },
  {
    keywords: ["travel-policy", "ftr", "federal-travel-regulation"],
    route: "/employees/training-policies",
    label: "Employees › Travel Policies",
  },
  {
    keywords: ["/employees", "employee-resources"],
    route: "/employees",
    label: "Employees (landing)",
  },

  // ---- Media / newsroom ----
  {
    keywords: ["press-release", "news-release"],
    route: "/media/press-releases",
    label: "Media › Press Releases",
  },
  {
    keywords: ["photo", "image-library", "flickr"],
    route: "/media/photos",
    label: "Media › Photos",
  },
  {
    keywords: ["logo", "brand", "brand-guidelines"],
    route: "/media/brand",
    label: "Media › Brand",
  },
  { keywords: ["video"], route: "/media/video", label: "Media › Video" },
  {
    keywords: ["event", "conference", "expo"],
    route: "/media/events",
    label: "Media › Events",
  },
  {
    keywords: ["report", "publications"],
    route: "/media/reports",
    label: "Media › Reports",
  },
  {
    keywords: ["media-contact", "press-contact", "pressroom"],
    route: "/media/contact",
    label: "Media › Contact",
  },
  {
    keywords: ["/newsroom", "/news", "blog"],
    route: "/media",
    label: "Media (landing)",
  },

  // ---- Accountability / savings ----
  {
    keywords: ["savings", "cost-savings", "fraud", "waste", "abuse"],
    route: "/savings",
    label: "Savings",
  },
  {
    keywords: ["accountability", "transparency", "performance"],
    route: "/accountability/savings",
    label: "Accountability › Savings",
  },

  // ---- About / leadership / public ----
  {
    keywords: [
      "leadership",
      "administrator",
      "executive",
      "org-chart",
      "organization",
    ],
    route: "/resources/leadership",
    label: "Resources › Leadership",
  },
  {
    keywords: [
      "about-gsa",
      "about-us",
      "/about",
      "mission",
      "history",
      "who-we-are",
    ],
    route: "/about-gsa",
    label: "About GSA",
  },
];

/** Normalize a URL to a lowercased path+query string for matching. */
function normalizeForMatch(url: string): string {
  try {
    const u = new URL(url);
    return `${u.pathname}${u.search}`.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

/** A suggested destination in the new IA. */
export interface IaSuggestion {
  route: string;
  label: string;
  /** Where the suggestion came from, for transparency in the report. */
  source: "consolidate-suggestion" | "url-rule";
}

/**
 * Suggest a new-IA destination for a legacy URL.
 *
 * @param url Legacy GSA.gov URL being audited.
 * @param consolidateSuggestion Optional model-produced suggestion (preferred).
 */
export function suggestIaDestination(
  url: string,
  consolidateSuggestion?: string,
): IaSuggestion | undefined {
  const trimmed = consolidateSuggestion?.trim();
  if (trimmed) {
    return { route: trimmed, label: trimmed, source: "consolidate-suggestion" };
  }
  const hay = normalizeForMatch(url);
  for (const rule of IA_RULES) {
    if (rule.keywords.some((kw) => hay.includes(kw))) {
      return { route: rule.route, label: rule.label, source: "url-rule" };
    }
  }
  return undefined;
}
