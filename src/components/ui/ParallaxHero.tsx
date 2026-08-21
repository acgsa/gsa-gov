"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import gsaSeal from "@/assets/logo/GSA_Seal_Updated_2026.svg";

export interface ParallaxHeroProps {
  /** Image source. When omitted the hero renders the GSA seal on a Steel background. */
  src?: string | StaticImageData;
  alt?: string;
  /** Marks the image as the LCP element */
  priority?: boolean;
}

/**
 * ParallaxHero — full-width article hero with a subtle scroll parallax.
 *
 * The image is oversized (120% height) inside an overflow-hidden band and
 * drifts upward as the reader scrolls past. The raw scroll-linked transform
 * is smoothed through a spring so the drift feels fluid rather than jumpy,
 * and the offset range spans the hero's full time in the viewport (not just
 * the brief window as it leaves the top) for a longer, gentler motion.
 * Disabled entirely under prefers-reduced-motion.
 *
 * When `src` is absent the hero renders the GSA seal centred on a Steel
 * background — consistent with the press-release card placeholder treatment.
 */
export function ParallaxHero({
  src,
  alt = "",
  priority = false,
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y = useSpring(rawY, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[21/9] max-h-[440px] overflow-hidden bg-usds-steel-700"
    >
      {src ? (
        <motion.div
          style={prefersReducedMotion ? undefined : { y }}
          className="absolute inset-x-0 -top-[10%] h-[120%]"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-usds-steel-200">
          <Image
            src={gsaSeal}
            alt="GSA seal"
            width={160}
            height={160}
            priority={priority}
            className="opacity-90"
          />
        </div>
      )}
    </div>
  );
}
