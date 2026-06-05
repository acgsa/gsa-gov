"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
            className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-gsa-navy flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-white/10 flex-shrink-0">
              <span className="text-white font-semibold text-sm">Menu</span>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-white/60 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Nav links — staggered fade-in */}
            <nav className="flex flex-col p-3 gap-0.5 overflow-y-auto">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block text-white/80 hover:text-white hover:bg-white/10 px-3 py-3.5 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer login link */}
            <div className="mt-auto p-4 border-t border-white/10">
              <Link
                href="/login"
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
