import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import Link from "next/link";

export interface DataPageBreadcrumb {
  label: string;
  href: string;
}

export interface DataPageProps<T extends Record<string, unknown>> {
  breadcrumbs?: DataPageBreadcrumb[];
  eyebrow?: string;
  title: string;
  intro: string;
  columns: DataTableColumn<T>[];
  rows: T[];
  tableCaption?: string;
  notes?: React.ReactNode;
  lastUpdated?: string;
  downloadHref?: string;
}

/**
 * DataPage — data-driven page with a configurable, sortable, filterable table.
 * The DataTable component is reusable and can be dropped into any page.
 */
export function DataPage<T extends Record<string, unknown>>({
  breadcrumbs = [],
  eyebrow,
  title,
  intro,
  columns,
  rows,
  tableCaption,
  notes,
  lastUpdated,
  downloadHref,
}: DataPageProps<T>) {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Breadcrumb ── */}
      {breadcrumbs.length > 0 && (
        <div className="border-b border-usds-steel-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-[13px] text-usds-steel-700">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-usds-steel-200">
        {eyebrow && (
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-500 mb-3">
            {eyebrow}
          </p>
        )}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-geist text-usds-steel-900 text-4xl sm:text-5xl font-semibold leading-[1.1] mb-4">
              {title}
            </h1>
            <p className="text-[16px] text-usds-steel-500 leading-normal max-w-[700px]">
              {intro}
            </p>
          </div>
          {downloadHref && (
            <a
              href={downloadHref}
              download
              className="flex-shrink-0 inline-flex items-center gap-2 border border-usds-steel-300 text-usds-steel-700 hover:text-usds-steel-900 hover:border-usds-steel-500 text-[13px] font-medium px-4 py-2 rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usds-steel-500"
            >
              Download CSV
            </a>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <DataTable columns={columns} rows={rows} caption={tableCaption} />

        {/* Notes */}
        {notes && (
          <div className="mt-8 border-t border-usds-steel-200 pt-6 text-[13px] text-usds-steel-500 leading-relaxed">
            {notes}
          </div>
        )}

        {lastUpdated && (
          <p className="mt-4 text-[12px] text-usds-steel-400">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    </div>
  );
}
