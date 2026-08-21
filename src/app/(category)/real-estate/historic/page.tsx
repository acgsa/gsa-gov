import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Building Standards | Real Estate",
  description:
    "GSA's design excellence and historic preservation standards guide the quality and stewardship of federal buildings nationwide.",
};

export default function HistoricPage() {
  return (
    <InfoPage
      eyebrow="Real Estate"
      breadcrumbs={[{ label: "Real Estate", href: "/real-estate" }]}
      title="Building Standards"
      intro="GSA is the steward of more than 480 federally owned historic properties — courthouses, land ports of entry, and office buildings that represent some of America's most significant civic architecture."
      sections={[
        {
          id: "overview",
          heading: "Our preservation mission",
          body: (
            <>
              <p>
                Under Section 110 of the National Historic Preservation Act, GSA
                is responsible for identifying, evaluating, and nominating its
                historic properties to the National Register of Historic Places.
                GSA works to ensure that federal building projects preserve
                historic character while meeting modern mission requirements.
              </p>
              <p>
                GSA&rsquo;s historic properties span more than a century of
                American architecture — from Romanesque Revival courthouses of
                the 1890s to Modernist federal office buildings of the postwar
                era. Each property presents a unique set of preservation
                challenges and opportunities.
              </p>
            </>
          ),
        },
        {
          id: "projects",
          heading: "Current preservation projects",
          body: (
            <>
              <p>
                GSA actively rehabilitates and restores historic properties
                across the country. Recent projects have included façade
                restoration, window replacement using historically appropriate
                materials, seismic upgrades, and mechanical system modernization
                — all completed in a manner that respects and reinforces
                historic character.
              </p>
              <p>
                The agency collaborates with the Advisory Council on Historic
                Preservation, State Historic Preservation Offices, and local
                communities to ensure that preservation decisions reflect shared
                values and legal requirements.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Construction", href: "/real-estate/design-construction" },
        { label: "Sell & Dispose", href: "/real-estate/disposal" },
      ]}
    />
  );
}
