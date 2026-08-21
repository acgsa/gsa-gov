import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "News & Events | About GSA",
  description:
    "The latest news, announcements, and events from the U.S. General Services Administration.",
};

export default function NewsroomPage() {
  return (
    <InfoPage
      eyebrow="About GSA"
      breadcrumbs={[{ label: "About", href: "/about" }]}
      title="News & Events"
      intro="Stay current with the latest announcements, press releases, blog posts, and events from GSA — covering real estate, acquisition, technology, and government management."
      sections={[
        {
          id: "newsroom",
          heading: "Newsroom",
          body: (
            <>
              <p>
                GSA&rsquo;s newsroom publishes press releases, administrator
                statements, and agency announcements. Media inquiries should be
                directed to the Office of Strategic Communication. Journalists
                can request interviews, background briefings, and supporting
                materials through the newsroom contact form.
              </p>
              <p>
                GSA also publishes a regular blog featuring in-depth articles
                from program teams across the agency — explaining the thinking
                behind major initiatives, sharing lessons learned, and
                highlighting the people who make GSA&rsquo;s programs work.
              </p>
            </>
          ),
        },
        {
          id: "events",
          heading: "Events",
          body: (
            <>
              <p>
                GSA hosts and participates in events throughout the year —
                including industry days, acquisition conferences, real estate
                forums, and public meetings on proposed disposals. Upcoming
                events are listed on the GSA events calendar.
              </p>
              <p>
                GSA&rsquo;s leadership regularly participates in speaking
                engagements, congressional hearings, and interagency forums.
                Transcripts and video recordings of major public appearances are
                available in the newsroom archive.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Leadership", href: "/about/leadership" },
        { label: "Budget & performance", href: "/about/performance" },
        { label: "Contact & FOIA", href: "/about/contact" },
      ]}
    />
  );
}
