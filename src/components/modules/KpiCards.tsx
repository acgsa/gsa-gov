import { KpiCard, type KpiCardProps } from "@/components/ui/KpiCard";

const cards: KpiCardProps[] = [
  {
    eyebrow: "Real Estate",
    metric: "$3B",
    metricLabel: "avoided in deferred maintenance costs",
    body: "GSA has disposed of 45 properties through its accelerated disposal approach and consolidated federal offices ahead of schedule. This effort is expected to save $3.0 billion in deferred maintenance costs (6% of the total portfolio backlog) while returning real estate to productive community use.",
    ctaText: "Explore Real Estate",
    ctaHref: "/real-estate",
  },
  {
    eyebrow: "Acquisition",
    metric: "$89M",
    metricLabel: "saved via OneGov contracting",
    body: "Smarter category management and reformed acquisition schedules are delivering measurable savings while shortening procurement timelines across government.",
    ctaText: "Explore Acquisition",
    ctaHref: "/acquisition",
  },
  {
    eyebrow: "Technology",
    metric: "3.4M",
    metricLabel: "federal employees on AI tools",
    body: "GSA's USAi platform and FedRAMP 20x program are accelerating AI adoption and cloud modernization across 23 federal agencies.",
    ctaText: "Explore Technology",
    ctaHref: "/technology",
  },
];

/**
 * KpiCards — 3-column white-background module surfacing one headline metric
 * per GSA line of business (Real Estate, Acquisition, Technology).
 *
 * Cards have no outer border; a 1px divider separates them on desktop.
 * Backed by static data now; Phase 2 wires to a Payload CMS KpiCardsBlock.
 */
export function KpiCards() {
  return (
    <section className="bg-white py-12" aria-label="GSA lines of business">
      {/*
       * No px on the wrapper — KpiCard supplies its own padding.
       * max-w-7xl centers the grid; each card's px-4 sm:px-6 lg:px-8
       * matches the nav container so left content aligns with the logo.
       */}
      <div className="max-w-7xl mx-auto">
        <ul
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-usds-steel-200"
          role="list"
        >
          {cards.map((card) => (
            <li key={card.eyebrow}>
              <KpiCard {...card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
