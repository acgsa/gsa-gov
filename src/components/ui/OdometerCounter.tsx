"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Match text-sm (14px) so digits sit inline with surrounding ticker text
const DIGIT_H = 14;

/** A single rolling digit column (0–9 strip) */
function RollingDigit({ digit }: { digit: number }) {
  return (
    // position:relative is REQUIRED — without it the absolute child escapes
    // overflow:hidden and bleeds into adjacent rows (the bug in the screenshot)
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        height: DIGIT_H,
        width: "0.6em",
        position: "relative",
      }}
    >
      <motion.span
        animate={{ y: -digit * DIGIT_H }}
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
              height: DIGIT_H,
              lineHeight: `${DIGIT_H}px`,
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
  initialValue?: number;
  incrementPerTick?: number;
  tickInterval?: number;
}

export function OdometerCounter({
  initialValue = 8_432_157_284,
  incrementPerTick = 73,
  tickInterval = 180,
}: OdometerCounterProps) {
  const [value, setValue] = useState(initialValue);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    const id = setInterval(() => {
      setValue((n) => n + incrementPerTick + Math.floor(Math.random() * 50));
    }, tickInterval);
    return () => clearInterval(id);
  }, [incrementPerTick, tickInterval]);

  const formatted = value.toLocaleString("en-US");
  const chars = formatted.split("");

  return (
    <span
      className="inline-flex items-end font-mono text-gsa-savings font-bold tabular text-sm"
      style={{ lineHeight: `${DIGIT_H}px` }}
      aria-label={`Taxpayer savings: ${formatted} dollars`}
    >
      <span>$</span>
      {chars.map((char, i) =>
        /\d/.test(char) ? (
          <RollingDigit key={i} digit={parseInt(char, 10)} />
        ) : (
          <span
            key={i}
            className="text-gsa-savings/50"
            style={{ margin: "0 1px" }}
          >
            {char}
          </span>
        ),
      )}
    </span>
  );
}
