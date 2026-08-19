import type { Metadata } from "next";
import Image from "next/image";
import { DetailPage } from "@/templates/DetailPage";
import type { DetailPageSection } from "@/templates/DetailPage";
import gsaSeal from "@/assets/logo/New.svg";

export const metadata: Metadata = {
  title: "GSA Seal & Logos | Media",
  description:
    "Official GSA seal, logos, brand assets, and usage guidelines for the media, partners, and the public.",
};

const sections: DetailPageSection[] = [
  {
    id: "seal",
    heading: "The GSA Seal",
    body: (
      <>
        <p>
          The GSA seal is the official emblem of the U.S. General Services
          Administration. It appears on official documents, buildings, and
          communications to signify authentic agency material. The seal is
          protected and may not be used in any manner that implies endorsement
          or affiliation without express authorization.
        </p>
        <p>
          High-resolution versions of the seal are available to authorized
          users. Requests for the official seal should be directed to the Office
          of Strategic Communication.
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
          GSA maintains a family of program and service logos — including GSA
          Fleet, GSA Advantage!, and Federal Acquisition Service marks. These
          logos follow the agency&apos;s visual identity standards for color,
          spacing, and typography.
        </p>
        <p>
          Members of the media and official partners may request logo files and
          vector artwork for use in approved contexts such as news coverage,
          event materials, and joint publications.
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
          The GSA seal and logos are the property of the U.S. Government. They
          must not be altered, distorted, or combined with other graphics, and
          must not be used to imply endorsement of a product, service, or
          organization.
        </p>
        <p>
          For questions about permitted uses or to request written
          authorization, contact the Office of Strategic Communication.
        </p>
      </>
    ),
  },
];

export default function LogosPage() {
  return (
    <DetailPage
      eyebrow="Media"
      eyebrowHref="/media"
      title="GSA Seal & Logos"
      intro="Download the official GSA seal and logos and review the guidelines for their proper use. These marks identify official GSA communications and may only be used in accordance with federal policy."
      leadContent={
        <div className="flex justify-center pt-2 pb-10">
          <Image
            src={gsaSeal}
            alt="Official GSA Seal"
            width={280}
            height={280}
            className="object-contain"
          />
        </div>
      }
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
      relatedLinks={[
        { label: "Latest News", href: "/news", category: "Newsroom" },
        {
          label: "Leadership",
          href: "/resources/leadership",
          category: "Media",
        },
        { label: "Contact & FOIA", href: "/media/contact", category: "Media" },
      ]}
    />
  );
}
