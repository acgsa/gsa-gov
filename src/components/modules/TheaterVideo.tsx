"use client";

import { useEffect, useRef } from "react";
import { Radio } from "lucide-react";

export interface TheaterVideoProps {
  /**
   * YouTube embed URL (e.g. https://www.youtube.com/embed/LIVE_STREAM_ID)
   * or a direct video src path served from /public.
   * When the value ends with a recognized video extension (.mp4, .webm, .ogg,
   * .mov) it is rendered as a native <video> element; otherwise it is embedded
   * in an <iframe> (suitable for YouTube / Vimeo live streams).
   */
  src: string;
  /** Accessible title for the iframe / video */
  title: string;
  /** Optional poster image path (native video only) */
  posterSrc?: string;
  /** Whether to show the animated "LIVE" badge. Defaults to true. */
  showLiveBadge?: boolean;
  /** Caption displayed below the video. */
  caption?: string;
}

const NATIVE_EXTS = /\.(mp4|webm|ogg|mov)$/i;

/**
 * TheaterVideo — a full-width "theater-mode" video block intended to sit at
 * the top of an article page.  The player fills the content column at a
 * cinematic 16:9 aspect ratio with a dark surround, giving a focused,
 * distraction-free viewing experience.
 *
 * Accessibility: the live badge uses `aria-live="polite"` and the player has
 * a descriptive title / aria-label so screen-reader users understand the
 * content.  The pulsing indicator is `aria-hidden` to avoid noise.
 */
export function TheaterVideo({
  src,
  title,
  posterSrc,
  showLiveBadge = true,
  caption,
}: TheaterVideoProps) {
  const isNative = NATIVE_EXTS.test(src);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enforce mute imperatively — some browsers ignore the HTML attribute.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  return (
    <figure className="w-full bg-black" aria-label={title}>
      {/* ── Theater wrapper ── */}
      <div className="relative w-full aspect-video bg-black">
        {isNative ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain"
            src={src}
            poster={posterSrc}
            controls
            playsInline
            preload="metadata"
            aria-label={title}
          />
        ) : (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        )}

        {/* ── Live badge (top-left overlay) ── */}
        {showLiveBadge && (
          <div
            className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded px-2.5 py-1 pointer-events-none"
            aria-live="polite"
            aria-label="Live broadcast"
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <Radio className="w-3.5 h-3.5 text-white/90" aria-hidden />
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/90 select-none">
              Live
            </span>
          </div>
        )}
      </div>

      {/* ── Caption ── */}
      {caption && (
        <figcaption className="bg-black px-4 py-3 text-[13px] leading-relaxed text-white/55 border-t border-white/10">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
