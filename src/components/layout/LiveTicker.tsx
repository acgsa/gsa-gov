"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { OdometerCounter } from "@/components/ui/OdometerCounter";

export function LiveTicker() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Must match SiteHeaderSideBySide / MainNav hysteresis thresholds EXACTLY
    // (collapse > 160, re-expand < 20) so the sticky chrome hides/shows in sync.
    let ticking = false;
    const evaluate = () => {
      ticking = false;
      const y = window.scrollY;
      setIsHidden((prev) => (prev ? y > 20 : y > 160));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(evaluate);
      }
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence initial={false}>
      {!isHidden && (
        <motion.div
          key="live-ticker"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="bg-transparent overflow-hidden"
          aria-label="Live updates"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-center gap-5 overflow-hidden text-sm">
            {/* ── Live ── */}
            <span
              className="font-bold text-gsa-live-bright tracking-[0.06em] flex-shrink-0"
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
              href="/1800f"
              className="flex items-center gap-1.5 group text-white/80 hover:text-white transition-colors duration-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              aria-label="Watch the 1800 F Street revitalization progress livestream"
            >
              <Play
                className="w-3 h-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                aria-hidden="true"
                fill="currentColor"
              />
              <span className="font-bold">1800 F</span>
              <span className="text-white/50 hidden lg:inline">Livestream</span>
            </Link>

            {/* Divider */}
            <div
              className="h-4 w-px bg-white/15 flex-shrink-0"
              aria-hidden="true"
            />

            {/* ── Taxpayer Savings Accountability Tracker ── */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Link
                href="/savings"
                className="flex items-center gap-1.5 group text-white/80 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                aria-label="View the Taxpayer Savings accountability tracker"
              >
                <span className="font-bold">Taxpayer Savings</span>
              </Link>
              <OdometerCounter />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
