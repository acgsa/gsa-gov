import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Short-Term Rentals | Resources",
  description:
    "GSA's short-term rental program provides federal employees with access to rental vehicles for official travel.",
};

export default function RentalsPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      breadcrumbs={[{ label: "Resources", href: "/employees" }]}
      title="Short-Term Rentals"
      intro="When federal employees need a vehicle for short-term official travel, GSA's rental car programs provide access to pre-negotiated government rates with approved vendors."
      sections={[
        {
          id: "overview",
          heading: "Rental car for official travel",
          body: (
            <>
              <p>
                Federal employees on official travel may rent vehicles through
                GSA&rsquo;s Short-Term Rental (STR) program or through their
                agency&rsquo;s travel management contractor. GSA has negotiated
                rates with major rental companies that are available exclusively
                to government travelers.
              </p>
              <p>
                Government rental rates include collision damage waiver (CDW)
                and loss damage waiver (LDW) coverage, eliminating the need for
                employees to purchase these coverages separately. Fuel is
                reimbursed at actual cost — employees should return vehicles
                with a full tank to minimize fuel charges.
              </p>
            </>
          ),
        },
        {
          id: "booking",
          heading: "How to book",
          body: (
            <>
              <p>
                Rental vehicles for official travel should be booked through the
                agency&rsquo;s authorized travel management system or booking
                tool. Employees must have an active travel authorization before
                booking a rental vehicle.
              </p>
              <p>
                The most fuel-efficient vehicle adequate for the mission should
                be selected. Luxury vehicles and premium upgrades are not
                reimbursable under standard travel policy unless approved by the
                agency in advance for specific mission requirements.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "GSA Fleet", href: "/employees/fleet" },
        { label: "Plan a trip", href: "/employees/travel" },
        { label: "Travel management", href: "/employees/travel-management" },
      ]}
    />
  );
}
