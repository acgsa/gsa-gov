"use client";

import Image, { StaticImageData } from "next/image";
import gsaSeal from "@/assets/logo/New.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, MoveRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MobileMenu } from "./MobileMenu";
import { GovBanner } from "./GovBanner";
import { NEWS_ARTICLES } from "@/lib/news-data";
import { getSolutionsFor } from "@/lib/gsa-solutions";
import realEstateFeatured from "@/assets/images/BUILDING/1800FHistoric1.jpg";
import acquisitionFeatured from "@/assets/images/BUILDING/GSA-Building-Blue-scaled.jpg";
import technologyFeatured from "@/assets/images/TECH/photo-1684139517679-032b7213ad2e.avif";
import employeesFeatured from "@/assets/images/ED/Take Your Child to Work Day 2026-7-Slide1.jpg";
import aboutFeatured from "@/assets/images/HISTORY/president-harry-s-truman-seated-at-his-desk-holding-a-pencil-getty.avif";
import mediaFeatured from "@/assets/images/ACCOUNTABILITY/watercolor.jpg";

export const navLinks = [
  { label: "Real Estate", href: "/real-estate", hasDropdown: true },
  { label: "Acquisition", href: "/acquisition", hasDropdown: true },
  { label: "Technology", href: "/technology", hasDropdown: true },
  { label: "Resources", href: "/employees", hasDropdown: true },
  { label: "Media", href: "/media", hasDropdown: true },
];

/**
 * Maps a nav category href to the `category` labels used in NEWS_ARTICLES so
 * the megamenu can surface the latest stories for that line of business.
 */
const NEWS_CATEGORY_MAP: Record<string, string[]> = {
  "/real-estate": ["Real Estate"],
  "/acquisition": ["Acquisition", "Fraud Prevention"],
  "/technology": ["Technology"],
  "/employees": ["Travel", "Fleet"],
  "/media": ["Real Estate", "Acquisition", "Technology"],
};

/**
 * Returns news articles for a nav category href. For single-category menus this
 * is simply the most recent stories in that category. For the multi-category
 * Media menu we round-robin across the mapped categories so the three cards are
 * a varied mix (one per line of business) rather than three from the same one.
 */
function getLatestNewsFor(href: string, limit = 3) {
  // eslint-disable-next-line security/detect-object-injection -- `href` is an internal, developer-defined nav route string, not user input.
  const categories = NEWS_CATEGORY_MAP[href];
  // Only surface articles that have a hero image — megamenu thumbnails always show a photo.
  const withImage = NEWS_ARTICLES.filter((a) => Boolean(a.image));

  if (!categories) return withImage.slice(0, limit);

  if (categories.length <= 1) {
    return withImage
      .filter((a) => categories.includes(a.category))
      .slice(0, limit);
  }

  // Multi-category: take one article per category in order, cycling until we
  // reach the limit, so the mix stays diverse instead of front-loading one LOB.
  const byCategory = categories.map((cat) =>
    withImage.filter((a) => a.category === cat),
  );
  const picked: typeof NEWS_ARTICLES = [];
  let round = 0;
  while (picked.length < limit) {
    let addedThisRound = false;
    for (const bucket of byCategory) {
      if (picked.length >= limit) break;
      // eslint-disable-next-line security/detect-object-injection -- `round` is a locally-controlled loop index over an in-memory array.
      const article = bucket[round];
      if (article) {
        picked.push(article);
        addedThisRound = true;
      }
    }
    if (!addedThisRound) break;
    round += 1;
  }
  return picked;
}

export const megaMenuContent: Record<
  string,
  {
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
> = {
  "/real-estate": {
    overview: { label: "Explore all Real Estate", href: "/real-estate" },
    columns: [
      {
        heading: "",
        links: [
          { label: "Lease Space", href: "/real-estate/leasing" },
          { label: "Property for Sale", href: "/real-estate/sales" },
          { label: "Construction", href: "/real-estate/design-construction" },
        ],
      },
      {
        heading: "",
        links: [
          { label: "Portfolio Tools", href: "/real-estate/portfolio" },
          { label: "Preservation", href: "/preservation" },
        ],
      },
    ],
    feature: {
      heading: "Featured",
      body: "See the latest revitalization progress at 1800 F Street, GSA's flagship headquarters transformation.",
      links: [{ label: "Watch Livestream", href: "/1800f" }],
      image: {
        src: realEstateFeatured,
        alt: "Still from livestream of 1800 F Street NW, Washington, DC, showing the historic building",
      },
    },
  },
  "/acquisition": {
    overview: { label: "Explore all Acquisition", href: "/acquisition" },
    columns: [
      {
        heading: "",
        links: [
          { label: "Buy Products", href: "/acquisition/buy-products" },
          {
            label: "Sell to Government",
            href: "/acquisition/sell-to-government",
          },
          {
            label: "Assisted Acquisition",
            href: "/acquisition/assisted-acquisition",
          },
        ],
      },
      {
        heading: "",
        links: [
          { label: "Policy", href: "/acquisition/policy" },
          { label: "Schedules", href: "/acquisition/schedules" },
        ],
      },
    ],
    feature: {
      heading: "Featured",
      body: "OneGov: a single, government-wide approach to buying that delivers better prices and terms for taxpayers.",
      links: [{ label: "Learn about OneGov", href: "/acquisition/onegov" }],
      image: {
        src: acquisitionFeatured,
        alt: "GSA headquarters building in Washington, DC",
      },
    },
  },
  "/technology": {
    overview: { label: "Explore all Technology", href: "/technology" },
    columns: [
      {
        heading: "",
        links: [
          { label: "Artificial Intelligence", href: "/technology/ai" },
          { label: "Information Technology", href: "/technology/it" },
          { label: "Shared Services", href: "/technology/services" },
        ],
      },
      {
        heading: "",
        links: [
          { label: "TTS", href: "/technology/tts" },
          { label: "Powered by GSA", href: "/technology/platforms" },
        ],
      },
    ],
    feature: {
      heading: "Featured",
      body: "See updates on federal shared services.",
      links: [{ label: "Explore Shared Services", href: "/technology" }],
      image: {
        src: technologyFeatured,
        alt: "Abstract technology visualization representing cloud modernization",
      },
    },
  },
  "/employees": {
    overview: { label: "Explore Resources", href: "/employees" },
    columns: [
      {
        links: [
          { label: "GO.gov", href: "https://go.gov" },
          { label: "GSA Fleet", href: "/employees/fleet" },
        ],
      },
      {
        links: [
          {
            label: "Training & Policies",
            href: "/employees/training-policies",
          },
          { label: "Leadership", href: "/resources/leadership" },
          { label: "About GSA", href: "/about-gsa" },
        ],
      },
    ],
    feature: {
      body: "Find key tools and service updates designed for employees and mission support teams.",
      links: [{ label: "Open InSite", href: "/employees" }],
      image: {
        src: employeesFeatured,
        alt: "Federal employees participating in a workplace program",
      },
    },
  },
  "/media": {
    overview: { label: "Explore all Media", href: "/media" },
    columns: [
      {
        links: [
          { label: "Latest News", href: "/news" },
          { label: "Photo Gallery", href: "/media/photos" },
          { label: "Video Library", href: "/media/video" },
        ],
      },
      {
        links: [
          { label: "Press Releases", href: "/media/press-releases" },
          { label: "Brand", href: "/media/brand" },
        ],
      },
    ],
    feature: {
      heading: "Featured",
      body: "Track the wasteful spending GSA has identified and eliminated on behalf of American taxpayers.",
      links: [{ label: "See the savings", href: "/savings" }],
      image: {
        src: mediaFeatured,
        alt: "Watercolor illustration representing GSA taxpayer savings and accountability",
      },
    },
  },
};

/** Predictive search suggestions — static set; replace with API call when available */
const SEARCH_SUGGESTIONS = [
  "Per diem rates",
  "GSA Fleet vehicles",
  "FedRAMP authorization",
  "1800 F Street renovation",
  "Historic preservation",
  "Travel reimbursement",
  "Small business opportunities",
  "Category management",
  "Login.gov integration",
  "Real estate leasing",
];

/**
 * Inline search that animates open horizontally (width 0 → 100%) directly
 * over the nav links, occupying only the width of the center nav column.
 * The predictive-suggestions panel drops below and is aligned to the same
 * column edges.
 */
function NavSearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered =
    query.trim().length > 0
      ? SEARCH_SUGGESTIONS.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 6)
      : [];

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 180);
    return () => {
      clearTimeout(t);
      setQuery("");
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="nav-search-overlay"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          /* Anchored to the right edge of the center column (where the search
             icon lives) and wipes open leftward across the nav links. Pinned to
             the vertical center so the input row lines up with the nav links,
             while the suggestions panel grows downward. */
          className="absolute right-0 top-1/2 -translate-y-1/2 z-50 overflow-visible bg-gsa-navy"
          aria-label="Site search"
        >
          <div className="h-[36px] flex items-center gap-2 pl-1 pr-1 min-w-0">
            <Search
              className="w-4 h-4 text-white/50 flex-shrink-0"
              aria-hidden="true"
            />
            <form
              role="search"
              className="flex-1 min-w-0"
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                }
              }}
            >
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search GSA.gov…"
                aria-label="Search GSA.gov"
                className="w-full bg-transparent text-white placeholder:text-white/35 text-[14px] outline-none border-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                autoComplete="off"
              />
            </form>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="p-1.5 text-white/50 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Predictive suggestions — drop below, matched to overlay width */}
          <AnimatePresence>
            {filtered.length > 0 && (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 right-0 top-full bg-gsa-navy"
              >
                <ul
                  role="listbox"
                  aria-label="Search suggestions"
                  className="py-1.5 px-1.5"
                >
                  {filtered.map((suggestion) => (
                    <li key={suggestion} role="option" aria-selected={false}>
                      <button
                        type="button"
                        className="w-full text-left flex items-center gap-3 px-2.5 py-2 text-[14px] text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                        onClick={() => {
                          window.location.href = `/search?q=${encodeURIComponent(suggestion)}`;
                        }}
                      >
                        <Search
                          className="w-3.5 h-3.5 flex-shrink-0 text-white/30"
                          aria-hidden="true"
                        />
                        <span className="truncate">{suggestion}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Mobile/tablet inline search that animates open vertically (height 0 → auto)
 * directly below the header row, mirroring the desktop overlay behavior.
 */
function MobileSearchField({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered =
    query.trim().length > 0
      ? SEARCH_SUGGESTIONS.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 6)
      : [];

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 180);
    return () => {
      clearTimeout(t);
      setQuery("");
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-search-field"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden overflow-hidden bg-gsa-navy"
          aria-label="Site search"
        >
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 bg-white/5 rounded px-3 py-2">
              <Search
                className="w-4 h-4 text-white/50 flex-shrink-0"
                aria-hidden="true"
              />
              <form
                role="search"
                className="flex-1 min-w-0"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (query.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                  }
                }}
              >
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search GSA.gov…"
                  aria-label="Search GSA.gov"
                  className="w-full bg-transparent text-white placeholder:text-white/35 text-[15px] outline-none border-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                  autoComplete="off"
                />
              </form>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1 text-white/50 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Predictive suggestions */}
            <AnimatePresence>
              {filtered.length > 0 && (
                <motion.ul
                  key="mobile-suggestions"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  role="listbox"
                  aria-label="Search suggestions"
                  className="mt-1.5"
                >
                  {filtered.map((suggestion) => (
                    <li key={suggestion} role="option" aria-selected={false}>
                      <button
                        type="button"
                        className="w-full text-left flex items-center gap-3 px-2.5 py-2.5 text-[15px] text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                        onClick={() => {
                          window.location.href = `/search?q=${encodeURIComponent(suggestion)}`;
                        }}
                      >
                        <Search
                          className="w-3.5 h-3.5 flex-shrink-0 text-white/30"
                          aria-hidden="true"
                        />
                        <span className="truncate">{suggestion}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MainNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [chromeHeight, setChromeHeight] = useState(0);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const hoverLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverEnterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** True when the current route is within the given nav section */
  const isSectionActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  /* Measure sticky chrome height so the backdrop starts below it */
  useEffect(() => {
    const chrome = document.getElementById("site-chrome");
    if (!chrome) return;
    const obs = new ResizeObserver(() => setChromeHeight(chrome.offsetHeight));
    obs.observe(chrome);
    const raf = requestAnimationFrame(() =>
      setChromeHeight(chrome.offsetHeight),
    );
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  /** Open megamenu after a 300 ms delay so fast mouse travel doesn't trigger it */
  const openMenu = (href: string) => {
    if (hoverLeaveTimer.current) {
      clearTimeout(hoverLeaveTimer.current);
      hoverLeaveTimer.current = null;
    }
    if (hoverEnterTimer.current) {
      clearTimeout(hoverEnterTimer.current);
    }
    hoverEnterTimer.current = setTimeout(() => setActiveMenu(href), 300);
  };

  const cancelOpen = () => {
    if (hoverEnterTimer.current) {
      clearTimeout(hoverEnterTimer.current);
      hoverEnterTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelOpen();
    hoverLeaveTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  // eslint-disable-next-line security/detect-object-injection -- `activeMenu` is an internal, developer-defined nav-section key (from `navLinks`), not user input.
  const menuData = activeMenu ? megaMenuContent[activeMenu] : null;

  return (
    <>
      {/* ─── MOBILE: gov banner + header row ─── */}
      <div className="lg:hidden">
        <GovBanner />
      </div>
      {/* ─── MOBILE header row: hamburger left · seal+title center · search right ─── */}
      <div className="lg:hidden bg-gsa-navy px-3 py-2 flex items-start gap-2">
        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          className="p-1.5 text-white/70 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 mt-0.5"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Center: seal inline-left of wordmark — min-w-0 allows text to wrap on 320px */}
        <div className="flex-1 flex items-center gap-3 min-w-0 justify-center">
          <Link
            href="/"
            className="flex items-center gap-3 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            aria-label="Go to GSA homepage"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/New.svg"
              alt="GSA Seal"
              className="w-10 h-10 object-contain drop-shadow-md flex-shrink-0"
            />
            <span className="font-garamond text-white font-semibold text-base sm:text-xl leading-tight tracking-wide min-w-0 break-words text-center">
              U.S. General Services Administration
            </span>
          </Link>
        </div>

        {/* Search — opens inline search field */}
        <button
          type="button"
          onClick={() => setMobileSearchOpen((prev) => !prev)}
          className="p-1.5 text-white/60 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex-shrink-0 mt-0.5"
          aria-label={mobileSearchOpen ? "Close search" : "Search GSA.gov"}
          aria-expanded={mobileSearchOpen}
        >
          <Search className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* ─── MOBILE inline search field — animates open like desktop ─── */}
      <MobileSearchField
        isOpen={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      />

      {/* ─── DESKTOP nav bar ─── */}
      <nav
        ref={desktopNavRef}
        className="hidden lg:block relative z-40 bg-transparent"
        aria-label="Main navigation"
      >
        {/* Nav row — the collapsed-state seal now lives in the topbar
            (SiteHeader renders a slim seal + wordmark bar when
            scrolled), so this row is a simple centered flex row. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[38px] flex items-center justify-center">
          {/* Nav links wrapper — shrinks to the nav items' width so the search
              overlay (width: 100% of this wrapper) spans only the nav items. */}
          <div className="relative">
            {/* Search overlay — wipes open over the nav links, matched to their width */}
            <NavSearchOverlay
              isOpen={searchOpen}
              onClose={() => setSearchOpen(false)}
            />

            <ul
              className={[
                "flex items-center justify-center gap-0.5 transition-opacity duration-150",
                searchOpen ? "opacity-0 pointer-events-none" : "opacity-100",
              ].join(" ")}
              role="list"
            >
              {navLinks.map((link) => {
                const active = isSectionActive(link.href);
                return (
                  <li
                    key={link.href}
                    className="flex-shrink-0"
                    onMouseEnter={() => link.hasDropdown && openMenu(link.href)}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={link.href}
                      className={[
                        "group flex items-center text-base font-medium px-3 py-1.5 rounded transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                        active
                          ? "text-white"
                          : "text-usds-steel-400 hover:text-white",
                      ].join(" ")}
                      aria-expanded={
                        link.hasDropdown ? activeMenu === link.href : undefined
                      }
                      aria-controls={
                        link.hasDropdown ? "desktop-mega-menu" : undefined
                      }
                      aria-haspopup={link.hasDropdown ? "true" : undefined}
                      aria-current={active ? "true" : undefined}
                      onClick={() => setActiveMenu(null)}
                    >
                      <span
                        className={activeMenu === link.href ? "text-white" : ""}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}

              {/* Search button — after About */}
              <li className="flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu(null);
                    setSearchOpen((prev) => !prev);
                  }}
                  aria-label={searchOpen ? "Close search" : "Open search"}
                  aria-expanded={searchOpen}
                  className="group flex items-center gap-1 text-base font-medium px-3 py-1.5 rounded transition-colors duration-200 text-usds-steel-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Search
                    className="w-4 h-4 flex-shrink-0 transition-colors duration-200 group-hover:text-white"
                    aria-hidden="true"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {activeMenu && menuData && (
          <>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setActiveMenu(null)}
              className="fixed inset-x-0 bottom-0 z-[-1] bg-gsa-navy/55"
              style={{ top: chromeHeight }}
            />

            <div
              id="desktop-mega-menu"
              className="absolute left-0 right-0 top-full bg-gsa-navy text-white border-t border-white/10 shadow-[0_22px_50px_rgba(0,0,0,0.55)]"
              onMouseEnter={() => {
                cancelOpen();
                if (hoverLeaveTimer.current) {
                  clearTimeout(hoverLeaveTimer.current);
                  hoverLeaveTimer.current = null;
                }
              }}
              onMouseLeave={scheduleClose}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-[88px] lg:pt-8 lg:pb-[104px] xl:pt-10 xl:pb-[116px] grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-x-10 lg:gap-y-8">
                <div className="pr-2 lg:col-start-1 flex flex-col gap-6">
                  <div>
                    <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-4">
                      Navigation
                    </p>
                    <ul className="space-y-2.5" role="list">
                      {menuData.overview && (
                        <li>
                          <Link
                            href={menuData.overview.href}
                            className="inline-flex items-center gap-1.5 py-1.5 lg:py-2 text-[15px] font-medium text-white/75 hover:text-white transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                            onClick={() => setActiveMenu(null)}
                          >
                            <MoveRight
                              className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
                              aria-hidden="true"
                            />
                            {menuData.overview.label}
                          </Link>
                        </li>
                      )}
                      {menuData.columns
                        .flatMap((column) => column.links)
                        .map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block max-w-[700px] py-1.5 lg:py-2 text-[15px] leading-[1.12] font-medium text-white/75 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                              onClick={() => setActiveMenu(null)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* Latest News column — recent stories for this category */}
                <div className="lg:col-start-2">
                  <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-4">
                    Latest News
                  </p>
                  <ul className="space-y-3" role="list">
                    {getLatestNewsFor(activeMenu).map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/news/${article.slug}`}
                          className="group flex items-start gap-3 py-1 text-[15px] leading-[1.25] font-medium text-white/75 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                          onClick={() => setActiveMenu(null)}
                        >
                          <span className="relative flex-shrink-0 w-16 h-12 overflow-hidden rounded-sm border border-white/10 bg-white/[0.03]">
                            {article.image && (
                              <Image
                                src={article.image}
                                alt=""
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="64px"
                              />
                            )}
                          </span>
                          <span className="pt-0.5">{article.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* GSA Solutions — platform logos for this category */}
                  {getSolutionsFor(activeMenu).length > 0 && (
                    <div className="mt-8">
                      <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-4">
                        GSA Solutions
                      </p>
                      <ul className="flex flex-wrap gap-2" role="list">
                        {getSolutionsFor(activeMenu).map((solution) => (
                          <li key={solution.name}>
                            <a
                              href={solution.href}
                              target={
                                solution.href.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                solution.href.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              onClick={() => setActiveMenu(null)}
                              className="inline-flex items-center gap-2 h-9 bg-white/[0.06] border border-white/10 rounded px-3 hover:bg-white/[0.14] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                              {solution.srcWhite && (
                                <Image
                                  src={solution.srcWhite}
                                  alt=""
                                  className={`${solution.wide ? "h-3" : "h-4"} w-auto max-w-[64px] object-contain flex-shrink-0`}
                                  sizes="64px"
                                />
                              )}
                              <span className="text-[12px] font-semibold text-white/85 leading-none">
                                {solution.name}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="lg:col-start-3">
                  {menuData.feature.heading && (
                    <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-4">
                      {menuData.feature.heading}
                    </p>
                  )}

                  <div className="max-w-[700px] flex flex-col gap-4">
                    <div className="relative w-full aspect-[3/2] overflow-hidden rounded-sm border border-white/10">
                      <Image
                        src={menuData.feature.image.src}
                        alt={menuData.feature.image.alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>

                    <p className="text-[16px] lg:text-[18px] leading-[1.4] tracking-tight font-semibold text-white">
                      {menuData.feature.body}
                    </p>

                    <div className="flex gap-6">
                      {menuData.feature.links.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="inline-flex items-center gap-1.5 text-[15px] font-medium text-white/75 hover:text-white transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                          onClick={() => setActiveMenu(null)}
                        >
                          <MoveRight
                            className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
                            aria-hidden="true"
                          />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        returnFocusRef={hamburgerRef}
        links={navLinks}
        megaMenuContent={megaMenuContent}
        getNewsFor={getLatestNewsFor}
      />
    </>
  );
}
