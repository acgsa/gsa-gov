import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Image Library | Media",
  description:
    "Official GSA photography, building imagery, and media-ready assets for journalists and partners.",
};

export default function ImageLibraryPage() {
  return (
    <InfoPage
      eyebrow="Media"
      breadcrumbs={[{ label: "Media", href: "/about" }]}
      title="Image Library"
      intro="Browse and request official GSA photography for use in news coverage, publications, and approved communications. The image library includes building imagery, event photography, and leadership portraits."
      sections={[
        {
          id: "collections",
          heading: "Photo collections",
          body: (
            <>
              <p>
                The GSA image library is organized into collections covering
                federal buildings and courthouses, real estate and
                design-construction projects, agency events, and leadership.
                Each image is captioned with relevant context and usage
                information.
              </p>
              <p>
                High-resolution files are available for editorial use by members
                of the media. Web-optimized versions are provided for general
                reference and screen use.
              </p>
            </>
          ),
        },
        {
          id: "usage",
          heading: "Usage & attribution",
          body: (
            <>
              <p>
                Most GSA photography is produced by the federal government and
                is available for editorial use with appropriate credit. Some
                images may be subject to third-party rights or restrictions,
                which are noted in the image caption.
              </p>
              <p>
                When using GSA imagery, credit the U.S. General Services
                Administration unless otherwise indicated. Images must not be
                altered in a way that misrepresents their content or implies
                endorsement.
              </p>
            </>
          ),
        },
        {
          id: "requests",
          heading: "Requesting images",
          body: (
            <>
              <p>
                Members of the media can request specific imagery or
                higher-resolution files by contacting the Office of Strategic
                Communication. Please include a brief description of the
                intended use and any publication deadlines.
              </p>
              <p>
                For logos and brand assets, see the GSA Seal and Logos page.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "GSA Seal and Logos", href: "/about/logos" },
        { label: "Latest News", href: "/news" },
        { label: "Media contacts", href: "/about/contact" },
      ]}
    />
  );
}
