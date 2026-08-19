"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Scroll-cascade word highlight — mirrors the SavingsHero typographic treatment
// (font-garamond, per-word color reveal as the block scrolls into view).
// ─────────────────────────────────────────────────────────────────────────────

interface HighlightWordProps {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  /** Word color at rest / once revealed */
  fromColor: string;
  toColor: string;
}

function HighlightWord({
  word,
  index,
  total,
  scrollYProgress,
  fromColor,
  toColor,
}: HighlightWordProps) {
  const start = (index / total) * 0.7;
  const end = start + 0.7 / total + 0.02;
  const color = useTransform(
    scrollYProgress,
    [start, end],
    [fromColor, toColor],
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

// Per-variant palette. Dark is the original savings-page treatment; light is
// the white-ground homepage treatment (dark text cascade, WCAG 2.1 AA).
const VARIANTS = {
  dark: {
    section: "bg-gsa-navy",
    wordFrom: "rgba(255,255,255,0.3)",
    wordTo: "rgba(255,255,255,1)",
    quoteMark: "rgba(255,255,255,0.22)",
    divider: "bg-white/40",
    cite: "text-white/80",
    role: "text-white/45",
  },
  light: {
    section: "bg-white",
    wordFrom: "rgba(28,31,34,0.25)",
    wordTo: "rgba(28,31,34,1)",
    quoteMark: "rgba(28,31,34,0.18)",
    divider: "bg-usds-steel-400",
    cite: "text-usds-steel-800",
    role: "text-usds-steel-600",
  },
} as const;

export interface QuoteBlockProps {
  /** The quotation text */
  quote: string;
  /** Person the quote is attributed to */
  attribution: string;
  /** Optional role / title beneath the attribution */
  role?: string;
  /** Color treatment — dark (navy, default) or light (white ground) */
  variant?: "dark" | "light";
  /** Optional seal/emblem image rendered above the quote */
  seal?: { src: string | StaticImageData; alt: string };
}

/**
 * QuoteBlock — full-viewport pull-quote with the savings-page typographic
 * treatment: oversized Garamond type on a dark ground, with each word
 * brightening in a scroll-driven cascade as the reader passes through.
 */
export function QuoteBlock({
  quote,
  attribution,
  role,
  variant = "dark",
  seal,
}: QuoteBlockProps) {
  const textRef = useRef<HTMLQuoteElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });

  const words = quote.split(" ");
  // eslint-disable-next-line security/detect-object-injection -- variant is a typed union key, not untrusted input
  const palette = VARIANTS[variant];

  return (
    <section
      className={`${palette.section} px-6 sm:px-12 lg:px-20`}
      aria-label={`Quote from ${attribution}`}
    >
      <div
        className="w-full max-w-[820px] mx-auto flex flex-col items-center justify-center text-center"
        style={{ minHeight: "100svh" }}
      >
        {seal ? (
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8">
            <Image
              src={seal.src}
              alt={seal.alt}
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>
        ) : (
          <span
            aria-hidden
            className="font-garamond block leading-none mb-6 select-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: palette.quoteMark,
            }}
          >
            &ldquo;
          </span>
        )}

        <blockquote
          ref={textRef}
          className="font-garamond font-semibold leading-[1.2]"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)" }}
          aria-label={quote}
        >
          {words.map((word, i) => (
            <HighlightWord
              key={i}
              word={word}
              index={i}
              total={words.length}
              scrollYProgress={scrollYProgress}
              fromColor={palette.wordFrom}
              toColor={palette.wordTo}
            />
          ))}
        </blockquote>

        <footer className="mt-10 flex flex-col items-center gap-2">
          <span
            aria-hidden
            className={`inline-block h-[2px] w-10 rounded-full ${palette.divider}`}
          />
          <cite
            className={`not-italic font-geist text-[13px] font-semibold tracking-[0.18em] uppercase ${palette.cite}`}
          >
            {attribution}
          </cite>
          {role && (
            <span className={`font-geist text-[13px] ${palette.role}`}>
              {role}
            </span>
          )}
        </footer>
      </div>
    </section>
  );
}
