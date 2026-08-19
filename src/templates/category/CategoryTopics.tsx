"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import type { CategoryTopic } from "@/templates/categoryAccents";

export interface CategoryTopicsProps {
  /** Retained for API compatibility — no longer rendered (eyebrow just reads "Explore") */
  section?: string;
  topics: CategoryTopic[];
  /** Retained for API compatibility — no longer affects visual styling */
  accent?: string;
}

/**
 * CategoryTopics — "Explore" card grid per the category landing redesign:
 * centered eyebrow on a light steel ground, white rounded cards with an
 * image on top, title, body, and a "Learn more →" link.
 *
 * Cards flow in a 2-column grid; an odd final card is centered on its own
 * row. Cards lift on hover via a Framer Motion spring (reduced-motion safe).
 */
export function CategoryTopics({ topics }: CategoryTopicsProps) {
  const hasOddLast = topics.length % 2 === 1;

  return (
    <section aria-labelledby="explore-heading" className="bg-usds-steel-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <Reveal y={16}>
          <p
            id="explore-heading"
            className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 text-center mb-10 lg:mb-12"
          >
            Explore
          </p>
        </Reveal>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {topics.map((topic, i) => {
            const isOddLast = hasOddLast && i === topics.length - 1;
            return (
              <Reveal
                as="li"
                key={topic.href}
                delay={0.04 * i}
                className={
                  isOddLast
                    ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1rem)]"
                    : undefined
                }
              >
                <TopicCard topic={topic} />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * TopicCard — shared white image card used by the category landing grid and
 * the TopicPage subpage template. CTA text is configurable per card.
 */
export function TopicCard({
  topic,
  ctaText = "Learn more",
}: {
  topic: CategoryTopic;
  ctaText?: string;
}) {
  // Photo cards render the top image full-bleed to the card edges; the card's
  // rounded corners are preserved via overflow-hidden and the text region keeps
  // its inset padding. Logo ("contain") cards keep the padded treatment.
  const isBleed = topic.imageStyle !== "contain";

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(28,31,34,0.10)" }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="h-full rounded-xl"
    >
      <Link
        href={topic.href}
        className={
          isBleed
            ? "group flex flex-col h-full rounded-xl bg-white overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue"
            : "group flex flex-col h-full rounded-xl bg-white p-5 lg:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue"
        }
      >
        {/* Card image */}
        {topic.src && (
          <div
            className={
              isBleed
                ? "relative aspect-[16/10] w-full overflow-hidden"
                : "relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-5"
            }
          >
            {topic.imageStyle === "contain" ? (
              <div className="absolute inset-0 bg-white flex items-center justify-center px-10 py-6">
                <Image
                  src={topic.src}
                  alt={topic.alt ?? ""}
                  width={260}
                  height={130}
                  className="object-contain max-h-[130px] w-auto"
                />
              </div>
            ) : (
              <Image
                src={topic.src}
                alt={topic.alt ?? ""}
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
          </div>
        )}

        {/* Text region — keeps inset padding even when the image bleeds */}
        <div
          className={isBleed ? "flex flex-col flex-1 p-5 lg:p-6" : "contents"}
        >
          {/* Headline */}
          <h3 className="font-geist font-semibold text-usds-steel-900 text-[17px] leading-snug mb-2 transition-colors duration-200 group-hover:text-usds-steel-700">
            {topic.title}
          </h3>

          {/* Body */}
          <p className="text-usds-steel-600 text-[14px] leading-relaxed">
            {topic.body}
          </p>

          {/* CTA */}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium mt-5 text-usds-steel-700 transition-colors duration-200 group-hover:text-usds-steel-900">
            {ctaText}
            <MoveRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
