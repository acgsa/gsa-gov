import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { CategoryFeaturedStory } from "@/templates/categoryAccents";

export interface CategoryFeaturedProps {
  section: string;
  featured: CategoryFeaturedStory[];
  /** Retained for API compatibility — no longer affects visual styling */
  accent?: string;
}

/**
 * CategoryFeatured — "{Section} in the News" editorial rail.
 *
 * Layout mirrors the homepage NewsGrid aesthetic:
 *   Left  → large lead card (16:9 image, Garamond headline, Steel text)
 *   Right → stacked compact cards with small thumbnail + headline
 *
 * All interactive colors use Steel; the single blue-500 site accent is used
 * only for the eyebrow rule and CTA arrow.
 */
export function CategoryFeatured({ section, featured }: CategoryFeaturedProps) {
  const [lead, ...rest] = featured;

  return (
    <section aria-labelledby="news-heading" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* ── Section eyebrow ── */}
        <Reveal y={16}>
          <h2
            id="news-heading"
            className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-10"
          >
            {section} in the News
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-start">
          {/* ── Lead story — large card matching homepage LeadCard ── */}
          {lead && (
            <Reveal className="group">
              <Link
                href={lead.ctaHref}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
              >
                <div className="relative aspect-video w-full overflow-hidden mb-4">
                  <Image
                    src={lead.src}
                    alt={lead.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {lead.eyebrow && (
                  <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-3">
                    {lead.eyebrow}
                  </p>
                )}
                <h3 className="font-garamond font-semibold text-usds-steel-800 group-hover:text-usds-steel-900 transition-colors duration-200 text-xl lg:text-2xl leading-snug mb-3">
                  {lead.headline}
                </h3>
                <span className="inline-flex items-center gap-1 text-sm text-usds-steel-700 group-hover:text-usds-steel-900 transition-colors duration-200">
                  <span>{lead.ctaText}</span>
                  <MoveRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          )}

          {/* ── Secondary stories — compact cards with thumbnail + headline ── */}
          {rest.length > 0 && (
            <ul role="list" className="divide-y divide-usds-steel-200">
              {rest.map((story, i) => (
                <Reveal as="li" key={story.ctaHref} delay={0.05 * i}>
                  <Link
                    href={story.ctaHref}
                    className="group flex items-start gap-4 py-6 first:pt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
                  >
                    <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={story.src}
                        alt={story.alt}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="min-w-0">
                      {story.eyebrow && (
                        <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-1">
                          {story.eyebrow}
                        </p>
                      )}
                      <h4 className="font-semibold text-usds-steel-700 group-hover:text-usds-steel-900 transition-colors duration-200 text-[15px] leading-snug mb-2">
                        {story.headline}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[13px] text-usds-steel-700 group-hover:text-usds-steel-900 transition-colors duration-200 mt-auto">
                        <span>{story.ctaText}</span>
                        <MoveRight
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
