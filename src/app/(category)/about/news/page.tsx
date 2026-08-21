import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Latest News | About GSA",
  description:
    "The latest news, press releases, and announcements from the U.S. General Services Administration.",
};

export default function NewsPage() {
  return (
    <InfoPage
      eyebrow="About GSA"
      breadcrumbs={[{ label: "About", href: "/about" }]}
      title="Latest News"
      intro="Stay current with the latest announcements, press releases, and administrator statements from GSA — covering real estate, acquisition, technology, and government management."
      sections={[
        {
          id: "news",
          heading: "Newsroom",
          body: (
            <>
              <p>
                GSA&apos;s newsroom publishes press releases, administrator
                statements, and agency announcements. Media inquiries should be
                directed to the Office of Strategic Communication. Journalists
                can request interviews, background briefings, and supporting
                materials through the newsroom contact form.
              </p>
              <p>
                GSA also publishes a regular blog featuring in-depth articles
                from program teams across the agency — explaining the thinking
                behind major initiatives, sharing lessons learned, and
                highlighting the people who make GSA&apos;s programs work.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Events", href: "/about/events" },
        { label: "GSA Seal & Logos", href: "/about/logos" },
        { label: "Leadership", href: "/about/leadership" },
        { label: "Contact & FOIA", href: "/about/contact" },
      ]}
    />
  );
}
