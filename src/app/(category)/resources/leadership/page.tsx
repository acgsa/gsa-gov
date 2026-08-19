import type { Metadata } from "next";
import Link from "next/link";
import { CategoryLeadership } from "@/templates/category/CategoryLeadership";
import { GSA_LEADERSHIP } from "@/lib/leadership-data";

export const metadata: Metadata = {
  title: "Leadership | Resources",
  description:
    "Meet the Administrator, Deputy Administrator, and senior leadership team guiding GSA's mission and strategic direction.",
};

export default function LeadershipPage() {
  return (
    <div className="bg-usds-steel-50 min-h-screen -mb-16 lg:-mb-24">
      {/* ── Centered hero ── */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-16 pb-4 sm:pb-6">
        <Link
          href="/employees"
          className="inline-block text-[12px] font-semibold tracking-[0.14em] uppercase text-usds-steel-600 hover:text-usds-steel-900 transition-colors duration-150 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
        >
          About GSA
        </Link>
        <h1
          className="font-garamond text-usds-steel-900 text-[44px] leading-[1.05] sm:text-[56px] sm:leading-[1.04] mb-5"
          style={{ fontWeight: 474 }}
        >
          GSA leadership
        </h1>
        <p className="text-[16px] sm:text-[17px] leading-relaxed text-usds-steel-600 max-w-[560px] mx-auto">
          The Administrator, Deputy Administrator, and senior officials guiding
          GSA&apos;s mission — smarter real estate, acquisition, and technology
          for the American people.
        </p>
      </header>

      {/* ── Full roster ── */}
      <CategoryLeadership leadership={GSA_LEADERSHIP} />
    </div>
  );
}
