"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BRAND_GREEN } from "@/lib/tokens/colors";

/** All timeline badges use the single brand green */
const DOT_COLOR = BRAND_GREEN;

interface Milestone {
  quarter: string;
  year: string;
  headline: string;
  detail: string;
  amount: string;
}

const milestones: Milestone[] = [
  {
    quarter: "Q1",
    year: "2025",
    headline: "Accelerated Property Disposal Program Launched",
    detail:
      "GSA identifies 45 underutilized federal properties for expedited disposal, initiating the most aggressive real estate consolidation effort in agency history.",
    amount: "$300M projected",
  },
  {
    quarter: "Q2",
    year: "2025",
    headline: "OneGov Contracting Framework Goes Live",
    detail:
      "Category management reforms consolidate 1,200 duplicative contracts across 18 agencies, delivering immediate price reductions through unified purchasing power.",
    amount: "$89M saved",
  },
  {
    quarter: "Q2",
    year: "2025",
    headline: "$2B+ in Fraudulent Vendor Activity Identified",
    detail:
      "GSA's new AI-powered procurement analytics platform flags and eliminates improper payments and fraudulent vendor activity at unprecedented scale.",
    amount: "$2.1B recovered",
  },
  {
    quarter: "Q3",
    year: "2025",
    headline: "FedRAMP 20x Cuts Cloud Authorization Costs",
    detail:
      "The new automated FedRAMP authorization pathway reduces average time-to-authorization from 18 months to under 6 weeks, eliminating hundreds of millions in redundant security assessments.",
    amount: "$520M in avoided costs",
  },
  {
    quarter: "Q4",
    year: "2025",
    headline: "Fleet Consolidation — Phase 1 Complete",
    detail:
      "GSA returns 12,000 surplus federal vehicles to market, eliminating maintenance costs and right-sizing the federal fleet to actual agency mission requirements.",
    amount: "$310M saved",
  },
  {
    quarter: "Q1",
    year: "2026",
    headline: "Federal Travel Policy Modernization",
    detail:
      "New per diem structures and centralized travel booking requirements reduce travel spend across all GSA-supported agencies, with savings reinvested in workforce development.",
    amount: "$180M saved",
  },
  {
    quarter: "Q2",
    year: "2026",
    headline: "Real Estate Deferred Maintenance Backlog Reduced",
    detail:
      "Consolidation of the federal property portfolio eliminates 6% of the total $50B deferred maintenance backlog, with 45 properties disposed and 12 leases terminated ahead of schedule.",
    amount: "$3.0B avoided",
  },
];

interface MilestoneNodeProps extends Milestone {
  index: number;
  total: number;
  trigger: boolean;
}

function MilestoneNode({
  quarter,
  year,
  headline,
  detail,
  amount,
  index,
  total,
  trigger,
}: MilestoneNodeProps) {
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex gap-5 sm:gap-8"
    >
      {/* Left: timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-10 sm:w-14">
        {/* Quarter badge */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10"
          style={{
            background: DOT_COLOR,
            boxShadow: "0 0 0 4px rgba(0,0,0,0.4)",
          }}
          aria-hidden="true"
        >
          <span className="text-[10px] font-bold text-usds-steel-900 leading-none text-center">
            {quarter}
            <br />
            {year.slice(2)}
          </span>
        </div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-1"
            style={{ background: "rgba(255,255,255,0.08)", minHeight: 32 }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={trigger ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.4, delay: index * 0.09 + 0.3 }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-10 flex-1 min-w-0">
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-1.5"
          style={{ color: DOT_COLOR }}
        >
          {quarter} {year}
        </p>
        <h3 className="text-[17px] font-semibold text-white leading-snug mb-2">
          {headline}
        </h3>
        <p className="text-[14px] text-white/50 leading-relaxed mb-3">
          {detail}
        </p>
        <span
          className="inline-block text-[12px] font-bold tabular-nums px-3 py-1 rounded-full"
          style={{
            background: "rgba(52,211,153,0.10)",
            color: DOT_COLOR,
            border: "1px solid rgba(52,211,153,0.20)",
          }}
        >
          {amount}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * SavingsMilestoneTimeline — vertical timeline of quarterly savings milestones.
 * All badges use a single monochrome gsa-savings green.
 */
export function SavingsMilestoneTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section
      ref={ref}
      aria-label="Savings milestones by quarter"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/30 mb-2">
          Timeline
        </p>
        <h2 className="font-garamond text-3xl sm:text-4xl font-semibold text-white leading-tight">
          Milestones &amp; History
        </h2>
        <p className="mt-3 text-[15px] text-white/50 leading-relaxed max-w-2xl">
          A quarter-by-quarter account of how GSA has delivered value to the
          American taxpayer since January 2025.
        </p>
      </motion.div>

      {/* Timeline nodes */}
      <div role="list">
        {milestones.map((m, i) => (
          <div key={`${m.quarter}-${m.year}-${i}`} role="listitem">
            <MilestoneNode
              {...m}
              index={i}
              total={milestones.length}
              trigger={inView}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
