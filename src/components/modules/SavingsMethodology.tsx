/**
 * SavingsMethodology — accordion-style section explaining how savings figures
 * are calculated, sourced, and audited.
 *
 * Client component — single-open accordion with an animated drawer
 * (framer-motion height/opacity transition). Only one item is open at a time.
 */
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const items: AccordionItem[] = [
  {
    id: "how-calculated",
    question: "How are savings figures calculated?",
    answer: (
      <>
        <p>
          Savings are calculated using GSA&apos;s internal financial management
          systems and cross-validated against OMB MAX reporting. Each figure
          represents the delta between the projected baseline cost of continuing
          prior operating approaches versus the actual cost under reformed
          practices.
        </p>
        <p className="mt-3">
          Deferred maintenance avoidance figures are based on the Federal Real
          Property Profile (FRPP) database, which tracks the estimated cost to
          bring each property into acceptable condition. When a property is
          disposed, its deferred maintenance backlog is removed from the
          government&apos;s liability.
        </p>
      </>
    ),
  },
  {
    id: "audited",
    question: "Are these numbers independently audited?",
    answer: (
      <p>
        Yes. All figures published on this dashboard are reviewed by GSA&apos;s
        Office of Inspector General (OIG) on a quarterly basis. The OIG provides
        an independent assessment of methodology and validates reported savings
        against source documentation. Audit reports are published at{" "}
        <span className="text-gsa-savings">gsaig.gov</span>.
      </p>
    ),
  },
  {
    id: "fraud",
    question: "What counts as fraud prevention savings?",
    answer: (
      <p>
        Fraud prevention savings represent improper payments identified and
        halted before disbursement, as well as funds recovered from vendors
        found to have engaged in billing fraud, product substitution, or
        contract misrepresentation. Figures are reported to the Interagency
        Suspension and Debarment Committee (ISDC) and OMB in accordance with the
        Improper Payments Elimination and Recovery Improvement Act (IPERIA).
      </p>
    ),
  },
  {
    id: "real-time",
    question: "Why does the counter update in real time?",
    answer: (
      <p>
        The live counter is an illustrative representation of the ongoing rate
        of taxpayer savings. The increment rate is derived from the most recent
        quarterly savings figure divided by the number of seconds in a quarter.
        The counter resets to the audited baseline on the first day of each
        quarter. It is not a direct database feed but is calibrated to reflect
        the best available estimate of the rate at which value is being
        delivered.
      </p>
    ),
  },
  {
    id: "acquisition",
    question: "How are acquisition savings measured?",
    answer: (
      <p>
        Acquisition savings are measured using the Price Reductions Achieved
        (PRA) methodology endorsed by the Category Management Leadership
        Council. Savings are calculated as the difference between the
        government-wide average price and the price achieved through GSA
        Schedule or governmentwide acquisition contracts (GWACs), multiplied by
        the volume purchased. This methodology is consistent with OMB Memorandum
        M-19-13.
      </p>
    ),
  },
  {
    id: "data-sources",
    question: "Where can I access the underlying data?",
    answer: (
      <>
        <p>
          The underlying data sources for this dashboard are publicly available:
        </p>
        <ul className="mt-3 space-y-1.5 list-none">
          {[
            "Federal Real Property Profile (FRPP) — SAM.gov",
            "USASpending.gov — contract and award data",
            "MAX.gov — OMB budget and performance data",
            "GSA OIG Audit Reports — gsaig.gov",
            "Interagency Suspension and Debarment Committee Reports — sam.gov/reports",
          ].map((source) => (
            <li key={source} className="flex items-start gap-2 text-white/50">
              <span
                className="mt-1.5 w-1 h-1 rounded-full bg-gsa-savings flex-shrink-0"
                aria-hidden="true"
              />
              {source}
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

export function SavingsMethodology() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      aria-label="Savings methodology and data sources"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/30 mb-2">
          Methodology
        </p>
        <h2 className="font-garamond text-3xl sm:text-4xl font-semibold text-white leading-tight">
          How We Count It
        </h2>
        <p className="mt-3 text-[15px] text-white/50 leading-relaxed max-w-2xl">
          Transparency is foundational to accountability. Every figure on this
          page follows a documented, independently reviewed methodology.
        </p>
      </div>

      {/* Accordion items — single-open, animated drawer */}
      <div className="divide-y divide-white/[0.07]" role="list">
        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} role="listitem" className="py-1">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`methodology-${item.id}`}
                  id={`methodology-trigger-${item.id}`}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-white/80 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-savings rounded"
                >
                  <span>{item.question}</span>
                  {/* Chevron — rotates when open */}
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 flex-shrink-0 text-white/30"
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`methodology-${item.id}`}
                    role="region"
                    aria-labelledby={`methodology-trigger-${item.id}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.2, ease: "easeInOut" },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 text-[14px] text-white/50 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer note — data transparency callout */}
      <div className="mt-8 border-t border-white/[0.06] pt-6">
        <p className="text-[13px] text-white/40 leading-relaxed">
          All savings figures are current as of Q2 FY2026 and are subject to
          revision as audits are completed. Figures are independently audited by
          the GSA Office of Inspector General. Data sourced from GSA financial
          management systems, OMB MAX, USASpending.gov, and the Federal Real
          Property Profile. This page is updated quarterly.
        </p>
        <p className="mt-3 text-[12px] text-white/30">
          Last audited: Q2 FY2026 · Next update: October 1, 2026 · Questions?{" "}
          <a
            href="mailto:transparency@gsa.gov"
            className="underline underline-offset-2 hover:text-white/50 transition-colors"
          >
            transparency@gsa.gov
          </a>
        </p>
      </div>
    </section>
  );
}
