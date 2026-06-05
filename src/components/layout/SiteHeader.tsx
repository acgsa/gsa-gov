"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";

/** Date formatted as "June 5, 2026" */
function TodayDate() {
  const now = new Date();
  return (
    <time
      dateTime={now.toISOString().split("T")[0]}
      className="text-white/60 text-xs sm:text-sm tabular-nums"
    >
      {now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </time>
  );
}

export function SiteHeader() {
  const { scrollY } = useScroll();

  // Shrink header padding on scroll: 20px → 10px
  const paddingY = useTransform(scrollY, [0, 80], [20, 10]);

  // Shrink seal: 52px → 34px
  const sealSize = useTransform(scrollY, [0, 80], [52, 34]);

  // Title size: 1rem → 0.8rem
  const titleSize = useTransform(scrollY, [0, 80], [1, 0.82]);

  // Shadow appears on scroll
  const shadow = useTransform(
    scrollY,
    [0, 60],
    ["0 0 0 rgba(0,0,0,0)", "0 4px 32px rgba(0,0,0,0.45)"],
  );

  return (
    <motion.header
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
        boxShadow: shadow,
      }}
      className="relative z-10 bg-gsa-navy"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* ── Left: date + weather ── */}
        <div className="flex items-center gap-3 min-w-0">
          <TodayDate />
          <span
            aria-label="Weather: Partly cloudy, 72 degrees Fahrenheit"
            className="text-white/50 text-xs hidden sm:inline"
          >
            🌤 72°F
          </span>
        </div>

        {/* ── Center: GSA Seal + title ── */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <motion.div style={{ width: sealSize, height: sealSize }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/GSA_Seal_Updated_2026.svg"
              alt="GSA Seal"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </motion.div>
          <motion.span
            style={{ fontSize: titleSize + "rem" }}
            className="font-garamond text-white font-normal text-center leading-snug tracking-wide whitespace-nowrap"
          >
            U.S. General Services Administration
          </motion.span>
        </div>

        {/* ── Right: Login ── */}
        <div className="flex justify-end">
          <Link
            href="/login"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gsa-navy rounded px-1"
          >
            Login
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
