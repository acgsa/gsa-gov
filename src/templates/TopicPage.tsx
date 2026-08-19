import type { StaticImageData } from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/lib/news-data";
import type { GsaSolution } from "@/lib/gsa-solutions";
import { NewsArticleCard } from "@/components/ui/NewsArticleCard";
import { SolutionsStrip } from "@/components/ui/SolutionsStrip";
import { TopicCard } from "@/templates/category/CategoryTopics";
import { FaqAccordion, type FaqItem } from "@/components/ui/FaqAccordion";

export interface TopicPageCard {
  title: string;
  body: string;
  src: StaticImageData | string;
  alt: string;
  ctaText: string;
  ctaHref: string;
  imageStyle?: "cover" | "contain";
}

export interface TopicPageNews {
  eyebrow?: string;
  /** Hand-picked articles rendered as newsroom-style cards. First three shown. */
  articles: NewsArticle[];
}

export interface TopicPageStep {
  title: string;
  body: string;
}

export interface TopicPageProps {
  /** Category label shown above the title, e.g. "Real Estate". */
  eyebrow?: string;
  /** Link target for the eyebrow — the category landing page. */
  eyebrowHref?: string;
  title: string;
  intro: string;
  /** Optional dark pill call-to-action rendered beneath the intro. */
  cta?: { label: string; href: string };
  /** Optional numbered "How it works" strip between the hero and the cards. */
  steps?: TopicPageStep[];
  stepsHeading?: string;
  cards?: TopicPageCard[];
  faqHeading?: string;
  faqs?: FaqItem[];
  /** Optional GSA platform/solution chips rendered after the FAQ */
  solutions?: GsaSolution[];
  /** Larger solution-card treatment (used when solutions are the page's focus) */
  solutionsLarge?: boolean;
  /** Hand-picked news stories for the bottom spotlight. */
  news?: TopicPageNews;
}

/**
 * TopicPage — action-oriented subpage template.
 * Centered display hero with optional pill CTA, a grid of image action
 * cards, an FAQ accordion, and an optional hand-authored news spotlight.
 */
export function TopicPage({
  eyebrow,
  eyebrowHref,
  title,
  intro,
  cta,
  steps = [],
  stepsHeading,
  cards = [],
  faqHeading,
  faqs = [],
  solutions = [],
  solutionsLarge = false,
  news,
}: TopicPageProps) {
  return (
    <div className="bg-usds-steel-100 min-h-screen pb-24 lg:pb-32">
      {/* ── Centered hero ── */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-16 pb-12 sm:pb-16">
        {eyebrow &&
          (eyebrowHref ? (
            <Link
              href={eyebrowHref}
              className="inline-block text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 hover:text-usds-steel-900 transition-colors duration-150 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
            >
              {eyebrow}
            </Link>
          ) : (
            <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-4">
              {eyebrow}
            </p>
          ))}
        <h1
          className="font-garamond text-usds-steel-900 text-[44px] leading-[1.05] sm:text-[56px] sm:leading-[1.04] mb-5"
          style={{ fontWeight: 474 }}
        >
          {title}
        </h1>
        <p className="text-[16px] sm:text-[17px] leading-relaxed text-usds-steel-600 max-w-[560px] mx-auto">
          {intro}
        </p>
        {cta && (
          <div className="mt-8">
            <Link
              href={cta.href}
              className="inline-flex items-center rounded-full bg-gsa-navy text-white text-[14px] font-medium px-6 py-3 hover:bg-usds-steel-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue focus-visible:ring-offset-2"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </header>

      {/* ── How it works ── */}
      {steps.length > 0 && (
        <section
          aria-label={stepsHeading ?? "How it works"}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
        >
          <h2
            className="font-garamond text-usds-steel-900 text-[28px] sm:text-[32px] text-center mb-8"
            style={{ fontWeight: 474 }}
          >
            {stepsHeading ?? "How it works"}
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="bg-white rounded-xl border border-usds-steel-200 p-6 lg:p-7"
              >
                <span
                  aria-hidden
                  className="font-geist text-3xl font-semibold tracking-[-0.02em] text-gsa-navy"
                >
                  {i + 1}
                </span>
                <h3 className="mt-3 text-[16px] font-semibold text-usds-steel-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-usds-steel-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ── Action cards ── */}
      {cards.length > 0 && (
        <section
          aria-label={`${title} resources`}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {cards.map((card) => (
              <TopicCard
                key={card.title}
                topic={{
                  href: card.ctaHref,
                  title: card.title,
                  body: card.body,
                  src: card.src,
                  alt: card.alt,
                  imageStyle: card.imageStyle,
                }}
                ctaText={card.ctaText}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {faqs.length > 0 && (
        <section aria-label={faqHeading ?? "Frequently asked questions"}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <h2
              className="font-garamond text-usds-steel-900 text-[32px] sm:text-[40px] leading-tight text-center mb-10"
              style={{ fontWeight: 474 }}
            >
              {faqHeading ?? "Frequently asked questions"}
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}

      {/* ── GSA Solutions ── */}
      {solutions.length > 0 && (
        <SolutionsStrip solutions={solutions} large={solutionsLarge} />
      )}

      {/* ── News ── */}
      {news && news.articles.length > 0 && (
        <section aria-label={news.eyebrow ?? "News"} className="py-12">
          <div className="mx-auto max-w-[84rem] px-8">
            <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-6">
              {news.eyebrow ?? "News"}
            </h2>
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
              role="list"
            >
              {news.articles.slice(0, 3).map((article) => (
                <li key={article.slug}>
                  <NewsArticleCard article={article} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
