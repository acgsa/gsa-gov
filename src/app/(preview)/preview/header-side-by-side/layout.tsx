import type { ReactNode } from "react";
import { SiteHeaderSideBySide } from "@/components/layout/SiteHeaderSideBySide";
import { MainNav } from "@/components/layout/MainNav";
import { LiveTicker } from "@/components/layout/LiveTicker";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyChrome } from "@/components/layout/StickyChrome";

/**
 * Preview-only layout. Uses the ALTERNATE side-by-side header variant
 * (`SiteHeaderSideBySide`) so the option can be viewed live at
 * `/preview/header-side-by-side` without touching the locked `SiteHeader`
 * or the production `(frontend)` layout.
 */
export default function HeaderPreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyChrome>
        <SiteHeaderSideBySide />
        <MainNav />
        <LiveTicker />
      </StickyChrome>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
