import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Leadership | About GSA",
  description:
    "Meet the Administrator, Deputy Administrator, and senior leadership team guiding GSA's mission and strategic direction.",
};

export default function LeadershipPage() {
  return (
    <InfoPage
      eyebrow="About GSA"
      breadcrumbs={[{ label: "About", href: "/about" }]}
      title="Leadership"
      intro="GSA is led by a team of senior officials committed to delivering better value to the American people through smarter real estate, acquisition, and technology programs."
      sections={[
        {
          id: "administrator",
          heading: "The Administrator",
          body: (
            <>
              <p>
                The GSA Administrator is a Senate-confirmed presidential
                appointee who serves as the head of the agency. The
                Administrator sets strategic priorities, represents GSA before
                Congress, and leads the agency&rsquo;s engagement with the White
                House and OMB on government management issues.
              </p>
              <p>
                The Deputy Administrator serves as the second-in-command and
                oversees day-to-day operations. Together with the Chief of Staff
                and senior advisors, the Administrator&rsquo;s office
                coordinates the work of GSA&rsquo;s services and staff offices.
              </p>
            </>
          ),
        },
        {
          id: "senior-leaders",
          heading: "Senior leaders",
          body: (
            <>
              <p>
                GSA&rsquo;s senior leadership team includes the Commissioner of
                the Public Buildings Service, the Commissioner of the Federal
                Acquisition Service, and the heads of staff offices covering
                technology policy, finance, human resources, communications, and
                general counsel.
              </p>
              <p>
                Regional Administrators lead GSA&rsquo;s 11 regional offices,
                overseeing real estate, acquisition, and customer service
                operations in their respective geographic areas. They serve as
                the primary point of contact for federal agencies in their
                regions.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "How we&rsquo;re organized", href: "/about/organization" },
        { label: "Mission & impact", href: "/about/mission" },
        { label: "Latest News", href: "/news" },
      ]}
    />
  );
}
