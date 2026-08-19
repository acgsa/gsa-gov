"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BRAND_GREEN } from "@/lib/tokens/colors";

/** Single brand green used for all bars */
const BAR_COLOR = BRAND_GREEN;

interface BarItem {
  label: string;
  value: number;
  /** Display string, e.g. "$3.0B" */
  display: string;
}

const bars: BarItem[] = [
  { label: "Real Estate Consolidation", value: 3000, display: "$3.0B" },
  { label: "Fraud Prevention", value: 2100, display: "$2.1B" },
  { label: "Acquisition / OneGov", value: 890, display: "$890M" },
  { label: "Technology Modernization", value: 520, display: "$520M" },
  { label: "Fleet Optimization", value: 310, display: "$310M" },
  { label: "Travel Policy Reforms", value: 180, display: "$180M" },
];

const MAX_VALUE = Math.max(...bars.map((b) => b.value));

interface BarRowProps extends BarItem {
  index: number;
  trigger: boolean;
}

function BarRow({ label, value, display, index, trigger }: BarRowProps) {
  const pct = (value / MAX_VALUE) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col gap-1.5"
    >
      {/* Label row */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-white/60 leading-tight">
          {label}
        </span>
        <span className="text-[13px] font-bold tabular-nums text-gsa-savings flex-shrink-0">
          {display}
        </span>
      </div>

      {/* Bar track */}
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: BAR_COLOR }}
          initial={{ width: 0 }}
          animate={trigger ? { width: `${pct}%` } : { width: 0 }}
          transition={{
            duration: 1.0,
            delay: index * 0.08 + 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

/**
 * SavingsBarChart — animated horizontal bar chart showing savings broken
 * down by category. Bars animate in on scroll-into-view.
 * All bars use a single monochrome gsa-savings green.
 */
export function SavingsBarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      aria-label="Savings by category"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/30 mb-2">
          Breakdown
        </p>
        <h2 className="font-garamond text-3xl sm:text-4xl font-semibold text-white leading-tight">
          Savings by Category
        </h2>
        <p className="mt-3 text-[15px] text-white/50 leading-relaxed max-w-2xl">
          Cumulative taxpayer savings across all GSA lines of business since
          January 2025. All figures are independently audited.
        </p>
      </motion.div>

      {/* Bars */}
      <div className="flex flex-col gap-5">
        {bars.map((bar, i) => (
          <BarRow key={bar.label} {...bar} index={i} trigger={inView} />
        ))}
      </div>

      {/* Total callout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between"
      >
        <span className="text-[13px] font-medium text-white/40 uppercase tracking-widest">
          Total Identified
        </span>
        <span className="font-garamond font-semibold text-2xl text-gsa-savings tabular-nums">
          $7.0B+
        </span>
      </motion.div>
    </section>
  );
}
