/**
 * @jest-environment jsdom
 */

/**
 * MobileMenu regression tests.
 *
 * The bug these lock down: MainNav (and therefore MobileMenu) renders inside
 * StickyChrome, which sets an inline `backdrop-filter`. Any non-`none`
 * filter/backdrop-filter value makes that element a containing block for
 * `position: fixed` descendants. The drawer is `fixed inset-y-0`, so while it
 * lived inside the chrome subtree its height resolved against the ~124px
 * chrome box instead of the viewport — the scrollable link list collapsed and
 * the drawer rendered effectively empty (only the "Menu" title and the "Login"
 * footer were visible) at tablet/mobile widths.
 *
 * The fix is a portal to document.body. These tests assert the portal (a
 * structural property we can verify in jsdom) and that the links actually
 * render, which is the user-visible symptom.
 */

import { render, screen } from "@testing-library/react";
import { MobileMenu } from "./MobileMenu";

const links = [
  { label: "Real Estate", href: "/real-estate", hasDropdown: true },
  { label: "Acquisition", href: "/acquisition", hasDropdown: true },
  { label: "Technology", href: "/technology", hasDropdown: true },
  { label: "Resources", href: "/employees", hasDropdown: true },
  { label: "Media", href: "/media", hasDropdown: true },
];

/**
 * Renders MobileMenu inside a stand-in for StickyChrome — an element with an
 * inline backdrop-filter, which is exactly what creates the fixed-position
 * containing block in the real layout.
 */
function renderInsideChrome(isOpen: boolean) {
  const result = render(
    <div
      data-testid="sticky-chrome"
      style={{ backdropFilter: "blur(0px)", position: "sticky", top: 0 }}
    >
      <MobileMenu isOpen={isOpen} onClose={() => {}} links={links} />
    </div>,
  );
  return {
    ...result,
    chrome: screen.getByTestId("sticky-chrome"),
  };
}

describe("MobileMenu", () => {
  it("renders nothing when closed", () => {
    renderInsideChrome(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("escapes the sticky-chrome containing block by portaling to <body>", () => {
    const { chrome } = renderInsideChrome(true);
    const dialog = screen.getByRole("dialog", { name: "Navigation menu" });

    // The drawer must exist...
    expect(dialog).toBeInTheDocument();
    // ...and must NOT be a descendant of the backdrop-filtered chrome, or its
    // `fixed inset-y-0` sizing collapses to the chrome's height.
    expect(chrome.contains(dialog)).toBe(false);
    expect(document.body.contains(dialog)).toBe(true);
  });

  it("renders every top-level nav label in the drawer", () => {
    renderInsideChrome(true);
    // Queried by text rather than by role: an item renders as an accordion
    // <button> when megaMenuContent supplies a section for it and as a plain
    // <a> otherwise, and this assertion is about the labels being present at
    // all — that is the symptom the user saw (an empty drawer).
    for (const link of links) {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  });

  it("keeps the drawer a labelled modal dialog for screen readers", () => {
    renderInsideChrome(true);
    const dialog = screen.getByRole("dialog", { name: "Navigation menu" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("button", { name: "Close menu" })).toBeVisible();
  });
});
