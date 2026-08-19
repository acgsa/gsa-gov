import { MicrositeHeader } from "@/components/layout/MicrositeHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function EighteenHundredFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MicrositeHeader
        siteName="1800 F Street"
        siteHref="/1800f"
        backHref="/"
        backLabel="Back to GSA.gov"
      />

      {/* ── Page content ── */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
