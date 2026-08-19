import {
  Anchor,
  BadgeCheck,
  BrainCircuit,
  Building2,
  DollarSign,
  Gauge,
  Globe,
  Landmark,
  Leaf,
  Recycle,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * KPI icon system for the KPI Ticker block.
 *
 * Icons are resolved for editorial content in two layers:
 *
 *  1. **Manual override** — an editor may pick an icon from a fixed, curated
 *     allow-list (see {@link KPI_ICON_OPTIONS}) in the CMS. This always wins.
 *  2. **Keyword auto-mapping** — when no override is set, {@link resolveKpiIcon}
 *     inspects the KPI's value + label text for known keywords and picks the
 *     best-fit icon, falling back to a neutral default.
 *
 * The allow-list is intentionally curated (not the full Lucide set) so that:
 *  - The CMS dropdown stays short and meaningful for editors.
 *  - Only these icons are imported, preserving tree-shaking / small bundles.
 *  - There is no dynamic/arbitrary icon resolution at runtime (no untrusted
 *    string → component lookup beyond this fixed, reviewed map).
 *
 * No AI, no network calls, no new dependencies — deterministic and testable.
 */

/** The stable key an editor stores in the CMS for a chosen icon. */
export type KpiIconName =
  | "brain-circuit"
  | "globe"
  | "dollar-sign"
  | "building"
  | "shield-alert"
  | "shield-check"
  | "anchor"
  | "badge-check"
  | "trending-up"
  | "users"
  | "landmark"
  | "leaf"
  | "recycle"
  | "rocket"
  | "gauge"
  | "wrench"
  | "zap";

/**
 * The single source of truth mapping a stored icon key → its Lucide component.
 * Both the CMS dropdown options and the render-time lookup derive from this so
 * they can never drift apart.
 */
export const KPI_ICONS: Record<KpiIconName, LucideIcon> = {
  "brain-circuit": BrainCircuit,
  globe: Globe,
  "dollar-sign": DollarSign,
  building: Building2,
  "shield-alert": ShieldAlert,
  "shield-check": ShieldCheck,
  anchor: Anchor,
  "badge-check": BadgeCheck,
  "trending-up": TrendingUp,
  users: Users,
  landmark: Landmark,
  leaf: Leaf,
  recycle: Recycle,
  rocket: Rocket,
  gauge: Gauge,
  wrench: Wrench,
  zap: Zap,
};

/** Neutral fallback used when no override and no keyword matches. */
export const DEFAULT_KPI_ICON_NAME: KpiIconName = "trending-up";

/**
 * Human-readable labels for the CMS `select` dropdown. Derived from KPI_ICONS
 * so the options list is guaranteed to stay in sync with the available icons.
 */
export const KPI_ICON_OPTIONS: { label: string; value: KpiIconName }[] = [
  { label: "AI / Brain circuit", value: "brain-circuit" },
  { label: "Globe / Worldwide", value: "globe" },
  { label: "Dollar / Savings", value: "dollar-sign" },
  { label: "Building / Property", value: "building" },
  { label: "Shield (alert) / Fraud", value: "shield-alert" },
  { label: "Shield (check) / Security", value: "shield-check" },
  { label: "Anchor / Ports", value: "anchor" },
  { label: "Badge check / Approvals", value: "badge-check" },
  { label: "Trending up / Growth", value: "trending-up" },
  { label: "Users / People", value: "users" },
  { label: "Landmark / Government", value: "landmark" },
  { label: "Leaf / Sustainability", value: "leaf" },
  { label: "Recycle / Reuse", value: "recycle" },
  { label: "Rocket / Launch", value: "rocket" },
  { label: "Gauge / Performance", value: "gauge" },
  { label: "Wrench / Maintenance", value: "wrench" },
  { label: "Lightning / Energy", value: "zap" },
];

/**
 * A single keyword matcher.
 *
 * - A plain `string` is matched as a lowercase substring (good for stems like
 *   `"propert"` → property/properties/proprietary).
 * - `{ word }` is matched only as a whole word (letters/digits on either side
 *   break the match). This is required for short, ambiguous tokens like `"ai"`
 *   or `"ml"`, which would otherwise match inside unrelated words such as
 *   "tr**ai**ned" or "ele**ml**ent".
 */
type Keyword = string | { word: string };

/**
 * Ordered keyword → icon rules for auto-mapping. Earlier rules win, so more
 * specific terms are listed before broader ones.
 *
 * Ordering notes:
 *  - `badge-check` (approvals/certifications) precedes `shield-check` so
 *    "FedRAMP approvals" reads as an approval milestone, not a generic
 *    security stat.
 *  - `zap` (energy) precedes `dollar-sign` so "energy saved" reads as an
 *    energy metric rather than a savings metric.
 */
const KEYWORD_RULES: { keywords: Keyword[]; icon: KpiIconName }[] = [
  {
    keywords: [
      { word: "ai" },
      "artificial intelligence",
      "usai",
      "machine learning",
      { word: "ml" },
    ],
    icon: "brain-circuit",
  },
  { keywords: ["fraud", "waste", "abuse", "improper"], icon: "shield-alert" },
  { keywords: ["approv", "certif", "accredit", "badge"], icon: "badge-check" },
  {
    keywords: [
      "fedramp",
      "secure",
      "security",
      "authoriz",
      "compliance",
      "cyber",
    ],
    icon: "shield-check",
  },
  { keywords: ["port", "harbor", "maritime"], icon: "anchor" },
  {
    keywords: [
      "propert",
      "building",
      "facilit",
      "real estate",
      "lease",
      "dispos",
      "square feet",
      "sq ft",
    ],
    icon: "building",
  },
  {
    keywords: ["energy", "power", "electric", "kilowatt", "kwh", "watt"],
    icon: "zap",
  },
  {
    keywords: ["saved", "savings", "$", "dollar", "cost", "budget", "spend"],
    icon: "dollar-sign",
  },
  {
    keywords: [
      "agenc",
      "onegov",
      "nationwide",
      "worldwide",
      "global",
      "countr",
    ],
    icon: "globe",
  },
  {
    keywords: ["employee", "people", "staff", "workforce", "user", "customer"],
    icon: "users",
  },
  {
    keywords: ["sustain", "carbon", "emission", "green", "climate"],
    icon: "leaf",
  },
  { keywords: ["recycl", "reuse", "waste diver"], icon: "recycle" },
  {
    keywords: ["launch", "deploy", "modern", "innovat", "pilot"],
    icon: "rocket",
  },
  {
    keywords: ["maintain", "maintenance", "repair", "upgrad", "renovat"],
    icon: "wrench",
  },
  {
    keywords: ["performance", "uptime", "speed", "efficien", "sla"],
    icon: "gauge",
  },
  {
    keywords: ["government", "federal", "agency-wide", "congress", "capitol"],
    icon: "landmark",
  },
];

/** Is the character at the given index a word character (letter or digit)? */
function isWordChar(text: string, index: number): boolean {
  if (index < 0 || index >= text.length) {
    return false;
  }
  const code = text.charCodeAt(index);
  const isDigit = code >= 48 && code <= 57; // 0-9
  const isLower = code >= 97 && code <= 122; // a-z (haystack is lowercased)
  return isDigit || isLower;
}

/**
 * Does the haystack contain the given keyword?
 *
 * String keywords match as a substring. `{ word }` keywords match only as a
 * whole word — the match must not be flanked by other word characters — so
 * short tokens like "ai"/"ml" don't match inside words like "trained". This is
 * implemented with plain string scanning (no dynamic RegExp) to keep the match
 * simple, allocation-free, and free of untrusted regex construction.
 */
function matchesKeyword(haystack: string, keyword: Keyword): boolean {
  if (typeof keyword === "string") {
    return haystack.includes(keyword);
  }
  const { word } = keyword;
  let from = 0;
  let at = haystack.indexOf(word, from);
  while (at !== -1) {
    const before = isWordChar(haystack, at - 1);
    const after = isWordChar(haystack, at + word.length);
    if (!before && !after) {
      return true;
    }
    from = at + 1;
    at = haystack.indexOf(word, from);
  }
  return false;
}

/**
 * Resolve which curated {@link KpiIconName} an auto-mapped KPI should use, based
 * on keyword matches in its value + label text. Falls back to
 * {@link DEFAULT_KPI_ICON_NAME} when nothing matches.
 *
 * Exposed separately from {@link resolveKpiIcon} so the keyword decision is
 * independently unit-testable without importing React components.
 */
export function resolveKpiIconName(value: string, label: string): KpiIconName {
  const haystack = `${value} ${label}`.toLowerCase();
  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some((kw) => matchesKeyword(haystack, kw))) {
      return rule.icon;
    }
  }
  return DEFAULT_KPI_ICON_NAME;
}

/**
 * Resolve the Lucide icon component for a KPI.
 *
 * @param value   The KPI's numeric/headline text (e.g. "$89M saved").
 * @param label   The KPI's supporting label (e.g. "via OneGov").
 * @param override Optional editor-chosen icon key. When it is a valid curated
 *                 key it always wins; otherwise the keyword auto-mapper runs.
 */
export function resolveKpiIcon(
  value: string,
  label: string,
  override?: string | null,
): LucideIcon {
  if (override && isKpiIconName(override)) {
    // Safe: `override` is narrowed to a curated KpiIconName by the type guard,
    // so this is a fixed, reviewed map lookup — not untrusted key access.

    // eslint-disable-next-line security/detect-object-injection -- override narrowed to curated KpiIconName by isKpiIconName type guard
    return KPI_ICONS[override];
  }
  return KPI_ICONS[resolveKpiIconName(value, label)];
}

/** Type guard: is the given string a valid curated icon key? */
export function isKpiIconName(value: string): value is KpiIconName {
  return Object.prototype.hasOwnProperty.call(KPI_ICONS, value);
}
