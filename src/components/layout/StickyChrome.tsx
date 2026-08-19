"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * StickyChrome — shared background surface for the site chrome.
 * ------------------------------------------------------------
 * Renders ONE scroll-linked background + backdrop-blur layer behind the
 * topbar, nav, and ticker so all rows are the exact same color at every
 * scroll position (no seam, no per-row color mismatch).
 *
 * The child chrome components (SiteHeader, MainNav desktop nav,
 * LiveTicker) are transparent and let this surface show through.
 *
 * Background: fully opaque navy (#00111C) at the top → 0.92 translucent once
 * scrolled, at which point the 14px backdrop blur has ramped in.
 */
export function StickyChrome({
  children,
  id,
}: {
  children: ReactNode;
  /** Optional DOM id — category layouts use "site-chrome" for height measurement. */
  id?: string;
}) {
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0,17,28,1)", "rgba(0,17,28,0.92)"],
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(14px)"],
  );

  return (
    <motion.div
      id={id}
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
      className="sticky top-0 z-50"
    >
      {children}
    </motion.div>
  );
}
