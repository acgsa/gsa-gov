"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ── Placeholder slides using images from src/assets/images/ED/ ──────────────
import slide1 from "@/assets/images/ED/Edited-4669.jpg";
import slide2 from "@/assets/images/ED/Edited-4794.jpg";
import slide3 from "@/assets/images/ED/03252026 - GSA NCR Press Conference-10-Slide1.jpg";

interface HeroSlide {
  image: StaticImageData;
  title: string;
  subtitle?: string;
}

const slides: HeroSlide[] = [
  {
    image: slide1,
    title: "FORTIFYING THE\nFEDERAL FOOTPRINT",
  },
  {
    image: slide2,
    title: "BUILDING A BETTER\nGOVERNMENT",
    subtitle: "GSA is modernizing America's federal real estate portfolio",
  },
  {
    image: slide3,
    title: "FROM VACANT\nTO VIBRANT",
    subtitle:
      "Transforming underutilized federal properties for the American people",
  },
];

/** Dot indicator button */
function DotButton({
  active,
  onClick,
  index,
}: {
  active: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Go to slide ${index + 1}`}
      className={[
        "w-2.5 h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        active ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70",
      ].join(" ")}
    />
  );
}

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className="relative overflow-hidden bg-gsa-navy"
      style={{ height: "clamp(340px, 62vh, 680px)" }}
      aria-label="Featured news carousel"
      aria-roledescription="carousel"
    >
      {/* ── Embla viewport ── */}
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full" aria-live="polite">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex-none w-full h-full relative"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${slides.length}`}
            >
              <Image
                src={slide.image}
                alt={slide.title.replace("\n", " ")}
                fill
                className="object-cover object-top"
                priority={i === 0}
                sizes="100vw"
              />

              {/* Gradient overlay: bottom-heavy for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

              {/* ── Slide text ── */}
              <AnimatePresence>
                {selected === i && (
                  <motion.div
                    key={`text-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center px-6 text-center"
                  >
                    <div className="max-w-3xl">
                      <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-line drop-shadow-lg tracking-tight">
                        {slide.title}
                      </h1>
                      {slide.subtitle && (
                        <p className="mt-4 text-white/80 text-base sm:text-lg font-medium drop-shadow">
                          {slide.subtitle}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/55 text-white flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/55 text-white flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* ── Dot indicators ── */}
      <div
        className="absolute bottom-5 left-0 right-0 flex justify-center gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {slides.map((_, i) => (
          <DotButton
            key={i}
            index={i}
            active={i === selected}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
