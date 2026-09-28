import Link from "next/link";
import { type StaticImageData } from "next/image";
import { MoveRight } from "lucide-react";
import { ArticleGallery } from "@/components/ui/ArticleGallery";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ShareButton } from "@/components/ui/ShareButton";

export interface GalleryPagePhoto {
  /** Image source — static import or Payload URL. */
  src: string | StaticImageData;
  /** Accessible description. Required. */
  alt: string;
  /**
   * Visible caption rendered beneath the photo in the contact sheet.
   * Legacy photo_album pages carry one caption per photo; when omitted the
   * contact-sheet card falls back to `alt`.
   */
  caption?: string;
}

export interface GalleryPageProps {
  /** Small label above the title, e.g. "Photo album". */
  eyebrow?: string;
  /** Optional href for the eyebrow — renders it as a link when present. */
  eyebrowHref?: string;
  title: string;
  /** Lead paragraph. */
  intro: string;
  /** Photos in display order. The carousel and contact sheet share this list. */
  photos: GalleryPagePhoto[];
  /** Owning organization, e.g. "Region 1". */
  organization?: string;
  /** Role-based contact label. Never an individual's address. */
  contact?: string;
  /** ISO or display date of last update. */
  lastUpdated?: string;
  /**
   * Legacy source URL, surfaced for migration review so a reviewer can compare
   * the rendered page against the page it came from.
   */
  sourceUrl?: string;
  /**
   * Canonical absolute URL of *this* page, used by the share button.
   *
   * Passed in rather than read from `window.location` so a share never carries
   * a `localhost` or preview origin into a message thread. Omit to fall back to
   * the live location.
   */
  shareUrl?: string;
}

/**
 * GalleryPage — photo-album template for legacy Drupal `photo_album` content.
 *
 * Composed entirely from existing primitives:
 *   - {@link ArticleGallery} drives the lead carousel (center-focused,
 *     autoplaying, keyboard-navigable).
 *   - {@link FeatureCard} renders each photo in the contact sheet below, where
 *     the per-photo caption is visible as the card headline.
 *
 * The two-part structure is deliberate. `ArticleGallery` exposes no caption
 * slot — its active-slide index is internal client state — so the carousel is
 * for browsing and the contact sheet is where captions are read. Legacy photo
 * albums are caption-heavy (one descriptive line per photo, often the only
 * substantive content on the page), so dropping captions was not an option.
 *
 * Note: the Drupal export carries no media. Callers pair each caption with an
 * asset from `src/assets/images/**`.
 */
export function GalleryPage({
  eyebrow,
  eyebrowHref,
  title,
  intro,
  photos,
  organization,
  contact,
  lastUpdated,
  sourceUrl,
  shareUrl,
}: GalleryPageProps) {
  const hasPhotos = photos.length > 0;

  return (
    <div className="bg-usds-steel-50 min-h-screen pb-16 lg:pb-24">
      {/* ── Centered hero ── */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-16 pb-10 sm:pb-14">
        {eyebrow &&
          (eyebrowHref ? (
            <Link
              href={eyebrowHref}
              className="inline-block text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 hover:text-usds-steel-900 transition-colors duration-150 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
            >
              {eyebrow}
            </Link>
          ) : (
            <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 mb-4">
              {eyebrow}
            </p>
          ))}

        <h1
          className="font-garamond text-usds-steel-900 text-[44px] leading-[1.05] sm:text-[56px] sm:leading-[1.04] mb-5"
          style={{ fontWeight: 474 }}
        >
          {title}
        </h1>

        <p className="text-[16px] sm:text-[17px] leading-relaxed text-usds-steel-600 max-w-[600px] mx-auto">
          {intro}
        </p>

        {(organization || contact) && (
          <p className="mt-6 text-[13px] text-usds-steel-600">
            {organization}
            {organization && contact && (
              <span aria-hidden className="mx-2 text-usds-steel-400">
                ·
              </span>
            )}
            {contact}
          </p>
        )}

        {/*
          Share sits in the hero, above the fold, because a photo album is
          link-shared far more often than it is read end to end. `text` is the
          intro so the native share sheet and any pasted fallback carry the same
          summary the OG card shows.
        */}
        <div className="mt-8 flex justify-center">
          <ShareButton title={title} text={intro} url={shareUrl} />
        </div>
      </header>

      {/* ── Lead carousel ── */}
      {hasPhotos && (
        <section aria-label="Photo carousel" className="mb-16 sm:mb-20">
          <ArticleGallery
            images={photos.map(({ src, alt }) => ({ src, alt }))}
          />
        </section>
      )}

      {/* ── Contact sheet — captions are readable here ── */}
      {hasPhotos && (
        <section
          aria-labelledby="all-photos-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2
            id="all-photos-heading"
            className="font-garamond text-usds-steel-900 text-[28px] sm:text-[32px] leading-tight text-center mb-10"
            style={{ fontWeight: 474 }}
          >
            All photos
            <span className="ml-3 align-middle text-[14px] font-geist tabular-nums text-usds-steel-600">
              {photos.length}
            </span>
          </h2>

          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
          >
            {photos.map((photo, i) => (
              <li key={i}>
                <FeatureCard
                  src={photo.src}
                  alt={photo.alt}
                  headline={photo.caption ?? photo.alt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Provenance footer ── */}
      {(lastUpdated || sourceUrl) && (
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-6 border-t border-usds-steel-200">
          {lastUpdated && (
            <p className="text-[13px] text-usds-steel-600">
              Last updated: {lastUpdated}
            </p>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              className="mt-2 inline-flex items-center gap-2 text-[13px] text-usds-steel-600 hover:text-usds-steel-900 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
            >
              View this page on the current gsa.gov
              <MoveRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                aria-hidden
              />
            </a>
          )}
        </footer>
      )}
    </div>
  );
}
