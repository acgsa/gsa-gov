import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "GSA Seal & Logos | About GSA",
  description:
    "Official GSA seal, logos, brand assets, and usage guidelines for the media, partners, and the public.",
};

export default function LogosPage() {
  return (
    <InfoPage
      eyebrow="About GSA"
      breadcrumbs={[{ label: "About", href: "/about" }]}
      title="GSA Seal & Logos"
      intro="Download the official GSA seal and logos and review the guidelines for their proper use. These marks identify official GSA communications and may only be used in accordance with federal policy."
      sections={[
        {
          id: "seal",
          heading: "The GSA Seal",
          body: (
            <>
              <p>
                The GSA seal is the official emblem of the U.S. General Services
                Administration. It appears on official documents, buildings, and
                communications to signify authentic agency material. The seal is
                protected and may not be used in any manner that implies
                endorsement or affiliation without express authorization.
              </p>
              <p>
                High-resolution versions of the seal are available to authorized
                users. Requests for the official seal should be directed to the
                Office of Strategic Communication.
              </p>
            </>
          ),
        },
        {
          id: "logos",
          heading: "Logos & Brand Assets",
          body: (
            <>
              <p>
                GSA maintains a family of program and service logos — including
                GSA Fleet, GSA Advantage!, and Federal Acquisition Service
                marks. These logos follow the agency&apos;s visual identity
                standards for color, spacing, and typography.
              </p>
              <p>
                Members of the media and official partners may request logo
                files and vector artwork for use in approved contexts such as
                news coverage, event materials, and joint publications.
              </p>
            </>
          ),
        },
        {
          id: "usage",
          heading: "Usage Guidelines",
          body: (
            <>
              <p>
                The GSA seal and logos are the property of the U.S. Government.
                They must not be altered, distorted, or combined with other
                graphics, and must not be used to imply endorsement of a
                product, service, or organization.
              </p>
              <p>
                For questions about permitted uses or to request written
                authorization, contact the Office of Strategic Communication.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Latest News", href: "/news" },
        { label: "Leadership", href: "/about/leadership" },
        { label: "Contact & FOIA", href: "/about/contact" },
      ]}
    />
  );
}
