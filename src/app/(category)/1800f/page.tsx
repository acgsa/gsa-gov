import type { Metadata } from "next";
import { DetailPage } from "@/templates/DetailPage";
import type { DetailPageSection } from "@/templates/DetailPage";
import { TheaterVideo } from "@/components/modules/TheaterVideo";

export const metadata: Metadata = {
  title: "1800 F Street Revitalization — Livestream | GSA",
  description:
    "Watch the live 1800 F Street NW revitalization project livestream — GSA's flagship federal workplace transformation in Washington, D.C.",
};

const sections: DetailPageSection[] = [
  {
    id: "about-feed",
    heading: "About This Feed",
    body: (
      <>
        <p>
          GSA is committed to radical transparency in how it manages and
          modernizes federal buildings. The live construction camera at 1800 F
          Street NW gives the public a continuous, unfiltered view of one of the
          most significant federal workplace transformations in recent history.
        </p>
        <p>
          The camera is mounted on the eastern face of the building and captures
          work on Phase 2 — floors 7 through 10 and the new roof terrace. The
          feed updates every 15 minutes during construction hours
          (Monday–Friday, 7 a.m.–6 p.m. ET) and is archived weekly to
          GSA&rsquo;s public YouTube channel.
        </p>
      </>
    ),
  },
  {
    id: "phase-status",
    heading: "Project Phase Status",
    body: (
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-usds-steel-100 text-usds-steel-700 text-[11px] font-bold">
            ✓
          </span>
          <span>
            <strong>Phase 1 — Complete (2026)</strong>
            <br />
            Floors 1–6, main lobby, and central atrium
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-usds-steel-200 text-usds-steel-900 text-[11px] font-bold">
            ▶
          </span>
          <span>
            <strong>Phase 2 — In Progress (est. 2027)</strong>
            <br />
            Eastern wing, floors 7–10, and roof terrace —&nbsp;
            <em>you are watching this phase live</em>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-usds-steel-50 text-usds-steel-400 text-[11px] font-bold">
            ◷
          </span>
          <span>
            <strong>Phase 3 — Planned (2028)</strong>
            <br />
            Façade restoration and public plaza
          </span>
        </li>
      </ul>
    ),
  },
  {
    id: "historic-context",
    heading: "A Century of Public Service",
    body: (
      <>
        <p>
          Completed in 1917, 1800 F Street NW has served as the headquarters of
          the U.S. General Services Administration for over a century. The
          Beaux-Arts structure spans an entire city block and contains more than
          600,000 gross square feet.
        </p>
        <p>
          The revitalization project preserves the building&rsquo;s historic
          character — its limestone façade, marble corridors, and ornamental
          ironwork — while completely reimagining the interior for the way
          federal workers operate today. Open floorplates, natural light wells,
          and flexible collaboration zones replace the closed-office layouts of
          the mid-20th century.
        </p>
      </>
    ),
  },
  {
    id: "transparency",
    heading: "Commitment to Open Government",
    body: (
      <>
        <p>
          This live feed is part of GSA&rsquo;s broader commitment to
          transparency in federal real estate management. Taxpayer investment in
          this building — more than $500 million over three phases — deserves
          public visibility.
        </p>
        <p>
          GSA publishes monthly progress reports, budget actuals, and schedule
          updates alongside the live camera. Weekly archived footage and project
          documents are available on{" "}
          <a
            href="https://www.gsa.gov"
            className="underline decoration-usds-steel-300 underline-offset-2 hover:text-usds-steel-900 transition-colors duration-150"
          >
            GSA.gov
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function LivestreamPage() {
  return (
    <>
      {/* ── Theater-mode video ──
          Full-viewport-width black band. The 16:9 iframe sits centred at
          max-w-5xl; the bg-black surround fills both sides seamlessly. */}
      <div className="w-full bg-black">
        <div className="mx-auto w-full max-w-5xl">
          <TheaterVideo
            src="https://www.youtube.com/embed/X74hqPDTZwM?autoplay=1&mute=1&controls=0&loop=1&playlist=X74hqPDTZwM&modestbranding=1&rel=0&cc_load_policy=0&iv_load_policy=3"
            title="Livestream — 1800 F Street NW revitalization, Phase 2"
            showLiveBadge
            caption="Live construction camera · Eastern wing, Phase 2 · 1800 F Street NW, Washington, D.C. · Feed refreshes every 15 minutes."
          />
        </div>
      </div>

      <DetailPage
        eyebrow="1800 F Street Initiative"
        title="1800 F Street Revitalization — Livestream"
        intro="Watch Phase 2 of GSA's flagship workplace transformation at 1800 F Street NW in real time. The feed is updated every 15 minutes during construction hours."
        meta={[
          {
            label: "Updated",
            value: "Every 15 minutes · Mon–Fri 7 a.m.–6 p.m. ET",
          },
        ]}
        sections={sections}
        contact={{
          heading: "Media Contact",
          items: [
            {
              label: "Press inquiries",
              value: "press@gsa.gov",
              href: "mailto:press@gsa.gov",
            },
          ],
        }}
        relatedLinks={[
          {
            label: "GSA Design & Construction",
            href: "/real-estate/design-construction",
            category: "Real Estate",
          },
        ]}
      />
    </>
  );
}
