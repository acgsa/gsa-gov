import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Plan a Trip | Resources",
  description:
    "Resources and guidance for federal employees planning official travel, from booking to reimbursement.",
};

export default function TravelPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      breadcrumbs={[{ label: "Resources", href: "/employees" }]}
      title="Plan a Trip"
      intro="Planning official federal travel involves several steps — from getting authorization to booking through approved channels and filing your voucher after the trip. Here's what you need to know."
      sections={[
        {
          id: "authorization",
          heading: "Getting travel authorization",
          body: (
            <>
              <p>
                Most agencies require advance authorization for official travel.
                Employees should submit a travel authorization request through
                their agency&rsquo;s travel management system before booking any
                travel arrangements. The request should include the purpose of
                travel, destination, estimated dates, and estimated costs.
              </p>
              <p>
                Once approved, employees can use the authorization to book
                transportation and lodging through their agency&rsquo;s travel
                management contractor or approved booking channels.
              </p>
            </>
          ),
        },
        {
          id: "booking",
          heading: "Booking travel",
          body: (
            <>
              <p>
                Federal employees should book airfare through their
                agency&rsquo;s Travel Management Service (TMS) or online booking
                tool. The City Pair Program provides discounted, unrestricted
                government airfare on thousands of routes — employees are
                required to use City Pair fares when available.
              </p>
              <p>
                After completing travel, employees must file a travel voucher
                within the timeframe required by their agency — typically 5
                business days. The voucher documents actual expenses and
                initiates the reimbursement process.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Per diem rates", href: "/employees/per-diem" },
        { label: "Lodging programs", href: "/employees/lodging" },
        { label: "Travel management", href: "/employees/travel-management" },
      ]}
    />
  );
}
