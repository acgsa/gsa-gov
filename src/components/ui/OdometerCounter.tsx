"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** A single rolling digit column (0–9 strip) */
function RollingDigit({ digit }: { digit: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: "1.2em",
        width: "0.62em",
        position: "relative",
      }}
    >
      <motion.span
        animate={{ y: `${-digit * 1.2}em` }}
        initial={false}
        transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span
            key={d}
            style={{
              height: "1.2em",
              lineHeight: "1.2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

interface OdometerCounterProps {
  /** Fixed starting value the counter begins at on every load. */
  initialValue?: number;
  /** Ceiling the counter climbs toward and stops at. */
  targetValue?: number;
  /** Small increment added each tick so only the lower digits move. */
  incrementPerTick?: number;
  tickInterval?: number;
}

export function OdometerCounter({
  initialValue = 59_728_590_021,
  targetValue = 60_000_000_000,
  incrementPerTick = 500,
  tickInterval = 1200,
}: OdometerCounterProps) {
  // Deterministic fixed start so SSR and the first client render agree
  // (no hydration mismatch) and the number is the same on every load.
  const [value, setValue] = useState(Math.min(initialValue, targetValue));
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    const id = setInterval(() => {
      setValue((n) => {
        // Slow, steady climb via a small fixed step so only the lower digits
        // move. Stops at the target and does not exceed it.
        if (n >= targetValue) return targetValue;
        const next =
          n + incrementPerTick + Math.floor(Math.random() * incrementPerTick);
        return next >= targetValue ? targetValue : next;
      });
    }, tickInterval);
    return () => clearInterval(id);
  }, [incrementPerTick, tickInterval, targetValue]);

  const formatted = value.toLocaleString("en-US");
  const chars = formatted.split("");

  return (
    <span
      className="inline-flex items-center font-mono text-gsa-savings font-bold tabular text-sm"
      aria-label={`Taxpayer savings: ${formatted} dollars`}
    >
      <span>$</span>
      {chars.map((char, i) =>
        /\d/.test(char) ? (
          <RollingDigit key={i} digit={parseInt(char, 10)} />
        ) : (
          <span key={i} style={{ margin: "0 1px" }}>
            {char}
          </span>
        ),
      )}
    </span>
  );
}
