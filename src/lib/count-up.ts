import { useEffect, useRef, useState } from "react";

/**
 * Extracts the numeric component from a metric string like "34%", "$89M",
 * "3.4M", or "8,600+". Returns null if no numeric component is found.
 */
export function parseMetricNumber(metric: string): number | null {
  const match = metric.match(/\d[\d,]*(?:\.\d+)?/);
  return match ? parseFloat(match[0].replace(/,/g, "")) : null;
}

/**
 * Formats a number back into the original metric string pattern, preserving
 * prefix/suffix ("$", "%", "+", "M") and comma grouping.
 * e.g. formatMetric("$89M", 42) → "$42M"; formatMetric("8,600+", 4211) → "4,211+"
 */
export function formatMetric(metric: string, value: number): string {
  const match = metric.match(/\d[\d,]*(?:\.\d+)?/);
  if (!match) return metric;
  const original = match[0];
  const decimals = original.includes(".") ? original.split(".")[1].length : 0;
  const formatted = original.includes(",")
    ? Math.round(value).toLocaleString("en-US")
    : value.toFixed(decimals);
  return metric.replace(original, formatted);
}

/** One-shot count-up that starts when `trigger` becomes true */
export function useCountUp(target: number, trigger: boolean, duration = 1800) {
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
