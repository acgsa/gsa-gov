import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Sell & Dispose | Real Estate",
  description:
    "GSA manages the sale and transfer of surplus federal real property through a transparent, competitive process.",
};

export default function DisposalPage() {
  return (
    <InfoPage
      eyebrow="Real Estate"
      breadcrumbs={[{ label: "Real Estate", href: "/real-estate" }]}
      title="Sell & Dispose"
      intro="When federal agencies no longer need real property, GSA manages the disposal process — returning surplus assets to productive use through sale, transfer, or exchange."
      sections={[
        {
          id: "overview",
          heading: "How federal property disposal works",
          body: (
            <>
              <p>
                Federal property disposal follows a statutory sequence
                established by the Federal Property and Administrative Services
                Act. Before a property can be sold to the public, it must first
                be screened for use by other federal agencies, then made
                available to state and local governments and nonprofits for
                public benefit purposes.
              </p>
              <p>
                Properties that clear those screens may be offered at public
                auction through RealEstateSales.gov, GSA&rsquo;s official
                platform for federal property sales. Auctions are open to all
                qualified bidders, and proceeds flow to the Treasury or
                sponsoring agency as required by law.
              </p>
            </>
          ),
        },
        {
          id: "pipeline",
          heading: "Current disposition pipeline",
          body: (
            <>
              <p>
                GSA maintains a rolling pipeline of properties in various stages
                of the disposal process. The current portfolio includes office
                buildings, warehouses, land, and specialized facilities across
                the country. Properties range from small parcels to large campus
                sites.
              </p>
              <p>
                GSA has disposed of 45 properties through its accelerated
                disposal approach, generating an estimated $3 billion in avoided
                deferred maintenance costs and returning real estate to
                productive community use ahead of schedule.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Preservation", href: "/preservation" },
        { label: "Lease Space", href: "/real-estate/leasing" },
      ]}
    />
  );
}
