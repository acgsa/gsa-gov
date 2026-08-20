import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "How We're Organized | About GSA",
  description:
    "An overview of GSA's organizational structure — its services, staff offices, and regional presence.",
};

export default function OrganizationPage() {
  return (
    <InfoPage
      eyebrow="About GSA"
      breadcrumbs={[{ label: "About", href: "/about" }]}
      title="How We're Organized"
      intro="GSA is organized around two major services — the Public Buildings Service and the Federal Acquisition Service — supported by a network of staff offices and 11 regional offices across the country."
      sections={[
        {
          id: "services",
          heading: "Our two services",
          body: (
            <>
              <p>
                The Public Buildings Service (PBS) is responsible for the
                design, construction, management, and disposal of federal
                buildings and courthouses. PBS manages approximately 360 million
                rentable square feet of owned and leased space on behalf of more
                than 60 federal agencies.
              </p>
              <p>
                The Federal Acquisition Service (FAS) provides acquisition
                solutions to federal agencies — including Multiple Award
                Schedules, government-wide acquisition contracts, travel
                programs, and fleet services. FAS manages trillions of dollars
                in federal spend across its portfolio of contract vehicles.
              </p>
            </>
          ),
        },
        {
          id: "staff-offices",
          heading: "Staff offices and regions",
          body: (
            <>
              <p>
                GSA&rsquo;s staff offices support the agency&rsquo;s mission
                through functions including technology policy, finance, human
                resources, communications, civil rights, and legal counsel. The
                Office of Government-wide Policy plays a key role in developing
                and disseminating federal management policy across all civilian
                agencies.
              </p>
              <p>
                Eleven regional offices give GSA a local presence in every part
                of the country, with dedicated teams for real estate,
                acquisition, and customer service. Regional offices are a key
                point of contact for agencies seeking GSA support in their area.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Leadership", href: "/about/leadership" },
        { label: "Mission & impact", href: "/about/mission" },
        { label: "Regional offices", href: "/about/regions" },
      ]}
    />
  );
}
