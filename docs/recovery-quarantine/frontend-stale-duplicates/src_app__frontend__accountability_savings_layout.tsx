/**
 * Savings route segment — no extra layout wrapper needed.
 * The parent (frontend) layout already provides SiteHeader + MainNav + SiteFooter.
 * LiveTicker suppresses itself on this path via usePathname.
 */
export default function SavingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
