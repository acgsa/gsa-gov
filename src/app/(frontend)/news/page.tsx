import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { NEWS_ARTICLES } from "@/lib/news-data";
import { NewsFilters } from "@/components/modules/NewsFilters";
import gsaSeal from "@/assets/logo/New.svg";

export const metadata: Metadata = {
  title: "Newsroom | U.S. General Services Administration",
  description:
    "The latest news, announcements, and results from the U.S. General Services Administration — real estate, acquisition, technology, and taxpayer savings.",
};

export default function NewsIndexPage() {
  const [lead, ...rest] = NEWS_ARTICLES;

  return (
    <main className="bg-white">
      {/* Page header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600">
            Latest News
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Featured lead article */}
        {lead && (
          <Link
            href={`/news/${lead.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue focus-visible:ring-offset-4 rounded-sm"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm">
              {lead.image ? (
                <>
                  <div className="absolute inset-0 bg-gray-100" />
                  <Image
                    src={lead.image}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-usds-steel-200">
                  <Image
                    src={gsaSeal}
                    alt="GSA seal"
                    width={120}
                    height={120}
                    priority
                    className="opacity-90"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-usds-steel-600 mb-3">
                {lead.category} · {lead.date}
              </p>
              <h2
                className="font-garamond font-semibold text-usds-steel-950 leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
              >
                {lead.title}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-gray-600">
                {lead.dek}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-usds-steel-700 group-hover:text-usds-steel-900 transition-colors duration-200">
                Read the story
                <MoveRight
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        )}

        {/* Search + filter + article grid */}
        <NewsFilters articles={rest} />
      </div>
    </main>
  );
}
