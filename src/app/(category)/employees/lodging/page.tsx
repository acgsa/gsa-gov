import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Lodging Programs | Resources",
  description:
    "Federal lodging programs and FedRooms provide government travelers with guaranteed rates at quality hotels.",
};

export default function LodgingPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      breadcrumbs={[{ label: "Resources", href: "/employees" }]}
      title="Lodging Programs"
      intro="GSA's FedRooms program provides federal travelers with access to negotiated hotel rates at or below per diem, with rates that are fully refundable and compliant with government travel regulations."
      sections={[
        {
          id: "fedrooms",
          heading: "FedRooms",
          body: (
            <>
              <p>
                FedRooms is the preferred hotel program for federal government
                travelers. Participating hotels offer rates at or below the GSA
                per diem rate for each location, with no early departure fees
                and guaranteed late checkout when requested. All FedRooms rates
                include free in-room internet access.
              </p>
              <p>
                FedRooms properties are available in thousands of locations
                across the country and are accessible through GSA&rsquo;s online
                booking tool and participating Travel Management Service
                contractors.
              </p>
            </>
          ),
        },
        {
          id: "extended-stay",
          heading: "Extended stay and other options",
          body: (
            <>
              <p>
                For assignments lasting 30 days or more, federal agencies may
                consider extended-stay properties or furnished apartment options
                that can provide better value than nightly hotel rates. These
                arrangements typically require advance planning and
                agency-specific approval.
              </p>
              <p>
                In areas where FedRooms properties are not available or fully
                booked, travelers may seek lodging at any property at or below
                the applicable per diem rate, subject to agency travel policy.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Per diem rates", href: "/employees/per-diem" },
        { label: "Plan a trip", href: "/employees/travel" },
        { label: "Travel management", href: "/employees/travel-management" },
      ]}
    />
  );
}
