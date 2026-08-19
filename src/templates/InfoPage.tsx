import Link from "next/link";
import { MoveRight } from "lucide-react";

export interface InfoPageBreadcrumb {
  label: string;
  href: string;
}

export interface InfoPageRelated {
  label: string;
  href: string;
}

export interface InfoPageSection {
  id: string;
  heading: string;
  body: React.ReactNode;
}

export interface InfoPageProps {
  breadcrumbs?: InfoPageBreadcrumb[];
  eyebrow?: string;
  title: string;
  intro: string;
  sections: InfoPageSection[];
  related?: InfoPageRelated[];
  lastUpdated?: string;
}

/**
 * InfoPage — plain editorial information template.
 * Modelled on NYT/Figma-blog reading layout: single column, generous type,
 * sticky on-page nav on desktop, related links at the foot.
 */
export function InfoPage({
  breadcrumbs = [],
  eyebrow,
  title,
  intro,
  sections,
  related = [],
  lastUpdated,
}: InfoPageProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Breadcrumb ── */}
      {breadcrumbs.length > 0 && (
        <div className="border-b border-usds-steel-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-[13px] text-usds-steel-500">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex gap-16">
        {/* ── Sticky on-page nav (desktop) ── */}
        {sections.length > 1 && (
          <nav
            aria-label="Page sections"
            className="hidden lg:block w-48 flex-shrink-0 self-start sticky top-28"
          >
            <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-400 mb-4">
              On this page
            </p>
            <ul className="space-y-2" role="list">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-[14px] text-usds-steel-700 hover:text-usds-steel-900 transition-colors duration-150 leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usds-steel-500 rounded"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* ── Main content ── */}
        <article className="flex-1 min-w-0 max-w-[700px]">
          {eyebrow && (
            <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-500 mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="font-geist text-usds-steel-900 text-4xl sm:text-5xl font-semibold leading-[1.1] mb-6">
            {title}
          </h1>
          <p className="text-[18px] text-usds-steel-500 leading-relaxed mb-10 border-b border-usds-steel-200 pb-10">
            {intro}
          </p>

          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-12 scroll-mt-32"
            >
              <h2 className="font-geist text-usds-steel-900 text-2xl font-semibold leading-snug mb-4">
                {section.heading}
              </h2>
              <div className="text-[16px] leading-relaxed text-usds-steel-700 space-y-4">
                {section.body}
              </div>
            </section>
          ))}

          {lastUpdated && (
            <p className="text-[13px] text-usds-steel-400 border-t border-usds-steel-200 pt-6 mt-6">
              Last updated: {lastUpdated}
            </p>
          )}

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
    </div>
  );
}
