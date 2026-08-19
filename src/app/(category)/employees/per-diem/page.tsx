import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Per Diem Rates | Resources",
  description:
    "Look up official GSA per diem rates for lodging and meals and incidental expenses for federal travel.",
};

export default function PerDiemPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      breadcrumbs={[{ label: "Resources", href: "/employees" }]}
      title="Per Diem Rates"
      intro="GSA sets the official per diem rates used by federal civilian employees for domestic travel — covering lodging and meals and incidental expenses (M&IE) by location."
      sections={[
        {
          id: "overview",
          heading: "How per diem works",
          body: (
            <>
              <p>
                Per diem rates are the maximum amounts a federal employee can be
                reimbursed for lodging, meals, and incidental expenses while
                traveling for official business. Rates vary by location and are
                updated annually on October 1 to reflect current market
                conditions.
              </p>
              <p>
                The standard CONUS per diem rate applies to most domestic
                locations. Non-standard rates apply to higher-cost areas and are
                set based on average daily rate data for lodging in each area.
                Employees should check the current rate for their destination
                before booking travel.
              </p>
            </>
          ),
        },
        {
          id: "rates",
          heading: "Looking up rates",
          body: (
            <>
              <p>
                Per diem rates are published on GSA.gov and updated each fiscal
                year. Travelers can search by city, county, or ZIP code to find
                the applicable rate. Rates include a separate lodging maximum
                and an M&IE rate broken down by meal.
              </p>
              <p>
                When actual lodging costs are at or below the per diem rate, the
                traveler is reimbursed at actual cost. M&IE is typically
                reimbursed at 75 percent on the first and last day of travel.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Plan a trip", href: "/employees/travel" },
        { label: "Lodging programs", href: "/employees/lodging" },
        { label: "Travel management", href: "/employees/travel-management" },
      ]}
    />
  );
}
