"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { OdometerCounter } from "@/components/ui/OdometerCounter";

export function LiveTicker() {
  return (
    <div
      className="bg-gsa-ticker border-t border-white/[0.06]"
      aria-label="Live updates"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-center gap-5 overflow-hidden text-sm">
        {/* ── LIVE ── */}
        <span
          className="font-bold text-gsa-live tracking-[0.18em] uppercase flex-shrink-0"
          aria-live="polite"
        >
          Live
        </span>

        {/* Divider */}
        <div
          className="h-4 w-px bg-white/15 flex-shrink-0"
          aria-hidden="true"
        />

        {/* ── 1800 F Revitalization Progress ── */}
        <Link
          href="#1800f"
          className="flex items-center gap-1.5 group text-white/80 hover:text-white transition-colors duration-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          aria-label="Watch the 1800 F Street revitalization progress livestream"
        >
          <Play
            className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
            aria-hidden="true"
            fill="currentColor"
          />
          <span className="font-bold">1800 F</span>
          <span className="text-white/50 hidden sm:inline">
            Revitalization Progress
          </span>
        </Link>

        {/* Divider */}
        <div
          className="h-4 w-px bg-white/15 flex-shrink-0"
          aria-hidden="true"
        />

        {/* ── Taxpayer Savings Accountability Tracker ── */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="font-bold text-white">Taxpayer Savings</span>
          <span className="text-white/50 hidden sm:inline">
            Accountability Tracker
          </span>
          <OdometerCounter />
        </div>
      </div>
    </div>
  );
}
