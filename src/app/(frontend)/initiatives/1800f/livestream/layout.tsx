/**
 * Livestream page layout — deliberately does NOT render MicrositeHeader.
 * The page inherits standard site chrome (SiteHeaderSideBySide + MainNav +
 * LiveTicker + SiteFooter) from the parent (frontend) layout.
 */
export default function LivestreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
