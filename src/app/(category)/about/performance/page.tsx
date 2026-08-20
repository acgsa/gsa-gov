import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Budget & Performance | About GSA",
  description: "GSA's budget, performance plans, and accountability reports.",
};

export default function PerformancePage() {
  return (
    <InfoPage
      eyebrow="About GSA"
      breadcrumbs={[{ label: "About", href: "/about" }]}
      title="Budget & Performance"
      intro="GSA is committed to transparent stewardship of taxpayer resources — publishing detailed budget justifications, performance plans, and accountability reports each year."
      sections={[
        {
          id: "budget",
          heading: "Budget",
          body: (
            <>
              <p>
                GSA&rsquo;s annual budget request is submitted to Congress as
                part of the President&rsquo;s Budget. The budget includes
                detailed justifications for each GSA program, fund, and
                appropriation — explaining how resources will be used to advance
                the agency&rsquo;s mission and strategic goals.
              </p>
              <p>
                GSA operates several revolving funds — including the Federal
                Buildings Fund and the Acquisition Services Fund — that are
                financed through fees charged to agencies for services rendered,
                rather than direct appropriations.
              </p>
            </>
          ),
        },
        {
          id: "performance",
          heading: "Performance",
          body: (
            <>
              <p>
                GSA&rsquo;s Annual Performance Report documents progress against
                the goals and targets set out in the agency&rsquo;s Strategic
                Plan. The report is published each spring and covers results
                from the prior fiscal year across all GSA programs and
                initiatives.
              </p>
              <p>
                GSA also participates in the government-wide performance
                framework established by the GPRA Modernization Act, publishing
                quarterly progress updates on priority goals on Performance.gov.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Reports & data", href: "/about/reports" },
        { label: "Mission & impact", href: "/about/mission" },
        { label: "Latest News", href: "/news" },
      ]}
    />
  );
}
