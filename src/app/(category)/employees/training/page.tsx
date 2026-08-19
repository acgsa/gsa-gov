import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Training Resources | Resources",
  description:
    "Training and professional development resources for GSA employees and the federal workforce.",
};

export default function EmployeeTrainingPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      breadcrumbs={[{ label: "Resources", href: "/employees" }]}
      title="Training Resources"
      intro="GSA provides a range of training resources to help employees build skills, meet mandatory requirements, and advance their careers in federal service."
      sections={[
        {
          id: "mandatory",
          heading: "Mandatory training",
          body: (
            <>
              <p>
                All federal employees are required to complete certain training
                on an annual or periodic basis — including ethics, information
                security, privacy, and workplace conduct. GSA employees complete
                mandatory training through the agency&rsquo;s Learning
                Management System (LMS).
              </p>
              <p>
                Supervisors and managers have additional mandatory training
                requirements covering performance management, EEO, and
                leadership fundamentals. New employees complete an onboarding
                training series during their first weeks on the job.
              </p>
            </>
          ),
        },
        {
          id: "development",
          heading: "Career development",
          body: (
            <>
              <p>
                GSA offers a wide range of elective training and development
                opportunities — from technical skills courses to leadership
                development programs and tuition assistance for degree programs.
                Employees work with their supervisors to identify development
                priorities through the Individual Development Plan (IDP)
                process.
              </p>
              <p>
                GSA&rsquo;s partnership with the Government Accountability
                Office&rsquo;s Yellow Book training and DAU acquisition programs
                gives employees access to high-quality professional development
                aligned to their career field.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Employee tools", href: "/employees/tools" },
        { label: "GSA Fleet", href: "/employees/fleet" },
        { label: "Travel resources", href: "/employees/travel" },
      ]}
    />
  );
}
