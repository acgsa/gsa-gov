"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const TARGET = 8_432_157_284;
const DURATION = 2200; // ms — eases in then rests

/** Cubic ease-out: fast start, decelerates to rest */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Format as $X,XXX,XXX,XXX */
function formatDollars(n: number): string {
  return "$" + Math.floor(n).toLocaleString("en-US");
}

/**
 * SavingsOdometer — hero-scale number that counts up from $0 to the target
 * with a cubic ease-out curve, then rests. Replaces the per-tick odometer
 * with a single smooth entrance animation.
 */
export function SavingsOdometer() {
  const [display, setDisplay] = useState(formatDollars(0));
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      hasRun.current = true;
      const id = requestAnimationFrame(() => setDisplay(formatDollars(TARGET)));
      return () => cancelAnimationFrame(id);
    }

    hasRun.current = true;

    const tick = (now: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = easeOut(progress);
      setDisplay(formatDollars(TARGET * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(formatDollars(TARGET));
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView]);

  return (
    <div ref={containerRef}>
      <p
        className="font-garamond font-semibold text-gsa-savings tabular-nums leading-none"
        style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
        aria-label={`${formatDollars(TARGET)} in taxpayer savings`}
      >
        {display}
      </p>
    </div>
  );
}
