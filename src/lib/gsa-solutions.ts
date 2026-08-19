import type { StaticImageData } from "next/image";

import coe from "@/assets/brands/COE.png";
import dataGov from "@/assets/brands/data_gov.png";
import fedramp from "@/assets/brands/FedRAMP_Logo.svg.png";
import goGov from "@/assets/brands/Go.gov Logo_COLOR.png";
import loginGov from "@/assets/brands/logindotgov-logo.png";
import pif from "@/assets/brands/PIF.svg";
import sam from "@/assets/brands/SAM_slab.svg";
import usai from "@/assets/brands/USAi Logo.png";

// ── White variants (for dark surfaces, e.g. the megamenu) ──────────────
import coeWhite from "@/assets/brands/white/CoE.png";
import dataGovWhite from "@/assets/brands/white/data.png";
import fedrampWhite from "@/assets/brands/white/FR.png";
import loginGovWhite from "@/assets/brands/white/login.png";
import pifWhite from "@/assets/brands/white/PIF 1.png";
import samWhite from "@/assets/brands/white/SAM.png";
import usaiWhite from "@/assets/brands/white/USAi Logo White.png";

export interface GsaSolution {
  /** Brand logo — when omitted, a styled text wordmark is rendered instead */
  src?: StaticImageData;
  /** White logo variant for dark surfaces — falls back to the wordmark */
  srcWhite?: StaticImageData;
  /**
   * Wide wordmark-style logo — rendered at a tighter height so it sits
   * optically even with compact/square marks.
   */
  wide?: boolean;
  /**
   * Optional Tailwind height class override for the large card logo
   * (e.g. "h-8", "h-10"). Takes precedence over the wide/default sizing.
   */
  logoHeight?: string;
  name: string;
  /** One-line plain-language description */
  description: string;
  href: string;
}

/** All GSA platforms/solutions with logos, in display order. */
export const GSA_SOLUTIONS: GsaSolution[] = [
  {
    name: "USAi",
    src: usai,
    srcWhite: usaiWhite,
    wide: true,
    logoHeight: "h-10",
    description: "Government-approved generative AI for the federal workforce.",
    href: "https://usai.gov",
  },
  {
    src: sam,
    srcWhite: samWhite,
    wide: true,
    name: "SAM.gov",
    description:
      "Where the government advertises opportunities and businesses register to sell.",
    href: "https://sam.gov",
  },
  {
    name: "OneGov",
    description:
      "A single, governmentwide approach to buying that delivers better prices and terms.",
    href: "/acquisition/onegov",
  },
  {
    src: loginGov,
    srcWhite: loginGovWhite,
    wide: true,
    name: "Login.gov",
    description: "One secure account for government services.",
    href: "https://login.gov",
  },
  {
    src: fedramp,
    srcWhite: fedrampWhite,
    logoHeight: "h-24",
    name: "FedRAMP",
    description: "Standardized security authorization for cloud services.",
    href: "https://www.fedramp.gov",
  },
  {
    src: dataGov,
    srcWhite: dataGovWhite,
    wide: true,
    name: "Data.gov",
    description: "The home of the government's open data.",
    href: "https://data.gov",
  },
  {
    src: goGov,
    wide: true,
    name: "Go.gov",
    description: "Short, trusted .gov links for federal agencies.",
    href: "https://go.gov",
  },
  {
    src: pif,
    srcWhite: pifWhite,
    name: "Presidential Innovation Fellows",
    description: "Top technologists serving tours of duty in government.",
    href: "https://pif.gov",
  },
  {
    src: coe,
    srcWhite: coeWhite,
    name: "Centers of Excellence",
    description: "Accelerating IT modernization across agencies.",
    href: "https://coe.gsa.gov",
  },
];

/**
 * Solutions relevant to each nav category, keyed by category href.
 * Technology is wired first as the exemplar; other categories to follow
 * (acquisition → SAM.gov, employees → Go.gov/Login.gov).
 */
const SOLUTIONS_BY_CATEGORY = new Map<string, string[]>([
  [
    "/technology",
    [
      "USAi",
      "Login.gov",
      "FedRAMP",
      "SAM.gov",
      "Presidential Innovation Fellows",
      "Centers of Excellence",
    ],
  ],
  ["/acquisition", ["SAM.gov", "OneGov"]],
]);

/** Returns the solutions mapped to a nav category href (empty if none). */
export function getSolutionsFor(categoryHref: string): GsaSolution[] {
  const names = SOLUTIONS_BY_CATEGORY.get(categoryHref);
  if (!names) return [];
  return names
    .map((name) => GSA_SOLUTIONS.find((s) => s.name === name))
    .filter((s): s is GsaSolution => s !== undefined);
}
