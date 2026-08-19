import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

export interface FeatureCardProps {
  /** Image source — static import or Payload URL */
  src: string | StaticImageData;
  alt: string;
  headline: string;
  /** Optional CTA — omit to render headline-only card */
  ctaText?: string;
  ctaHref?: string;
}

export function FeatureCard({
  src,
  alt,
  headline,
  ctaText,
  ctaHref,
}: FeatureCardProps) {
  return (
    <article className="flex flex-col h-full">
      {/* Image — wide 16:9 */}
      <div className="relative w-full aspect-video overflow-hidden mb-4 flex-shrink-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          sizes="(max-width: 768px) 90vw, 52vw"
        />
      </div>

      {/* Headline */}
      <h3 className="font-semibold text-usds-steel-900 text-[15px] leading-snug max-w-[85%]">
        {ctaHref ? (
          <Link
            href={ctaHref}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
          >
            {headline}
          </Link>
        ) : (
          headline
        )}
      </h3>

      {/* Optional CTA */}
      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-2 text-sm text-usds-steel-700 hover:text-usds-steel-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
        >
          {ctaText}
        </Link>
      )}
    </article>
  );
}
