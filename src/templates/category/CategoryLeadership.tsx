"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import type { CategoryLeader } from "@/templates/categoryAccents";

export interface CategoryLeadershipProps {
  section?: string;
  leadership: CategoryLeader[];
  /** Retained for API compatibility — no longer affects visual styling */
  accent?: string;
  /** Optional override for the section heading */
  heading?: string;
}

/**
 * CategoryLeadership — editorial leadership grid anchored to the bottom of a
 * category page.
 *
 * Uses Steel palette throughout (no per-category accent color). Portrait images
 * are sourced from `src/leadership/` — drop files there and pass the import as
 * `photoSrc`. Falls back to an initials avatar on load failure or absence.
 * Cards lift on hover via Framer Motion spring (reduced-motion safe via CSS).
 */
export function CategoryLeadership({
  section,
  leadership,
  heading,
}: CategoryLeadershipProps) {
  if (leadership.length === 0) return null;

  return (
    <section
      aria-labelledby="leadership-heading"
      className="bg-usds-steel-50 pb-24 lg:pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-16 lg:pb-24">
        {(section || heading) && (
          <Reveal y={16}>
            <div className="mb-10 lg:mb-14">
              {section && (
                <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-2">
                  {section}
                </p>
              )}
              <h2
                id="leadership-heading"
                className="font-geist text-usds-steel-900 text-2xl lg:text-3xl font-semibold tracking-[-0.01em]"
              >
                {heading ?? "Leadership"}
              </h2>
            </div>
          </Reveal>
        )}

        <ul
          role="list"
          className={`grid grid-cols-1 gap-6 lg:gap-8 ${
            leadership.length === 1
              ? "sm:grid-cols-1 max-w-md"
              : leadership.length === 2
                ? "sm:grid-cols-2"
                : leadership.length === 4
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {leadership.map((leader, i) => (
            <Reveal as="li" key={leader.name} delay={0.05 * i}>
              <LeaderCard leader={leader} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LeaderCard({ leader }: { leader: CategoryLeader }) {
  const inner = (
    <>
      <LeaderAvatar leader={leader} />
      <div className="mt-5">
        <h3 className="font-geist font-semibold text-usds-steel-900 text-lg leading-snug transition-colors duration-200 group-hover:text-usds-steel-700">
          {leader.name}
        </h3>
        <p className="text-[14px] text-usds-steel-600 leading-relaxed mt-1">
          {leader.title}
        </p>
        {leader.href && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium mt-4 text-usds-steel-700 transition-colors duration-200 group-hover:text-usds-steel-900">
            View bio
            <MoveRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        )}
      </div>
    </>
  );

  const shared =
    "group relative flex flex-col h-full rounded-lg border border-usds-steel-200 bg-white p-7";

  if (leader.href) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(28,31,34,0.10)" }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        className="h-full rounded-lg"
      >
        <Link
          href={leader.href}
          className={`${shared} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue`}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(28,31,34,0.10)" }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="h-full rounded-lg"
    >
      <div className={shared}>{inner}</div>
    </motion.div>
  );
}

function LeaderAvatar({ leader }: { leader: CategoryLeader }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-usds-steel-100">
      {leader.photoSrc && !failed ? (
        <Image
          src={leader.photoSrc}
          alt={`Portrait of ${leader.name}`}
          fill
          sizes="80px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <Image
          src="/logo/New.svg"
          alt=""
          fill
          sizes="80px"
          className="object-contain scale-90"
        />
      )}
    </div>
  );
}
