import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search — GSA.gov",
};

/**
 * Truncated layout for the Search Results page.
 * Replaces the full site chrome (no main nav, no ticker, no footer).
 * Back button returns to GSA.gov homepage.
 */
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ── Compact header ── */}
      <header className="bg-gsa-navy flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-4">
          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded flex-shrink-0"
            aria-label="Back to GSA.gov homepage"
          >
            <ArrowLeft
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200"
              aria-hidden="true"
            />
            <span>GSA.gov</span>
          </Link>

          {/* Center: seal + title */}
          <div className="flex flex-1 items-center justify-center gap-2">
            <Image
              src="/logo/GSA_Seal_Updated_2026.svg"
              alt="GSA Seal"
              width={22}
              height={22}
              className="flex-shrink-0"
            />
            <span className="font-garamond text-white font-semibold text-base hidden sm:inline whitespace-nowrap">
              U.S. General Services Administration
            </span>
            <span className="font-garamond text-white font-semibold text-base sm:hidden">
              GSA
            </span>
          </div>

          {/* Login */}
          <Link
            href="/login"
            className="text-white/60 hover:text-white text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded flex-shrink-0"
          >
            Login
          </Link>
        </div>
      </header>

      <main id="search-content" className="flex-1">
        {children}
      </main>
    </div>
  );
}
