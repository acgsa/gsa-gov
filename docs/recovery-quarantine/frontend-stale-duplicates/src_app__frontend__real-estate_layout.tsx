import { CategoryHeader } from "@/components/layout/CategoryHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { navLinks, megaMenuContent } from "@/components/layout/MainNav";

const realEstateSubLinks = [
  { label: "Disposition Pipeline", href: "/real-estate/disposal" },
  { label: "Leasing", href: "/real-estate/leasing" },
  { label: "OASIS", href: "/real-estate/oasis" },
  { label: "Data & Reporting", href: "/real-estate/data" },
  {
    label: "Planning & Optimization",
    href: "/real-estate/workplace-optimization",
  },
];

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Sticky chrome ── */}
      <div id="site-chrome" className="sticky top-0 z-50">
        <CategoryHeader
          categoryLabel="Real Estate"
          categoryHref="/real-estate"
          subLinks={realEstateSubLinks}
          navLinks={navLinks}
          megaMenuContent={megaMenuContent}
        />
      </div>

      {/* ── Page content ── */}
      <main id="main-content" className="flex-1 pb-16 lg:pb-24">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
