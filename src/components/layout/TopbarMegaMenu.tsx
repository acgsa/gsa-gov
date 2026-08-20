"use client";

/**
 * TopbarMegaMenu
 * --------------
 * Full-width panel that slides down from the desktop topbar when the
 * "Menu" button (left cell of the expanded header) is clicked.
 *
 * Layout:
 *  Left column  — all main GSA sections with sub-links
 *  Middle column — Latest News headlines (static; replace with API when available)
 *  Right column  — GSA Platforms / brands
 *
 * Accessibility: focus is trapped while open; Escape closes the panel.
 */

import Image from "next/image";
import Link from "next/link";
import { MoveRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import COELogo from "@/assets/brands/COE.png";
import DataGovLogo from "@/assets/brands/data_gov.png";
import FedRAMPLogo from "@/assets/brands/FedRAMP_Logo.svg.png";
import GoGovLogo from "@/assets/brands/Go.gov Logo_COLOR.png";
import LoginGovLogo from "@/assets/brands/logindotgov-logo.png";
import SAMLogo from "@/assets/brands/SAM_slab.svg";

// ─── Static data ─────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    label: "Real Estate",
    href: "/real-estate",
    links: [
      { label: "Lease Space", href: "/real-estate/leasing" },
      { label: "Sell & Dispose", href: "/real-estate/disposal" },
      { label: "Construction", href: "/real-estate/design-construction" },
      { label: "Portfolio Tools", href: "/real-estate/portfolio" },
      { label: "Building Standards", href: "/real-estate/historic" },
    ],
  },
  {
    label: "Acquisition",
    href: "/acquisition",
    links: [
      { label: "Buy Products", href: "/acquisition/buy-products" },
      { label: "Sell to Government", href: "/acquisition/sell-to-government" },
      {
        label: "Assisted Acquisition",
        href: "/acquisition/assisted-acquisition",
      },
      { label: "Policy", href: "/acquisition/policy" },
      { label: "Schedules", href: "/acquisition/schedules" },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    links: [
      { label: "AI Resources", href: "/technology/ai-resources" },
      { label: "Cloud Modernization", href: "/technology/transformation" },
      { label: "Platforms", href: "/technology/platforms" },
      { label: "Shared Services", href: "/technology/services" },
      { label: "IT Services", href: "/technology/it-services" },
    ],
  },
  {
    label: "Resources",
    href: "/employees",
    links: [
      { label: "Travel", href: "/employees/travel" },
      { label: "Per Diem", href: "/employees/per-diem" },
      { label: "GSA Fleet", href: "/employees/fleet" },
      { label: "Training", href: "/employees/training" },
      { label: "Policies", href: "/employees/policies" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    links: [
      { label: "Latest News", href: "/news" },
      { label: "Events", href: "/media/events" },
      { label: "Images & Video", href: "/media/image-library" },
      { label: "Leadership", href: "/media/leadership" },
      { label: "Reports & Data", href: "/media/reports" },
    ],
  },
  {
    label: "About GSA",
    href: "/about-gsa",
    links: [
      { label: "Mission & Vision", href: "/about-gsa/mission" },
      { label: "Administrator", href: "/about-gsa/administrator" },
      { label: "Organization", href: "/about-gsa/organization" },
      { label: "Taxpayer Savings", href: "/savings" },
      { label: "Careers", href: "/about-gsa/careers" },
    ],
  },
];

const NEWS_ITEMS = [
  {
    label: "GSA Launches Federal Property Disposal Program",
    href: "/news/property-disposal-program-launch",
    date: "Jan 14, 2025",
    category: "Real Estate",
  },
  {
    label: "First Wave of Underutilized Buildings Heads to Auction",
    href: "/news/underutilized-buildings-sale",
    date: "Feb 3, 2025",
    category: "Real Estate",
  },
  {
    label: "AI Task Force Delivers Recommendations",
    href: "/news",
    date: "Mar 10, 2025",
    category: "Technology",
  },
  {
    label: "FedRAMP Modernization Accelerates Cloud Adoption",
    href: "/news",
    date: "Apr 2, 2025",
    category: "Technology",
  },
  {
    label: "GSA Fraud Task Force Reaches $2B in Savings",
    href: "/news",
    date: "May 19, 2025",
    category: "Accountability",
  },
];

const PLATFORMS = [
  {
    name: "SAM.gov",
    href: "https://sam.gov",
    logo: SAMLogo,
    desc: "Register to do business with the federal government",
    isStaticImport: true,
    isSvg: true,
  },
  {
    name: "Login.gov",
    href: "https://login.gov",
    logo: LoginGovLogo,
    desc: "Secure sign-in for government services",
    isStaticImport: true,
    isSvg: false,
  },
  {
    name: "FedRAMP",
    href: "https://fedramp.gov",
    logo: FedRAMPLogo,
    desc: "Cloud security authorization program",
    isStaticImport: true,
    isSvg: false,
  },
  {
    name: "GO.gov",
    href: "https://go.gov",
    logo: GoGovLogo,
    desc: "Short, memorable government web addresses",
    isStaticImport: true,
    isSvg: false,
  },
  {
    name: "Data.gov",
    href: "https://data.gov",
    logo: DataGovLogo,
    desc: "Open data from the U.S. federal government",
    isStaticImport: true,
    isSvg: false,
  },
  {
    name: "CoE",
    href: "https://coe.gsa.gov",
    logo: COELogo,
    desc: "Centers of Excellence for IT modernization",
    isStaticImport: true,
    isSvg: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface TopbarMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pixel height of the full sticky chrome so the backdrop starts below it */
  chromeHeight?: number;
}

export function TopbarMegaMenu({
  isOpen,
  onClose,
  chromeHeight = 0,
}: TopbarMegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Trap focus inside panel while open */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — sits below the panel but above page content */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="fixed inset-0 z-[55] bg-black/40 cursor-default"
            tabIndex={-1}
          />

          {/* Panel — fixed so it drops below the full sticky chrome */}
          <motion.div
            ref={panelRef}
            id="topbar-mega-menu"
            key="topbar-mega-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              top: chromeHeight,
              maxHeight: `calc(100vh - ${chromeHeight}px)`,
            }}
            className="fixed inset-x-0 z-[60] bg-gsa-navy border-t border-white/10 shadow-[0_22px_50px_rgba(0,0,0,0.6)] overflow-y-auto"
          >
            {/* Close button row */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex items-center gap-1.5 text-[13px] font-medium text-white/55 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white px-1 py-0.5"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span>Close</span>
              </button>
            </div>

            {/* Three-column content grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr_1.1fr] gap-10 lg:gap-12">
              {/* ── Left: All Sections ── */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-usds-steel-600 mb-5">
                  All Sections
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {SECTIONS.map((section) => (
                    <div key={section.href}>
                      <Link
                        href={section.href}
                        onClick={onClose}
                        className="inline-flex items-center gap-1 text-[15px] font-semibold text-white hover:text-white/80 transition-colors mb-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                      >
                        <MoveRight
                          className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                          aria-hidden="true"
                        />
                        {section.label}
                      </Link>
                      <ul className="space-y-1.5" role="list">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={onClose}
                              className="block text-[13px] text-white/60 hover:text-white transition-colors duration-150 leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Middle: News ── */}
              <div>
                <div className="flex items-baseline justify-between mb-5">
                  <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-usds-steel-600">
                    Latest News
                  </p>
                  <Link
                    href="/news"
                    onClick={onClose}
                    className="text-[12px] text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    All news →
                  </Link>
                </div>
                <ul className="space-y-5" role="list">
                  {NEWS_ITEMS.map((item) => (
                    <li
                      key={item.href}
                      className="border-b border-white/8 pb-5 last:border-0 last:pb-0"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                      >
                        <p className="text-[11px] font-medium text-usds-steel-600 uppercase tracking-wide mb-1">
                          {item.category} · {item.date}
                        </p>
                        <p className="text-[14px] font-medium text-white/75 group-hover:text-white transition-colors leading-snug">
                          {item.label}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Right: GSA Platforms ── */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-usds-steel-600 mb-5">
                  GSA Platforms
                </p>
                <ul className="space-y-4" role="list">
                  {PLATFORMS.map((platform) => (
                    <li key={platform.name}>
                      <a
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-1 -m-1"
                        aria-label={`${platform.name} — ${platform.desc} (opens in new tab)`}
                      >
                        <div className="flex-shrink-0 w-[80px] h-[28px] relative">
                          <Image
                            src={platform.logo}
                            alt={`${platform.name} logo`}
                            fill
                            className="object-contain object-left"
                            sizes="80px"
                          />
                        </div>
                        <span className="text-[12px] text-white/50 group-hover:text-white/75 transition-colors leading-snug">
                          {platform.desc}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
