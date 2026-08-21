"use client";

import Link from "next/link";
import { Menu, Search, X, ChevronDown, MoveRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { GovBanner } from "@/components/layout/GovBanner";

/* ─────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────── */
export interface CategorySubLink {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
}

export interface CategoryHeaderProps {
  /** The category name shown bold-first in the subnav row */
  categoryLabel: string;
  /** Href for the category home link */
  categoryHref: string;
  /** Additional subnav links after the category name */
  subLinks?: CategorySubLink[];
  /** Set to true to hide the entire subnav row (e.g. for microsites with no sub-navigation) */
  hideSubnav?: boolean;
  /** Full megamenu content — drives the slide-out nav panel */
  megaMenuContent?: Record<
    string,
    {
      intro?: string;
      overview?: { label: string; href: string };
      columns: Array<{
        heading?: string;
        links: Array<{ label: string; href: string }>;
      }>;
      feature: {
        heading?: string;
        body: string;
        links: Array<{ label: string; href: string }>;
        image: { src: StaticImageData; alt: string };
      };
    }
  >;
  /** Top-level nav links for the slide-out panel */
  navLinks?: Array<{ label: string; href: string; hasDropdown?: boolean }>;
}

/* ─────────────────────────────────────────────────────────────────────────
   Slide-out nav panel (desktop + mobile)
───────────────────────────────────────────────────────────────────────── */
function NavPanel({
  isOpen,
  onClose,
  navLinks = [],
  megaMenuContent = {},
}: {
  isOpen: boolean;
  onClose: () => void;
  navLinks: CategoryHeaderProps["navLinks"];
  megaMenuContent: CategoryHeaderProps["megaMenuContent"];
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openSection) setOpenSection(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, openSection]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => closeRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setOpenSection(null), 0);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const toggle = (href: string) =>
    setOpenSection((cur) => (cur === href ? null : href));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/60"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="nav-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.28, ease: [0.32, 0, 0.18, 1] }}
            className="fixed inset-y-0 left-0 z-[70] w-[min(360px,100vw)] bg-gsa-navy text-white flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                onClick={onClose}
                aria-label="Go to GSA homepage"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo/GSA_Seal_Updated_2026.svg"
                  alt="GSA Seal"
                  className="w-8 h-8 object-contain flex-shrink-0"
                />
                <span className="font-garamond text-white font-semibold text-[15px] leading-tight">
                  U.S. General Services Administration
                </span>
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex-shrink-0 ml-3 p-1.5 text-white/60 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Home link */}
            <div className="px-5 pt-4 pb-2 flex-shrink-0">
              <Link
                href="/"
                className="text-white/70 hover:text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                onClick={onClose}
              >
                ← Home
              </Link>
            </div>

            {/* Scrollable nav links */}
            <nav
              className="flex-1 overflow-y-auto px-5 pb-8"
              aria-label="Main navigation"
            >
              <ul role="list" className="space-y-0 mt-2">
                {(navLinks ?? []).map((link) => {
                  const content =
                    link.hasDropdown && megaMenuContent
                      ? megaMenuContent[link.href]
                      : null;
                  const isOpen = openSection === link.href;

                  return (
                    <li key={link.href}>
                      {content ? (
                        <>
                          <button
                            type="button"
                            className="w-full flex items-center justify-between py-3 text-left text-[15px] font-semibold text-white/80 hover:text-white transition-colors border-b border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                            onClick={() => toggle(link.href)}
                            aria-expanded={isOpen}
                          >
                            {link.label}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-white" : "text-white/40"}`}
                              aria-hidden="true"
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key={`section-${link.href}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 pb-5 pl-2 space-y-6">
                                  {/* Intro */}
                                  <p className="text-[18px] leading-[1.28] font-garamond italic text-usds-steel-500">
                                    {content.intro}
                                  </p>

                                  {/* Links — overview + all column links in one list for uniform spacing */}
                                  <ul role="list" className="space-y-2">
                                    {content.overview && (
                                      <li>
                                        <Link
                                          href={content.overview.href}
                                          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/70 hover:text-white transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                                          onClick={onClose}
                                        >
                                          <MoveRight
                                            className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
                                            aria-hidden="true"
                                          />
                                          {content.overview.label}
                                        </Link>
                                      </li>
                                    )}
                                    {content.columns
                                      .flatMap((col) => col.links)
                                      .map((item) => (
                                        <li key={item.href}>
                                          <Link
                                            href={item.href}
                                            className="text-[14px] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                                            onClick={onClose}
                                          >
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>

                                  {/* Featured block */}
                                  <div className="border-t border-white/10 pt-5">
                                    {content.feature.image && (
                                      <div className="relative w-full aspect-[16/7] mb-3 overflow-hidden rounded-sm border border-white/10">
                                        <Image
                                          src={content.feature.image.src}
                                          alt={content.feature.image.alt}
                                          fill
                                          className="object-cover"
                                          sizes="320px"
                                        />
                                      </div>
                                    )}
                                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-usds-steel-400 mb-1">
                                      {content.feature.heading}
                                    </p>
                                    <p className="text-[13px] text-white/60 mb-3 leading-snug">
                                      {content.feature.body}
                                    </p>
                                    <div className="space-y-2">
                                      {content.feature.links.map((item) => (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          className="flex items-center gap-1.5 text-[14px] font-semibold text-white/85 hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                                          onClick={onClose}
                                        >
                                          <MoveRight
                                            className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
                                            aria-hidden="true"
                                          />
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          className="block py-3 text-[15px] font-semibold text-white/80 hover:text-white transition-colors border-b border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                          onClick={onClose}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SubnavDropdown
───────────────────────────────────────────────────────────────────────── */
function SubnavDropdown({
  item,
  isOpen,
  onOpen,
  onScheduleClose,
  onCancelClose,
  onClose,
}: {
  item: { label: string; children: Array<{ label: string; href: string }> };
  isOpen: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
  onCancelClose: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
    >
      <button
        type="button"
        className={[
          "flex items-center gap-0.5 text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-1",
          isOpen ? "text-white" : "text-white/65 hover:text-white",
        ].join(" ")}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => (isOpen ? onClose() : onOpen())}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
      >
        {item.label}
        <ChevronDown
          className={`w-3 h-3 ml-0.5 flex-shrink-0 transition-transform duration-150 ${isOpen ? "rotate-180 text-white" : "text-white/40"}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full mt-1 bg-gsa-navy border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.55)] rounded-sm min-w-[200px] py-2 z-[100]"
            onMouseEnter={onCancelClose}
            onMouseLeave={onScheduleClose}
          >
            {item.children.map((child) => {
              const isExternal = child.href.startsWith("http");
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block px-4 py-2 text-[14px] text-white/70 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                  onClick={onClose}
                >
                  {child.label}
                  {isExternal && (
                    <span className="sr-only"> (opens in new tab)</span>
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CategoryHeader
───────────────────────────────────────────────────────────────────────── */
export function CategoryHeader({
  categoryLabel,
  categoryHref,
  subLinks = [],
  megaMenuContent = {},
  navLinks = [],
  hideSubnav = false,
}: CategoryHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeSubnav, setActiveSubnav] = useState<string | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const subnavTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSubnav = (label: string) => {
    if (subnavTimer.current) {
      clearTimeout(subnavTimer.current);
      subnavTimer.current = null;
    }
    setActiveSubnav(label);
  };
  const scheduleSubnavClose = () => {
    subnavTimer.current = setTimeout(() => setActiveSubnav(null), 120);
  };
  const cancelSubnavClose = () => {
    if (subnavTimer.current) {
      clearTimeout(subnavTimer.current);
      subnavTimer.current = null;
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveSubnav(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={[
          "bg-gsa-navy text-white transition-shadow duration-300",
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.45)]" : "",
        ].join(" ")}
      >
        <GovBanner />

        {/* ── Top row ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[52px] flex items-center gap-3">
          {/* Left: hamburger + search */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              ref={hamburgerRef}
              type="button"
              className="p-1.5 text-white/60 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setPanelOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={panelOpen}
              aria-controls="category-nav-panel"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
            <Link
              href="/search"
              className="p-1.5 text-white/60 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Search GSA.gov"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>

          {/* Center: seal + wordmark */}
          <div className="flex-1 flex items-center justify-center">
            <Link
              href="/"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              aria-label="Go to GSA homepage"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/GSA_Seal_Updated_2026.svg"
                alt="GSA Seal"
                className="w-9 h-9 object-contain drop-shadow-md flex-shrink-0"
              />
              <span className="font-garamond text-white font-semibold text-[22px] leading-none tracking-wide whitespace-nowrap">
                U.S. General Services Administration
              </span>
            </Link>
          </div>

          {/* Right: Log in */}
          <div className="flex-shrink-0">
            <Link
              href="/login"
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* ── Subnav row ── */}
        {!hideSubnav && (
          <nav
            aria-label={`${categoryLabel} navigation`}
            className="border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-center gap-6 overflow-x-auto scrollbar-hide">
              <Link
                href={categoryHref}
                className="flex-shrink-0 text-[15px] font-bold text-white hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                {categoryLabel}
              </Link>
              {subLinks.map((link) =>
                link.children ? (
                  <SubnavDropdown
                    key={link.label}
                    item={
                      link as {
                        label: string;
                        children: Array<{ label: string; href: string }>;
                      }
                    }
                    isOpen={activeSubnav === link.label}
                    onOpen={() => openSubnav(link.label)}
                    onScheduleClose={scheduleSubnavClose}
                    onCancelClose={cancelSubnavClose}
                    onClose={() => setActiveSubnav(null)}
                  />
                ) : link.href ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex-shrink-0 text-[15px] text-white/65 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                ) : null,
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Slide-out nav panel */}
      <NavPanel
        isOpen={panelOpen}
        onClose={() => {
          setPanelOpen(false);
          hamburgerRef.current?.focus();
        }}
        navLinks={navLinks}
        megaMenuContent={megaMenuContent}
      />
    </>
  );
}
