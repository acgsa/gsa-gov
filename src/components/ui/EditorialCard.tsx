import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface EditorialCardNav {
  current: number; // 0-based
  total: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export interface EditorialCardProps {
  src: string | StaticImageData;
  alt: string;
  /** Small eyebrow label above the headline — no longer rendered by EditorialCarousel; kept optional for legacy compatibility */
  label?: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  /** Optional section heading rendered at the top of the text panel */
  sectionTitle?: string;
  /** Navigation controls — injected by EditorialCarousel */
  nav?: EditorialCardNav;
}

export function EditorialCard({
  src,
  alt,
  label,
  body,
  ctaText,
  ctaHref,
  sectionTitle,
  nav,
}: EditorialCardProps) {
  return (
    <article className="flex flex-col lg:flex-row items-stretch w-full">
      {/* ── Image — left 65% ── */}
      <div className="relative w-full lg:w-[65%] aspect-[3/2] lg:aspect-auto lg:min-h-[460px] flex-shrink-0 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 65vw"
          priority
        />
      </div>

      {/* ── Text panel — right 35% ── */}
      <div className="flex flex-col lg:w-[35%] px-8 lg:px-12 xl:px-16 py-10 lg:py-12 bg-usds-steel-100">
        {/* Section heading — only shown when passed in */}
        {sectionTitle && (
          <h2 className="font-garamond text-usds-steel-900 text-3xl font-semibold leading-tight mb-6">
            {sectionTitle}
          </h2>
        )}

        {/* Eyebrow */}
        <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-3">
          {label}
        </p>

        {/* Body copy — regular Geist body style */}
        <p className="font-geist text-usds-steel-800 text-base leading-relaxed mb-5">
          {body}
        </p>

        {/* CTA */}
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 text-sm text-usds-steel-700 hover:text-usds-steel-900 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
        >
          <span>{ctaText}</span>
          <MoveRight
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          />
        </Link>

        {/* ── Navigation — counter + chevrons ── */}
        {nav && (
          <div className="flex items-center gap-3 mt-auto pt-8">
            {/* Slide counter */}
            <span className="text-[11px] tabular-nums text-usds-steel-400 tracking-wide select-none">
              {nav.current + 1}
              <span className="mx-1 text-usds-steel-300">/</span>
              {nav.total}
            </span>

            <div className="flex items-center gap-1 ml-1">
              <button
                type="button"
                onClick={nav.onPrev}
                disabled={!nav.canPrev}
                aria-label="Previous slide"
                className="text-usds-steel-400 hover:text-usds-steel-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={nav.onNext}
                disabled={!nav.canNext}
                aria-label="Next slide"
                className="text-usds-steel-400 hover:text-usds-steel-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
