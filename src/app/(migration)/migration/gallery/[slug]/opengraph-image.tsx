import { ImageResponse } from "next/og";
import { MIGRATION_SAMPLES } from "@/lib/migration/samples.generated";
import { getGalleryPool } from "@/lib/migration/gallery-images";
import { SITE_URL } from "@/lib/site-url";
import { readImageDataUri, readSealDataUri } from "@/lib/og/share-card-assets";

/**
 * Share card for a migration gallery page.
 *
 * Renders at the 1200×630 / 1.91:1 size that Facebook, LinkedIn, Slack, iMessage
 * and X all crop from, so a link pasted anywhere shows the lead photograph, the
 * GSA seal, the page title, and the bare URL.
 *
 * Deliberate constraints:
 *   - No `fonts` option, so the card uses the font bundled with `next/og`. That
 *     keeps generation offline; pulling EB Garamond from Google Fonts at build
 *     time would add a network dependency to the build for a 1200px raster.
 *     Hierarchy is carried by size and colour instead of by typeface.
 *   - Every image arrives as a data URI from `share-card-assets`. Satori cannot
 *     resolve a webpack asset URL or a `<style>`-driven SVG.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GSA photo gallery";

const GALLERY_SAMPLES = MIGRATION_SAMPLES.filter(
  (sample) => sample.template === "GalleryPage",
);

/** Tells Next which cards to bake at build time (required under export). */
export function generateStaticParams(): Array<{ slug: string }> {
  return GALLERY_SAMPLES.map((sample) => ({ slug: sample.slug }));
}

interface ShareCardProps {
  /** Async in Next 15+, exactly as for the sibling `page.tsx`. */
  params: Promise<{ slug: string }>;
}

export default async function GalleryShareCard({ params }: ShareCardProps) {
  const { slug } = await params;
  const sample = GALLERY_SAMPLES.find((entry) => entry.slug === slug);

  const title = sample?.title ?? "Photo gallery";
  const pool = getGalleryPool(slug);

  const [photo, seal] = await Promise.all([
    pool.length > 0 ? readImageDataUri(pool[0].file) : Promise.resolve(null),
    readSealDataUri(),
  ]);

  // The displayed URL is cosmetic — it tells a reader where the link goes even
  // when the platform hides the address. Derived from the configured origin
  // rather than hardcoded, so a preview card never claims to be gsa.gov.
  const displayUrl = `${SITE_URL.host}/migration/gallery/${slug}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#1b2124",
        }}
      >
        {/* Lead photograph, full bleed */}
        {photo && (
          <img
            src={photo}
            alt=""
            width={size.width}
            height={size.height}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/*
          Scrim. Satori supports linear-gradient backgrounds but not
          `backdrop-filter`, so legibility comes from an opaque-to-transparent
          overlay rather than a blur.

          Two Satori quirks are load-bearing here, and getting either wrong
          renders white text straight onto a sunlit facade:
            - `inset: 0` alone is not enough. Satori does not resolve an
              absolutely positioned box from insets the way a browser does, so
              the element collapses to zero size. `width`/`height: 100%` is what
              actually gives it area — same as the photo above.
            - the `background` shorthand is unreliable for gradients; the
              longhand `backgroundImage` is the supported spelling.
        */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(180deg, rgba(10,14,16,0.15) 0%, rgba(10,14,16,0.45) 40%, rgba(10,14,16,0.82) 72%, rgba(10,14,16,0.95) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
          }}
        >
          {/* Seal + wordmark row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <img src={seal} alt="" width={64} height={64} />
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 2.4,
                textTransform: "uppercase",
                color: "#e7ebec",
              }}
            >
              U.S. General Services Administration
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.08,
              color: "#ffffff",
              // Satori has no line clamping; long legacy titles are trimmed by
              // the flex container instead of wrapping past the card edge.
              maxHeight: 210,
              overflow: "hidden",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 24,
              color: "#c8d0d3",
            }}
          >
            {displayUrl}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
