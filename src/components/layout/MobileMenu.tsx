"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { X, ChevronDown, MoveRight } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { getSolutionsFor } from "@/lib/gsa-solutions";
import type { NewsArticle } from "@/lib/news-data";

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface MegaMenuColumn {
  heading?: string;
  links: Array<{ label: string; href: string }>;
}

interface MegaMenuFeature {
  heading?: string;
  body: string;
  links: Array<{ label: string; href: string }>;
  image: { src: StaticImageData; alt: string };
}

interface MegaMenuSection {
  intro?: string;
  overview?: { label: string; href: string };
  columns: MegaMenuColumn[];
  feature: MegaMenuFeature;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  megaMenuContent?: Record<string, MegaMenuSection>;
  /** Returns the latest news articles for a nav category href (shared with the desktop megamenu) */
  getNewsFor?: (href: string) => NewsArticle[];
  /** Ref of the element that opened the menu — receives focus on close */
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function MobileMenu({
  isOpen,
  onClose,
  links,
  megaMenuContent,
  getNewsFor,
  returnFocusRef,
}: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openSection) {
          setOpenSection(null);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, openSection]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-focus close button when menu opens; reset open section on close
  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => {
        setOpenSection(null);
        returnFocusRef?.current?.focus();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [isOpen, returnFocusRef]);

  const toggleSection = (href: string) => {
    setOpenSection((current) => (current === href ? null : href));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.div
            key="panel"
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[85vw] max-w-sm bg-gsa-navy flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-white/10 flex-shrink-0">
              <span className="text-white font-semibold text-sm">Menu</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-1.5 text-white/60 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav
              className="flex flex-col overflow-y-auto flex-1"
              aria-label="Main navigation"
            >
              <ul role="list" className="p-3 gap-2 flex flex-col">
                {links.map((link, i) => {
                  const section =
                    link.hasDropdown && megaMenuContent
                      ? megaMenuContent[link.href]
                      : undefined;
                  const isExpanded = openSection === link.href;

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055 + 0.1 }}
                    >
                      {section ? (
                        /* ── Accordion trigger ── */
                        <div>
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`mobile-section-${link.href.replace("/", "")}`}
                            onClick={() => toggleSection(link.href)}
                            className="w-full flex items-center justify-between text-white/75 hover:text-white hover:bg-white/10 px-3 py-3.5 rounded-md text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={[
                                "w-4 h-4 flex-shrink-0 transition-transform duration-200 text-white/50",
                                isExpanded ? "rotate-180 text-white" : "",
                              ].join(" ")}
                              aria-hidden="true"
                            />
                          </button>

                          {/* ── Accordion content ── */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                id={`mobile-section-${link.href.replace("/", "")}`}
                                key="accordion"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.25,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-3 pb-5 pt-2 border-l-2 border-white/15 ml-3">
                                  {/* Intro */}
                                  {section.intro && (
                                    <p className="text-[20px] leading-[1.28] font-garamond italic text-usds-steel-500 mb-4">
                                      {section.intro}
                                    </p>
                                  )}

                                  {/* Links — overview + all column links in one list for uniform spacing */}
                                  <ul className="space-y-0.5" role="list">
                                    {section.overview && (
                                      <li>
                                        <Link
                                          href={section.overview.href}
                                          onClick={onClose}
                                          className="inline-flex items-center gap-1.5 text-[15px] font-medium text-white/75 hover:text-white py-1.5 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                                        >
                                          <MoveRight
                                            className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
                                            aria-hidden="true"
                                          />
                                          {section.overview.label}
                                        </Link>
                                      </li>
                                    )}
                                    {section.columns
                                      .flatMap((col) => col.links)
                                      .map((item) => (
                                        <li key={item.href}>
                                          <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="block text-[15px] font-medium text-white/75 hover:text-white py-1.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                                          >
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                                  </ul>

                                  {/* Latest News — mirrors the desktop megamenu column */}
                                  {getNewsFor &&
                                    getNewsFor(link.href).length > 0 && (
                                      <div className="mt-6">
                                        <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-3">
                                          Latest News
                                        </p>
                                        <ul className="space-y-3" role="list">
                                          {getNewsFor(link.href).map(
                                            (article) => (
                                              <li key={article.slug}>
                                                <Link
                                                  href={`/news/${article.slug}`}
                                                  onClick={onClose}
                                                  className="group flex items-start gap-3 text-[14px] leading-[1.3] font-medium text-white/75 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                                                >
                                                  <span className="relative flex-shrink-0 w-14 h-10 overflow-hidden rounded-sm border border-white/10 bg-white/[0.03]">
                                                    {article.image && (
                                                      <Image
                                                        src={article.image}
                                                        alt=""
                                                        fill
                                                        className="object-cover"
                                                        sizes="56px"
                                                      />
                                                    )}
                                                  </span>
                                                  <span className="pt-0.5">
                                                    {article.title}
                                                  </span>
                                                </Link>
                                              </li>
                                            ),
                                          )}
                                        </ul>
                                      </div>
                                    )}

                                  {/* GSA Solutions — mirrors the desktop megamenu chips */}
                                  {getSolutionsFor(link.href).length > 0 && (
                                    <div className="mt-6">
                                      <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-3">
                                        GSA Solutions
                                      </p>
                                      <ul
                                        className="flex flex-wrap gap-2"
                                        role="list"
                                      >
                                        {getSolutionsFor(link.href).map(
                                          (solution) => (
                                            <li key={solution.name}>
                                              <a
                                                href={solution.href}
                                                target={
                                                  solution.href.startsWith(
                                                    "http",
                                                  )
                                                    ? "_blank"
                                                    : undefined
                                                }
                                                rel={
                                                  solution.href.startsWith(
                                                    "http",
                                                  )
                                                    ? "noopener noreferrer"
                                                    : undefined
                                                }
                                                onClick={onClose}
                                                className="flex items-center gap-2 h-9 bg-white/[0.06] border border-white/10 rounded px-3 hover:bg-white/[0.14] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                              >
                                                {solution.srcWhite && (
                                                  <Image
                                                    src={solution.srcWhite}
                                                    alt=""
                                                    className="h-4 w-auto max-w-[64px] object-contain flex-shrink-0"
                                                    sizes="64px"
                                                  />
                                                )}
                                                <span className="text-[12px] font-semibold text-white/85 leading-none">
                                                  {solution.name}
                                                </span>
                                              </a>
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Feature card */}
                                  <div className="mt-6 rounded-sm border border-white/10 overflow-hidden bg-white/[0.03]">
                                    <div className="relative w-full aspect-[16/7]">
                                      <Image
                                        src={section.feature.image.src}
                                        alt={section.feature.image.alt}
                                        fill
                                        className="object-cover object-top"
                                        sizes="85vw"
                                      />
                                    </div>
                                    <div className="p-3 space-y-2">
                                      <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-usds-steel-400">
                                        {section.feature.heading}
                                      </p>
                                      <p className="text-[13px] font-semibold leading-snug tracking-tight text-white">
                                        {section.feature.body}
                                      </p>
                                      <div className="flex flex-col gap-2">
                                        {section.feature.links.map((item) => (
                                          <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onClose}
                                            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-white/75 hover:text-white transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
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
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        /* ── Plain link ── */
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="block text-white/75 hover:text-white hover:bg-white/10 px-3 py-3.5 rounded-md text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer login link */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
              <Link
                href="#"
                onClick={onClose}
                className="block text-center text-white/70 hover:text-white text-sm py-2 transition-colors"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
