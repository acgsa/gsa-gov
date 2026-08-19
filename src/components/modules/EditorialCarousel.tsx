"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MoveRight, Pause, Play } from "lucide-react";
import type { EditorialCardProps } from "@/components/ui/EditorialCard";

const INTERVAL_MS = 5000;

export interface EditorialCarouselProps {
  /** Static eyebrow above the section title — e.g. "Real Estate" */
  eyebrow: string;
  sectionTitle: string;
  cards: EditorialCardProps[];
}

export function EditorialCarousel({
  eyebrow,
  sectionTitle,
  cards,
}: EditorialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  /** Hover/focus-driven transient pause. */
  const [hoverPaused, setHoverPaused] = useState(false);
  /** Explicit user toggle via the pause/play button (sticky). */
  const [userPaused, setUserPaused] = useState(false);
  const paused = hoverPaused || userPaused;

  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
      setProgress(0);
      startRef.current = null;
    },
    [current],
  );

  const goNext = useCallback(() => {
    go((current + 1) % cards.length);
  }, [current, cards.length, go]);

  /* ── Auto-advance RAF loop ── */
  useEffect(() => {
    if (paused) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(elapsed / INTERVAL_MS, 1);
      setProgress(pct);

      if (pct >= 1) {
        goNext();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [current, paused, goNext]);

  // eslint-disable-next-line security/detect-object-injection -- current is a bounded numeric state index (0..cards.length-1)
  const card = cards[current];

  return (
    <section
      className="py-12 bg-white"
      aria-label={sectionTitle}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={() => setHoverPaused(false)}
    >
      <div className="flex flex-col lg:flex-row items-stretch w-full lg:h-[clamp(340px,52vw,560px)]">
        {/* ── Image area — fixed height, crossfades in place ── */}
        <div className="relative w-full lg:w-[65%] h-64 lg:h-full flex-shrink-0 overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={current}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Text panel — static layout, text animates in place ── */}
        <div className="flex flex-col lg:w-[35%] px-8 lg:px-12 xl:px-16 py-10 lg:py-12 bg-usds-steel-100">
          {/* Static eyebrow — never animates */}
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-usds-steel-500 mb-2">
            {eyebrow}
          </p>

          {/* Section title — always visible, never animates */}
          <h2 className="font-garamond text-usds-steel-900 text-3xl font-semibold leading-tight mb-6">
            {sectionTitle}
          </h2>

          {/* Animated text block — body + CTA only */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, y: direction * 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* Body — regular Geist body style */}
                <p className="font-geist text-usds-steel-800 text-base leading-relaxed mb-5 line-clamp-4">
                  {card.body}
                </p>

                {/* CTA */}
                <Link
                  href={card.ctaHref}
                  className="inline-flex items-center gap-2 text-sm text-usds-steel-700 hover:text-usds-steel-900 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
                >
                  <span>{card.ctaText}</span>
                  <MoveRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav — animated progress dots + pause/play toggle */}
          <div className="flex items-center gap-3 pt-8">
            <div
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label="Slides"
            >
              {cards.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => go(i)}
                  className="relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 40 : 6,
                    height: 6,
                    borderRadius: 9999,
                    background: "#B2BCCC",
                    flexShrink: 0,
                  }}
                >
                  {/* Progress fill — only on active dot */}
                  {i === current && (
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full bg-usds-steel-700"
                      style={{ width: `${progress * 100}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={
                userPaused
                  ? "Play automatic slideshow"
                  : "Pause automatic slideshow"
              }
              aria-pressed={userPaused}
              className="flex items-center justify-center w-4 h-4 text-usds-steel-500 hover:text-usds-steel-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded-full"
            >
              {userPaused ? (
                <Play
                  className="w-3 h-3"
                  fill="currentColor"
                  stroke="none"
                  aria-hidden="true"
                />
              ) : (
                /* Custom pause: chunkier bars, wider gap, 2px rounded corners */
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="5" y="4" width="5" height="16" rx="2" />
                  <rect x="14" y="4" width="5" height="16" rx="2" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
