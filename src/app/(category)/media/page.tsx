import type { Metadata } from "next";
import { CategoryPage } from "@/templates/CategoryPage";
import type {
  CategoryTopic,
  CategoryFeaturedStory,
  CategoryEditorial,
} from "@/templates/categoryAccents";
import { GSA_LEADERSHIP } from "@/lib/leadership-data";
import heroImg from "@/assets/images/ED/HBDzzIAWsAAXBxn.jpg";
import story1 from "@/assets/images/BUILDING/GSA-Building-Blue-scaled.jpg";
import story2 from "@/assets/images/ACCOUNTABILITY/pexels-rostislav-34281360.jpg";
import story3 from "@/assets/images/ACCOUNTABILITY/pexels-ivan-drazic-20457695-20417783.jpg";

// ── Editorial carousel images ─────────────────────────────────────────────
import editorial1 from "@/assets/images/ED/03252026 - GSA NCR Press Conference-10-Slide1.jpg";
import editorial2 from "@/assets/images/1800F/06162026_GSA Decorated building photos Social Media (7 of 25)_1024px.png";
import editorial3 from "@/assets/images/ED/Edited-4794.jpg";

// ── Topic card images ─────────────────────────────────────────────────────
import topicNews from "@/assets/images/ED/03252026 - GSA NCR Press Conference-10-Slide1.jpg";
import topicPhotos from "@/assets/images/BUILDING/06162026_GSA Decorated building photos Social Media (7 of 25)_1024px.png";
import topicVideo from "@/assets/images/BUILDING/06162026_GSA Decorated building photos Social Media (18 of 25)_1024px.png";
import topicPressReleases from "@/assets/images/ACCOUNTABILITY/photo-1562902982-5542bb25e4b6.avif";
import topicBrand from "@/assets/images/BUILDING/06162026_GSA Decorated building photos Social Media (8 of 25)_1024px.png";
import topicLeadership from "@/assets/images/ED/Edited-4669.jpg";

export const metadata: Metadata = {
  title: "Media",
  description:
    "The GSA newsroom — press releases, events, official photography, leadership, and resources for journalists and media professionals.",
};

const topics: CategoryTopic[] = [
  {
    href: "/news",
    eyebrow: "Newsroom",
    title: "Latest News",
    body: "GSA press releases, announcements, and administrator statements for journalists and the public.",
    src: topicNews,
    alt: "GSA press conference at the National Capital Region",
  },
  {
    href: "/media/photos",
    eyebrow: "Media Assets",
    title: "Photo Gallery",
    body: "Download high-resolution GSA photography of buildings, leadership, and events for editorial use.",
    src: topicPhotos,
    alt: "GSA headquarters building decorated with bunting",
  },
  {
    href: "/media/video",
    eyebrow: "Media Assets",
    title: "Video Library",
    body: "Watch GSA videos featuring leadership addresses, project updates, and agency highlights.",
    src: topicVideo,
    alt: "GSA building with decorative banners",
  },
  {
    href: "/media/press-releases",
    eyebrow: "Press",
    title: "Press Releases",
    body: "Official GSA press releases and statements for media professionals and the public.",
    src: topicPressReleases,
    alt: "Data dashboard visualizing agency reporting",
  },
  {
    href: "/media/brand",
    eyebrow: "Brand",
    title: "Brand",
    body: "Official GSA seal, logos, style guidelines, and resources for approved use in media coverage.",
    src: topicBrand,
    alt: "GSA building and brand assets",
  },
  {
    href: "/resources/leadership",
    eyebrow: "Leadership",
    title: "Leadership",
    body: "Meet the Administrator, Deputy Administrator, and senior officials guiding GSA's strategic direction.",
    src: topicLeadership,
    alt: "GSA leadership at a public engagement",
  },
];

const featured: CategoryFeaturedStory[] = [
  {
    src: story1,
    alt: "GSA headquarters building in Washington, D.C.",
    headline:
      "GSA Announces New Milestones in Federal Real Estate Modernization",
    ctaText: "Read the news",
    ctaHref: "/news",
  },
  {
    src: story2,
    alt: "GSA leadership at a public event",
    headline: "Download High-Resolution GSA Photography for Editorial Use",
    ctaText: "Browse image library",
    ctaHref: "/media/image-library",
  },
  {
    src: story3,
    alt: "GSA press conference and public engagement",
    headline: "GSA Hosts Press Conferences and Public Ceremonies Nationwide",
    ctaText: "See upcoming events",
    ctaHref: "/media/events",
  },
];

const editorial: CategoryEditorial = {
  eyebrow: "About GSA",
  sectionTitle: "America's Federal Landlord, Buyer, and Technology Partner",
  cards: [
    {
      src: editorial1,
      alt: "GSA press conference at the National Capital Region",
      body: "The U.S. General Services Administration delivers value and savings in real estate, acquisition, and technology to the federal government and the American people.",
      ctaText: "Learn about GSA",
      ctaHref: "/about",
    },
    {
      src: editorial2,
      alt: "GSA headquarters building in Washington, D.C.",
      body: "GSA manages more than 360 million rentable square feet of federal real estate, operates as the government's central purchasing agent, and powers shared technology platforms used by agencies nationwide.",
      ctaText: "Explore our mission",
      ctaHref: "/about/mission",
    },
    {
      src: editorial3,
      alt: "GSA Administrator at a public engagement",
      body: "Under the leadership of Administrator Edward C. Forst, GSA is focused on rightsizing the federal footprint, cutting costs, and delivering modern digital services that strengthen government performance.",
      ctaText: "Meet our leadership",
      ctaHref: "/resources/leadership",
    },
  ],
};

export default function AboutPage() {
  return (
    <CategoryPage
      section="Media"
      accent="about"
      title="The GSA Newsroom"
      intro="Press releases, events, official photography, and leadership resources for journalists and media professionals covering the U.S. General Services Administration."
      heroSrc={heroImg}
      heroAlt="GSA Administrator addressing the press"
      heroPosition="center 25%"
      topics={topics}
      pullQuote={{
        quote:
          "If you execute with discipline, do things efficiently, manage risk, and take care of your people, then you will achieve results at the highest level.",
        attribution: "Edward C. Forst",
        role: "Administrator, U.S. General Services Administration",
      }}
      featured={featured}
      newsEyebrow="GSA in the News"
      editorial={editorial}
      leadership={GSA_LEADERSHIP}
      leadershipHeading="GSA Leadership"
    />
  );
}
