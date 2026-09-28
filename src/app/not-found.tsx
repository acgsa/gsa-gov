import Link from "next/link";
import { MoveRight } from "lucide-react";
import { SiteHeaderSideBySide } from "@/components/layout/SiteHeaderSideBySide";
import { MainNav } from "@/components/layout/MainNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyChrome } from "@/components/layout/StickyChrome";

/**
 * Global 404.
 *
 * `not-found.tsx` at the App Router root is rendered inside the ROOT layout
 * only — route-group layouts such as `(frontend)/layout.tsx` are not applied.
 * Without this file, Next serves its built-in 404, which is a bare page with no
 * masthead, no nav, and no footer. A mistyped URL therefore looked exactly like
 * "the navigation has disappeared", which is how this gap surfaced.
 *
 * So the chrome is composed explicitly here, the same way the route-group
 * layouts compose it, and a user who lands on a dead URL keeps a working way
 * out of it.
 */
export const metadata = {
  title: "Page not found",
};

/** Section entry points offered as recovery paths. */
const DESTINATIONS = [
  { label: "Real estate", href: "/real-estate" },
  { label: "Acquisition", href: "/acquisition" },
  { label: "Technology", href: "/technology" },
  { label: "Resources", href: "/employees" },
  { label: "Media", href: "/media" },
];

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyChrome id="site-chrome">
        <SiteHeaderSideBySide />
        <MainNav />
      </StickyChrome>

      <main
        id="main-content"
        className="flex-1 bg-usds-steel-50 flex items-center"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-4">
            Error 404
          </p>

          <h1
            className="font-garamond text-usds-steel-900 text-[44px] leading-[1.05] sm:text-[56px] sm:leading-[1.04] mb-5"
            style={{ fontWeight: 474 }}
          >
            We couldn&rsquo;t find that page
          </h1>

          <p className="text-[16px] sm:text-[17px] leading-relaxed text-usds-steel-600 max-w-[560px] mx-auto">
            The page may have moved, or the address may have a typo. Use the
            navigation above, or start from one of the sections below.
          </p>

          <ul
            role="list"
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3"
          >
            {DESTINATIONS.map((destination) => (
              <li key={destination.href}>
                <Link
                  href={destination.href}
                  className="inline-flex items-center gap-1.5 text-[15px] font-medium text-gsa-blue hover:text-gsa-navy transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
                >
                  {destination.label}
                  <MoveRight
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-[14px] text-usds-steel-600">
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-usds-steel-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
            >
              Return to the GSA.gov home page
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
