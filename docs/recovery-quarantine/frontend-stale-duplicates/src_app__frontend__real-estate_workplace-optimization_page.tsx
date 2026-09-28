import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Workplace Optimization | Real Estate",
  description:
    "GSA helps federal agencies right-size and modernize their workspace through data-driven strategies and federal workplace standards.",
};

export default function WorkplaceOptimizationPage() {
  return (
    <InfoPage
      breadcrumbs={[
        { label: "Real Estate", href: "/real-estate" },
        {
          label: "Workplace Optimization",
          href: "/real-estate/workplace-optimization",
        },
      ]}
      eyebrow="Real Estate"
      title="Workplace Optimization"
      intro="GSA partners with federal agencies to evaluate, right-size, and modernize their workspace — delivering efficient, effective environments that support the modern federal workforce."
      lastUpdated="June 2026"
      sections={[
        {
          id: "overview",
          heading: "Overview",
          body: (
            <>
              <p>
                The federal government operates one of the largest real estate
                portfolios in the world — approximately 360 million rentable
                square feet across thousands of locations. Workplace
                optimization is the process of aligning that space with actual
                mission needs, workforce patterns, and modern ways of working.
              </p>
              <p className="mt-4">
                GSA's Public Buildings Service leads governmentwide efforts to
                reduce underutilized space, consolidate agency footprints, and
                create workplaces that are better for both employees and
                taxpayers.
              </p>
            </>
          ),
        },
        {
          id: "utilization",
          heading: "Space Utilization Standards",
          body: (
            <>
              <p>
                GSA has established utilization rate targets that guide how much
                space federal agencies should occupy per employee. These
                benchmarks are regularly updated based on data from the
                Occupancy Agreement Space Inventory System (OASIS) and
                interagency workplace studies.
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  Target: 150 sq ft or fewer per person in open office
                  environments
                </li>
                <li>Consolidation priority: buildings below 60% utilization</li>
                <li>
                  Telework-adjusted models for hybrid and remote-capable roles
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "tools",
          heading: "Tools & Resources",
          body: (
            <p>
              Agencies can access the OASIS dashboard to view occupancy data,
              request space assessments, and benchmark against similar agencies.
              GSA's Workplace Innovation Lab in Washington, D.C. also offers a
              test environment for evaluating new workspace configurations
              before agency-wide rollout.
            </p>
          ),
        },
        {
          id: "process",
          heading: "How to Get Started",
          body: (
            <>
              <p>
                Federal agencies seeking to begin a workplace optimization
                project should contact their assigned GSA Regional Client
                Solutions Team. GSA will conduct a baseline assessment, develop
                a utilization report, and propose a phased consolidation or
                modernization plan.
              </p>
              <p className="mt-4">
                All major workspace changes that affect GSA-owned or -leased
                buildings require an approved Occupancy Agreement amendment.
              </p>
            </>
          ),
        },
      ]}
      related={[
        {
          label: "Occupancy Agreement Space Inventory System (OASIS)",
          href: "/real-estate/oasis",
        },
        { label: "Federal Portfolio Overview", href: "/real-estate/portfolio" },
        {
          label: "Property Disposition Pipeline",
          href: "/real-estate/disposal",
        },
        {
          label: "Sustainability & Energy Efficiency",
          href: "/real-estate/sustainability",
        },
      ]}
    />
  );
}
