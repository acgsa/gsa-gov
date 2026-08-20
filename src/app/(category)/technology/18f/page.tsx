import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "18F Methods | Technology",
  description:
    "18F is a digital services team within GSA that partners with federal agencies to design and build better government services.",
};

export default function EighteenFPage() {
  return (
    <InfoPage
      eyebrow="Technology"
      breadcrumbs={[{ label: "Technology", href: "/technology" }]}
      title="18F Methods"
      intro="18F is a digital services team within GSA that partners with federal agencies to improve the design and delivery of government services — using human-centered design, agile development, and open-source software."
      sections={[
        {
          id: "overview",
          heading: "How 18F works",
          body: (
            <>
              <p>
                18F works with federal agencies on a cost-recovery basis,
                embedding multidisciplinary teams of designers, engineers, and
                product managers into agency projects. Rather than delivering
                finished software, 18F focuses on building agency capacity —
                helping teams learn new ways of working that they can sustain
                long after the engagement ends.
              </p>
              <p>
                Projects range from user research and strategy engagements to
                full-stack application development. 18F has partnered with
                agencies including the IRS, FBI, FEC, and many others to
                modernize legacy systems and launch new digital services.
              </p>
            </>
          ),
        },
        {
          id: "methods",
          heading: "18F Methods guide",
          body: (
            <>
              <p>
                18F&rsquo;s Methods guide is a publicly available collection of
                research, design, and development practices drawn from real
                government projects. Methods cover activities including
                stakeholder interviews, journey mapping, prototyping, usability
                testing, and technical discovery.
              </p>
              <p>
                The Methods guide is designed to be adapted — federal teams are
                encouraged to use these practices directly or modify them to fit
                their context, without needing to engage 18F directly.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Digital.gov resources", href: "/technology/digital-gov" },
        { label: "Adoption support", href: "/technology/adoption" },
        { label: "IT modernization", href: "/technology/modernization" },
      ]}
    />
  );
}
