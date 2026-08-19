"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MILESTONES } from "@/lib/savings-data";
import { getArticle } from "@/lib/news-data";
import { BRAND_GREEN } from "@/lib/tokens/colors";

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface SavingsMilestoneScrollProps {
  /** 0-based index of the currently active milestone (owned by parent) */
  activeMilestone: number;
  /** Called when a panel's IntersectionObserver fires, passing the new index */
  onActivate: (index: number) => void;
  prefersReduced: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Safe array accessor — all indices bounded by MILESTONES.length
// ─────────────────────────────────────────────────────────────────────────────

function safeAt<T>(arr: T[], i: number): T | undefined {
  // eslint-disable-next-line security/detect-object-injection -- i is a numeric index into a locally-owned array; read-only accessor
  return arr[i];
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component — single milestone panel with parallax
// ─────────────────────────────────────────────────────────────────────────────

interface MilestonePanelProps {
  index: number;
  total: number;
  isActive: boolean;
  panelRef: (el: HTMLElement | null) => void;
  prefersReduced: boolean;
}

function MilestonePanel({
  index,
  total,
  isActive,
  panelRef,
  prefersReduced,
}: MilestonePanelProps) {
  const milestone = safeAt(MILESTONES, index) ?? MILESTONES[0]!;
  const relatedArticles = (milestone.articleSlugs ?? [])
    .map((slug) => getArticle(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  // Parallax: track scroll progress within this panel
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Ghost background numeral drifts upward at 30 % of scroll speed
  const bgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  // Foreground category label drifts upward slightly faster
  const catY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      containerRef.current = el;
      panelRef(el);
    },
    [panelRef],
  );

  return (
    <section
      ref={setRef}
      id={`milestone-panel-${index}`}
      aria-label={`Milestone ${index + 1} of ${total}: ${milestone.headline}`}
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 sm:px-12 lg:px-20 text-center"
      style={{ minHeight: "90svh" }}
    >
      {/* ── Parallax background image ── */}
      {milestone.image && (
        <motion.div
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: isActive ? 0.07 : 0.03 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ y: prefersReduced ? undefined : bgY }}
        >
          <Image
            src={milestone.image}
            alt=""
            fill
            className="object-cover object-center"
            style={{ mixBlendMode: "luminosity" }}
            sizes="100vw"
            priority={false}
          />
          {/* Dark vignette to keep text legible */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 20%, rgba(0,17,28,0.85) 80%)",
            }}
          />
        </motion.div>
      )}

      {/* ── Foreground content ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
        {/* Category — eyebrow-style label */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0.18 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] font-bold tracking-[0.18em] uppercase leading-none mb-4 text-center w-full"
          style={{
            color: isActive ? BRAND_GREEN : "rgba(52,211,153,0.18)",
            transition: "color 0.4s ease",
            y: prefersReduced ? undefined : catY,
          }}
          aria-hidden="true"
        >
          {milestone.category}
        </motion.p>

        {/* Giant dollar amount */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.12, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-garamond font-semibold tabular-nums leading-none mb-6 text-center"
          style={{
            fontSize: "clamp(4.5rem, 14vw, 11rem)",
            color: isActive ? "white" : "rgba(255,255,255,0.1)",
            transition: "color 0.4s ease",
          }}
          aria-label={milestone.amountLabel}
        >
          {milestone.amountLabel}
        </motion.p>

        {/* Headline */}
        <motion.h3
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="font-garamond font-semibold leading-snug mb-6 text-center"
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
            color: isActive ? "white" : "rgba(255,255,255,0.12)",
            transition: "color 0.4s ease",
          }}
        >
          {milestone.titleNoun}
        </motion.h3>

        {/* Detail */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="leading-relaxed max-w-2xl text-center"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(255,255,255,0.52)",
          }}
        >
          {milestone.detail}
        </motion.p>

        {/* Related news articles */}
        {relatedArticles.length > 0 && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch justify-center gap-3 w-full max-w-3xl"
          >
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="group flex flex-1 items-start gap-4 text-left rounded-lg px-5 py-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {article.image && (
                  <span
                    className="relative hidden sm:block flex-shrink-0 w-16 h-16 overflow-hidden rounded-md"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    aria-hidden="true"
                  >
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover opacity-90 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </span>
                )}
                <span className="min-w-0">
                  <span
                    className="block text-[11px] font-semibold tracking-[0.16em] uppercase mb-1"
                    style={{ color: "rgba(52,211,153,0.7)" }}
                  >
                    In the news
                  </span>
                  <span className="flex items-center gap-2 text-[15px] font-medium leading-snug text-white/90 group-hover:text-white">
                    {article.title}
                    <MoveRight
                      className="w-4 h-4 flex-shrink-0 opacity-60 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden
                    />
                  </span>
                </span>
              </Link>
            ))}
          </motion.div>
        )}

        {/* Step counter */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.32 }}
          className="mt-10 text-[11px] font-semibold tracking-[0.2em] uppercase text-center"
          style={{ color: "rgba(52,211,153,0.4)" }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </motion.p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SavingsMilestoneScroll — scroll-driven milestone panels.
 *
 * Active state is owned by the parent (SavingsScrollSection).
 * This component reports intersections upward via onActivate.
 *
 * Layout: full-height milestone panels, one per MILESTONE entry.
 */
export function SavingsMilestoneScroll({
  activeMilestone,
  onActivate,
  prefersReduced,
}: SavingsMilestoneScrollProps) {
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  // ── IntersectionObserver ──────────────────────────────────────────────────
  useEffect(() => {
    const refs = panelRefs.current;
    const observers: IntersectionObserver[] = [];

    refs.slice(0, MILESTONES.length).forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) onActivate(i);
        },
        { threshold: 0.5 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [onActivate]);

  const setPanelRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      safeAt(panelRefs.current, index); // read is safe; write below is bounded
      // eslint-disable-next-line security/detect-object-injection -- index is the bounded map() index over the panels array
      panelRefs.current[index] = el;
    },
    [],
  );

  return (
    <div role="list" aria-label="Quarterly savings milestones">
      {MILESTONES.map((m, i) => (
        <div key={`${m.quarter}-${m.year}-${i}`} role="listitem">
          <MilestonePanel
            index={i}
            total={MILESTONES.length}
            isActive={activeMilestone === i}
            panelRef={setPanelRef(i)}
            prefersReduced={prefersReduced}
          />
        </div>
      ))}
    </div>
  );
}
