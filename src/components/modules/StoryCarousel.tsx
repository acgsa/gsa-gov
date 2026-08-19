"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoryCard, type StoryCardProps } from "@/components/ui/StoryCard";

export interface StoryCarouselProps {
  /** Heading displayed above the carousel, e.g. "Securing the Mission" */
  sectionTitle: string;
  cards: StoryCardProps[];
  /** When true renders against a dark background */
  darkMode?: boolean;
}

/**
 * StoryCarousel — horizontal scrolling card carousel.
 *
 * Accepts static props for Phase 1; Payload CMS data flows in via
 * the StoryCarouselBlock (src/blocks/StoryCarouselBlock.ts) in Phase 2.
 */
export function StoryCarousel({
  sectionTitle,
  cards,
  darkMode = false,
}: StoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    dragFree: true,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Register event listeners; initial sync done via emblaApi deps
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    // Defer the initial sync so it does not run synchronously in the effect body
    const raf = requestAnimationFrame(() => updateButtons());
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className={`py-12 overflow-hidden ${darkMode ? "bg-transparent" : "bg-white"}`}
      aria-label={sectionTitle}
    >
      {/* Section eyebrow */}
      <div className="pl-[max(2rem,calc(50vw-42rem))] pr-4 mb-3 flex items-center justify-between">
        <h2
          className={`text-[12px] font-semibold tracking-[0.14em] uppercase h-7 flex items-center ${
            darkMode ? "text-white/40" : "text-usds-steel-600"
          }`}
        >
          {sectionTitle}
        </h2>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Previous"
            className={`disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded ${
              darkMode
                ? "text-white/70 hover:text-white"
                : "text-usds-steel-700 hover:text-usds-steel-900"
            }`}
          >
            <ChevronLeft className="w-7 h-7" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Next"
            className={`disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded ${
              darkMode
                ? "text-white/70 hover:text-white"
                : "text-usds-steel-700 hover:text-usds-steel-900"
            }`}
          >
            <ChevronRight className="w-7 h-7" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <ul
          className="flex gap-2 pl-[max(2rem,calc(50vw-42rem))] pr-8"
          role="list"
        >
          {cards.map((card, i) => (
            <li
              key={i}
              className="flex-none w-[80vw] sm:w-[44vw] lg:w-[calc(28.571%-6px)]"
            >
              <StoryCard {...card} darkMode={darkMode} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
