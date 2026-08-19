import Link from "next/link";
import { MoveRight } from "lucide-react";

export interface DetailPageSection {
  id: string;
  heading: string;
  body: React.ReactNode;
}

export interface DetailPageRelatedLink {
  label: string;
  href: string;
  category?: string;
  external?: boolean;
}

export interface DetailPageContactItem {
  label: string;
  value: string;
  href?: string;
}

export interface DetailPageProps {
  /** Optional category/section eyebrow shown above the title (e.g. "Real Estate"). */
  eyebrow?: string;
  /** Optional href that makes the eyebrow a clickable link to its category page. */
  eyebrowHref?: string;
  title: string;
  intro: string;
  /** Optional content rendered between the intro and the first section (e.g. a large seal image). */
  leadContent?: React.ReactNode;
  sections: DetailPageSection[];
  /** Article-style related links rendered at the bottom of the page. */
  relatedLinks?: DetailPageRelatedLink[];
  /** Compact contact-info module rendered near the end of the article. */
  contact?: {
    heading?: string;
    items: DetailPageContactItem[];
  };
  lastUpdated?: string;
  /** Compact meta items shown beneath title (e.g. "Program" / "Contact") */
  meta?: Array<{ label: string; value: string }>;
}

/**
 * DetailPage — plain informational / article template.
 * Single centered column (max-width 700px) modelled on a New York Times
 * article page. Includes an optional related-links module and a compact
 * contact-info module at the bottom.
 */
export function DetailPage({
  eyebrow,
  eyebrowHref,
  title,
  intro,
  leadContent,
  sections,
  relatedLinks = [],
  contact,
  lastUpdated,
  meta = [],
}: DetailPageProps) {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[600px] px-4 sm:px-6 py-12 lg:py-16">
        {/* ── Article header ── */}
        <article>
          {eyebrow &&
            (eyebrowHref ? (
              <Link
                href={eyebrowHref}
                className="inline-block text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-700 hover:text-usds-steel-900 transition-colors duration-150 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usds-steel-500 rounded"
              >
                {eyebrow}
              </Link>
            ) : (
              <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-700 mb-4">
                {eyebrow}
              </p>
            ))}
          <h1 className="font-garamond text-usds-steel-900 text-4xl sm:text-5xl font-semibold leading-[1.06] mb-4">
            {title}
          </h1>

          {/* Meta row */}
          {meta.length > 0 && (
            <dl className="flex flex-wrap gap-x-8 gap-y-1 mb-6">
              {meta.map((m) => (
                <div
                  key={m.label || m.value}
                  className="flex items-center gap-2"
                >
                  {m.label && (
                    <dt className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-700">
                      {m.label}
                    </dt>
                  )}
                  <dd className="text-[13px] text-usds-steel-700">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="text-[20px] text-usds-steel-800 leading-relaxed mb-10">
            {intro}
          </p>

          {leadContent}

          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-12 scroll-mt-32"
            >
              <h2 className="font-garamond text-usds-steel-900 text-2xl font-semibold leading-snug mb-4">
                {section.heading}
              </h2>
              <div className="text-[18px] leading-[1.7] text-usds-steel-800 space-y-5">
                {section.body}
              </div>
            </section>
          ))}

          {lastUpdated && (
            <p className="text-[13px] text-usds-steel-700 border-t border-usds-steel-200 pt-6 mt-6">
              Last updated: {lastUpdated}
            </p>
          )}
        </article>

        {/* ── Contact module ── */}
        {contact && contact.items.length > 0 && (
          <aside className="mt-12 border-t border-usds-steel-200 pt-8">
            <p className="text-[13px] font-semibold tracking-[0.14em] uppercase text-usds-steel-700 mb-3">
              {contact.heading ?? "Contact"}
            </p>
            <ul className="space-y-1" role="list">
              {contact.items.map((item) => (
                <li
                  key={item.label}
                  className="text-[15px] text-usds-steel-800"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-usds-steel-700 underline decoration-usds-steel-300 underline-offset-2 hover:text-usds-steel-900 hover:decoration-usds-steel-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usds-steel-500 rounded"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    item.value
                  )}
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* ── Related links module ── */}
        {relatedLinks.length > 0 && (
          <section className="mt-14 border-t border-usds-steel-200 pt-8">
            <h2 className="text-[13px] font-semibold tracking-[0.14em] uppercase text-usds-steel-700 mb-5">
              Related
            </h2>
            <ul className="divide-y divide-usds-steel-200" role="list">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usds-steel-500 rounded"
                  >
                    <span className="min-w-0">
                      {link.category && (
                        <span className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-usds-steel-600 mb-1">
                          {link.category}
                        </span>
                      )}
                      <span className="block text-[17px] font-medium text-usds-steel-700 leading-snug group-hover:text-usds-steel-900 transition-colors duration-150">
                        {link.label}
                      </span>
                    </span>
                    <MoveRight
                      className="w-4 h-4 text-usds-steel-400 group-hover:text-usds-steel-900 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
