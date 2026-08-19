"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GsaSolution } from "@/lib/gsa-solutions";

export interface SolutionsStripProps {
  solutions: GsaSolution[];
  /** Section eyebrow — defaults to "GSA Solutions" */
  heading?: string;
  /** Larger card treatment (fewer columns, bigger logos and type) */
  large?: boolean;
}

/**
 * SolutionsStrip — grid of GSA platform/solution chips.
 * Each chip (logo + name) is the outbound link; the description is plain
 * text beneath it. Cards lift on hover like the TopicPage cards.
 */
export function SolutionsStrip({
  solutions,
  heading = "GSA Solutions",
  large = false,
}: SolutionsStripProps) {
  if (solutions.length === 0) return null;

  return (
    <section aria-label={heading} className="py-12">
      <div
        className={
          large
            ? "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
            : "mx-auto max-w-[84rem] px-8"
        }
      >
        {!large && (
          <h2 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-6">
            {heading}
          </h2>
        )}
        <ul
          role="list"
          className={
            large
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          }
        >
          {solutions.map((solution) => (
            <li key={solution.name} className="h-full">
              <motion.div
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(28,31,34,0.10)",
                }}
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
                className={`h-full flex flex-col bg-white rounded-lg border border-usds-steel-200 ${
                  large ? "p-7" : "p-5"
                }`}
              >
                <a
                  href={solution.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
                >
                  <span
                    className={`flex items-center ${large ? "h-32" : "h-12"}`}
                  >
                    {solution.src ? (
                      <Image
                        src={solution.src}
                        alt=""
                        className={`w-auto max-w-full object-contain object-left ${
                          large
                            ? (solution.logoHeight ??
                              (solution.wide ? "h-20" : "h-28"))
                            : solution.wide
                              ? "h-7"
                              : "h-10"
                        }`}
                        sizes={large ? "320px" : "160px"}
                      />
                    ) : (
                      <span
                        className={`font-geist font-bold tracking-tight text-gsa-navy ${
                          large ? "text-[44px]" : "text-[24px]"
                        }`}
                        aria-hidden="true"
                      >
                        {solution.name}
                      </span>
                    )}
                  </span>
                  <span
                    className={`font-semibold text-usds-steel-900 leading-snug group-hover:text-usds-steel-600 transition-colors duration-150 ${
                      large ? "text-[17px]" : "text-[14px]"
                    }`}
                  >
                    {solution.name}
                  </span>
                </a>
                <p
                  className={`mt-1.5 leading-relaxed text-usds-steel-600 ${
                    large ? "text-[14px]" : "text-[13px]"
                  }`}
                >
                  {solution.description}
                </p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
