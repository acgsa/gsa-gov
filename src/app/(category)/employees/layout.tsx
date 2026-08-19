import { SiteHeader } from "@/components/layout/SiteHeader";
import { MainNav } from "@/components/layout/MainNav";
import { StickyChrome } from "@/components/layout/StickyChrome";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyChrome id="site-chrome">
        <SiteHeader />
        <MainNav />
      </StickyChrome>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
