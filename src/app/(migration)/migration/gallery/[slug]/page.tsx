import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryPage, type GalleryPagePhoto } from "@/templates/GalleryPage";
import { MIGRATION_SAMPLES } from "@/lib/migration/samples.generated";
import { CONTENT_TYPE_LABELS } from "@/lib/migration/types";
import { getGalleryPool } from "@/lib/migration/gallery-images";
import { absoluteUrl } from "@/lib/site-url";

/** Every sample this route is responsible for. */
const GALLERY_SAMPLES = MIGRATION_SAMPLES.filter(
  (sample) => sample.template === "GalleryPage",
);

function getSample(slug: string) {
  return GALLERY_SAMPLES.find((sample) => sample.slug === slug);
}

interface GalleryRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return GALLERY_SAMPLES.map((sample) => ({ slug: sample.slug }));
}

/**
 * Share-preview metadata.
 *
 * `openGraph.images` / `twitter.images` are deliberately NOT set here: the
 * sibling `opengraph-image.tsx` file convention already registers the card, and
 * an explicit `images` key would override it and lose the generated PNG.
 * `metadataBase` in the root layout is what turns that relative card path into
 * the absolute URL crawlers require.
 */
export async function generateMetadata({
  params,
}: GalleryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const sample = getSample(slug);
  if (!sample) {
    return { title: "Sample not found | Migration showcase" };
  }

  const title = `${sample.title} | Migration showcase`;
  const path = `/migration/gallery/${slug}`;

  return {
    title,
    description: sample.dek,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: "U.S. General Services Administration",
      // The share card carries its own title text, so the OG title stays the
      // bare page title rather than repeating the showcase suffix.
      title: sample.title,
      description: sample.dek,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: sample.title,
      description: sample.dek,
    },
  };
}

export default async function MigrationGalleryPage({
  params,
}: GalleryRouteProps) {
  const { slug } = await params;
  const sample = getSample(slug);
  if (!sample) {
    notFound();
  }

  /**
   * Legacy photo_album bodies are one caption per paragraph. The first
   * paragraph is also promoted to `dek` during generation, so it is dropped
   * here to avoid printing it twice.
   */
  const captions = sample.sections
    .flatMap((section) => section.paragraphs)
    .filter((paragraph) => paragraph !== sample.dek);

  const pool = getGalleryPool(sample.slug);

  const photos: GalleryPagePhoto[] = captions.map((caption, i) => ({
    src: pool[i % pool.length].image,
    alt: caption,
    caption,
  }));

  return (
    <GalleryPage
      eyebrow={CONTENT_TYPE_LABELS[sample.contentType]}
      eyebrowHref="/migration"
      title={sample.title}
      intro={sample.dek}
      photos={photos}
      organization={sample.organization}
      contact={sample.contact}
      lastUpdated={sample.provenance.lastModified}
      sourceUrl={sample.provenance.sourceUrl}
      /* Resolved server-side so a share carries the configured origin rather
         than whatever host the browser happens to be on. */
      shareUrl={absoluteUrl(`/migration/gallery/${slug}`)}
    />
  );
}
