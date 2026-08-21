import type { Metadata } from "next";
import { VideoHero } from "@/components/modules/VideoHero";
import { QuoteBlock } from "@/components/modules/QuoteBlock";
import { CategoryTopics } from "@/templates/category/CategoryTopics";
import { CategoryFeatured } from "@/templates/category/CategoryFeatured";
import { CategoryLeadership } from "@/templates/category/CategoryLeadership";
import type {
  CategoryTopic,
  CategoryFeaturedStory,
  CategoryLeader,
} from "@/templates/categoryAccents";
import story1 from "@/assets/images/BUILDING/GSA-Building-Blue-scaled.jpg";
import story2 from "@/assets/images/ACCOUNTABILITY/pexels-rostislav-34281360.jpg";
import story3 from "@/assets/images/ACCOUNTABILITY/pexels-ivan-drazic-20457695-20417783.jpg";

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
  },
  {
    href: "/about/events",
    eyebrow: "Calendar",
    title: "Events",
    body: "Upcoming press conferences, ceremonies, and public events across GSA and its regions.",
  },
  {
    href: "/about/image-library",
    eyebrow: "Media Assets",
    title: "Image Library",
    body: "Download high-resolution GSA photography of buildings, leadership, and events for editorial use.",
  },
  {
    href: "/about/logos",
    eyebrow: "Brand",
    title: "GSA Seal & Logos",
    body: "Official GSA seal, logos, and usage guidelines for approved reproduction in media coverage.",
  },
  {
    href: "/about/leadership",
    eyebrow: "Leadership",
    title: "Leadership",
    body: "Meet the Administrator, Deputy Administrator, and senior officials guiding GSA's strategic direction.",
  },
  {
    href: "/about/reports",
    eyebrow: "Reports",
    title: "Reports & Data",
    body: "Annual reports, agency financial reports, and the open data GSA publishes for the public.",
  },
  {
    href: "/savings",
    eyebrow: "Accountability",
    title: "Taxpayer Savings",
    body: "Track the wasteful spending GSA has identified and eliminated on behalf of American taxpayers.",
  },
  {
    href: "/about/contact",
    eyebrow: "Press",
    title: "Media Contacts",
    body: "Reach the GSA Office of Strategic Communication for press inquiries and interview requests.",
  },
];

const featured: CategoryFeaturedStory[] = [
  {
    src: story1,
    alt: "GSA headquarters building in Washington, D.C.",
    eyebrow: "Press Release",
    headline:
      "GSA Announces New Milestones in Federal Real Estate Modernization",
    ctaText: "Read the news",
    ctaHref: "/news",
  },
  {
    src: story2,
    alt: "GSA leadership at a public event",
    eyebrow: "Media Assets",
    headline: "Download High-Resolution GSA Photography for Editorial Use",
    ctaText: "Browse image library",
    ctaHref: "/about/image-library",
  },
  {
    src: story3,
    alt: "GSA press conference and public engagement",
    eyebrow: "Events",
    headline: "GSA Hosts Press Conferences and Public Ceremonies Nationwide",
    ctaText: "See upcoming events",
    ctaHref: "/about/events",
  },
];

const GSA_PHOTO = "https://www.gsa.gov/system/files/";

const leadership: CategoryLeader[] = [
  {
    name: "Edward C. Forst",
    title: "Administrator",
    initials: "EF",
    photoSrc: `${GSA_PHOTO}ph-EdwardForst-Administrator-742x960_041626.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Michael Lynch",
    title: "Deputy Administrator",
    initials: "ML",
    photoSrc: `${GSA_PHOTO}mike-lynch-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Saul Japson",
    title: "Associate Deputy Administrator",
    initials: "SJ",
    photoSrc: `${GSA_PHOTO}ph-SaulJapson-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Jillian Wyant",
    title: "Chief of Staff",
    initials: "JW",
    href: "/about/leadership",
  },
  {
    name: "Laura Stanton",
    title: "Acting Commissioner, Federal Acquisition Service",
    initials: "LS",
    photoSrc: `${GSA_PHOTO}ph-LauraStanton-150x170_2.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Michael Gelber",
    title: "Acting Commissioner, Public Buildings Service",
    initials: "MG",
    photoSrc: `${GSA_PHOTO}ph-MichaelGelber-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Larry Allen",
    title: "Associate Administrator, Office of Government-wide Policy",
    initials: "LA",
    photoSrc: `${GSA_PHOTO}ph-LarryAllen2-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Aluanda Drain",
    title: "Associate Administrator, Office of Civil Rights",
    initials: "AD",
    photoSrc: `${GSA_PHOTO}ph-AluandaDrain-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Robert J. Carter",
    title: "Associate Administrator, Office of Mission Assurance",
    initials: "RC",
    photoSrc: `${GSA_PHOTO}ph-RobertCarter-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Arron Helm",
    title: "Chief Human Capital Officer, Office of Human Resources Management",
    initials: "AH",
    photoSrc: `${GSA_PHOTO}Arron-Helm-150x170_0.jpg`,
    href: "/about/leadership",
  },
  {
    name: "David A. Shive",
    title: "Chief Information Officer, Office of the Chief Information Officer",
    initials: "DS",
    photoSrc: `${GSA_PHOTO}ph-DavidShive-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Nimisha Agarwal",
    title: "Chief Financial Officer, Office of the Chief Financial Officer",
    initials: "NA",
    photoSrc: `${GSA_PHOTO}ph-NimishaAgarwal-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Bob Stafford",
    title:
      "Chief Administrative Services Officer, Office of Administrative Services",
    initials: "BS",
    photoSrc: `${GSA_PHOTO}ph-BobStafford-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Greg Justice",
    title: "Associate Administrator, Office of Small Business",
    initials: "GJ",
    photoSrc: `${GSA_PHOTO}ph-GregJustice-150x170.jpg`,
    href: "/about/leadership",
  },
  {
    name: "Paul Ingrassia",
    title: "Acting General Counsel, Office of General Counsel",
    initials: "PI",
    photoSrc: `${GSA_PHOTO}ph-PaulIngrassia-150x170.jpg`,
    href: "/about/leadership",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <VideoHero
        section="Media"
        title="The GSA Newsroom"
        intro="Press releases, events, official photography, and leadership resources for journalists and media professionals covering the U.S. General Services Administration."
        videoSrc="/assets/videos/ed1.mov"
        ariaLabel="GSA Administrator Edward C. Forst addressing the federal workforce"
      />

      <QuoteBlock
        quote="Every day, GSA employees do the work behind the work — delivering value for every federal agency and the American people who count on us."
        attribution="Edward C. Forst"
        role="Administrator, U.S. General Services Administration"
      />

      <CategoryTopics section="Media" topics={topics} accent="about" />

      <CategoryFeatured section="Media" featured={featured} accent="about" />

      <CategoryLeadership
        section="Media"
        leadership={leadership}
        accent="about"
        heading="GSA Leadership"
      />
    </div>
  );
}
