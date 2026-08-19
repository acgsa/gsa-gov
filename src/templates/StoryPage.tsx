import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export interface StoryPageBreadcrumb {
  label: string;
  href: string;
}

export interface StoryPageRelated {
  label: string;
  href: string;
}

export interface StoryPageProps {
  breadcrumbs?: StoryPageBreadcrumb[];
  /** Small eyebrow category label — e.g. "Real Estate" */
  label: string;
  headline: string;
  /** One-sentence deck / standfirst shown below headline */
  deck?: string;
  /** Byline — e.g. "GSA Communications" */
  byline?: string;
  /** Publication date — e.g. "June 24, 2026" */
  publishDate?: string;
  /** Hero image */
  heroSrc: string | StaticImageData;
  heroAlt: string;
  heroCaption?: string;
  /** Body as an array of paragraphs or React nodes */
  body: React.ReactNode[];
  /** Optional pull-quote — rendered inline between body paragraphs */
  pullQuote?: string;
  /** Index in `body` after which the pull-quote is inserted (default: 1) */
  pullQuoteAfter?: number;
  related?: StoryPageRelated[];
}

/**
 * StoryPage — long-form editorial story template.
 *
 * Typography rules:
 *   - Headline and body copy: Garamond (editorial voice)
 *   - Labels, eyebrows, meta, nav: system sans (Geist/Inter)
 *
 * This is the only page-level template intentionally using Garamond
 * for its primary content type (along with the homepage hero).
 */
export function StoryPage({
  breadcrumbs = [],
  label,
  headline,
  deck,
  byline,
  publishDate,
  heroSrc,
  heroAlt,
  heroCaption,
  body,
  pullQuote,
  pullQuoteAfter = 1,
  related = [],
}: StoryPageProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Breadcrumb ── */}
      {breadcrumbs.length > 0 && (
        <div className="border-b border-usds-steel-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-[13px] text-usds-steel-700">
            {breadcrumbs.map((b, i) => (
              <span key={b.href} className="flex items-center gap-2">
                <Link
                  href={b.href}
                  className="hover:text-usds-steel-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usds-steel-500 rounded"
                >
                  {b.label}
                </Link>
                {i < breadcrumbs.length - 1 && <span aria-hidden>/</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Eyebrow */}
        <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-500 mb-4">
          {label}
        </p>

        {/* Headline — Garamond */}
        <h1 className="font-garamond text-usds-steel-900 text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.06] mb-5">
          {headline}
        </h1>

        {/* Deck */}
        {deck && (
          <p className="font-garamond text-usds-steel-600 text-[1.25rem] leading-relaxed mb-6 italic">
            {deck}
          </p>
        )}

        {/* Byline + date */}
        {(byline || publishDate) && (
          <div className="flex items-center gap-4 text-[13px] text-usds-steel-500 border-t border-usds-steel-200 pt-5">
            {byline && <span>{byline}</span>}
            {byline && publishDate && (
              <span aria-hidden className="text-usds-steel-300">
                ·
              </span>
            )}
            {publishDate && <time dateTime={publishDate}>{publishDate}</time>}
          </div>
        )}
      </header>

      {/* ── Hero image ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <figure>
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={heroSrc}
              alt={heroAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
          {heroCaption && (
            <figcaption className="mt-3 text-[12px] text-usds-steel-500 leading-snug max-w-3xl mx-auto px-0">
              {heroCaption}
            </figcaption>
          )}
        </figure>
      </div>

      {/* ── Body ── */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {body.map((paragraph, i) => (
          <div key={i}>
            {/* Body copy — Garamond, reading size */}
            <div className="font-garamond text-usds-steel-800 text-[1.2rem] leading-[1.75] mb-6">
              {paragraph}
            </div>

            {/* Pull-quote — inserted after the `pullQuoteAfter`-th paragraph */}
            {pullQuote && i === pullQuoteAfter && (
              <blockquote className="my-10 border-l-2 border-usds-steel-900 pl-6">
                <p className="font-garamond text-usds-steel-900 text-[1.6rem] leading-snug font-semibold italic">
                  {pullQuote}
                </p>
              </blockquote>
            )}
          </div>
        ))}

        {/* ── Related links ── */}
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-usds-steel-200">
            <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-500 mb-5">
              Related
            </p>
            <ul className="space-y-3" role="list">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="inline-flex items-center gap-2 text-[15px] text-usds-steel-700 hover:text-usds-steel-900 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usds-steel-500 rounded"
                  >
                    <MoveRight
                      className="w-4 h-4 text-usds-steel-400 group-hover:text-usds-steel-700 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                      aria-hidden
                    />
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
