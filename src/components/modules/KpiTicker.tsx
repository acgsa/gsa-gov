"use client";

import { resolveKpiIcon } from "@/lib/kpi-icons";

/**
 * A single KPI as authored in the CMS (or the default fallback list). Icons are
 * intentionally NOT stored as components here — they are resolved at render time
 * from the text (and optional override) via {@link resolveKpiIcon}.
 */
export interface KpiTickerItem {
  value: string;
  label: string;
  /** Optional curated icon key from the CMS dropdown. Blank = auto-select. */
  iconOverride?: string | null;
}

export interface KpiTickerProps {
  /** KPI items to display. Falls back to {@link DEFAULT_KPIS} when omitted/empty. */
  items?: KpiTickerItem[];
  /** Screen-reader label for the ticker region. */
  ariaLabel?: string;
}

/**
 * Default KPI list used on the homepage until CMS-authored content is wired in.
 * Kept here so the component renders meaningfully with no props.
 */
const DEFAULT_KPIS: KpiTickerItem[] = [
  { value: "3.4M employees", label: "on AI tools" },
  { value: "23 agencies", label: "on USAi" },
  { value: "$89M saved", label: "via OneGov" },
  { value: "45 properties", label: "disposed" },
  { value: "$2B+", label: "in fraud prevention" },
  { value: "3 ports", label: "upgraded" },
  { value: "823", label: "FedRAMP 20x approvals" },
];

export function KpiTicker({
  items,
  ariaLabel = "GSA key performance indicators",
}: KpiTickerProps = {}) {
  const kpis = items && items.length > 0 ? items : DEFAULT_KPIS;

  /** Duplicate list so the seamless loop appears continuous */
  const track = [...kpis, ...kpis];

  return (
    <div className="bg-white overflow-hidden pt-3" aria-label={ariaLabel}>
      {/* Fade masks on left/right edges */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <div
          className="flex animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:scrollbar-hide"
          aria-hidden="true"
        >
          {track.map((kpi, i) => {
            const Icon = resolveKpiIcon(kpi.value, kpi.label, kpi.iconOverride);
            return (
              <div
                key={i}
                className="flex items-center gap-2 flex-shrink-0 px-6 py-3"
              >
                <Icon
                  className="w-4 h-4 text-usds-steel-600 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-usds-steel-600 text-sm whitespace-nowrap">
                  <span className="font-semibold">{kpi.value}</span> {kpi.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Accessible static list for screen readers */}
        <ul className="sr-only">
          {kpis.map((kpi, i) => (
            <li key={`${kpi.value}-${kpi.label}-${i}`}>
              {kpi.value} {kpi.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
