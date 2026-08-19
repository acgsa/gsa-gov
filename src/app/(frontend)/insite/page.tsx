import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "InSite | GSA Intranet",
  description:
    "InSite is GSA's internal employee portal — your home for news, resources, tools, and updates from across the agency.",
};

export default function InSitePage() {
  return (
    <InfoPage
      eyebrow="Resources"
      breadcrumbs={[{ label: "Resources", href: "/employees" }]}
      title="InSite"
      intro="InSite is GSA's internal employee portal — your central hub for agency news, policies, tools, organizational information, and resources to help you get your work done."
      sections={[
        {
          id: "overview",
          heading: "Your starting point",
          body: (
            <>
              <p>
                InSite brings together the most frequently needed employee
                resources in one place — from HR systems and IT support to
                leadership messages and agency announcements. Employees are
                encouraged to set InSite as their browser homepage for quick
                access.
              </p>
              <p>
                Content on InSite is managed by offices and teams across GSA. If
                you have content to add or updates to existing pages, contact
                your organization&rsquo;s InSite content coordinator or submit a
                request through the IT service desk.
              </p>
            </>
          ),
        },
        {
          id: "features",
          heading: "What you'll find",
          body: (
            <>
              <p>
                InSite includes the GSA organizational chart, employee
                directory, policy library, forms repository, and links to all
                major HR and IT systems. The homepage features a news feed with
                the latest agency announcements, leadership messages, and
                upcoming events.
              </p>
              <p>
                Each GSA service and staff office maintains its own InSite
                section with organization-specific resources, contacts, and
                news. Use the search function to quickly find people, policies,
                and resources across the entire site.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Employee tools", href: "/employees/tools" },
        { label: "Training resources", href: "/employees/training" },
        { label: "Resources home", href: "/employees" },
      ]}
    />
  );
}
