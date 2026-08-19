import Link from "next/link";
import Image from "next/image";
import gsaSeal from "@/assets/logo/New.svg";
import type { NewsArticle } from "@/lib/news-data";

/**
 * NewsArticleCard — newsroom-style article card (image, category · date
 * eyebrow, Garamond headline, dek). Shared by the /news index grid and the
 * TopicPage news section.
 *
 * When `article.image` is absent the thumbnail renders the GSA seal centred
 * on a Steel-600 background — consistent with the press-release placeholder
 * treatment.
 */
export function NewsArticleCard({
  article,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  article: NewsArticle;
  sizes?: string;
}) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue focus-visible:ring-offset-4 rounded-sm"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden mb-4">
        {article.image ? (
          <>
            <div className="absolute inset-0 bg-gray-100" />
            <Image
              src={article.image}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-usds-steel-200">
            <Image
              src={gsaSeal}
              alt="GSA seal"
              className="w-3/4 h-3/4 object-contain opacity-90"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-usds-steel-600 mb-2">
        {article.category} · {article.date}
      </p>
      <h3 className="font-garamond font-semibold text-[1.35rem] leading-snug text-usds-steel-950 group-hover:text-usds-steel-700 transition-colors">
        {article.title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-gray-600 line-clamp-3">
        {article.dek}
      </p>
    </Link>
  );
}
