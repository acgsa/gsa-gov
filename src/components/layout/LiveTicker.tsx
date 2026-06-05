"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { OdometerCounter } from "@/components/ui/OdometerCounter";

/**
 * Live content ticker — 3 items in one dark bar:
 *  1. 🔴 LIVE pulsing badge
 *  2. 1800 F — live building-progress stream link
 *  3. Taxpayer Savings — continuously rolling odometer
 */
export function LiveTicker() {
  return (
    <div
      className="bg-gsa-ticker border-t border-white/[0.06]"
      role="marquee"
      aria-label="Live updates"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-center gap-4 sm:gap-6 overflow-hidden">
        {/* ── LIVE badge ── */}
        <div
          className="flex items-center gap-2 flex-shrink-0"
          aria-live="polite"
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gsa-live" />
          </span>
          <span className="text-white font-bold text-sm tracking-[0.18em] uppercase">
            Live
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-4 w-px bg-white/15 flex-shrink-0"
          aria-hidden="true"
        />

        {/* ── 1800 F building stream ── */}
        <Link
          href="#1800f"
          className="flex items-center gap-2 group text-white/80 hover:text-white transition-colors duration-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          aria-label="Watch the 1800 F Street building progress livestream"
        >
          <Play
            className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200"
            aria-hidden="true"
            fill="currentColor"
          />
          <span className="font-semibold text-sm">1800 F</span>
          <span className="text-white/40 text-sm hidden sm:inline">
            Building Progress
          </span>
        </Link>

        {/* Divider */}
        <div
          className="h-4 w-px bg-white/15 flex-shrink-0"
          aria-hidden="true"
        />

        {/* ── Taxpayer Savings odometer ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-white/40 text-sm hidden sm:inline">
            Taxpayer Savings
          </span>
          <OdometerCounter />
        </div>
      </div>
    </div>
  );
}
