"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { NewsArticleCard } from "@/components/ui/NewsArticleCard";
import type { NewsArticle } from "@/lib/news-data";

/**
 * NewsFilters — search + category filter bar for the /news index grid.
 * Client-side only: filters the already-fetched article list, no navigation.
 * The featured lead story (rendered separately by the page) is unaffected.
 */
export function NewsFilters({ articles }: { articles: NewsArticle[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))).sort(),
    [articles],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCategory = !category || a.category === category;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.dek.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [articles, query, category]);

  return (
    <div>
      {/* ── Search + category filters ── */}
      <div className="border-t border-gray-200 pt-8 mb-8">
        <div className="max-w-md mb-5">
          <div className="flex items-center overflow-hidden rounded-full border border-usds-steel-300 bg-white shadow-sm transition-shadow focus-within:shadow-md">
            <Search
              className="ml-4 h-4 w-4 flex-shrink-0 text-usds-steel-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news…"
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[15px] text-usds-steel-900 outline-none"
              aria-label="Search news articles"
            />
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          <button
            type="button"
            onClick={() => setCategory(null)}
            aria-pressed={category === null}
            className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue focus-visible:ring-offset-2 ${
              category === null
                ? "bg-gsa-navy border-gsa-navy text-white"
                : "bg-white border-usds-steel-300 text-usds-steel-700 hover:border-usds-steel-500"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue focus-visible:ring-offset-2 ${
                category === c
                  ? "bg-gsa-navy border-gsa-navy text-white"
                  : "bg-white border-usds-steel-300 text-usds-steel-700 hover:border-usds-steel-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Result count ── */}
      <p className="mb-6 text-[13px] text-usds-steel-500" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "story" : "stories"}
        {category ? ` in ${category}` : ""}
        {query ? ` matching \u201c${query}\u201d` : ""}
      </p>

      {/* ── Article grid ── */}
      {filtered.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((article) => (
            <li key={article.slug}>
              <NewsArticleCard article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-16 text-center text-[15px] text-usds-steel-500">
          No stories match your search. Try a different term or category.
        </p>
      )}
    </div>
  );
}
