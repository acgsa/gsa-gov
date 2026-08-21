import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Mission & Impact | About GSA",
  description:
    "GSA's mission, values, and the measurable impact it delivers for the American people and federal agencies.",
};

export default function MissionPage() {
  return (
    <InfoPage
      eyebrow="About GSA"
      breadcrumbs={[{ label: "About", href: "/about" }]}
      title="Mission & Impact"
      intro="GSA&rsquo;s mission is to deliver the best value in real estate, acquisition, and technology services to government and the American people — making government work better for everyone."
      sections={[
        {
          id: "mission",
          heading: "Our mission",
          body: (
            <>
              <p>
                Established by President Truman in 1949, the General Services
                Administration was created to consolidate the government&rsquo;s
                management of its own property, procurement, and records. Today,
                GSA serves as the government&rsquo;s expert manager of real
                estate, acquisition systems, and shared technology
                infrastructure.
              </p>
              <p>
                GSA&rsquo;s work is foundational — it operates in the background
                so that agencies like the Department of Defense, the IRS, and
                the Department of Veterans Affairs can focus on their
                public-facing missions rather than managing the logistics of
                their own operations.
              </p>
            </>
          ),
        },
        {
          id: "impact",
          heading: "Our impact",
          body: (
            <>
              <p>
                GSA manages approximately 360 million rentable square feet of
                federal real estate and processes trillions of dollars in
                federal procurement annually. The agency&rsquo;s acquisition
                programs deliver billions of dollars in savings to taxpayers
                each year through pre-negotiated pricing and category
                management.
              </p>
              <p>
                Through Login.gov, Cloud.gov, FedRAMP, and other shared
                technology platforms, GSA enables faster, more secure digital
                service delivery across the federal government — helping
                agencies serve citizens more effectively in an increasingly
                digital world.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Leadership", href: "/about/leadership" },
        { label: "How we&rsquo;re organized", href: "/about/organization" },
        { label: "Budget & performance", href: "/about/performance" },
      ]}
    />
  );
}
