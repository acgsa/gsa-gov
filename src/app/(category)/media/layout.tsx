import { SiteHeaderSideBySide } from "@/components/layout/SiteHeaderSideBySide";
import { MainNav } from "@/components/layout/MainNav";
import { StickyChrome } from "@/components/layout/StickyChrome";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyChrome id="site-chrome">
        <SiteHeaderSideBySide />
        <MainNav />
      </StickyChrome>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
