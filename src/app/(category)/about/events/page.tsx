import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Events | About GSA",
  description:
    "Upcoming events, industry days, forums, and public meetings hosted by the U.S. General Services Administration.",
};

export default function EventsPage() {
  return (
    <InfoPage
      eyebrow="About GSA"
      breadcrumbs={[{ label: "About", href: "/about" }]}
      title="Events"
      intro="Find upcoming GSA events — including industry days, acquisition conferences, real estate forums, and public meetings — along with recordings of past public appearances."
      sections={[
        {
          id: "upcoming",
          heading: "Upcoming events",
          body: (
            <>
              <p>
                GSA hosts and participates in events throughout the year —
                including industry days, acquisition conferences, real estate
                forums, and public meetings on proposed disposals. Upcoming
                events are listed on the GSA events calendar.
              </p>
              <p>
                Registration details, agendas, and location information are
                published ahead of each event. Many events offer virtual
                attendance options to broaden public participation.
              </p>
            </>
          ),
        },
        {
          id: "appearances",
          heading: "Speaking engagements & appearances",
          body: (
            <>
              <p>
                GSA&apos;s leadership regularly participates in speaking
                engagements, congressional hearings, and interagency forums.
                Transcripts and video recordings of major public appearances are
                available in the newsroom archive.
              </p>
              <p>
                To request GSA participation in an event or to invite a GSA
                speaker, contact the Office of Strategic Communication.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Latest News", href: "/news" },
        { label: "GSA Seal & Logos", href: "/about/logos" },
        { label: "Leadership", href: "/about/leadership" },
        { label: "Contact & FOIA", href: "/about/contact" },
      ]}
    />
  );
}
