"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { FRAUD_STAGES } from "@/lib/savings-data";
import { BRAND_GREEN } from "@/lib/tokens/colors";

// ─────────────────────────────────────────────────────────────────────────────
// Parse a display figure like "$8B+", "$3.4B", "$610M" into a numeric value
// (in millions) plus the surrounding prefix/suffix so we can animate the digits
// while preserving the exact formatting the editor typed.
// ─────────────────────────────────────────────────────────────────────────────

interface ParsedFigure {
  prefix: string;
  target: number;
  decimals: number;
  unit: "B" | "M" | "";
  suffix: string;
}

function parseFigure(value: string): ParsedFigure {
  const match = value.match(/^(\D*)([\d.]+)\s*(B|M)?(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, decimals: 0, unit: "", suffix: value };
  }
  const [, prefix = "", num = "0", unit = "", suffix = ""] = match;
  const decimals = num.includes(".") ? (num.split(".")[1]?.length ?? 0) : 0;
  return {
    prefix,
    target: parseFloat(num),
    decimals,
    unit: (unit as "B" | "M") || "",
    suffix,
  };
}

interface AnimatedFigureProps {
  value: string;
  prefersReduced: boolean;
}

/** Count-up display for a single fraud-stage figure. */
function AnimatedFigure({ value, prefersReduced }: AnimatedFigureProps) {
  const parsed = parseFigure(value);
  const count = useMotionValue(parsed.target);
  const display = useTransform(
    count,
    (n) =>
      `${parsed.prefix}${n.toFixed(parsed.decimals)}${parsed.unit}${parsed.suffix}`,
  );

  useEffect(() => {
    if (prefersReduced) {
      count.set(parsed.target);
      return;
    }
    const controls = animate(count, parsed.target, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed.target, parsed.decimals, prefersReduced]);

  return <motion.span aria-hidden="true">{display}</motion.span>;
}

interface InteractiveFraudStatProps {
  prefersReduced: boolean;
}

/**
 * InteractiveFraudStat — the taxpayer-savings hero figure with three toggle
 * states (Uncovered / Stopped / Prosecuted). Only the big number and its
 * sub-caption react to the active stage. Fully keyboard-accessible via a
 * radiogroup pattern.
 */
export function InteractiveFraudStat({
  prefersReduced,
}: InteractiveFraudStatProps) {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // eslint-disable-next-line security/detect-object-injection -- active is a bounded numeric state index (0..FRAUD_STAGES.length-1)
  const stage = FRAUD_STAGES[active] ?? FRAUD_STAGES[0]!;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (active + 1) % FRAUD_STAGES.length;
      setActive(next);

      // eslint-disable-next-line security/detect-object-injection -- next is computed via modulo over FRAUD_STAGES.length, always in range
      btnRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (active - 1 + FRAUD_STAGES.length) % FRAUD_STAGES.length;
      setActive(prev);

      // eslint-disable-next-line security/detect-object-injection -- prev is computed via modulo over FRAUD_STAGES.length, always in range
      btnRefs.current[prev]?.focus();
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-center">
      <p
        className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-6"
        style={{ color: "rgba(52,211,153,0.7)" }}
      >
        Fraud, Waste &amp; Abuse
      </p>

      {/* Big animated figure */}
      <p
        className="font-garamond font-semibold tabular-nums leading-none text-white"
        style={{ fontSize: "clamp(5rem, 18vw, 12rem)" }}
        aria-live="polite"
        aria-label={`${stage.value} ${stage.label.toLowerCase()}`}
      >
        <AnimatedFigure value={stage.value} prefersReduced={prefersReduced} />
      </p>

      {/* Sub-caption */}
      <p
        className="mt-4 font-garamond max-w-xl"
        style={{
          fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {stage.caption}
      </p>

      {/* Toggle group */}
      <div
        role="radiogroup"
        aria-label="Select fraud-prevention metric"
        onKeyDown={onKeyDown}
        className="mt-8 inline-flex items-center gap-2 rounded-full p-1"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {FRAUD_STAGES.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.label}
              ref={(el) => {
                // eslint-disable-next-line security/detect-object-injection -- i is the bounded map() index over FRAUD_STAGES
                btnRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className="px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{
                background: isActive ? BRAND_GREEN : "transparent",
                color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                border: `1px solid ${isActive ? BRAND_GREEN : "transparent"}`,
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
