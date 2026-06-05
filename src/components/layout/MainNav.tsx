"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

export const navLinks = [
  { label: "Real Estate", href: "/real-estate" },
  { label: "Acquisition", href: "/acquisition" },
  { label: "Technology", href: "/technology" },
  { label: "For Employees", href: "/employees" },
  { label: "About", href: "/about" },
];

export function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="relative z-10 bg-gsa-navy border-t border-white/[0.08]"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 relative flex items-center">
          {/* Search icon — pinned left */}
          <button
            type="button"
            className="p-2 -ml-2 text-white/60 hover:text-white transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
            aria-label="Search GSA.gov"
          >
            <Search className="w-[18px] h-[18px]" aria-hidden="true" />
          </button>

          {/* Desktop nav links — absolutely centered in the bar */}
          <ul
            className="hidden md:flex absolute inset-0 items-center justify-center gap-0.5 pointer-events-none"
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.href} className="pointer-events-auto">
                <Link
                  href={link.href}
                  className="block text-white/80 hover:text-white text-sm font-medium px-3 py-1.5 rounded transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger — right side */}
          <button
            type="button"
            className="md:hidden ml-auto p-2 text-white/70 hover:text-white transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
