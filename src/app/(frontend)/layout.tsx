import { SiteHeaderSideBySide } from "@/components/layout/SiteHeaderSideBySide";
import { MainNav } from "@/components/layout/MainNav";
import { LiveTicker } from "@/components/layout/LiveTicker";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyChrome } from "@/components/layout/StickyChrome";

/**
 * Frontend layout — wraps all public-facing pages.
 * The sticky chrome (header + nav + ticker) sits above the main content.
 */
export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Sticky chrome ──
          StickyChrome owns the single scroll-linked background + backdrop-blur
          surface, so the topbar, nav, and ticker are one uniform color/glass
          panel with no seam or per-row color mismatch. */}
      <StickyChrome>
        <SiteHeaderSideBySide />
        <MainNav />
        <LiveTicker />
      </StickyChrome>

      {/* ── Page content ── */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
