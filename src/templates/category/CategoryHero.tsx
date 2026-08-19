import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryStatValue } from "@/templates/category/CategoryStatValue";
import type { CategoryStat } from "@/templates/categoryAccents";

export interface CategoryHeroProps {
  section: string;
  title: string;
  intro: string;
  heroSrc?: string | StaticImageData;
  heroAlt?: string;
  /** Retained for API compatibility — no longer affects visual styling */
  accent?: string;
  stats?: CategoryStat[];
}

/**
 * CategoryHero — full-bleed image hero per the category landing redesign.
 *
 * Layout:
 *   – full-width background image with a dark scrim (WCAG 2.1 AA contrast)
 *   – bottom-left overlay: eyebrow pill (darkens + blurs its backdrop),
 *     Garamond H1, and intro paragraph
 *   – full-width navy stat band anchoring the hero (4-up grid)
 */
export function CategoryHero({
  section,
  title,
  intro,
  heroSrc,
  heroAlt = "",
  stats = [],
}: CategoryHeroProps) {
  return (
    <header>
      {/* ── Full-bleed image hero ── */}
      <div
        className="relative overflow-hidden bg-gsa-navy"
        style={{ height: "clamp(380px, 55vh, 620px)" }}
      >
        {heroSrc && (
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-110"
          />
        )}

        {/* Scrim — flat darkening plus a light left-to-right gradient,
            heaviest behind the bottom-left text block */}
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/5"
        />

        {/* ── Bottom-left overlay ── */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
            <Reveal y={16}>
              <p className="inline-flex items-center rounded-sm bg-black/25 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-white mb-5">
                {section}
              </p>
            </Reveal>
            <Reveal y={22} delay={0.05}>
              <h1
                className="font-garamond text-white text-4xl leading-[1.14] sm:text-5xl lg:text-[56px] lg:leading-[64px] tracking-normal drop-shadow-lg max-w-[700px] mb-4"
                style={{ fontWeight: 474 }}
              >
                {title}
              </h1>
            </Reveal>
            <Reveal y={22} delay={0.12}>
              <p className="text-white/85 text-[15px] lg:text-base leading-relaxed max-w-[600px]">
                {intro}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Stat band ── */}
      {stats.length > 0 && (
        <div className="bg-gsa-navy text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8">
              {stats.map((stat, i) => (
                <Reveal
                  as="div"
                  key={stat.label}
                  delay={0.05 * i}
                  className="py-7 lg:py-9"
                >
                  <dt
                    className="font-garamond text-4xl lg:text-[44px] lg:leading-none text-usds-blue-500"
                    style={{ fontWeight: 474 }}
                  >
                    <CategoryStatValue value={stat.value} />
                  </dt>
                  <dd className="mt-1 text-[13px] text-white/60 leading-snug">
                    {stat.label}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      )}
    </header>
  );
}
