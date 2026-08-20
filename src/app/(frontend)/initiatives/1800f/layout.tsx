import { MicrositeHeader } from "@/components/layout/MicrositeHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const navLinks = [
  { label: "About the Project", href: "/initiatives/1800f#about" },
  { label: "Progress", href: "/initiatives/1800f#progress" },
  { label: "Design", href: "/initiatives/1800f#design" },
  { label: "Live Updates", href: "/initiatives/1800f#livestream" },
];

export default function MicrositeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MicrositeHeader
        siteName="1800 F Street"
        siteHref="/initiatives/1800f"
        links={navLinks}
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
