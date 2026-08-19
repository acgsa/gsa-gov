"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

/**
 * FaqAccordion — expandable question list for topic subpages.
 * One item open at a time; + toggles to × when expanded.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <ul role="list" className="border-t border-usds-steel-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <li key={item.question} className="border-b border-usds-steel-200">
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
            >
              <span className="text-[15px] font-semibold text-usds-steel-900 leading-snug">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 30 }
                }
                className="flex-shrink-0"
              >
                <Plus
                  className="w-4 h-4 text-usds-steel-500 group-hover:text-usds-steel-800 transition-colors duration-200"
                  aria-hidden="true"
                />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.28, ease: [0.32, 0.72, 0, 1] }
                  }
                  className="overflow-hidden"
                >
                  <p className="text-[14px] leading-relaxed text-usds-steel-600 max-w-[560px] pb-6 -mt-1">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
