import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Policies | Resources",
  description:
    "Federal travel, property, and administrative policies GSA maintains for the government workforce.",
};

export default function EmployeePoliciesPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      breadcrumbs={[{ label: "Resources", href: "/employees" }]}
      title="Policies"
      intro="GSA develops and maintains government-wide policies that guide how federal agencies manage travel, real property, personal property, and administrative operations. These policies help agencies operate efficiently and consistently."
      sections={[
        {
          id: "travel",
          heading: "Travel & relocation policy",
          body: (
            <>
              <p>
                GSA issues the Federal Travel Regulation (FTR), which governs
                travel and relocation for civilian federal employees. The FTR
                sets per diem rates, reimbursement rules, and the standards
                agencies follow when authorizing official travel.
              </p>
              <p>
                Updates to the FTR are published in the Federal Register and
                reflected in GSA&apos;s per diem and travel resources so
                agencies always work from current guidance.
              </p>
            </>
          ),
        },
        {
          id: "property",
          heading: "Property management policy",
          body: (
            <>
              <p>
                GSA maintains the Federal Management Regulation (FMR) and
                related guidance covering the acquisition, use, and disposal of
                real and personal property. These policies help agencies manage
                assets responsibly across their lifecycle.
              </p>
              <p>
                Property policy also covers fleet management, mail management,
                and the disposal of excess and surplus government property.
              </p>
            </>
          ),
        },
        {
          id: "administrative",
          heading: "Administrative policy",
          body: (
            <>
              <p>
                GSA supports government-wide administrative policy in areas such
                as identity management, aviation management, and committee
                management. These frameworks promote consistency and
                accountability across agencies.
              </p>
              <p>
                Employees can consult the relevant regulation or contact their
                agency&apos;s policy office for guidance on applying these
                standards to specific situations.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Travel resources", href: "/employees/travel" },
        { label: "Per diem rates", href: "/employees/per-diem" },
        { label: "Training resources", href: "/employees/training" },
      ]}
    />
  );
}
