"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ── Placeholder slides ────────────────────────────────────────────────────────
import slide1 from "@/assets/images/ED/Edited-4669.jpg";
import slide2 from "@/assets/images/ED/Edited-4794.jpg";
import slide3 from "@/assets/images/ED/03252026 - GSA NCR Press Conference-10-Slide1.jpg";
import slide4 from "@/assets/images/BUILDING/1800FArchitecture2.jpg";
import slide5 from "@/assets/images/BUILDING/1800FArchitecture4.jpg";

interface HeroSlide {
  image: StaticImageData;
  alt: string;
}

const slides: HeroSlide[] = [
  { image: slide1, alt: "GSA press conference" },
  { image: slide2, alt: "Federal real estate" },
  { image: slide3, alt: "GSA NCR press conference" },
  { image: slide4, alt: "1800 F Street architecture" },
  { image: slide5, alt: "1800 F Street exterior" },
];

const AUTOPLAY_MS = 5500;

/** Apple-style pill dot: active = wide capsule, inactive = small circle */
function PillDot({
  active,
  index,
  onClick,
  progress,
}: {
  active: boolean;
  index: number;
  onClick: () => void;
  /** 0→1 fill progress for the active dot (drives the inner progress bar) */
  progress: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={`Slide ${index + 1}`}
      onClick={onClick}
      className="relative flex items-center justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full overflow-hidden"
      style={{
        width: active ? 28 : 8,
        height: 8,
        background: active
          ? "rgba(255,255,255,0.25)"
          : "rgba(255,255,255,0.35)",
        borderRadius: 9999,
        transition: "width 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s",
      }}
    >
      {active && (
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0, ease: "linear" }}
        />
      )}
    </button>
  );
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
    setProgress(0);
  }, []);

  // Autoplay + progress ticker
  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const TICK_MS = 50;
    const totalTicks = AUTOPLAY_MS / TICK_MS;
    let ticks = 0;

    progressRef.current = setInterval(() => {
      ticks++;
      setProgress(ticks / totalTicks);
    }, TICK_MS);

    timerRef.current = setInterval(() => {
      ticks = 0;
      setProgress(0);
      setCurrent((n) => (n + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current]);

  return (
    <section
      className="relative overflow-hidden bg-black"
      style={{ height: "clamp(340px, 62vh, 680px)" }}
      aria-label="Featured photos carousel"
      aria-roledescription="carousel"
    >
      {/* ── Crossfade image stack ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${current + 1} of ${slides.length}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* Ken Burns: subtle scale-up over the slide's lifetime */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
          >
            <Image
              src={slides[current].image}
              alt={slides[current].alt}
              fill
              className="object-cover object-center"
              priority={current === 0}
              sizes="100vw"
            />
          </motion.div>

          {/* Subtle dark vignette — no text, no gradient text overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* ── Pill-dot indicators (centered, bottom) ── */}
      <div
        className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-1.5"
        role="tablist"
        aria-label="Slide indicators"
        aria-live="polite"
      >
        {slides.map((_, i) => (
          <PillDot
            key={i}
            index={i}
            active={i === current}
            progress={i === current ? progress : 0}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
