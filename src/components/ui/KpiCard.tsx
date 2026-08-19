"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface KpiCardProps {
  /** Short category label, e.g. "Real Estate" */
  eyebrow: string;
  /** Large headline metric — supports numeric string like "34" or prefixed like "$89M" */
  metric: string;
  /** Unit or description that follows the metric, e.g. "properties disposed" */
  metricLabel: string;
  /** One-sentence supporting body copy */
  body: string;
  /** CTA link text */
  ctaText: string;
  /** CTA destination */
  ctaHref: string;
}

/**
 * Extracts a numeric value from a metric string like "34%", "$89M", "3.4M".
 * Returns null if no numeric component found.
 */
function parseMetricNumber(metric: string): number | null {
  const match = metric.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

/**
 * Formats a number back into the original metric string pattern.
 * e.g. 34 → "34%" or 89 → "$89M"
 */
function formatMetric(metric: string, value: number): string {
  return metric.replace(/[\d.]+/, () => {
    const original = metric.match(/[\d.]+/)?.[0] ?? "0";
    const decimals = original.includes(".") ? original.split(".")[1].length : 0;
    return value.toFixed(decimals);
  });
}

/** One-shot count-up that starts when `trigger` becomes true */
function useCountUp(target: number, trigger: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Expo ease-out: fast start, very gentle settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(eased * target);
      if (t < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);

  return value;
}

/**
 * KpiCard — a reusable line-of-business metric card.
 *
 * Fades + slides up when scrolled into view; metric counts up once visible.
 */
export function KpiCard({
  eyebrow,
  metric,
  metricLabel,
  body,
  ctaText,
  ctaHref,
}: KpiCardProps) {
  const ref = useRef<HTMLElement>(null);
  // Fire only once the card is well within the viewport: require 30% of the
  // card to be visible AND pull the trigger line up from the bottom edge by
  // 15%. Without this the reveal/count-up starts while the card is still
  // below the fold, so it appears "already animated" by the time it scrolls
  // into view.
  const inView = useInView(ref, {
    once: true,
    amount: 0.3,
    margin: "0px 0px -15% 0px",
  });

  const numericTarget = parseMetricNumber(metric);
  const animatedValue = useCountUp(numericTarget ?? 0, inView);

  const displayMetric =
    numericTarget !== null ? formatMetric(metric, animatedValue) : metric;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4 py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Eyebrow */}
      <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-usds-steel-500">
        {eyebrow}
      </p>

      {/* Metric + label */}
      <div className="flex flex-col gap-1">
        <p
          className="font-garamond text-[80px] leading-none font-semibold text-usds-steel-900 tracking-tight tabular-nums"
          aria-label={metric}
        >
          {displayMetric}
        </p>
        <p className="text-[14px] font-medium text-usds-steel-600 leading-snug">
          {metricLabel}
        </p>
      </div>

      {/* Body */}
      <p className="text-[14px] text-usds-steel-600 leading-relaxed flex-1">
        {body}
      </p>

      {/* CTA */}
      <Link
        href={ctaHref}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-usds-steel-700 hover:text-usds-steel-900 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
      >
        <span>{ctaText}</span>
        <MoveRight
          className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
          aria-hidden="true"
        />
      </Link>
    </motion.article>
  );
}
