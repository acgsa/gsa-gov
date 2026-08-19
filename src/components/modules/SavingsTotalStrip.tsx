"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MILESTONES,
  CUMULATIVE_M,
  TOTAL_M,
  formatMillions,
} from "@/lib/savings-data";
import { BRAND_GREEN } from "@/lib/tokens/colors";

// ─── Cubic ease-out ──────────────────────────────────────────────────────────

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Read prefers-reduced-motion synchronously (SSR-safe) */
function readPrefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Safe array accessor — indices are bounded by MILESTONES.length */
function safeAt<T>(arr: T[], i: number): T | undefined {
  // eslint-disable-next-line security/detect-object-injection -- i is a numeric index into a locally-owned array; read-only accessor
  return arr[i];
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface SavingsTotalStripProps {
  /** 0-based index of the currently visible milestone */
  activeMilestone: number;
}

// ─── Animated counter ────────────────────────────────────────────────────────

interface CounterProps {
  targetM: number;
  prefersReduced: boolean;
}

function AnimatedCounter({ targetM, prefersReduced }: CounterProps) {
  const [display, setDisplay] = useState(() => formatMillions(targetM));
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const prevRef = useRef(targetM);

  useEffect(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    }

    const from = prevRef.current;
    const to = targetM;
    prevRef.current = to;

    const DURATION = 500;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = easeOut(progress);
      setDisplay(formatMillions(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(formatMillions(to));
        rafRef.current = null;
      }
    };

    if (prefersReduced) {
      const id = requestAnimationFrame(() => setDisplay(formatMillions(to)));
      return () => cancelAnimationFrame(id);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [targetM, prefersReduced]);

  return (
    <span
      className="font-garamond font-semibold tabular-nums leading-none"
      style={{
        fontSize: "clamp(2rem, 4vw, 3.5rem)",
        color: BRAND_GREEN,
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {display}
    </span>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

/**
 * SavingsTotalStrip — sticky tracker bar above the milestone scroll panels.
 *
 * Left column: large animated running total + "of $X.XB total" sub-label.
 * Right column: proportional horizontal segmented progress bar.
 *   - Each segment width = milestone.rawValueM / TOTAL_M * 100%
 *   - Segments to the left of (and including) activeMilestone fill green
 *   - Active segment pulses with a subtle glow
 *   - Segment label (category + amount) appears above active segment
 */
export function SavingsTotalStrip({ activeMilestone }: SavingsTotalStripProps) {
  const [prefersReduced, setPrefersReduced] =
    useState<boolean>(readPrefersReduced);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const currentCumulativeM = safeAt(CUMULATIVE_M, activeMilestone) ?? 0;
  const activeMeta = safeAt(MILESTONES, activeMilestone) ?? MILESTONES[0]!;

  return (
    <div
      className="w-full"
      style={{
        background: "rgba(10,18,36,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(52,211,153,0.12)",
      }}
      aria-label="Savings running total tracker"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 sm:py-5">
          {/* ── Left: counter ────────────────────────────────────────── */}
          <div className="flex-shrink-0 flex flex-col justify-center sm:min-w-[220px]">
            <AnimatedCounter
              targetM={currentCumulativeM}
              prefersReduced={prefersReduced}
            />
            <p
              className="mt-1 text-[12px] font-medium tabular-nums"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              of {formatMillions(TOTAL_M)} total
            </p>
          </div>

          {/* ── Right: segmented bar ─────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Active segment label — animates between milestones */}
            <div className="mb-2 h-5 relative overflow-hidden">
              <motion.p
                key={activeMilestone}
                initial={prefersReduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 text-[11px] font-semibold tracking-[0.14em] uppercase truncate"
                style={{ color: BRAND_GREEN }}
                aria-hidden="true"
              >
                {activeMeta.category} · {activeMeta.amountLabel}
              </motion.p>
            </div>

            {/* Bar track */}
            <div
              className="flex w-full gap-[2px] rounded-full overflow-hidden"
              style={{ height: 12 }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={MILESTONES.length - 1}
              aria-valuenow={activeMilestone}
              aria-label={`Milestone ${activeMilestone + 1} of ${MILESTONES.length}`}
            >
              {MILESTONES.map((m, i) => {
                const widthPct = (m.rawValueM / TOTAL_M) * 100;
                const isFilled = i <= activeMilestone;
                const isActive = i === activeMilestone;

                return (
                  <motion.div
                    key={i}
                    style={{
                      width: `${widthPct}%`,
                      flexShrink: 0,
                      minWidth: 4,
                      borderRadius: 3,
                      background: isFilled
                        ? BRAND_GREEN
                        : "rgba(255,255,255,0.08)",
                    }}
                    animate={
                      isFilled
                        ? {
                            background: BRAND_GREEN,
                            boxShadow: isActive
                              ? "0 0 10px 2px rgba(52,211,153,0.45)"
                              : "none",
                          }
                        : {
                            background: "rgba(255,255,255,0.08)",
                            boxShadow: "none",
                          }
                    }
                    transition={{
                      duration: prefersReduced ? 0 : 0.4,
                      ease: [0.22, 1, 0.36, 1],
                      delay: prefersReduced ? 0 : isFilled ? i * 0.04 : 0,
                    }}
                    aria-label={`${m.category}: ${m.amountLabel}`}
                  />
                );
              })}
            </div>

            {/* Segment labels below bar (desktop only) */}
            <div
              className="hidden lg:flex w-full gap-[2px] mt-1.5"
              aria-hidden="true"
            >
              {MILESTONES.map((m, i) => {
                const widthPct = (m.rawValueM / TOTAL_M) * 100;
                const isActive = i === activeMilestone;
                const isPast = i < activeMilestone;

                return (
                  <div
                    key={i}
                    style={{
                      width: `${widthPct}%`,
                      flexShrink: 0,
                      minWidth: 4,
                    }}
                    className="overflow-hidden"
                  >
                    <p
                      className="text-[9px] font-semibold tracking-wide truncate transition-colors duration-300"
                      style={{
                        color: isActive
                          ? BRAND_GREEN
                          : isPast
                            ? "rgba(52,211,153,0.4)"
                            : "rgba(255,255,255,0.18)",
                      }}
                    >
                      {m.amountLabel}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
