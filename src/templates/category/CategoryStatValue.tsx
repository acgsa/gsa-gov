"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { formatMetric, parseMetricNumber, useCountUp } from "@/lib/count-up";

/**
 * CategoryStatValue — counts a hero stat up once it scrolls into view.
 * Renders the raw string when no numeric part exists or the user prefers
 * reduced motion.
 */
export function CategoryStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const target = parseMetricNumber(value);
  const animate = target !== null && !reduceMotion;
  const animated = useCountUp(target ?? 0, inView && animate);

  return (
    <span ref={ref}>{animate ? formatMetric(value, animated) : value}</span>
  );
}
