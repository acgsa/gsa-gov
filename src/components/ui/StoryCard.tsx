import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { MoveRight } from "lucide-react";

export interface StoryCardProps {
  src: string | StaticImageData;
  alt: string;
  headline: string;
  ctaText: string;
  ctaHref: string;
  /** When true, renders text in white/muted-white for dark backgrounds */
  darkMode?: boolean;
}

export function StoryCard({
  src,
  alt,
  headline,
  ctaText,
  ctaHref,
  darkMode = false,
}: StoryCardProps) {
  return (
    <Link
      href={ctaHref}
      aria-label={headline}
      className="flex flex-col h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden mb-4 flex-shrink-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 44vw, 25vw"
        />
      </div>

      {/* Headline */}
      <h3
        className={`font-semibold transition-colors duration-200 text-[15px] leading-snug mb-3 pr-4 ${
          darkMode
            ? "text-white/70 group-hover:text-white"
            : "text-usds-steel-700 group-hover:text-usds-steel-900"
        }`}
      >
        {headline}
      </h3>

      {/* CTA */}
      <div
        className={`inline-flex items-center gap-1 text-sm transition-colors duration-200 mt-auto pr-4 ${
          darkMode
            ? "text-white/30 group-hover:text-white/70"
            : "text-usds-steel-700 group-hover:text-usds-steel-900"
        }`}
      >
        <span>{ctaText}</span>
        <MoveRight
          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
