import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { ArticleGallery } from "@/components/ui/ArticleGallery";
import { DetailPage } from "@/templates/DetailPage";
import type { DetailPageSection } from "@/templates/DetailPage";
import { NEWS_ARTICLES, getArticle } from "@/lib/news-data";

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every known article at build time. */
export function generateStaticParams(): Array<{ slug: string }> {
  return NEWS_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Article not found | GSA Newsroom" };
  }
  return {
    title: `${article.title} | GSA Newsroom`,
    description: article.dek,
  };
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    notFound();
  }

  const sections: DetailPageSection[] = article.sections.map((section) => ({
    id: section.id,
    heading: section.heading,
    body: (
      <>
        {section.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </>
    ),
  }));

  // Optional photo gallery — rendered as a final article section, breaking
  // out slightly wider than the article's text column
  if (article.gallery && article.gallery.length > 0) {
    sections.push({
      id: "gallery",
      heading: "Project gallery",
      body: (
        <div className="sm:-mx-14 lg:-mx-24">
          <ArticleGallery images={article.gallery} />
        </div>
      ),
    });
  }

  const relatedLinks = NEWS_ARTICLES.filter((a) => a.slug !== article.slug)
    .slice(0, 4)
    .map((a) => ({
      label: a.title,
      href: `/news/${a.slug}`,
      category: a.category,
    }));

  // Hero uses the first gallery photo when available, otherwise falls back to
  // article.image (which may be undefined — ParallaxHero handles that case
  // by rendering the GSA seal on a Steel background).
  const heroImage = article.gallery?.[0]?.src ?? article.image;

  /** Map category label to its canonical category page path. */
  const CATEGORY_HREFS: Record<string, string> = {
    "Real Estate": "/real-estate",
    Acquisition: "/acquisition",
    Technology: "/technology",
    "Fraud Prevention": "/savings",
    Fleet: "/employees/fleet",
    Travel: "/employees/travel",
    "About GSA": "/about-gsa",
  };

  const eyebrowHref = CATEGORY_HREFS[article.category];

  return (
    <>
      <ParallaxHero src={heroImage} priority />
      <DetailPage
        eyebrow={article.category}
        eyebrowHref={eyebrowHref}
        title={article.title}
        intro={article.dek}
        lastUpdated={article.date}
        meta={[{ label: "", value: article.date }]}
        sections={sections}
        contact={{
          heading: "Media Contact",
          items: [
            {
              label: "Press inquiries",
              value: "press@gsa.gov",
              href: "mailto:press@gsa.gov",
            },
          ],
        }}
        relatedLinks={relatedLinks}
      />
    </>
  );
}
