"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export interface MicrositeHeaderProps {
  siteName?: string;
  siteHref?: string;
  links?: Array<{ label: string; href: string }>;
  /** Optional back-navigation target — rendered as a left-arrow button before the wordmark */
  backHref?: string;
  /** Accessible label for the back button (default: "Back") */
  backLabel?: string;
}

export function MicrositeHeader({
  links = [],
  backHref,
  backLabel = "Back",
}: MicrositeHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 bg-gsa-navy text-white transition-shadow duration-300",
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.45)]" : "",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
        {/* Back button — left edge */}
        {backHref && (
          <Link
            href={backHref}
            aria-label={backLabel}
            className="flex-shrink-0 -ml-1 p-1.5 text-white/70 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </Link>
        )}

        {/* Center: seal + wordmark — same markup/sizing as MainNav mobile row */}
        <div className="flex-1 flex items-center justify-center">
          <Link
            href="/"
            aria-label="Go to GSA homepage"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/New.svg"
              alt="GSA Seal"
              className="w-10 h-10 object-contain drop-shadow-md flex-shrink-0"
            />
            <span className="font-garamond text-white font-semibold text-base sm:text-xl leading-tight tracking-wide whitespace-nowrap">
              U.S. General Services Administration
            </span>
          </Link>
        </div>

        {/* Optional nav links */}
        {links.length > 0 && (
          <nav
            aria-label="Microsite navigation"
            className="hidden md:flex items-center gap-6 flex-shrink-0"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Spacer to keep wordmark visually centered when back button is present and no nav links */}
        {backHref && links.length === 0 && (
          <div className="w-8 flex-shrink-0" aria-hidden="true" />
        )}
      </div>
    </header>
  );
}
