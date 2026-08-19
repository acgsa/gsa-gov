import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export interface MicrositeSection {
  id: string;
  eyebrow?: string;
  heading: string;
  body: React.ReactNode;
  image?: {
    src: string | StaticImageData;
    alt: string;
    position?: "left" | "right";
  };
}

export interface MicrositePageProps {
  /** Page-level SEO title (rendered by Next.js metadata, not in JSX) */
  heroSrc: string | StaticImageData;
  heroAlt: string;
  heroEyebrow?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroCta?: { label: string; href: string };
  sections: MicrositeSection[];
}

/**
 * MicrositePage — full-bleed editorial template for standalone initiatives.
 * Intended for use with a separate layout that renders MicrositeHeader instead
 * of the global site chrome.
 */
export function MicrositePage({
  heroSrc,
  heroAlt,
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroCta,
  sections,
}: MicrositePageProps) {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <div className="relative h-[70vh] min-h-[480px] max-h-[780px] flex items-end overflow-hidden bg-gsa-navy">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,17,28,0.85) 0%, rgba(0,17,28,0.2) 55%, rgba(0,17,28,0) 100%)",
          }}
          aria-hidden
        />
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-20">
          {heroEyebrow && (
            <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/55 mb-4">
              {heroEyebrow}
            </p>
          )}
          <h1 className="font-geist text-white text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.04] mb-4">
            {heroTitle}
          </h1>
          {heroSubtitle && (
            <p className="text-white/70 text-xl leading-relaxed max-w-2xl mb-8">
              {heroSubtitle}
            </p>
          )}
          {heroCta && (
            <Link
              href={heroCta.href}
              className="inline-flex items-center gap-2 bg-white text-usds-steel-900 text-[14px] font-semibold px-6 py-3 rounded hover:bg-white/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group"
            >
              {heroCta.label}
              <MoveRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                aria-hidden
              />
            </Link>
          )}
        </div>
      </div>

      {/* ── Sections ── */}
      {sections.map((section, i) => {
        const hasImage = !!section.image;
        const imageRight = section.image?.position !== "left";

        return (
          <section
            key={section.id}
            id={section.id}
            className={[
              "py-16 lg:py-24",
              i % 2 === 0 ? "bg-white" : "bg-usds-steel-50",
            ].join(" ")}
          >
            <div
              className={[
                "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                hasImage
                  ? "flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
                  : "max-w-3xl",
              ].join(" ")}
            >
              {/* Image — left */}
              {hasImage && !imageRight && (
                <div className="w-full lg:w-1/2 min-w-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src={section.image!.src}
                      alt={section.image!.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}

              {/* Text */}
              <div
                className={
                  hasImage ? "w-full lg:w-1/2 min-w-0" : "max-w-2xl mx-auto"
                }
              >
                {section.eyebrow && (
                  <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-500 mb-4">
                    {section.eyebrow}
                  </p>
                )}
                <h2 className="font-geist text-usds-steel-900 text-3xl sm:text-4xl font-semibold leading-[1.1] mb-6">
                  {section.heading}
                </h2>
                <div className="text-[16px] leading-relaxed text-usds-steel-700 space-y-4 max-w-[700px]">
                  {section.body}
                </div>
              </div>

              {/* Image — right */}
              {hasImage && imageRight && (
                <div className="w-full lg:w-1/2 flex-shrink-0 lg:order-last">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src={section.image!.src}
                      alt={section.image!.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
