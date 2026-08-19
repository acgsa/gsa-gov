"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FRAUD_STAGES, TOTAL_M, formatMillions } from "@/lib/savings-data";
import watercolor from "@/assets/images/ACCOUNTABILITY/watercolor.jpg";

/**
 * The three headline fraud figures surfaced in the homepage teaser —
 * Uncovered / Stopped / Prosecuted. Fully data-driven: pulled from the same
 * FRAUD_STAGES source the /accountability/savings hero uses, so edits to the
 * savings data propagate to the homepage automatically.
 *
 * Mapped into the teaser's figure shape: `amountLabel` is the big number,
 * `category` is the stage label (rendered as "in {label}"), and `caption` is
 * the supporting line revealed after the count-up.
 */
const TEASER_FIGURES = FRAUD_STAGES.slice(0, 3).map((stage) => ({
  amountLabel: stage.value,
  category: stage.label,
  caption: stage.caption,
}));

/** Parse the leading numeric value from an amount label like "$2.1B" or "$750M". */
function parseAmount(amountLabel: string): number | null {
  const match = amountLabel.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

/**
 * Rebuild an amount label with a new numeric value, preserving the original
 * prefix/suffix and decimal precision. e.g. ("$2.1B", 1.4) → "$1.4B".
 */
function formatAmount(amountLabel: string, value: number): string {
  const original = amountLabel.match(/[\d.]+/)?.[0] ?? "0";
  const decimals = original.includes(".") ? original.split(".")[1].length : 0;
  return amountLabel.replace(/[\d.]+/, value.toFixed(decimals));
}

interface KpiFigureProps {
  amountLabel: string;
  category: string;
  /** Supporting caption revealed once the figure finishes counting up. */
  caption?: string;
  /** Scroll-linked progress (0→1) that rolls this figure through and counts it up. */
  progress: MotionValue<number>;
  /** Start of this figure's window within overall scroll progress. */
  windowStart: number;
  /** End of this figure's window within overall scroll progress. */
  windowEnd: number;
}

/**
 * A single big KPI figure in the vertical roll. Within its scroll window the
 * figure rolls up from below into center (enter), holds centered while its
 * number counts up, then rolls up and out of view (exit) as the next figure
 * rolls in. Stacked absolutely so only one figure is visible at a time.
 */
function KpiFigure({
  amountLabel,
  category,
  caption,
  progress,
  windowStart,
  windowEnd,
}: KpiFigureProps) {
  const target = parseAmount(amountLabel);
  const span = windowEnd - windowStart;
  // Roll + cross-fade timing. The figure enters quickly (0→0.1), holds its
  // completed final frame for the bulk of the slice (0.1→0.9), then rolls up
  // and out over the last tenth (0.9→1). Crucially, the hold runs right up to
  // the boundary and the roll-out overlaps the NEXT figure's roll-in, so there
  // is NO blank dead zone between figures — the outgoing number rolls away as
  // the incoming one rolls in from below (a true hand-off).
  const enterEnd = windowStart + span * 0.1;
  const exitStart = windowStart + span * 0.9;
  const exitEnd = windowEnd;

  // Vertical roll: below → center (held) → above. The center hold extends all
  // the way to exitStart (0.9) so the final frame stays put until the very end.
  const y = useTransform(
    progress,
    [windowStart, enterEnd, exitStart, exitEnd],
    ["110%", "0%", "0%", "-110%"],
  );
  // Opacity cross-fade at the boundary. We DON'T leave a gap where both figures
  // are transparent — instead the outgoing figure stays fully opaque until it
  // starts rolling up (exitStart) and only then fades out, while the incoming
  // figure fades in over its own enter band. The former "$0M ghost" overlap
  // came from two STATIC figures sharing the center at full opacity; here any
  // opacity overlap happens WHILE the figures are at different y positions
  // (one rolling up/out, the other rolling in/up from below), so it reads as a
  // clean hand-off rather than a stacked ghost. Fade-in is quick (finishes by
  // enterEnd) and fade-out rides the roll-out band (exitStart→exitEnd).
  const fadeInStart = windowStart;
  const fadeInEnd = enterEnd;
  const fadeOutStart = exitStart;
  const fadeOutEnd = exitEnd;
  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0],
  );

  // Caption: revealed AFTER the number finishes counting up (~0.3 of the span),
  // rising in slightly, then held through the full hold and fading out with the
  // figure's roll-out (fadeOutStart→fadeOutEnd) so it never lingers past the
  // figure it belongs to.
  const captionOpacity = useTransform(
    progress,
    [
      windowStart,
      windowStart + span * 0.3,
      windowStart + span * 0.38,
      fadeOutStart,
      fadeOutEnd,
    ],
    [0, 0, 1, 1, 0],
  );
  const captionY = useTransform(
    progress,
    [windowStart + span * 0.3, windowStart + span * 0.38],
    ["0.5rem", "0rem"],
  );

  const [display, setDisplay] = useState(
    target !== null ? formatAmount(amountLabel, 0) : amountLabel,
  );

  useMotionValueEvent(progress, "change", (p) => {
    if (target === null) return;
    // Count up across the (now shorter) enter + start of the hold, finishing
    // by ~0.3 of the span so the completed number is settled before the caption
    // reveals at ~0.32.
    const countEnd = windowStart + span * 0.3;
    const t = Math.min(
      Math.max((p - windowStart) / (countEnd - windowStart), 0),
      1,
    );
    setDisplay(formatAmount(amountLabel, target * t));
  });

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2"
    >
      <p className="text-[13px] sm:text-[15px] font-medium tracking-wide uppercase text-gsa-savings">
        in {category}
      </p>
      <p
        className="font-garamond font-semibold text-gsa-savings tabular-nums leading-none"
        style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        aria-label={`${amountLabel} in ${category}`}
      >
        {display}
      </p>
      {caption ? (
        <motion.p
          style={{
            opacity: captionOpacity,
            y: captionY,
            maxWidth: "min(700px, 90vw)",
          }}
          className="mt-3 text-base sm:text-lg font-medium text-white/80 leading-snug"
        >
          {caption}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

interface KpiProgressDotsProps {
  count: number;
  progress: MotionValue<number>;
  rollStart: number;
  rollEnd: number;
}

/**
 * Small horizontal dots under the KPI roll indicating which of the figures is
 * currently centered. Purely decorative (aria-hidden) — the figures themselves
 * carry the accessible labels. The active dot widens and brightens.
 */
function KpiProgressDots({
  count,
  progress,
  rollStart,
  rollEnd,
}: KpiProgressDotsProps) {
  const [active, setActive] = useState(0);
  const slice = (rollEnd - rollStart) / count;
  useMotionValueEvent(progress, "change", (p) => {
    if (p < rollStart || p > rollEnd) return;
    const idx = Math.min(
      count - 1,
      Math.max(0, Math.floor((p - rollStart) / slice)),
    );
    setActive(idx);
  });
  return (
    <div
      className="flex items-center justify-center gap-2.5"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: i === active ? "1.5rem" : "0.375rem",
            backgroundColor:
              i === active
                ? "var(--gsa-savings, #34D399)"
                : "rgba(255,255,255,0.25)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * SavingsTeaserScroll — a homepage teaser for the Taxpayer Savings page.
 *
 * A tall (~300vh) scroll container drives a sticky inner card. As the user
 * scrolls, the card grows from a centered light card to a full-bleed dark
 * savings-green panel, reveals three headline KPIs (counted up in lockstep
 * with scroll), then a "See more" CTA — before collapsing back to a card as
 * the user scrolls past.
 *
 * Content is pulled from the shared MILESTONES data so it stays in sync with
 * the /accountability/savings page.
 *
 * Respects prefers-reduced-motion by rendering a static compact card instead.
 */
export function SavingsTeaserScroll() {
  // Lazy initializer reads the media query on the client's first render
  // (returns false during SSR). The effect only subscribes to later changes,
  // so we never call setState synchronously inside the effect body.
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

  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // ── Card geometry: the card is a FIXED-SIZE contained frame — its width and
  // height never change across the scroll. The scroll instead drives the
  // background/watercolor cross-fade and the KPI roll INSIDE this fixed card.
  const CARD_W = "min(80rem, 94vw)";
  const CARD_H = "70vh";
  const cardWidth = useTransform(
    scrollYProgress,
    [0, 0.2, 0.82, 1],
    [CARD_W, CARD_W, CARD_W, CARD_W],
  );
  const cardHeight = useTransform(
    scrollYProgress,
    [0, 0.2, 0.82, 1],
    [CARD_H, CARD_H, CARD_H, CARD_H],
  );
  // Radius stays squared off (0) across the whole scroll.
  const radius = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [0, 0, 0, 0]);
  // Card ground fades from the deep steel intro to the SAVINGS PAGE ground
  // (--gsa-ticker #0D131C, the same dark tone the /accountability/savings page
  // sits on) as it opens, holds through the KPI roll, then fades back to steel
  // on collapse.
  const background = useTransform(
    scrollYProgress,
    [0, 0.2, 0.82, 1],
    ["#141618", "#0D131C", "#0D131C", "#141618"],
  );

  // ── Watercolor backdrop image: stays fully visible across the ENTIRE scroll.
  // Rather than fading the image out to a flat green panel in the middle, we
  // keep the graphic present the whole time and instead DARKEN it via the scrim
  // (below) through the KPI/total beats for text legibility. ─────────────────
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  // Dark scrim over the watercolor: nearly clear on first view so the backdrop
  // reads BRIGHT, then deepens through the middle of the scroll (the KPI roll +
  // total beat) so the savings figures stay legible over the imagery, then
  // lifts back toward the lighter reading state for the final card. The image
  // itself is never removed — only this scrim's darkness changes.
  const scrimOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.2, 0.82, 0.94, 1],
    [0.22, 0.55, 0.78, 0.78, 0.55, 0.4],
  );
  // Headline: holds through the open (scrim darkens over the image) so text
  // stays while the panel deepens, then fades as the KPIs take over (~0.22).
  // Fades back in for the final card alongside the CTA.
  const introHeadlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.22, 0.86, 0.9, 1],
    [1, 1, 0, 0, 1, 1],
  );

  // ── Background drift: a slow vertical parallax on the watercolor backdrop so
  // the section feels alive rather than static. The image now stays visible the
  // whole scroll, so the drift runs across the full range for continuous motion
  // while staying subtle enough not to reveal the image edges. ───────────────
  const bgDriftY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const bgDriftScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);

  // ── KPI roll window: the three figures roll through vertically, one at a
  // time, across ~0.26 → ~0.78 of scroll (each gets an equal slice). Bounded
  // inside the full-width-green hold so KPIs only show on the green panel. ──
  const kpiRollStart = 0.26;
  const kpiRollEnd = 0.66;
  const kpiSlice = (kpiRollEnd - kpiRollStart) / TEASER_FIGURES.length;
  // The KPI stage itself only exists while green; hide it during intro/collapse
  // and as it hands off to the total-saved summary beat.
  const kpiStageOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.26, 0.66, 0.7],
    [0, 1, 1, 0],
  );

  // ── Total-saved summary beat: after the three figures finish rolling (~0.66)
  // a single cumulative figure fades in, holds through the green panel, then
  // fades out as the panel begins collapsing (~0.82). Rises slightly on entry.
  const totalBeatOpacity = useTransform(
    scrollYProgress,
    [0.68, 0.72, 0.8, 0.84],
    [0, 1, 1, 0],
  );
  const totalBeatY = useTransform(
    scrollYProgress,
    [0.68, 0.72],
    ["1.25rem", "0rem"],
  );

  // ── CTA: fully static — always visible, never fades. It lives in its own
  // layer anchored to the bottom of the card (independent of the headline/KPI
  // layers) so nothing animates its opacity across the scroll. ──────────────

  // ── Reduced-motion / SSR fallback: static compact card ───────────────────
  if (prefersReduced) {
    return (
      <section
        className="bg-white py-16 px-4 sm:px-6"
        aria-label="Taxpayer savings highlights"
      >
        <div className="max-w-5xl mx-auto rounded-2xl bg-usds-steel-950 px-6 py-14 sm:px-12">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {TEASER_FIGURES.map((figure) => (
              <li
                key={figure.category}
                className="flex flex-col items-center text-center gap-2"
              >
                <p
                  className="font-garamond font-semibold text-gsa-savings tabular-nums leading-none"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
                >
                  {figure.amountLabel}
                </p>
                <p className="text-[13px] sm:text-[15px] font-medium tracking-wide uppercase text-gsa-savings">
                  {figure.category}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col items-center gap-2 text-center">
            <p className="text-[13px] sm:text-[15px] font-medium tracking-wide uppercase text-gsa-savings">
              Total identified savings
            </p>
            <p
              className="font-garamond font-semibold text-gsa-savings tabular-nums leading-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
            >
              {formatMillions(TOTAL_M)}
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/savings"
              className="inline-flex items-center gap-2 rounded-full bg-gsa-savings px-7 py-3 text-[15px] font-semibold text-usds-steel-950 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-usds-steel-950 group"
            >
              <span>See more</span>
              <MoveRight
                className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={outerRef}
      className="relative bg-white"
      style={{ height: "420vh" }}
      aria-label="Taxpayer savings highlights"
    >
      {/* Sticky viewport-height stage that holds the growing/shrinking card.
          The card animates its real width/height between a small and a larger
          (but still capped) size — it stays a contained, rounded card and never
          goes full-bleed, so it keeps padding from the viewport edges. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          style={{
            width: cardWidth,
            height: cardHeight,
            borderRadius: radius,
            background,
          }}
          className="relative flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Watercolor backdrop — over the small intro card, fades out as the
              card opens (image → dark green), then fades back in for the final
              small card. Faded independently of the headline. */}
          <motion.div
            style={{ opacity: imageOpacity }}
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <motion.div
              style={{ y: bgDriftY, scale: bgDriftScale }}
              className="absolute inset-0"
            >
              <Image
                src={watercolor}
                alt=""
                fill
                priority={false}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
            {/* Dark scrim for legible headline text over the watercolor —
                nearly clear on first view (bright backdrop), dims in as you
                start scrolling. */}
            <motion.div
              style={{ opacity: scrimOpacity }}
              className="absolute inset-0 bg-usds-steel-950"
            />
          </motion.div>

          {/* Intro / outro content — headline + CTA stacked in a SINGLE centered
              flex column so the CTA always sits cleanly BELOW the headline with
              a real gap (they can never overlap, and the block is centered as a
              whole so nothing is clipped by the card's top/bottom edges).
              The headline fades with the open (image → green) and returns on the
              final small card; the CTA lives in its own always-on layer so it
              stays visible/clickable through the entire scroll. */}
          <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-8 px-8 text-center">
            <motion.p
              style={{
                opacity: introHeadlineOpacity,
                // Lock the wrapping width to a viewport-based value (NOT the
                // parent %, which grows as the card widens on scroll) so the
                // line breaks stay identical across the whole scroll — no
                // shifting typographic widow. The `88vw` fallback keeps it
                // contained on small screens; `46rem` caps it on wide ones, and
                // the font size scales fluidly with the viewport for responsive.
                fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)",
                width: "min(46rem, 88vw)",
              }}
              className="pointer-events-none font-garamond font-semibold text-white leading-[1.08] [text-wrap:balance]"
            >
              GSA is eliminating fraud, waste, and abuse
            </motion.p>
            <div className="z-[2] flex justify-center">
              <Link
                href="/savings"
                className="inline-flex items-center gap-2 rounded-full bg-gsa-savings px-7 py-3 text-[15px] font-semibold text-usds-steel-950 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-usds-steel-950 group"
              >
                <span>See more</span>
                <MoveRight
                  className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* KPI stage — only visible while the panel is full-width green.
              The three figures roll through vertically, one at a time, by
              scroll: each rolls up and out as the next rolls in from below. */}
          <motion.div
            style={{ opacity: kpiStageOpacity }}
            className="absolute inset-x-0 top-0 bottom-40 flex flex-col items-center justify-center gap-8"
          >
            <div className="relative w-full h-[9rem] sm:h-[11rem] md:h-[13rem]">
              {TEASER_FIGURES.map((figure, i) => {
                // Each figure owns an equal slice of the roll window.
                const windowStart = kpiRollStart + i * kpiSlice;
                const windowEnd = windowStart + kpiSlice;
                return (
                  <KpiFigure
                    key={figure.category}
                    amountLabel={figure.amountLabel}
                    category={figure.category}
                    caption={figure.caption}
                    progress={scrollYProgress}
                    windowStart={windowStart}
                    windowEnd={windowEnd}
                  />
                );
              })}
            </div>
            <KpiProgressDots
              count={TEASER_FIGURES.length}
              progress={scrollYProgress}
              rollStart={kpiRollStart}
              rollEnd={kpiRollEnd}
            />
          </motion.div>

          {/* Total-saved summary beat — appears on the green panel after the
              three figures have rolled through, just before the panel collapses.
              A single cumulative headline reinforces the payoff. Sits in its own
              layer so it never overlaps the KPI roll. */}
          <motion.div
            style={{ opacity: totalBeatOpacity, y: totalBeatY }}
            /* Anchored with the SAME `bottom-40` offset as the KPI stage so the
               cumulative figure lands in the exact vertical position the three
               rolling figures occupied — no jump when the KPIs hand off to the
               total. */
            className="pointer-events-none absolute inset-x-0 top-0 bottom-40 z-[1] flex flex-col items-center justify-center gap-3 px-8 text-center"
            aria-hidden="true"
          >
            <p className="text-[13px] sm:text-[15px] font-medium tracking-wide uppercase text-gsa-savings">
              Total identified savings
            </p>
            <p
              className="font-garamond font-semibold text-gsa-savings tabular-nums leading-none"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
            >
              {formatMillions(TOTAL_M)}
            </p>
            <p className="mt-2 text-base sm:text-lg font-medium text-white/80 leading-snug max-w-[min(700px,90vw)]">
              Returned to the American taxpayer
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
