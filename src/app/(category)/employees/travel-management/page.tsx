import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Travel Management | Resources",
  description:
    "GSA's travel management programs help federal agencies manage official travel efficiently and in compliance with regulations.",
};

export default function TravelManagementPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      breadcrumbs={[{ label: "Resources", href: "/employees" }]}
      title="Travel Management"
      intro="GSA provides government-wide travel management programs that help federal agencies book, track, and report on official travel while ensuring compliance with Federal Travel Regulation requirements."
      sections={[
        {
          id: "e-gov",
          heading: "E-Gov Travel Service",
          body: (
            <>
              <p>
                The E-Gov Travel Service (ETS) is GSA&rsquo;s government-wide
                travel management solution. It provides a fully integrated
                platform for travel authorization, booking, expense reporting,
                and data management — helping agencies reduce costs and
                administrative burden while maintaining compliance.
              </p>
              <p>
                ETS supports all modes of official travel including air, rail,
                rental car, and lodging. Built-in policy controls ensure
                travelers are directed to compliant, cost-effective options at
                the point of booking.
              </p>
            </>
          ),
        },
        {
          id: "city-pair",
          heading: "City Pair Program",
          body: (
            <>
              <p>
                The City Pair Program (CPP) is GSA&rsquo;s government airfare
                program, offering unrestricted, fully refundable fares on
                thousands of domestic and international routes. CPP fares are
                typically significantly lower than comparable commercial fares
                and are available only to federal employees and eligible
                travelers.
              </p>
              <p>
                Federal employees are required to use City Pair fares when
                available and when they represent the best value for the
                government. Fares are renewed annually through a competitive
                acquisition process.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Plan a trip", href: "/employees/travel" },
        { label: "Per diem rates", href: "/employees/per-diem" },
        { label: "GSA Fleet", href: "/employees/fleet" },
      ]}
    />
  );
}
