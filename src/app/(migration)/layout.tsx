import { SiteHeaderSideBySide } from "@/components/layout/SiteHeaderSideBySide";
import { MainNav } from "@/components/layout/MainNav";
import { LiveTicker } from "@/components/layout/LiveTicker";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyChrome } from "@/components/layout/StickyChrome";

/**
 * Migration layout — wraps the legacy-content showcase pages.
 *
 * This route group renders a sampling of real content from the legacy GSA.gov
 * Drupal site through the new design system, so reviewers can evaluate how
 * actual editorial content behaves in the new templates.
 *
 * IMPORTANT — isolation contract:
 * The global chrome components below are imported and composed *as-is*. Nothing
 * in this route group may modify the masthead, nav, ticker, or footer, nor any
 * pre-existing prototype page or template. New templates and modules required
 * by legacy content types are added alongside the existing ones, never in place
 * of them. See plans/drupal-content-showcase-plan.md §1.
 */
export default function MigrationLayout({
  children,
}: {
  children: React.ReactNode;
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
