/**
 * Wayfinder data — per-category configs for the CategoryWayfinder module
 * ("I am … looking to … for …"). Options cascade: intents depend on the
 * chosen audience, and the third "for" dropdown only appears when an
 * intent defines contexts. Media intentionally has no config.
 */

export interface WayfinderContext {
  label: string;
  href: string;
}

export interface WayfinderIntent {
  label: string;
  /** Destination when the intent has no contexts */
  href?: string;
  /** Connector word before the third dropdown — defaults to "for" */
  contextLead?: string;
  /** Optional third-dropdown options; when present these decide the destination */
  contexts?: WayfinderContext[];
}

export interface WayfinderAudience {
  label: string;
  intents: WayfinderIntent[];
}

export interface WayfinderConfig {
  audiences: WayfinderAudience[];
}

export const REAL_ESTATE_WAYFINDER: WayfinderConfig = {
  audiences: [
    {
      label: "a federal agency",
      intents: [
        { label: "lease space", href: "/real-estate/leasing" },
        { label: "request workspace", href: "/real-estate/workspace" },
        {
          label: "optimize our workplace",
          contexts: [
            {
              label: "cost savings",
              href: "/real-estate/workplace-optimization",
            },
            { label: "the hybrid workforce", href: "/real-estate/workplace" },
          ],
        },
        { label: "manage our portfolio", href: "/real-estate/portfolio" },
      ],
    },
    {
      label: "a business or property owner",
      intents: [
        {
          label: "offer space to the government",
          href: "/real-estate/leasing",
        },
        { label: "buy federal property", href: "/real-estate/sales" },
      ],
    },
    {
      label: "a member of the public",
      intents: [
        { label: "explore historic buildings", href: "/preservation" },
        {
          label: "follow new construction",
          href: "/real-estate/design-construction",
        },
      ],
    },
  ],
};

export const ACQUISITION_WAYFINDER: WayfinderConfig = {
  audiences: [
    {
      label: "a federal agency",
      intents: [
        { label: "buy products & services", href: "/acquisition/buy-products" },
        {
          label: "use a contract vehicle",
          contexts: [
            {
              label: "commercial products & services",
              href: "/acquisition/mas",
            },
            { label: "IT solutions", href: "/acquisition/gwacs" },
          ],
        },
        {
          label: "get full-service acquisition support",
          href: "/acquisition/assisted-acquisition",
        },
        { label: "find policy & guidance", href: "/acquisition/policy" },
      ],
    },
    {
      label: "a business",
      intents: [
        {
          label: "sell to the government",
          href: "/acquisition/sell-to-government",
        },
        { label: "get on a GSA Schedule", href: "/acquisition/schedules" },
        { label: "find opportunities", href: "/acquisition/opportunities" },
        {
          label: "grow as a small business",
          href: "/acquisition/small-business",
        },
      ],
    },
    {
      label: "a contracting professional",
      intents: [
        { label: "browse acquisition policy", href: "/acquisition/policy" },
        { label: "get training", href: "/acquisition/training" },
        {
          label: "explore category management",
          href: "/acquisition/category-management",
        },
      ],
    },
  ],
};

export const TECHNOLOGY_WAYFINDER: WayfinderConfig = {
  audiences: [
    {
      label: "a federal agency",
      intents: [
        { label: "adopt AI", href: "/technology/ai" },
        {
          label: "use shared platforms",
          contexts: [
            { label: "secure sign-in", href: "/technology/login-gov" },
            { label: "cloud hosting", href: "/technology/cloud-gov" },
            { label: "digital services", href: "/technology/digital-gov" },
          ],
        },
        { label: "buy information technology", href: "/technology/it" },
        {
          label: "modernize legacy systems",
          href: "/technology/modernization",
        },
      ],
    },
    {
      label: "a technology company",
      intents: [
        { label: "get FedRAMP authorized", href: "/technology/fedramp" },
        { label: "work with TTS", href: "/technology/tts" },
      ],
    },
    {
      label: "a member of the public",
      intents: [
        { label: "see what GSA powers", href: "/technology/platforms" },
      ],
    },
  ],
};
