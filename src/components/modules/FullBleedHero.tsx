"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight } from "lucide-react";

// ── Slide types ──────────────────────────────────────────────────────────────
type SlideBase = { alt: string };
export type FullBleedHeroImageSlide = SlideBase & {
  type: "image";
  image: StaticImageData;
};
export type FullBleedHeroVideoSlide = SlideBase & {
  type: "video";
  src: string;
};
export type FullBleedHeroSlide =
  | FullBleedHeroImageSlide
  | FullBleedHeroVideoSlide;

export interface FullBleedHeroProps {
  /** Background media — rotates automatically when more than one slide. */
  slides: FullBleedHeroSlide[];
  /** Category eyebrow rendered in a darkened pill above the heading */
  eyebrow: string;
  /** Category landing page the eyebrow links to (defaults to ctaHref) */
  eyebrowHref?: string;
  /** Hero headline (rendered as an h1, linked to ctaHref) */
  heading: string;
  ctaText: string;
  ctaHref: string;
  /** Rotation interval per slide (ms) */
  intervalMs?: number;
  /** Give the first slide's image priority loading (use on the topmost hero) */
  priority?: boolean;
  /** Slightly taller variant (use on the topmost hero) */
  tall?: boolean;
}

const DEFAULT_INTERVAL_MS = 6000;

/**
 * FullBleedHero — full-width image/video hero with centered overlay text.
 *
 * Layout (per the Option A homepage design):
 *   – full-bleed background media that crossfades through the provided slides
 *   – centered eyebrow pill that darkens and blurs its backdrop
 *   – large H1 headline
 *   – "See the latest →" style text link
 *
 * Behavior:
 *   – videos are force-muted (the `muted` attribute alone is not always
 *     honored at runtime), looped, and play inline
 *   – rotation is disabled when the user prefers reduced motion
 *   – a dark gradient overlay guarantees WCAG 2.1 AA text contrast
 */
export function FullBleedHero({
  slides,
  eyebrow,
  eyebrowHref,
  heading,
  ctaText,
  ctaHref,
  intervalMs = DEFAULT_INTERVAL_MS,
  priority = false,
  tall = false,
}: FullBleedHeroProps) {
  const [current, setCurrent] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Auto-rotate background media (skipped for single slides / reduced motion)
  useEffect(() => {
    if (slides.length <= 1 || prefersReducedMotion) return;
    const timer = setInterval(
      () => setCurrent((n) => (n + 1) % slides.length),
      intervalMs,
    );
    return () => clearInterval(timer);
  }, [slides.length, intervalMs, prefersReducedMotion]);

  // eslint-disable-next-line security/detect-object-injection -- current is a bounded numeric state index (0..slides.length-1)
  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden bg-black"
      style={{
        height: tall
          ? "clamp(460px, 84vh, 840px)"
          : "clamp(420px, 72vh, 760px)",
      }}
      aria-label={`${eyebrow}: ${heading}`}
    >
      {/* ── Crossfading background media ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {slide.type === "image" ? (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: prefersReducedMotion ? 1 : 1.06 }}
              transition={{ duration: intervalMs / 1000, ease: "linear" }}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority={priority && current === 0}
                sizes="100vw"
              />
            </motion.div>
          ) : (
            <video
              key={slide.src}
              /* Force muting imperatively — the `muted` attribute alone is not
                 always honored by browsers at runtime. */
              ref={(el) => {
                if (el) el.muted = true;
              }}
              src={slide.src}
              aria-label={slide.alt}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          )}

          {/* Flat scrim + bottom gradient for text legibility (AA contrast) */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom-anchored overlay: eyebrow pill / H1 / CTA link ── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end gap-5 px-6 pb-[66px] sm:pb-[74px] text-center">
        {/* Eyebrow — subtle by default; darkens + blurs on hover; links to the
            category landing page */}
        <Link
          href={eyebrowHref ?? ctaHref}
          className="inline-flex items-center rounded-sm bg-black/20 hover:bg-black/45 hover:backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/80 hover:text-white transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {eyebrow}
        </Link>

        {/* Design spec: EB Garamond 474 · 70px · 80px line height · 0% tracking.
            The headline links to the same destination as the CTA below. */}
        <h1
          className="font-garamond text-4xl leading-[1.14] sm:text-5xl lg:text-[70px] lg:leading-[80px] tracking-normal max-w-[700px]"
          style={{ fontWeight: 474 }}
        >
          <Link
            href={ctaHref}
            className="text-white drop-shadow-lg hover:text-white/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            {heading}
          </Link>
        </h1>

        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 text-[14px] font-medium text-white/80 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
        >
          <span>{ctaText}</span>
          <MoveRight
            className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
