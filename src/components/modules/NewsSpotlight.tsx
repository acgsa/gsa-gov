import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import type { StoryCardProps } from "@/components/ui/StoryCard";

export interface NewsSpotlightProps {
  /** Section eyebrow, e.g. "REAL ESTATE" */
  eyebrow: string;
  /** The large lead story rendered on the left */
  lead: StoryCardProps;
  /**
   * Smaller stacked stories rendered in the right column. Only the first
   * three are shown.
   */
  items: StoryCardProps[];
}

/** Large lead story — wide image with headline + CTA beneath. */
function LeadStory({ src, alt, headline, ctaText, ctaHref }: StoryCardProps) {
  return (
    <Link
      href={ctaHref}
      aria-label={headline}
      className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden mb-4">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 58vw"
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

/** Compact story row — small thumbnail left, headline + CTA right. */
function StoryRow({ src, alt, headline, ctaText, ctaHref }: StoryCardProps) {
  return (
    <Link
      href={ctaHref}
      aria-label={headline}
      className="group flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
    >
      <div className="relative aspect-[4/3] w-28 sm:w-32 flex-shrink-0 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="128px"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="font-semibold text-usds-steel-700 group-hover:text-usds-steel-900 transition-colors duration-200 text-[15px] leading-snug mb-2">
          {headline}
        </h3>
        <span className="inline-flex items-center gap-1 text-[13px] text-usds-steel-700 group-hover:text-usds-steel-900 transition-colors duration-200">
          <span>{ctaText}</span>
          <MoveRight
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

/**
 * NewsSpotlight — news module with one large story and a stacked side column.
 *
 * Layout (per the Option A homepage design):
 *   – section eyebrow at the top
 *   – left (~60%): one large lead story
 *   – right (~40%): three smaller stories stacked vertically
 *
 * Consumes the shared StoryCardProps content shape used by the other
 * story-driven modules. Static props for Phase 1; Payload CMS wiring in
 * Phase 2.
 */
export function NewsSpotlight({ eyebrow, lead, items }: NewsSpotlightProps) {
  const sideStories = items.slice(0, 3);

  return (
    <section className="py-12 bg-white" aria-label={eyebrow}>
      <div className="mx-auto max-w-[84rem] px-8">
        {/* Section eyebrow */}
        <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-6">
          {eyebrow}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left — large lead story */}
          <div className="lg:col-span-3">
            <LeadStory {...lead} />
          </div>

          {/* Right — 3 stacked smaller stories */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {sideStories.map((story, i) => (
              <StoryRow key={`side-${i}`} {...story} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
