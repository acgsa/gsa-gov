import Image from "next/image";
import Link from "next/link";
import {
  MoveLeft,
  TrendingDown,
  Building2,
  ShieldAlert,
  Cpu,
} from "lucide-react";
import type { Metadata } from "next";
import type { StoryCardProps } from "@/components/ui/StoryCard";

import { SavingsOdometer } from "@/components/modules/SavingsOdometer";
import { SavingsBarChart } from "@/components/modules/SavingsBarChart";
import { SavingsMilestoneTimeline } from "@/components/modules/SavingsMilestoneTimeline";
import { SavingsMethodology } from "@/components/modules/SavingsMethodology";
import { StoryCarousel } from "@/components/modules/StoryCarousel";

// ── Accountability story images ───────────────────────────────────────────
import acc1 from "@/assets/images/ACCOUNTABILITY/pexels-dibert-16151394.jpg";
import acc2 from "@/assets/images/ACCOUNTABILITY/photo-1562902982-5542bb25e4b6.avif";
import acc3 from "@/assets/images/ACCOUNTABILITY/pexels-ramazphotos-32314507.jpg";
import acc4 from "@/assets/images/ACCOUNTABILITY/pexels-frostroomhead-16073667.jpg";
import acc5 from "@/assets/images/ACCOUNTABILITY/pexels-maximkapytka-17507798.jpg";

export const metadata: Metadata = {
  title: "Taxpayer Savings Dashboard | GSA",
  description:
    "A real-time, independently audited view of how GSA is delivering value and reducing waste across federal real estate, acquisition, technology, and more.",
};

// ── KPI stat data ──────────────────────────────────────────────────────────
const stats = [
  {
    icon: Building2,
    eyebrow: "Real Estate",
    metric: "$3.0B",
    label: "in deferred maintenance avoided",
    detail: "45 properties disposed; offices consolidated ahead of schedule",
    color: "#34d399",
  },
  {
    icon: ShieldAlert,
    eyebrow: "Fraud Prevention",
    metric: "$2.1B",
    label: "in improper payments stopped",
    detail:
      "AI-powered procurement analytics identify fraud before disbursement",
    color: "#60a5fa",
  },
  {
    icon: TrendingDown,
    eyebrow: "Acquisition",
    metric: "$890M",
    label: "saved via OneGov contracting",
    detail: "1,200 duplicative contracts consolidated across 18 agencies",
    color: "#a78bfa",
  },
  {
    icon: Cpu,
    eyebrow: "Technology",
    metric: "$520M",
    label: "in avoided cloud costs",
    detail: "FedRAMP 20x cuts authorization time from 18 months to 6 weeks",
    color: "#f472b6",
  },
];

// ── Accountability stories ─────────────────────────────────────────────────
const accountabilityStories: StoryCardProps[] = [
  {
    src: acc1,
    alt: "Federal accountability review",
    headline: "$8.4 Billion in Wasteful Spending Identified and Eliminated",
    ctaText: "See the report",
    ctaHref: "/accountability/savings",
  },
  {
    src: acc2,
    alt: "Federal property dashboard",
    headline:
      "New Federal Property Dashboard Makes Government Real Estate Transparent",
    ctaText: "View the data",
    ctaHref: "/real-estate/dashboard",
  },
  {
    src: acc3,
    alt: "GSA leadership meeting",
    headline:
      "Inspector General Reports: GSA's Accountability Framework at Work",
    ctaText: "Read more",
    ctaHref: "/accountability/ig",
  },
  {
    src: acc4,
    alt: "Open data initiative",
    headline:
      "Open Data Initiative: GSA Publishes All Contract Awards in Real Time",
    ctaText: "Explore the data",
    ctaHref: "/accountability/open-data",
  },
  {
    src: acc5,
    alt: "Agency performance review",
    headline:
      "Performance Scorecards Now Public for All GSA-Supported Agencies",
    ctaText: "See scorecards",
    ctaHref: "/accountability/scorecards",
  },
];

/**
 * Taxpayer Savings Dashboard — microsite page linked from the LiveTicker.
 *
 * Sections:
 * 1. Full-viewport hero — cherry blossom background + dark overlay + odometer
 * 2. KPI stat grid — 4 headline metrics
 * 3. Bar chart — savings by category
 * 4. Milestone timeline — quarterly history
 * 5. Accountability story carousel
 * 6. Methodology accordion
 */
export default function TaxpayerSavingsPage() {
  return (
    <div className="bg-gsa-ticker text-white">
      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Taxpayer savings overview"
        style={{ position: "relative", minHeight: "100vh" }}
        className="flex flex-col justify-end overflow-hidden"
      >
        {/* Background image — fill requires a sized positioned ancestor */}
        <Image
          src="https://images.unsplash.com/photo-1617581629397-a72507c3de9e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cherry blossoms at the Tidal Basin with the Washington Monument in Washington, D.C."
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Gradient overlay — darkens bottom for legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(11,28,53,0.45) 0%, rgba(11,28,53,0.65) 40%, rgba(15,23,42,0.95) 75%, rgba(15,23,42,1) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Breadcrumb */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0 w-full">
          <nav aria-label="Breadcrumb">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
            >
              <MoveLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to GSA.gov</span>
            </Link>
          </nav>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 w-full">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gsa-savings mb-4">
            Live · Taxpayer Savings
          </p>
          <h1 className="font-garamond text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.05] mb-6 max-w-3xl">
            What GSA Has Saved the American Taxpayer
          </h1>
          <p className="text-[17px] text-white/60 leading-relaxed max-w-xl mb-10">
            An independently audited, real-time view of savings delivered across
            federal real estate, acquisition, technology, and more since January
            2025.
          </p>

          {/* Live odometer */}
          <div className="mb-4">
            <SavingsOdometer />
          </div>
          <p className="text-[13px] text-white/30">
            and counting — updated in real time · Q2 FY2026 audited baseline
          </p>
        </div>
      </section>

      {/* ── 2. KPI stat grid ────────────────────────────────────────────── */}
      <section
        aria-label="Savings by line of business"
        className="py-16 sm:py-20 border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]"
            role="list"
          >
            {stats.map(
              ({ icon: Icon, eyebrow, metric, label, detail, color }) => (
                <li
                  key={eyebrow}
                  className="bg-gsa-ticker flex flex-col gap-4 p-6 sm:p-8"
                >
                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}18` }}
                    aria-hidden="true"
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color }} />
                  </div>

                  {/* Eyebrow */}
                  <p
                    className="text-[11px] font-semibold tracking-[0.14em] uppercase"
                    style={{ color }}
                  >
                    {eyebrow}
                  </p>

                  {/* Metric */}
                  <div>
                    <p className="font-garamond text-5xl font-semibold text-white leading-none tabular-nums mb-1.5">
                      {metric}
                    </p>
                    <p className="text-[13px] font-medium text-white/40">
                      {label}
                    </p>
                  </div>

                  {/* Detail */}
                  <p className="text-[13px] text-white/30 leading-relaxed flex-1">
                    {detail}
                  </p>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      {/* ── 3. Bar chart ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-white/[0.06]">
        <SavingsBarChart />
      </section>

      {/* ── 4. Milestone timeline ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-white/[0.06]">
        <SavingsMilestoneTimeline />
      </section>

      {/* ── 5. Accountability story carousel ────────────────────────────── */}
      {/*
       * The StoryCarousel renders its own section bg (bg-white).
       * Wrap it in a dark container and invert the card styles via a
       * custom section title variant — here we just let it contrast.
       */}
      <div className="border-b border-white/[0.06]">
        <StoryCarousel
          sectionTitle="Accountability"
          cards={accountabilityStories}
          darkMode
        />
      </div>

      {/* ── 6. Methodology accordion ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-white/[0.06]">
        <SavingsMethodology />
      </section>

      {/* ── Footer callout ────────────────────────────────────────────────── */}
      <div className="py-12 text-center px-4">
        <p className="text-[13px] text-white/25 max-w-xl mx-auto leading-relaxed">
          All figures on this page are subject to independent audit by the GSA
          Office of Inspector General. Data sourced from GSA financial
          management systems, OMB MAX, USASpending.gov, and the Federal Real
          Property Profile.
        </p>
        <p className="mt-3 text-[12px] text-white/15">
          Last audited: Q2 FY2026 · Next update: October 1, 2026
        </p>
      </div>
    </div>
  );
}
