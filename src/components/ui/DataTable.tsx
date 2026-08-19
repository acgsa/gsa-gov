"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  rows: T[];
  caption?: string;
}

type SortDir = "asc" | "desc" | null;

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  caption,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    if (!filter.trim()) return rows;
    const q = filter.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [rows, filter]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      // eslint-disable-next-line security/detect-object-injection -- sortKey is a typed keyof the row type, constrained by column config
      const av = a[sortKey];
      // eslint-disable-next-line security/detect-object-injection -- sortKey is a typed keyof the row type, constrained by column config
      const bv = b[sortKey];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av ?? "").localeCompare(String(bv ?? ""));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const handleSort = (key: keyof T) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir(null);
    }
  };

  const SortIcon = ({ col }: { col: DataTableColumn<T> }) => {
    if (!col.sortable) return null;
    if (sortKey !== col.key)
      return (
        <ChevronsUpDown
          className="w-3.5 h-3.5 text-usds-steel-500"
          aria-hidden
        />
      );
    if (sortDir === "asc")
      return (
        <ChevronUp className="w-3.5 h-3.5 text-usds-steel-700" aria-hidden />
      );
    return (
      <ChevronDown className="w-3.5 h-3.5 text-usds-steel-700" aria-hidden />
    );
  };

  return (
    <div className="w-full">
      {/* Filter */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          placeholder="Filter records…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-xs border border-usds-steel-300 rounded px-3 py-2 text-sm text-usds-steel-700 placeholder:text-usds-steel-600 focus:outline-none focus:ring-2 focus:ring-usds-steel-500"
          aria-label="Filter table records"
        />
        <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-500 whitespace-nowrap flex-shrink-0">
          {sorted.length} record{sorted.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-usds-steel-200">
        <table className="min-w-full text-sm" aria-label={caption}>
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-usds-steel-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  className="px-4 py-3 text-left"
                  aria-sort={
                    col.sortable
                      ? sortKey === col.key
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                      : undefined
                  }
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1 text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-700 hover:text-usds-steel-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usds-steel-500 rounded"
                    >
                      {col.label}
                      <SortIcon col={col} />
                    </button>
                  ) : (
                    <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600">
                      {col.label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-usds-steel-200 bg-white">
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-usds-steel-500"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              sorted.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-usds-steel-50 transition-colors duration-100"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-3 text-usds-steel-700 align-top"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
