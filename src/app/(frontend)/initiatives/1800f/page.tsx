import type { Metadata } from "next";
import { MicrositePage } from "@/templates/MicrositePage";
import heroImg from "@/assets/images/BUILDING/1800FArchitecture2.jpg";
import histImg from "@/assets/images/BUILDING/1800FHistoric1.jpg";
import arch4 from "@/assets/images/BUILDING/1800FArchitecture4.jpg";
import hist10 from "@/assets/images/BUILDING/1800FHistoric10.jpg";

export const metadata: Metadata = {
  title: "1800 F Street Revitalization | GSA",
  description:
    "The revitalization of 1800 F Street NW — GSA's flagship workplace transformation project — sets a new standard for federal workplaces in the 21st century.",
};

export default function Initiative1800FPage() {
  return (
    <MicrositePage
      heroSrc={heroImg}
      heroAlt="1800 F Street NW exterior"
      heroEyebrow="GSA Initiative · Real Estate"
      heroTitle="1800 F Street Revitalization"
      heroSubtitle="A historic federal building transformed into a model 21st-century workplace — delivering better space, lower cost, and higher performance for the American people."
      heroCta={{ label: "Watch the Livestream", href: "#livestream" }}
      sections={[
        {
          id: "about",
          eyebrow: "About the Project",
          heading: "A New Standard for Federal Workplaces",
          body: (
            <>
              <p>
                Built in 1917, 1800 F Street NW has been the headquarters of the
                U.S. General Services Administration for over a century. The
                revitalization project modernizes this landmark building from
                the ground up — preserving its historic character while
                delivering the open, flexible, and technology-enabled workspace
                that today&rsquo;s federal workforce demands.
              </p>
              <p>
                The project is a flagship demonstration of GSA&rsquo;s
                commitment to workplace optimization: reducing per-person square
                footage, consolidating agencies, and creating environments that
                attract and retain the best public servants.
              </p>
            </>
          ),
          image: {
            src: histImg,
            alt: "Historic view of 1800 F Street NW",
            position: "right",
          },
        },
        {
          id: "progress",
          eyebrow: "Project Progress",
          heading: "On Schedule, On Budget, On Mission",
          body: (
            <>
              <p>
                Phase 1 of the revitalization is complete, delivering 210,000 sq
                ft of modernized workspace for GSA headquarters staff. Phase 2 —
                covering the eastern wing — is currently underway and on track
                for completion in late 2027.
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-600">
                <li>
                  <strong>Phase 1</strong> — Complete (2024): Floors 1–6, main
                  lobby, and central atrium
                </li>
                <li>
                  <strong>Phase 2</strong> — In Progress: Eastern wing, floors
                  7–10, and roof terrace
                </li>
                <li>
                  <strong>Phase 3</strong> — Planned (2028): Façade restoration
                  and public plaza
                </li>
              </ul>
            </>
          ),
          image: {
            src: arch4,
            alt: "1800 F Street construction progress",
            position: "left",
          },
        },
        {
          id: "design",
          eyebrow: "Design Philosophy",
          heading: "History, Honored. Future, Ready.",
          body: (
            <p>
              The design team — led by GSA&rsquo;s Design Excellence program —
              has preserved the original Beaux-Arts envelope while completely
              reimagining the interior. Open floorplates, natural light, and
              flexible collaboration zones replace the closed-office layouts of
              the past. Every material decision references the building&rsquo;s
              1917 origins while meeting current energy, accessibility, and
              security standards.
            </p>
          ),
          image: {
            src: hist10,
            alt: "Historic interior detail at 1800 F Street",
            position: "right",
          },
        },
        {
          id: "livestream",
          eyebrow: "Live Updates",
          heading: "Watch the Transformation in Real Time",
          body: (
            <p>
              A live construction camera gives the public a continuous view of
              progress on the eastern wing. The feed updates every 15 minutes
              and is archived weekly. This transparency is part of GSA&rsquo;s
              commitment to open government and public stewardship of federal
              buildings.
            </p>
          ),
        },
      ]}
    />
  );
}
