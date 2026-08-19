import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Reports & Data | Media",
  description: "GSA's published reports, datasets, and open data resources.",
};

export default function ReportsPage() {
  return (
    <InfoPage
      eyebrow="Media"
      breadcrumbs={[{ label: "Media", href: "/media" }]}
      title="Reports & Data"
      intro="GSA publishes a wide range of reports, datasets, and open data resources that document the agency's operations, financial management, and program outcomes."
      sections={[
        {
          id: "reports",
          heading: "Published reports",
          body: (
            <>
              <p>
                GSA&rsquo;s report library includes the Annual Performance
                Report, the Agency Financial Report, small business contracting
                reports, real estate portfolio data, and acquisition program
                statistics. Major reports are published on a regular schedule
                and archived on GSA.gov.
              </p>
              <p>
                The Inspector General&rsquo;s Office publishes independent
                audits, investigations, and management alerts that provide an
                additional layer of accountability and transparency into GSA
                operations.
              </p>
            </>
          ),
        },
        {
          id: "open-data",
          heading: "Open data",
          body: (
            <>
              <p>
                GSA publishes datasets through Data.gov and the agency&rsquo;s
                own open data portal. Available datasets cover federal real
                property inventory, acquisition spend, per diem rates, and
                government-wide travel data — providing researchers,
                journalists, and the public with access to authoritative
                government information.
              </p>
              <p>
                All GSA open data is published in machine-readable formats and
                accompanied by data dictionaries and metadata to support
                downstream use. Requests for specific datasets not currently
                published can be submitted through the agency&rsquo;s FOIA
                office.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Budget & performance", href: "/about-gsa#reports" },
        { label: "Contact & FOIA", href: "/media/contact" },
        { label: "Latest News", href: "/news" },
      ]}
    />
  );
}
