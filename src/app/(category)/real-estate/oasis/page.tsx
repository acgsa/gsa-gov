import type { Metadata } from "next";
import { DetailPage } from "@/templates/DetailPage";

export const metadata: Metadata = {
  title: "OASIS — Space Inventory System | Real Estate",
  description:
    "The Occupancy Agreement Space Inventory System (OASIS) provides real-time data on federal space occupancy and utilization across GSA's nationwide portfolio.",
};

export default function OasisPage() {
  return (
    <DetailPage
      eyebrow="Real Estate"
      title="Occupancy Agreement Space Inventory System (OASIS)"
      intro="OASIS is GSA's authoritative system of record for federal space occupancy data — tracking utilization, lease terms, and occupancy agreements across the entire federal real estate portfolio."
      lastUpdated="June 2026"
      meta={[
        { label: "Program", value: "Public Buildings Service" },
        { label: "Access", value: "Federal agencies only" },
        { label: "Contact", value: "pbs.oasis@gsa.gov" },
      ]}
      sections={[
        {
          id: "about",
          heading: "About OASIS",
          body: (
            <>
              <p>
                OASIS maintains comprehensive records of every federally
                occupied space managed by GSA — whether owned, leased, or
                delegated. The system links physical space data with Occupancy
                Agreements, agency assignments, and utilization metrics
                collected through periodic surveys and badge-based access data.
              </p>
              <p>
                Data from OASIS informs federal real estate strategy,
                congressional reporting, and agency space allocation decisions.
              </p>
            </>
          ),
        },
        {
          id: "data",
          heading: "What OASIS Tracks",
          body: (
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Rentable square footage by building, floor, and agency</li>
              <li>Occupancy Agreement terms, expiration dates, and rates</li>
              <li>
                Utilization rates derived from badge swipe and reservation data
              </li>
              <li>
                Lease vs. owned breakdown across 8,000+ federally occupied
                buildings
              </li>
              <li>Historical trends by agency, region, and building type</li>
            </ul>
          ),
        },
        {
          id: "access",
          heading: "Accessing OASIS",
          body: (
            <p>
              OASIS is available to federal agency space managers, GSA regional
              portfolio managers, and authorized congressional staff. Access is
              provisioned through GSA Connect with agency sponsor approval.
              Agencies without existing access should contact their GSA Regional
              Client Solutions Team.
            </p>
          ),
        },
        {
          id: "reporting",
          heading: "Reporting & Exports",
          body: (
            <p>
              OASIS generates standard reports on space inventory, utilization
              rates, and lease expiration timelines. Custom exports can be
              requested in CSV or Excel format for use in agency strategic
              planning. An API is available for authorized systems integrations.
            </p>
          ),
        },
      ]}
      contact={{
        heading: "Contact",
        items: [
          {
            label: "Program",
            value: "Public Buildings Service",
          },
          {
            label: "Email",
            value: "pbs.oasis@gsa.gov",
            href: "mailto:pbs.oasis@gsa.gov",
          },
          {
            label: "Support",
            value: "PBS Client Solutions Team",
            href: "#",
          },
        ],
      }}
      relatedLinks={[
        {
          category: "Real Estate",
          label: "Portfolio Tools",
          href: "/real-estate/portfolio",
        },
        {
          category: "Real Estate",
          label: "Property for Sale",
          href: "/real-estate/sales",
        },
        {
          category: "Data Systems",
          label: "Utilization Survey Schedule",
          href: "#",
        },
      ]}
    />
  );
}
