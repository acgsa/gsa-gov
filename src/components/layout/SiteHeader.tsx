"use client";

/**
 * SiteHeader — PRODUCTION desktop topbar
 * --------------------------------------
 * The desktop expanded topbar that places the GSA seal and the wordmark
 * SIDE BY SIDE (horizontal) instead of stacked (seal below wordmark).
 *
 * This is the single, canonical public header (approved by the project owner
 * on 2026-07-27). Wired into `src/app/(frontend)/layout.tsx` and the category
 * layouts.
 *
 * Scroll behavior: a single persistent row whose padding/seal/title
 * continuously shrink via scroll-linked motion values (useTransform), rather
 * than swapping between two discrete markups. Date/weather, the seal +
 * wordmark, and Log in all stay mounted and visible throughout — nothing
 * disappears and reappears.
 */

import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GovBanner } from "@/components/layout/GovBanner";

interface WeatherData {
  city: string | null;
  temp: number | null;
  unit: string;
  condition: string | null;
  icon: string | null;
}

/**
 * Date + live weather: fetches location + conditions client-side via
 * /api/weather. On scroll the date line fades out and collapses while the
 * weather line stays visible (per the scrolled-topbar design).
 */
function TodayDateWeather({
  dateOpacity,
  dateHeight,
}: {
  dateOpacity: MotionValue<number>;
  dateHeight: MotionValue<number>;
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.json())
      .then((data: WeatherData) => setWeather(data))
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col gap-1.5 pt-[10px] mt-[2px]">
      {/* Date — fades out and collapses on scroll */}
      <motion.div
        style={{ opacity: dateOpacity, height: dateHeight }}
        className="overflow-hidden"
      >
        <time
          dateTime={now.toISOString().split("T")[0]}
          className="text-white/85 text-[14px] tabular-nums leading-tight whitespace-nowrap"
        >
          {dateStr}
        </time>
      </motion.div>
      {/* Weather — stays visible in the scrolled state */}
      <span
        aria-label={
          weather?.temp != null
            ? `Current weather: ${weather.condition}, ${weather.temp} degrees ${weather.unit === "F" ? "Fahrenheit" : "Celsius"}`
            : undefined
        }
        className="text-white/85 text-[14px] tabular-nums leading-tight whitespace-nowrap min-h-[1.25em]"
      >
        {weather?.temp != null
          ? `${weather.temp}°${weather.unit} ${weather.icon}`
          : ""}
      </span>
    </div>
  );
}

export function SiteHeader() {
  const { scrollY } = useScroll();

  // Continuous shrink — all transforms complete within the first 100px of
  // scroll. The date line fades and collapses (the weather line persists),
  // and the seal + wordmark shrink toward the tablet logo treatment.
  const paddingTop = useTransform(scrollY, [0, 100], [14, 8]);
  const paddingBottom = useTransform(scrollY, [0, 100], [8, 0]);
  const sealSize = useTransform(scrollY, [0, 100], [64, 40]);
  const titleSize = useTransform(scrollY, [0, 100], [26, 20]);
  // Seal↔wordmark spacing tightens on scroll to the tablet header's gap-3
  // (12px). Animated as marginLeft on the wordmark — not flex `gap` — because
  // framer-motion reliably px-suffixes margins across versions.
  const wordmarkGap = useTransform(scrollY, [0, 100], [24, 12]);
  // Only the date line fades/collapses on scroll; the weather stays visible.
  const dateOpacity = useTransform(scrollY, [0, 70], [1, 0]);
  const dateHeight = useTransform(scrollY, [0, 100], [18, 0]);

  // GovBanner ("official website" ribbon) fades out and collapses on scroll.
  // Animate height (not scaleY) so the row actually reclaims its vertical space.
  const bannerOpacity = useTransform(scrollY, [0, 50], [1, 0]);
  const bannerHeight = useTransform(scrollY, [0, 90], [30, 0]);

  return (
    // Background/translucency+blur is handled ONCE on the shared sticky chrome
    // wrapper (frontend layout) so the topbar, nav, and ticker are one uniform
    // color at every scroll position. This element stays transparent.
    <motion.header
      style={{
        paddingTop: 0,
        paddingBottom: 0,
      }}
      className="relative z-10"
    >
      {/* GovBanner only shown on desktop; mobile shows it inside MainNav row.
          Fades + collapses on scroll so the ribbon scrolls away with the topbar. */}
      <motion.div
        style={{ opacity: bannerOpacity, height: bannerHeight }}
        className="hidden lg:block overflow-hidden"
      >
        <GovBanner />
      </motion.div>

      {/* ══ DESKTOP (lg+): single row that continuously shrinks on scroll ══ */}
      <motion.div
        style={{ paddingTop, paddingBottom }}
        className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Single row: date/weather | seal + wordmark (side by side) | log in */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left: date (fades on scroll) + weather (persists) */}
          <div className="self-start">
            <TodayDateWeather
              dateOpacity={dateOpacity}
              dateHeight={dateHeight}
            />
          </div>

          {/* Center: seal and wordmark SIDE BY SIDE — sizes and spacing shrink
              continuously toward the tablet logo treatment (40px seal, 12px gap) */}
          <Link
            href="/"
            className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            aria-label="Go to GSA homepage"
          >
            <motion.span
              className="flex-shrink-0 block"
              style={{ width: sealSize, height: sealSize }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/New.svg"
                alt="GSA Seal"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </motion.span>
            <motion.span
              style={{ fontSize: titleSize, marginLeft: wordmarkGap }}
              className="font-garamond text-white font-semibold leading-snug tracking-wide whitespace-nowrap group-hover:text-white/80 transition-colors duration-200"
            >
              U.S. General Services Administration
            </motion.span>
          </Link>

          {/* Right: Log in — always visible top right, never removed */}
          <div className="flex justify-end pt-[10px] self-start">
            <Link
              href="#"
              className="text-white/70 hover:text-white text-[14px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gsa-navy rounded"
            >
              Log in
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Mobile layout is handled entirely inside MainNav to avoid duplicate rows */}
    </motion.header>
  );
}
