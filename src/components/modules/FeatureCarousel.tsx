"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  FeatureCard,
  type FeatureCardProps,
} from "@/components/ui/FeatureCard";

export interface FeatureCarouselProps {
  sectionTitle: string;
  cards: FeatureCardProps[];
}

/**
 * FeatureCarousel — large 16:9 card carousel with prev/next arrow controls.
 * Shows ~2 cards at a time; snaps one card per click.
 *
 * Phase 2: wire to Payload via a FeatureCarouselBlock analogous to
 * src/blocks/StoryCarouselBlock.ts.
 */
export function FeatureCarousel({ sectionTitle, cards }: FeatureCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    dragFree: false,
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
    emblaApi.on("select", updateButtons);
    emblaApi.on("init", updateButtons);
    const raf = requestAnimationFrame(updateButtons);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", updateButtons);
      emblaApi.off("init", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className="py-12 bg-white overflow-hidden"
      aria-label={sectionTitle}
    >
      {/* Section eyebrow */}
      <div className="pl-[max(2rem,calc(50vw-42rem))] pr-4 mb-3 flex items-center justify-between">
        <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 h-7 flex items-center">
          {sectionTitle}
        </h2>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Previous"
            className="text-usds-steel-700 hover:text-usds-steel-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
          >
            <ChevronLeft className="w-7 h-7" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Next"
            className="text-usds-steel-700 hover:text-usds-steel-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
          >
            <ChevronRight className="w-7 h-7" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <ul
          className="flex gap-3 pl-[max(2rem,calc(50vw-42rem))] pr-8"
          role="list"
        >
          {cards.map((card, i) => (
            <li
              key={i}
              /* ~half viewport on desktop; nearly full on mobile */
              className="flex-none w-[88vw] sm:w-[60vw] lg:w-[calc(50%-14px)]"
            >
              <FeatureCard {...card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
