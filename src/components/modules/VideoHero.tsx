"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

export interface VideoHeroProps {
  /** Section eyebrow label */
  section: string;
  /** Display headline */
  title: string;
  /** Supporting intro paragraph */
  intro: string;
  /** Path to the video source (served from /public) */
  videoSrc: string;
  /** Optional poster image path */
  posterSrc?: string;
  /** Accessible description of the video content */
  ariaLabel?: string;
}

/**
 * VideoHero — full-bleed autoplaying background video with an editorial
 * headline overlay. The video is muted, looped, and plays inline so it can
 * autoplay across browsers. A dark gradient guarantees text contrast
 * (WCAG 2.1 AA) and `aria-label` describes the decorative footage.
 */
export function VideoHero({
  section,
  title,
  intro,
  videoSrc,
  posterSrc,
  ariaLabel = "",
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The `muted` HTML attribute is not always honored by browsers at runtime
  // (a known quirk), so we also enforce muting imperatively on mount to
  // guarantee the autoplaying background video never emits sound.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  return (
    <header className="relative bg-gsa-navy text-white overflow-hidden">
      {/* ── Background video ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={ariaLabel}
      />

      {/* ── Contrast gradient overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,17,28,0.92) 0%, rgba(0,17,28,0.55) 45%, rgba(0,17,28,0.35) 100%)",
        }}
      />

      {/* ── Headline overlay ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[70svh] lg:min-h-[80svh] flex-col justify-end pt-32 pb-16 lg:pb-24">
          <div className="max-w-2xl">
            <Reveal y={16}>
              <p className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.18em] uppercase text-white/70 mb-6">
                <span
                  aria-hidden
                  className="inline-block h-[2px] w-8 rounded-full bg-white/70"
                />
                {section}
              </p>
            </Reveal>
            <Reveal y={22} delay={0.05}>
              <h1 className="font-geist text-white text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.02em] mb-6">
                {title}
              </h1>
            </Reveal>
            <Reveal y={22} delay={0.12}>
              <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                {intro}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </header>
  );
}
