import { CategoryHero } from "@/templates/category/CategoryHero";
import { CategoryTopics } from "@/templates/category/CategoryTopics";
import { CategoryLeadership } from "@/templates/category/CategoryLeadership";
import { CategoryWayfinder } from "@/components/modules/CategoryWayfinder";
import { NewsSpotlight } from "@/components/modules/NewsSpotlight";
import { QuoteBlock } from "@/components/modules/QuoteBlock";
import { ImagePanelCard } from "@/components/ui/ImagePanelCard";
import { EditorialCarousel } from "@/components/modules/EditorialCarousel";
import { SolutionsStrip } from "@/components/ui/SolutionsStrip";
import type { GsaSolution } from "@/lib/gsa-solutions";
import type { WayfinderConfig } from "@/lib/wayfinder-data";
import type { StaticImageData } from "next/image";
import type {
  CategoryAccent,
  CategoryTopic,
  CategoryFeaturedStory,
  CategoryStat,
  CategoryPullQuote,
  CategoryLeader,
  CategoryImagePanel,
  CategoryEditorial,
} from "@/templates/categoryAccents";

export type {
  CategoryTopic,
  CategoryFeaturedStory,
  CategoryStat,
  CategoryPullQuote,
  CategoryAccent,
  CategoryLeader,
  CategoryImagePanel,
  CategoryEditorial,
} from "@/templates/categoryAccents";

export interface CategoryPageProps {
  /** Section breadcrumb / eyebrow label */
  section: string;
  /** Page hero */
  title: string;
  intro: string;
  /** Optional hero image (rendered as a duotone editorial panel) */
  heroSrc?: string | StaticImageData;
  heroAlt?: string;
  /** Vertical focal point of the hero image (CSS object-position). Defaults to center. */
  heroPosition?: string;
  /** Per-category accent color key — defaults to acquisition teal */
  accent?: CategoryAccent;
  /** Optional stat strip beneath the hero */
  stats?: CategoryStat[];
  /** Optional "I am … looking to …" wayfinder rendered between the hero and topics */
  wayfinder?: WayfinderConfig;
  /** Sub-topic tiles (first becomes a wide lead tile) */
  topics: CategoryTopic[];
  /** Optional pull-quote divider before the featured rail */
  pullQuote?: CategoryPullQuote;
  /** Optional featured story rail (first becomes the lead story) */
  featured?: CategoryFeaturedStory[];
  /**
   * Optional override for the news spotlight eyebrow.
   * Defaults to "{section} in the News" when omitted.
   */
  newsEyebrow?: string;
  /** Optional full-bleed photo card (image panel) after the news rail */
  imagePanel?: CategoryImagePanel;
  /** Optional editorial carousel at the bottom of the page */
  editorial?: CategoryEditorial;
  /** Optional leadership grid rendered at the bottom of the page */
  leadership?: CategoryLeader[];
  /** Optional override for the leadership section heading */
  leadershipHeading?: string;
  /** Optional GSA platform/solution chips rendered after the topic grid */
  solutions?: GsaSolution[];
}

/**
 * CategoryPage — category landing template (2026 redesign).
 * Composes a full-bleed image hero with a navy stat band, an image-card
 * topic grid, an optional pull-quote band, the "{Section} in the News"
 * spotlight, and optional photo-card + editorial sections.
 */
export function CategoryPage({
  section,
  title,
  intro,
  heroSrc,
  heroAlt = "",
  heroPosition,
  accent,
  stats = [],
  wayfinder,
  topics,
  pullQuote,
  featured = [],
  newsEyebrow,
  imagePanel,
  editorial,
  leadership = [],
  leadershipHeading,
  solutions = [],
}: CategoryPageProps) {
  return (
    <div
      className={`${leadership.length > 0 ? "bg-usds-steel-50" : "bg-white"} pb-24 lg:pb-32`}
    >
      <CategoryHero
        section={section}
        title={title}
        intro={intro}
        heroSrc={heroSrc}
        heroAlt={heroAlt}
        heroPosition={heroPosition}
        accent={accent}
        stats={stats}
      />

      {wayfinder && <CategoryWayfinder config={wayfinder} />}

      <CategoryTopics section={section} topics={topics} accent={accent} />

      {solutions.length > 0 && <SolutionsStrip solutions={solutions} />}

      {pullQuote && (
        <QuoteBlock
          quote={pullQuote.quote}
          attribution={pullQuote.attribution ?? section}
          role={pullQuote.role}
        />
      )}

      {featured.length > 0 && (
        <NewsSpotlight
          eyebrow={newsEyebrow ?? `${section} in the News`}
          lead={featured[0]}
          items={featured.slice(1)}
        />
      )}

      {imagePanel && (
        <ImagePanelCard
          eyebrow={imagePanel.eyebrow}
          images={imagePanel.images}
          title={imagePanel.title}
          body={imagePanel.body}
          ctaText={imagePanel.ctaText}
          ctaHref={imagePanel.ctaHref}
        />
      )}

      {editorial && (
        <EditorialCarousel
          eyebrow={editorial.eyebrow}
          sectionTitle={editorial.sectionTitle}
          cards={editorial.cards}
        />
      )}

      {leadership.length > 0 && (
        <CategoryLeadership
          section={section}
          leadership={leadership}
          accent={accent}
          heading={leadershipHeading}
        />
      )}
    </div>
  );
}
