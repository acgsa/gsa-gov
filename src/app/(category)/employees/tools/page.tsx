import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Employee Tools | Resources",
  description:
    "Core tools and systems used by GSA employees in their daily work.",
};

export default function ToolsEmployeePage() {
  return (
    <InfoPage
      eyebrow="Resources"
      breadcrumbs={[{ label: "Resources", href: "/employees" }]}
      title="Employee Tools"
      intro="GSA employees use a suite of shared tools for time and attendance, performance management, HR transactions, IT support, and internal communication. Here's a quick guide to the most commonly used systems."
      sections={[
        {
          id: "hr-systems",
          heading: "HR and workforce systems",
          body: (
            <>
              <p>
                GSA uses HR Links for most human resources transactions —
                including time and attendance, leave requests, performance
                plans, and personnel actions. Employees access HR Links through
                the GSA intranet using their PIV card or network credentials.
              </p>
              <p>
                Benefits enrollment and changes are managed through BENEFEDS for
                health and life insurance and through the Thrift Savings Plan
                portal for retirement savings. Open Season runs annually from
                mid-November through mid-December.
              </p>
            </>
          ),
        },
        {
          id: "it-tools",
          heading: "IT and productivity tools",
          body: (
            <>
              <p>
                GSA employees use Microsoft 365 for email, calendar, document
                collaboration, and video conferencing. The agency&rsquo;s IT
                service desk is available for help with hardware, software,
                access requests, and technical issues.
              </p>
              <p>
                GSA&rsquo;s internal collaboration platform and intranet
                (InSite) serve as the primary hub for agency news, policies,
                organizational information, and internal resources. Employees
                are encouraged to check InSite regularly for announcements and
                updates from agency leadership.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Training resources", href: "/employees/training" },
        { label: "Travel resources", href: "/employees/travel" },
        { label: "GSA Fleet", href: "/employees/fleet" },
      ]}
    />
  );
}
