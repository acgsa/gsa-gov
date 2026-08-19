import type { Metadata } from "next";
import Link from "next/link";
import { TheaterVideo } from "@/components/modules/TheaterVideo";

export const metadata: Metadata = {
  title: "Video Library | Media",
  description:
    "Watch and download GSA video content — including event recordings, leadership remarks, and program highlights.",
};

const videos = [
  {
    id: "highlights",
    heading: "GSA highlights",
    src: "/assets/videos/ed1.mov",
    title: "GSA highlights reel",
    caption:
      "Highlights from across GSA — real estate, acquisition, and technology in service of the American people.",
  },
  {
    id: "design",
    heading: "Design & architecture",
    src: "/assets/videos/design_arch.mov",
    title: "Design and architecture at GSA",
    caption:
      "Inside GSA's Design Excellence work — the architecture of the federal government.",
  },
  {
    id: "flag",
    heading: "America the beautiful",
    src: "/assets/videos/grok-video.mp4",
    title: "American flag film",
    caption: "The flag of the United States — from GSA's film library.",
  },
];

export default function VideoLibraryPage() {
  return (
    <div className="bg-usds-steel-50 min-h-screen pb-16 lg:pb-24">
      {/* ── Centered hero ── */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-16 pb-12 sm:pb-16">
        <Link
          href="/media"
          className="inline-block text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 hover:text-usds-steel-900 transition-colors duration-150 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
        >
          Media
        </Link>
        <h1
          className="font-garamond text-usds-steel-900 text-[44px] leading-[1.05] sm:text-[56px] sm:leading-[1.04] mb-5"
          style={{ fontWeight: 474 }}
        >
          Video library
        </h1>
        <p className="text-[16px] sm:text-[17px] leading-relaxed text-usds-steel-600 max-w-[560px] mx-auto">
          Press conferences, leadership remarks, program highlights, and
          recordings of public appearances.
        </p>
      </header>

      {/* ── Videos ── */}
      {videos.map((video) => (
        <section
          key={video.id}
          aria-labelledby={`${video.id}-heading`}
          className="mb-16 sm:mb-20"
        >
          <h2
            id={`${video.id}-heading`}
            className="font-garamond text-usds-steel-900 text-[28px] sm:text-[32px] leading-tight text-center mb-8"
            style={{ fontWeight: 474 }}
          >
            {video.heading}
          </h2>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <TheaterVideo
              src={video.src}
              title={video.title}
              caption={video.caption}
              showLiveBadge={false}
            />
          </div>
        </section>
      ))}
    </div>
  );
}
