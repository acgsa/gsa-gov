"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds — use to cascade a sequence of reveals */
  delay?: number;
  /** Distance (px) the element travels up as it fades in */
  y?: number;
  /** Wrapper element tag — defaults to div */
  as?: "div" | "li" | "section" | "article";
  className?: string;
}

/**
 * Reveal — lightweight scroll-triggered fade/rise wrapper.
 * Fires once when the element enters the viewport. Fully disabled
 * (renders instantly, no transform) when the user prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag =
    as === "li"
      ? motion.li
      : as === "section"
        ? motion.section
        : as === "article"
          ? motion.article
          : motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
