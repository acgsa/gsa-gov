import { SiteHeader } from "@/components/layout/SiteHeader";
import { MainNav } from "@/components/layout/MainNav";
import { LiveTicker } from "@/components/layout/LiveTicker";
import { SiteFooter } from "@/components/layout/SiteFooter";

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
      {/* ── Sticky chrome ── */}
      <div className="sticky top-0 z-50">
        <SiteHeader />
        <MainNav />
        <LiveTicker />
      </div>

      {/* ── Page content ── */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
