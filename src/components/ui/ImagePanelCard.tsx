"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export interface PanelImage {
  src: string | StaticImageData;
  alt: string;
}

export interface ImagePanelCardProps {
  /** 1–5 images. The middle image is active by default. */
  images: PanelImage[];
  /** Optional eyebrow label above the title */
  eyebrow?: string;
  title: string;
  body: string;
  ctaText: string;
  ctaHref: string;
}

/**
 * ImagePanelCard — full-bleed multi-panel image strip with expandable panels.
 *
 * Clicking any panel brings it to the fore (it grows wider via flex-grow
 * animation). Text is centered below the strip.
 *
 * Phase 2: rendered from Payload via ImagePanelBlock.
 */
export function ImagePanelCard({
  images,
  eyebrow,
  title,
  body,
  ctaText,
  ctaHref,
}: ImagePanelCardProps) {
  // Default active: middle panel (or index 0 if only 1 image)
  const [active, setActive] = useState(() => Math.floor(images.length / 2));
  // Track which collapsed panel is currently hovered/focused so we can nudge
  // it wider — signalling that it is clickable/expandable.
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <article className="w-full bg-white pt-12 pb-6">
      {/* ── Full-bleed image strip ── */}
      <div
        className="flex w-full overflow-hidden"
        style={{ gap: "2px", height: "clamp(280px, 48vw, 580px)" }}
        role="group"
        aria-label="Image gallery"
      >
        {images.map((img, i) => {
          const isActive = i === active;
          // Collapsed panels get a slight width bump on hover/focus so it's
          // clear they can be clicked to expand. Active panel is unaffected.
          const isHoverExpanded = !isActive && hovered === i;
          const flexGrow = isActive ? 3 : isHoverExpanded ? 1.6 : 1;
          return (
            <motion.div
              key={i}
              animate={{ flexGrow }}
              initial={false}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative overflow-hidden flex-shrink-0"
              style={{ minWidth: 0 }}
            >
              <button
                type="button"
                className="absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gsa-blue"
                onClick={() => setActive(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered((h) => (h === i ? null : h))}
                aria-label={isActive ? img.alt : `Expand: ${img.alt}`}
                aria-pressed={isActive}
                tabIndex={0}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    isActive ? "scale-100" : "scale-[1.04] hover:scale-100"
                  }`}
                  sizes="(max-width: 768px) 80vw, 55vw"
                  priority={i === active}
                />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* ── Text below strip ── */}
      <div className="flex flex-col items-center text-center px-6 pt-4 pb-2 max-w-3xl mx-auto">
        {eyebrow && (
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-500 mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="font-semibold text-usds-steel-900 transition-colors duration-200 text-2xl leading-snug mb-0.5">
          {title}
        </h2>
        <p
          className="text-usds-steel-700 text-sm leading-relaxed line-clamp-2"
          title={body}
        >
          {body}
        </p>

        {/* Explicit link to the full article — shared CTA style */}
        <Link
          href={ctaHref}
          className="mt-3 inline-flex items-center gap-2 text-sm text-usds-steel-700 hover:text-usds-steel-900 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
        >
          <span>{ctaText}</span>
          <MoveRight
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
