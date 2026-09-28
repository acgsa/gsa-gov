import type { Metadata } from "next";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { MIGRATION_SAMPLES } from "@/lib/migration/samples.generated";
import {
  CONTENT_TYPE_LABELS,
  type MigrationSample,
  type ShowcaseTemplate,
} from "@/lib/migration/types";

/**
 * Migration showcase index.
 *
 * Lists every legacy GSA.gov page extracted by `scripts/migration-sample/` and
 * links the ones a template can already render. Samples whose template does not
 * exist yet are listed too, greyed out, so the gap is visible rather than
 * silently missing — this page doubles as the build queue.
 *
 * Per the route-group contract in `(migration)/layout.tsx`, nothing here
 * modifies the masthead, nav, ticker, footer, or any pre-existing page.
 */

export const metadata: Metadata = {
  title: "Migration showcase | GSA",
  description:
    "Real content extracted from the current GSA.gov, rendered in the new design system templates.",
};

/**
 * Where a sample of each template is rendered. Templates absent from this map
 * have no route yet; their samples render as non-interactive rows.
 */
const ROUTE_FOR_TEMPLATE: Partial<
  Record<ShowcaseTemplate, (slug: string) => string>
> = {
  GalleryPage: (slug) => `/migration/gallery/${slug}`,
};

/** Display order for the template groups — built templates first. */
const TEMPLATE_ORDER: ShowcaseTemplate[] = [
  "GalleryPage",
  "DetailPage",
  "TopicPage",
  "InfoPage",
  "EventPage",
  "DirectivePage",
  "FormPage",
  "DataPage",
];

function hrefFor(sample: MigrationSample): string | null {
  const build = ROUTE_FOR_TEMPLATE[sample.template];
  return build ? build(sample.slug) : null;
}

const GROUPS = TEMPLATE_ORDER.map((template) => ({
  template,
  samples: MIGRATION_SAMPLES.filter((sample) => sample.template === template),
})).filter((group) => group.samples.length > 0);

const RENDERABLE_COUNT = MIGRATION_SAMPLES.filter((sample) =>
  hrefFor(sample),
).length;

export default function MigrationIndexPage() {
  return (
    <div className="bg-usds-steel-50 min-h-screen pb-16 lg:pb-24">
      <header className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-16 pb-10 sm:pb-14">
        <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-4">
          Migration showcase
        </p>

        <h1
          className="font-garamond text-usds-steel-900 text-[44px] leading-[1.05] sm:text-[56px] sm:leading-[1.04] mb-5"
          style={{ fontWeight: 474 }}
        >
          Real GSA.gov content in the new design
        </h1>

        <p className="text-[16px] sm:text-[17px] leading-relaxed text-usds-steel-600 max-w-[600px] mx-auto">
          {MIGRATION_SAMPLES.length} pages were pulled from the current GSA.gov
          — body text, metadata, and provenance intact — to test the new
          templates against content nobody wrote for them. {RENDERABLE_COUNT}{" "}
          can be rendered today.
        </p>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {GROUPS.map(({ template, samples }) => {
          // eslint-disable-next-line security/detect-object-injection -- `template` is the ShowcaseTemplate union, read from a module-local literal
          const built = Boolean(ROUTE_FOR_TEMPLATE[template]);

          return (
            <section key={template} aria-labelledby={`group-${template}`}>
              <div className="flex items-baseline justify-between gap-4 pb-3 mb-5 border-b border-usds-steel-200">
                <h2
                  id={`group-${template}`}
                  className="font-garamond text-usds-steel-900 text-[26px] sm:text-[30px] leading-tight"
                  style={{ fontWeight: 474 }}
                >
                  {template}
                </h2>
                <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-usds-steel-600 whitespace-nowrap">
                  {built ? `${samples.length} live` : "Template not built"}
                </p>
              </div>

              <ul role="list" className="divide-y divide-usds-steel-200">
                {samples.map((sample) => {
                  const href = hrefFor(sample);

                  const body = (
                    <>
                      <span className="block text-[12px] font-semibold tracking-[0.12em] uppercase text-usds-steel-600 mb-1.5">
                        {CONTENT_TYPE_LABELS[sample.contentType]}
                        {sample.provenance.lastModified && (
                          <>
                            <span
                              aria-hidden
                              className="mx-2 text-usds-steel-400"
                            >
                              ·
                            </span>
                            {sample.provenance.lastModified}
                          </>
                        )}
                      </span>

                      <span className="block font-garamond text-[21px] sm:text-[23px] leading-snug text-usds-steel-900">
                        {sample.title}
                      </span>

                      <span className="mt-1.5 block text-[14px] leading-relaxed text-usds-steel-600 line-clamp-2">
                        {sample.dek}
                      </span>
                    </>
                  );

                  return (
                    <li key={sample.slug} className="py-5">
                      {href ? (
                        <Link
                          href={href}
                          className="group flex items-start justify-between gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
                        >
                          <span className="min-w-0">{body}</span>
                          <MoveRight
                            className="mt-8 w-5 h-5 flex-shrink-0 text-usds-steel-600 group-hover:translate-x-0.5 transition-transform duration-200"
                            aria-hidden
                          />
                        </Link>
                      ) : (
                        <div className="opacity-55">
                          {body}
                          <a
                            href={sample.provenance.sourceUrl}
                            className="mt-2 inline-flex items-center gap-2 text-[13px] text-usds-steel-600 hover:text-usds-steel-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
                          >
                            View on the current gsa.gov
                          </a>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
