import type { Metadata } from "next";
import Link from "next/link";
import { NEWS_ARTICLES } from "@/lib/news-data";
import { NewsArticleCard } from "@/components/ui/NewsArticleCard";

export const metadata: Metadata = {
  title: "Press Releases | Media",
  description:
    "Official GSA press releases, statements, and announcements for journalists and the public.",
};

export default function PressReleasesPage() {
  return (
    <div className="bg-usds-steel-50 min-h-screen pb-16 lg:pb-24">
      {/* ── Centered hero ── */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-16 pb-12 sm:pb-16">
        <Link
          href="/media"
          className="inline-block text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 hover:text-usds-steel-900 transition-colors duration-150 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
        >
          Media
        </Link>
        <h1
          className="font-garamond text-usds-steel-900 text-[44px] leading-[1.05] sm:text-[56px] sm:leading-[1.04] mb-5"
          style={{ fontWeight: 474 }}
        >
          Press releases
        </h1>
        <p className="text-[16px] sm:text-[17px] leading-relaxed text-usds-steel-600 max-w-[560px] mx-auto">
          Official GSA press releases, administrator statements, and agency
          announcements for journalists and the public.
        </p>
      </header>

      {/* ── Release grid ── */}
      <section
        aria-label="Press releases"
        className="mx-auto max-w-[84rem] px-8"
      >
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {NEWS_ARTICLES.map((article) => (
            <li key={article.slug}>
              <NewsArticleCard article={article} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
