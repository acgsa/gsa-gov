"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/images/ACCOUNTABILITY/watercolor.jpg";
import { InteractiveFraudStat } from "@/components/modules/InteractiveFraudStat";

// ─────────────────────────────────────────────────────────────────────────────
// Shared scroll-cascade word highlight
// Used by both the mission statement and the "Breakdown" intro paragraph.
// ─────────────────────────────────────────────────────────────────────────────

interface HighlightWordProps {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function HighlightWord({
  word,
  index,
  total,
  scrollYProgress,
}: HighlightWordProps) {
  const start = (index / total) * 0.7;
  const end = start + 0.7 / total + 0.02;
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["rgba(255,255,255,0.3)", "rgba(255,255,255,1)"],
  );
  return (
    <motion.span
      style={{ color, display: "inline" }}
      className="transition-none"
    >
      {word}{" "}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel 1 — Mission statement cascade
// ─────────────────────────────────────────────────────────────────────────────

const MISSION_WORDS = [
  "GSA",
  "is",
  "working",
  "for",
  "the",
  "American",
  "people",
  "—",
  "eliminating",
  "waste,",
  "fraud,",
  "and",
  "abuse",
  "across",
  "every",
  "line",
  "of",
  "federal",
  "business.",
];

function MissionPanel() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      className="w-full max-w-[700px] mx-auto flex items-center justify-center text-center"
      style={{ height: "100svh" }}
      aria-label="GSA mission statement"
    >
      <p
        ref={textRef}
        className="font-garamond font-semibold leading-[1.15]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        aria-label="GSA is working for the American people — eliminating waste, fraud, and abuse across every line of federal business."
      >
        {MISSION_WORDS.map((word, i) => (
          <HighlightWord
            key={i}
            word={word}
            index={i}
            total={MISSION_WORDS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel 2 — $8B+ stat (tight below mission)
// ─────────────────────────────────────────────────────────────────────────────

function StatPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "start center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["2rem", "0rem"]);

  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <motion.div
      ref={panelRef}
      style={{ opacity, y }}
      className="w-full max-w-[760px] flex flex-col items-center justify-start text-center pt-4 pb-16"
      aria-label="Fraud, waste, and abuse metrics"
    >
      <InteractiveFraudStat prefersReduced={prefersReduced} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel 3 — "Breakdown of the savings" intro with cascade (still on watercolor)
// ─────────────────────────────────────────────────────────────────────────────

const INTRO_WORDS = [
  "Every",
  "dollar",
  "recovered",
  "is",
  "documented.",
  "Scroll",
  "through",
  "each",
  "line",
  "of",
  "business",
  "—",
  "real",
  "estate,",
  "acquisition,",
  "technology,",
  "fleet,",
  "and",
  "more",
  "—",
  "and",
  "see",
  "exactly",
  "how",
  "GSA",
  "is",
  "delivering",
  "results",
  "for",
  "the",
  "American",
  "people.",
];

function BreakdownPanel() {
  const pRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: pRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      className="w-full max-w-[700px] mx-auto flex flex-col items-center text-center pb-2"
      style={{ paddingTop: "50vh" }}
    >
      <p
        className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
        style={{ color: "rgba(52,211,153,0.7)" }}
      >
        Line by Line
      </p>
      <h2
        className="font-garamond font-semibold leading-none mb-8 text-white"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
      >
        Savings Breakdown
      </h2>
      <p
        ref={pRef}
        className="font-garamond leading-[1.4]"
        style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
        aria-label="Every dollar recovered is documented. Scroll through each line of business — real estate, acquisition, technology, fleet, and more — and see exactly how GSA is delivering results for the American people."
      >
        {INTRO_WORDS.map((word, i) => (
          <HighlightWord
            key={i}
            word={word}
            index={i}
            total={INTRO_WORDS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SavingsHero — single tall scroll container:
 * - Sticky watercolor background image + dark overlay
 * - Panel 1 (100svh):  mission text cascade
 * - Panel 2 (compact): $8B+ stat
 * - Panel 3 (compact): "Breakdown of the savings" intro cascade (still on bg)
 *
 * The container is 450svh tall so the background persists through all three panels.
 */
export function SavingsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  // On load the image top is flush with the viewport; drifts upward as user scrolls → parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // ── Watercolor dimming ──
  // Drive the overlay directly off the window scroll position in pixels so the
  // timing is deterministic and not sensitive to the container's total height.
  // `scrollYProgress` on a 280svh container advances slowly (0→1 over ~180svh),
  // which made a small range like [0, 0.15] still span a lot of scrolling — the
  // darkening therefore looked like it only kicked in near the bottom. Using
  // the raw pixel scroll lets us fade cleanly across the first viewport height.
  const { scrollY } = useScroll();
  const [vh, setVh] = useState<number>(() =>
    typeof window === "undefined" ? 800 : window.innerHeight,
  );
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  // Start nearly clear, reach full darkness after ~0.75 of a viewport of scroll
  // (while the mission text is still centered), well before the $8B+ number.
  const overlayOpacity = useTransform(scrollY, [0, vh * 0.75], [0.45, 0.92]);

  return (
    <div ref={containerRef} style={{ height: "280svh", position: "relative" }}>
      {/* ── Sticky background ── */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100svh" }}
        aria-hidden="true"
      >
        <motion.div
          style={{ y: imageY, position: "absolute", inset: "0 0 -30% 0" }}
        >
          <Image
            src={heroBg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: overlayOpacity,
            background:
              "linear-gradient(to bottom, rgba(0,17,28,0.85) 0%, rgba(0,17,28,0.65) 55%, rgba(0,17,28,0.5) 100%)",
          }}
        />
      </div>

      {/* ── Scrolling content ── */}
      <div
        className="absolute inset-0 flex flex-col items-center px-6 sm:px-12 lg:px-20"
        style={{ height: "280svh" }}
      >
        <MissionPanel />
        <StatPanel />
        <BreakdownPanel />
      </div>
    </div>
  );
}
