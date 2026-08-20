import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Sustainability | Real Estate",
  description:
    "GSA leads the federal government in sustainable building practices, energy efficiency, and environmental stewardship.",
};

export default function SustainabilityPage() {
  return (
    <InfoPage
      eyebrow="Real Estate"
      breadcrumbs={[{ label: "Real Estate", href: "/real-estate" }]}
      title="Sustainability & Energy"
      intro="GSA is committed to operating the most energy-efficient, environmentally responsible federal building portfolio in the country — reducing costs, cutting emissions, and setting a standard for sustainable government."
      sections={[
        {
          id: "overview",
          heading: "Our sustainability commitments",
          body: (
            <>
              <p>
                GSA&rsquo;s federal buildings are held to some of the highest
                sustainability standards of any building owner in the United
                States. The agency targets LEED Gold or higher certification for
                new construction, pursues aggressive energy and water reduction
                goals, and integrates renewable energy across its portfolio.
              </p>
              <p>
                GSA&rsquo;s Green Building Advisory Committee provides expert
                guidance on sustainable design and construction practices,
                helping the agency stay ahead of evolving standards and
                technologies.
              </p>
            </>
          ),
        },
        {
          id: "energy",
          heading: "Energy performance",
          body: (
            <>
              <p>
                GSA has reduced energy intensity across its owned building
                portfolio by more than 30 percent over the past two decades. The
                agency uses energy audits, retro-commissioning, and building
                automation upgrades to identify and capture efficiency
                opportunities in existing buildings.
              </p>
              <p>
                On-site solar installations, green power procurement, and
                electrification of building systems are central to GSA&rsquo;s
                strategy for reaching net-zero emissions across its portfolio by
                2045.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Design standards", href: "/real-estate/design-construction" },
        { label: "Historic preservation", href: "/real-estate/historic" },
        { label: "Portfolio planning", href: "/real-estate/portfolio" },
      ]}
    />
  );
}
