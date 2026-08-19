import type { Metadata } from "next";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { DetailPage } from "@/templates/DetailPage";
import type { DetailPageSection } from "@/templates/DetailPage";
import { ArticleGallery } from "@/components/ui/ArticleGallery";
import { CategoryLeadership } from "@/templates/category/CategoryLeadership";
import { GSA_LEADERSHIP } from "@/lib/leadership-data";

import heroImg from "@/assets/images/BUILDING/1500x500.jpeg";
import galleryHistoric from "@/assets/images/BUILDING/1800FHistoric4.jpg";
import galleryColor1 from "@/assets/images/BUILDING/GSA-Building-Blue-scaled.jpg";
import galleryColor2 from "@/assets/images/BUILDING/06162026_GSA Decorated building photos Social Media (7 of 25)_1024px.png";
import galleryColor3 from "@/assets/images/BUILDING/06162026_GSA Decorated building photos Social Media (8 of 25)_1024px.png";
import galleryColor4 from "@/assets/images/BUILDING/06162026_GSA Decorated building photos Social Media (18 of 25)_1024px.png";

export const metadata: Metadata = {
  title: "About GSA",
  description:
    "Learn about the U.S. General Services Administration — its mission, organization, leadership, reports, and how it delivers value for the American people.",
};

const gallery = [
  {
    src: galleryHistoric,
    alt: "Workers constructing the interior of GSA headquarters, 1917",
  },
  { src: galleryColor1, alt: "GSA headquarters building, blue sky" },
  { src: galleryColor2, alt: "GSA 1800 F Street decorated building exterior" },
  { src: galleryColor3, alt: "GSA headquarters building decorated exterior" },
  { src: galleryColor4, alt: "GSA 1800 F Street building facade" },
];

const sections: DetailPageSection[] = [
  {
    id: "mission",
    heading: "Our mission & impact",
    body: (
      <>
        <p>
          GSA delivers the best value in real estate, acquisition, and
          technology services to the government and the American people.
          Established by President Truman in 1949, the agency consolidates a
          wide range of common government functions so that other federal
          agencies can focus on their core missions.
        </p>
        <p>
          GSA&apos;s work is foundational — it operates in the background so
          that agencies like the Department of Defense, the IRS, and the
          Department of Veterans Affairs can focus on their public-facing
          missions rather than managing the logistics of their own operations.
        </p>
        <p>
          The agency manages approximately 360 million rentable square feet of
          federal real estate and processes trillions of dollars in federal
          procurement annually, delivering billions of dollars in savings to
          taxpayers each year through pre-negotiated pricing and category
          management. Through Login.gov, Cloud.gov, FedRAMP, and other shared
          platforms, GSA enables faster, more secure digital service delivery
          across the federal government.
        </p>
      </>
    ),
  },
  {
    id: "what-we-do",
    heading: "What we do",
    body: (
      <>
        <p>
          GSA is organized around two major services. The Public Buildings
          Service manages the design, construction, and operation of federal
          buildings and courthouses. The Federal Acquisition Service provides
          acquisition solutions — including Multiple Award Schedules, fleet,
          travel, and technology contracts — to agencies government-wide.
        </p>
        <p>
          Supporting these services is a network of staff offices and eleven
          regional offices that give GSA a local presence across the country.
        </p>
      </>
    ),
  },
  {
    id: "gallery",
    heading: "Our headquarters",
    body: (
      <div className="sm:-mx-14 lg:-mx-24">
        <ArticleGallery images={gallery} />
      </div>
    ),
  },
  {
    id: "organization",
    heading: "How we're organized",
    body: (
      <>
        <p>
          The Public Buildings Service (PBS) is responsible for the design,
          construction, management, and disposal of federal buildings and
          courthouses. PBS manages approximately 360 million rentable square
          feet of owned and leased space on behalf of more than 60 federal
          agencies.
        </p>
        <p>
          The Federal Acquisition Service (FAS) provides acquisition solutions
          to federal agencies — including Multiple Award Schedules,
          government-wide acquisition contracts, travel programs, and fleet
          services. FAS manages trillions of dollars in federal spend across its
          portfolio of contract vehicles.
        </p>
        <p>
          GSA&apos;s staff offices support the agency&apos;s mission through
          functions including technology policy, finance, human resources,
          communications, civil rights, and legal counsel. Eleven regional
          offices give GSA a local presence in every part of the country, with
          dedicated teams for real estate, acquisition, and customer service.
        </p>
      </>
    ),
  },
  {
    id: "reports",
    heading: "Budget, reports & data",
    body: (
      <>
        <p>
          GSA is committed to transparent stewardship of taxpayer resources —
          publishing detailed budget justifications, performance plans, and
          accountability reports each year. GSA&apos;s annual budget request is
          submitted to Congress as part of the President&apos;s Budget, and the
          agency&apos;s Annual Performance Report documents progress against the
          goals set out in its Strategic Plan.
        </p>
        <p>
          GSA&apos;s report library includes the Agency Financial Report, small
          business contracting reports, real estate portfolio data, and
          acquisition program statistics. Datasets are published through
          Data.gov and the agency&apos;s open data portal in machine-readable
          formats, with the Inspector General&apos;s Office providing an
          additional layer of accountability through independent audits and
          investigations.
        </p>
      </>
    ),
  },
  {
    id: "value",
    heading: "Value for taxpayers",
    body: (
      <>
        <p>
          By buying in bulk, sharing common infrastructure, and driving down the
          cost of government operations, GSA delivers measurable savings back to
          the American taxpayer. The agency continually publishes performance
          and savings data so the public can see the results of that work.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contact GSA",
    body: (
      <>
        <p>
          GSA&apos;s main public contact number is 1-844-472-4GSA
          (1-844-472-4472). Media inquiries should be directed to the Office of
          Strategic Communication, and congressional inquiries are handled by
          the Office of Congressional and Intergovernmental Affairs.
        </p>
        <p>
          GSA is committed to transparency and responds to FOIA requests for
          agency records within the statutory timeframes. Requesters can submit
          FOIA requests through GSA&apos;s online FOIA portal or by mail to the
          GSA FOIA Requester Service Center in Washington, D.C.
        </p>
      </>
    ),
  },
];

export default function AboutGsaPage() {
  return (
    <>
      <ParallaxHero
        src={heroImg}
        alt="GSA 1800 F Street headquarters"
        priority
      />
      <DetailPage
        eyebrow="About GSA"
        title="About GSA"
        intro="The U.S. General Services Administration provides workplaces, acquisition solutions, and technology services that help federal agencies serve the public more effectively and at lower cost to taxpayers."
        sections={sections}
        relatedLinks={[
          { label: "Taxpayer savings", href: "/savings" },
          { label: "Leadership team", href: "/resources/leadership" },
          { label: "Reports & data", href: "/media/reports" },
          { label: "Latest news", href: "/news" },
        ]}
      />
      <CategoryLeadership
        section="About GSA"
        leadership={GSA_LEADERSHIP}
        heading="Leadership"
      />
    </>
  );
}
