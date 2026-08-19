import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";
import { getArticle, type NewsArticle } from "@/lib/news-data";
import { getSolutionsFor } from "@/lib/gsa-solutions";

const newsArticles = [
  getArticle("usai-platform-expansion"),
  getArticle("fedramp-20x-launch"),
  getArticle("fedramp-20x-504m-savings"),
].filter((a): a is NewsArticle => a !== undefined);

export const metadata: Metadata = {
  title: "Platforms | Technology",
  description:
    "GSA's shared technology platforms power government services for millions of Americans and thousands of federal employees.",
};

export default function PlatformsPage() {
  return (
    <TopicPage
      eyebrow="Technology"
      eyebrowHref="/technology"
      title="Powered by GSA"
      intro="GSA builds and operates shared technology platforms that reduce duplication, lower costs, and help federal agencies deliver better digital services to the public."
      cta={{ label: "Explore the platforms", href: "/technology/services" }}
      solutions={getSolutionsFor("/technology")}
      solutionsLarge
      news={{
        eyebrow: "News",
        articles: newsArticles,
      }}
    />
  );
}
