import { CategoryHeader } from "@/components/layout/CategoryHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { navLinks, megaMenuContent } from "@/components/layout/MainNav";

const aboutSubLinks = [
  { label: "Latest News", href: "/news" },
  { label: "Events", href: "/about/events" },
  { label: "Images & Video", href: "/about/image-library" },
  { label: "Logos", href: "/about/logos" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Reports & Data", href: "/about/reports" },
  { label: "Taxpayer Savings", href: "/savings" },
  { label: "Media Contacts", href: "/about/contact" },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div id="site-chrome" className="sticky top-0 z-50">
        <CategoryHeader
          categoryLabel="Media"
          categoryHref="/about"
          subLinks={aboutSubLinks}
          navLinks={navLinks}
          megaMenuContent={megaMenuContent}
        />
      </div>
      <main id="main-content" className="flex-1 pb-16 lg:pb-24">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
