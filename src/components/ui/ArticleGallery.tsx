"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export interface ArticleGalleryImage {
  src: string | StaticImageData;
  alt: string;
}

export interface ArticleGalleryProps {
  images: ArticleGalleryImage[];
}

const AUTOPLAY_MS = 4500;

/**
 * ArticleGallery — full-bleed (wider-than-text) center-focused image carousel
 * for article pages. All photos render at the same size, flush against each
 * other with no gap; the active photo is at full opacity while adjacent
 * photos are dimmed — clicking one slides it into focus. Auto-plays
 * continuously, pausing on hover and via an explicit pause/play toggle next
 * to the dot indicators (styling matches the Option B homepage hero).
 */
export function ArticleGallery({ images }: ArticleGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });
  const [selected, setSelected] = useState(0);
  const [progress, setProgress] = useState(0);
  /** Hover-driven transient pause. */
  const [hoverPaused, setHoverPaused] = useState(false);
  /** Explicit user toggle via the pause/play button (sticky). */
  const [userPaused, setUserPaused] = useState(false);
  const paused = hoverPaused || userPaused;

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setProgress(0);
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  /* ── Autoplay + progress ticker (drives the active dot's fill) ── */
  useEffect(() => {
    if (!emblaApi || paused || images.length <= 1) return;

    const TICK_MS = 50;
    const totalTicks = AUTOPLAY_MS / TICK_MS;
    let ticks = 0;

    const progressTimer = setInterval(() => {
      ticks++;
      setProgress(ticks / totalTicks);
    }, TICK_MS);

    const advanceTimer = setInterval(() => {
      ticks = 0;
      setProgress(0);
      emblaApi.scrollNext();
    }, AUTOPLAY_MS);

    return () => {
      clearInterval(progressTimer);
      clearInterval(advanceTimer);
    };
  }, [emblaApi, paused, images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className="not-prose"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-px">
          {images.map((image, i) => {
            const isCenter = i === selected;
            return (
              <motion.div
                key={i}
                animate={{ opacity: isCenter ? 1 : 0.8 }}
                whileHover={isCenter ? undefined : { opacity: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex-[0_0_94%] sm:flex-[0_0_84%] lg:flex-[0_0_80%] aspect-[16/10]"
              >
                <button
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={isCenter ? image.alt : `View photo: ${image.alt}`}
                  className="absolute inset-0 w-full h-full overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 80vw, (min-width: 640px) 84vw, 94vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Photo indicators"
            aria-live="polite"
          >
            {images.map((_, i) => (
              <GalleryDot
                key={i}
                index={i}
                active={i === selected}
                progress={i === selected ? progress : 0}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={userPaused}
            className="flex items-center justify-center w-5 h-5 text-usds-steel-500 hover:text-usds-steel-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded-full"
          >
            {userPaused ? (
              <Play
                className="w-3.5 h-3.5"
                fill="currentColor"
                stroke="none"
                aria-hidden="true"
              />
            ) : (
              /* Custom pause: chunkier bars, wider gap, 2px rounded corners —
                 matches the Option B homepage hero's pause icon */
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="5" y="4" width="5" height="16" rx="2" />
                <rect x="14" y="4" width="5" height="16" rx="2" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

/** Progress-filling pill dot — mirrors the Option B homepage hero's PillDot,
 * adapted to the light steel palette used on article pages. */
function GalleryDot({
  active,
  index,
  onClick,
  progress,
}: {
  active: boolean;
  index: number;
  onClick: () => void;
  /** 0→1 fill progress for the active dot (drives the inner progress bar) */
  progress: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-label={`Photo ${index + 1}`}
      onClick={onClick}
      className="relative flex items-center justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded-full overflow-hidden"
      style={{
        width: active ? 32 : 10,
        height: 10,
        background: active ? "rgba(28,31,34,0.12)" : "rgba(28,31,34,0.18)",
        borderRadius: 9999,
        transition: "width 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s",
      }}
    >
      {active && (
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full bg-usds-steel-700"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0, ease: "linear" }}
        />
      )}
    </button>
  );
}
