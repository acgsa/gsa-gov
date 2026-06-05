"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image, { type StaticImageData } from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

// ── Placeholder video thumbnails using images from src/assets/images/ED/ ────
import thumb1 from "@/assets/images/ED/G-FslWVWsAAxY2H.jpeg";
import thumb2 from "@/assets/images/ED/G-o6YxlX0AAJPD1.jpg";
import thumb3 from "@/assets/images/ED/G_MdgwuXQAEOB1l.jpg";
import thumb4 from "@/assets/images/ED/HBDzzIAWsAAXBxn.jpg";
import thumb5 from "@/assets/images/ED/HE5VkOIXcAAkyxH.jpg";

interface VideoItem {
  thumbnail: StaticImageData;
  caption: string;
  /** Placeholder — real URL wired in when Payload is integrated */
  videoUrl?: string;
}

const videos: VideoItem[] = [
  {
    thumbnail: thumb1,
    caption:
      "WATCH: GSA Sells Underutilized Federal Property in Washington, D.C.",
  },
  {
    thumbnail: thumb2,
    caption: "WATCH: From Vacant to Vibrant — Federal Real Estate Reform",
  },
  {
    thumbnail: thumb3,
    caption: "WATCH: Task Force Update — Fortifying the Federal Footprint",
  },
  {
    thumbnail: thumb4,
    caption: "WATCH: GSA Administrator Addresses Federal Workforce",
  },
  {
    thumbnail: thumb5,
    caption: "WATCH: New GSA Initiatives for Taxpayer Savings",
  },
];

export function VideoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
  });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(videos.length);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("init", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("init", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className="py-10 bg-white overflow-hidden"
      aria-label="Watch videos"
    >
      {/* ── Section label ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
          Watch
        </p>
      </div>

      {/* ── Embla viewport — intentionally wider than container for peeking ── */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 px-[max(1rem,calc(50%-26rem))]">
          {videos.map((video, i) => {
            const isCenter = i === selected;
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isCenter ? 1 : 0.88,
                  opacity: isCenter ? 1 : 0.5,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-none w-[72vw] sm:w-[48vw] lg:w-[36vw] max-w-[520px]"
              >
                <button
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={
                    isCenter
                      ? `Play: ${video.caption}`
                      : `Go to video: ${video.caption}`
                  }
                  className="relative w-full aspect-video rounded-sm overflow-hidden block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue"
                >
                  <Image
                    src={video.thumbnail}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 48vw, 36vw"
                  />

                  {/* Play button — only on centre card */}
                  {isCenter && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/25"
                    >
                      <div className="w-16 h-16 rounded-full border-[3px] border-white flex items-center justify-center bg-black/35 backdrop-blur-[2px] group-hover:scale-110 transition-transform duration-200">
                        <Play
                          className="w-7 h-7 text-white ml-0.5"
                          fill="white"
                          aria-hidden="true"
                        />
                      </div>
                    </motion.div>
                  )}
                </button>

                {/* Caption — only under centre card */}
                {isCenter && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-3 text-sm text-gray-600 text-center font-medium leading-snug px-2"
                  >
                    {video.caption}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div
        className="flex justify-center gap-2 mt-6"
        role="tablist"
        aria-label="Video indicators"
      >
        {Array.from({ length: snapCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            role="tab"
            aria-selected={i === selected}
            aria-label={`Video ${i + 1}`}
            className={[
              "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue",
              i === selected
                ? "w-5 h-2 bg-gray-700"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-500",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
