import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { MoveRight } from "lucide-react";
import type { StoryCardProps } from "@/components/ui/StoryCard";

export interface NewsGridProps {
  /** Section eyebrow, e.g. "GSA IN THE NEWS" */
  sectionTitle: string;
  /**
   * Story cards for the grid. The first two render as large "lead" cards on
   * the top row; the next three render as smaller cards beneath. Additional
   * cards beyond the first five are ignored.
   */
  cards: StoryCardProps[];
}

/** Large lead card — 16:9 image, larger headline. */
function LeadCard({ src, alt, headline, ctaText, ctaHref }: StoryCardProps) {
  return (
    <Link
      href={ctaHref}
      aria-label={headline}
      className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
    >
      <div className="relative aspect-video w-full overflow-hidden mb-4">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 42vw"
        />
      </div>
      <h3 className="font-garamond font-semibold text-usds-steel-800 group-hover:text-usds-steel-900 transition-colors duration-200 text-xl lg:text-2xl leading-snug mb-3">
        {headline}
      </h3>
      <span className="inline-flex items-center gap-1 text-sm text-usds-steel-700 group-hover:text-usds-steel-900 transition-colors duration-200">
        <span>{ctaText}</span>
        <MoveRight
          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

/** Smaller secondary card — tighter image, compact headline. */
function SmallCard({ src, alt, headline, ctaText, ctaHref }: StoryCardProps) {
  return (
    <Link
      href={ctaHref}
      aria-label={headline}
      className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden mb-3">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 27vw"
        />
      </div>
      <h3 className="font-semibold text-usds-steel-700 group-hover:text-usds-steel-900 transition-colors duration-200 text-[15px] leading-snug mb-2">
        {headline}
      </h3>
      <span className="inline-flex items-center gap-1 text-[13px] text-usds-steel-700 group-hover:text-usds-steel-900 transition-colors duration-200 mt-auto">
        <span>{ctaText}</span>
        <MoveRight
          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

/**
 * NewsGrid — a static editorial grid module.
 *
 * Layout:
 *   Top row    → 2 large lead story cards
 *   Bottom row → 3 smaller secondary story cards
 *
 * Candidate replacement for the paired FeatureCarousel + StoryCarousel at the
 * top of the homepage. Consumes the same StoryCardProps content shape.
 */
export function NewsGrid({ sectionTitle, cards }: NewsGridProps) {
  const leads = cards.slice(0, 2);
  const secondary = cards.slice(2, 5);

  return (
    <section className="py-12 bg-white" aria-label={sectionTitle}>
      <div className="mx-auto max-w-[84rem] px-8">
        <div className="group/heading flex items-baseline gap-3 mb-6">
          <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600">
            {sectionTitle}
          </h2>
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-700 opacity-0 -translate-x-1 transition-all duration-200 group-hover/heading:opacity-100 group-hover/heading:translate-x-0 hover:text-usds-steel-900 focus-visible:opacity-100 focus-visible:translate-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
          >
            <span>See all</span>
            <MoveRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Top row — 2 large lead cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {leads.map((card, i) => (
            <LeadCard key={`lead-${i}`} {...card} />
          ))}
        </div>

        {/* Bottom row — 3 smaller cards */}
        {secondary.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-usds-steel-200">
            {secondary.map((card, i) => (
              <SmallCard key={`small-${i}`} {...card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
