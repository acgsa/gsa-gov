"use client";

import { useState, useEffect, useCallback } from "react";
import { SavingsTotalStrip } from "@/components/modules/SavingsTotalStrip";
import { SavingsMilestoneScroll } from "@/components/modules/SavingsMilestoneScroll";
import { MILESTONES, FRAUD_STAGES } from "@/lib/savings-data";

/** Read prefers-reduced-motion synchronously (SSR-safe) */
function readPrefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * SavingsScrollSection — client wrapper that owns the activeMilestone state
 * and coordinates SavingsTotalStrip (sticky tracker) and SavingsMilestoneScroll
 * (full-viewport scroll panels).
 *
 * The "Breakdown of the savings" intro is rendered inside SavingsHero on the
 * watercolor background, so this section begins directly with the pizza tracker.
 */
export function SavingsScrollSection() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [prefersReduced, setPrefersReduced] =
    useState<boolean>(readPrefersReduced);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleActivate = useCallback((index: number) => {
    setActiveMilestone(index);
  }, []);

  return (
    <section
      aria-label={`Taxpayer savings milestones — ${MILESTONES.length} quarters`}
    >
      {/* ── Sticky pizza tracker strip ──────────────────────────────────── */}
      {/*
        `sticky top-14 z-40` pins the strip just below the MicrositeHeader
        (a fixed h-14 / 56px row, which owns z-50).
      */}
      <div className="sticky top-14 z-40">
        <SavingsTotalStrip activeMilestone={activeMilestone} />
      </div>

      {/* ── Scroll panels ───────────────────────────────────────────────── */}
      <SavingsMilestoneScroll
        activeMilestone={activeMilestone}
        onActivate={handleActivate}
        prefersReduced={prefersReduced}
      />

      {/* ── Cumulative totals callout — flat, no card ───────────────────── */}
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center border-t border-white/[0.07]">
        <p
          className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
          style={{ color: "rgba(52,211,153,0.7)" }}
        >
          Total Savings Driven
        </p>
        <p
          className="font-garamond font-semibold tabular-nums leading-none text-white mb-4"
          style={{ fontSize: "clamp(4rem, 14vw, 10rem)" }}
          aria-label={`${FRAUD_STAGES[0]!.value} in cumulative taxpayer savings`}
        >
          {FRAUD_STAGES[0]!.value}
        </p>
        <p
          className="font-garamond"
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          in federal contract savings driven since January 2025
        </p>
      </div>
    </section>
  );
}
