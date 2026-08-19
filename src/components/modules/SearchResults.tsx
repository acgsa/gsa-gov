"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface MockResult {
  title: string;
  url: string;
  href: string;
  description: string;
  category: string;
}

const MOCK_RESULTS: MockResult[] = [
  {
    title: "Federal Real Estate Solutions",
    url: "gsa.gov › real-estate",
    href: "/real-estate",
    description:
      "GSA manages over 370 million square feet of space in 8,800 buildings across more than 2,200 communities nationwide. We deliver workspace solutions to federal agencies through leasing, construction, and building management.",
    category: "Real Estate",
  },
  {
    title: "1800 F Street NW — Revitalization Progress",
    url: "gsa.gov › real-estate › 1800f",
    href: "#1800f",
    description:
      "Follow the live progress of GSA's flagship headquarters modernization. The 1800 F Street revitalization is part of our commitment to Fortifying the Federal Footprint — bringing federal workers back to world-class, modern facilities.",
    category: "Real Estate",
  },
  {
    title: "Taxpayer Savings Accountability Tracker",
    url: "gsa.gov › savings",
    href: "/savings",
    description:
      "GSA is delivering measurable savings to the American taxpayer through federal real estate consolidation, smart acquisition strategies, and technology modernization. Track cumulative savings in real time.",
    category: "Resources",
  },
  {
    title: "Federal Acquisition Regulation (FAR)",
    url: "gsa.gov › acquisition › far",
    href: "/acquisition/far",
    description:
      "The Federal Acquisition Regulation is the primary regulation for use by all Federal Executive agencies in their acquisition of supplies and services with appropriated funds. The FAR is updated quarterly by the FAR Council.",
    category: "Acquisition",
  },
  {
    title: "GSA Multiple Award Schedules (MAS)",
    url: "gsa.gov › acquisition › schedules",
    href: "/acquisition/schedules",
    description:
      "GSA Schedules provide federal agencies with a simplified acquisition process for commercial products, services, and solutions at pre-negotiated prices. Over $45 billion in annual purchases flow through the MAS program.",
    category: "Acquisition",
  },
  {
    title: "Technology Transformation Services",
    url: "gsa.gov › technology › tts",
    href: "/technology/tts",
    description:
      "TTS helps government agencies build, buy, and share technology products and services that improve the public experience. Our teams include 18F, Login.gov, and the Presidential Innovation Fellows program.",
    category: "Technology",
  },
  {
    title: "Login.gov — One Account for Government",
    url: "gsa.gov › technology › login",
    href: "/technology/login",
    description:
      "Login.gov is the public's one account for government — a single sign-in solution for accessing federal services. Secure, private, and easy to use, serving over 50 million users across more than 50 federal agency partners.",
    category: "Technology",
  },
  {
    title: "Office of Inspector General",
    url: "gsa.gov › oig",
    href: "/oig",
    description:
      "The GSA Office of Inspector General independently investigates fraud, waste, and abuse within GSA programs and operations. Report waste or fraud confidentially through our hotline at 1-800-424-5210.",
    category: "About GSA",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Real Estate": "bg-blue-50 text-blue-700",
  Acquisition: "bg-amber-50 text-amber-700",
  Technology: "bg-purple-50 text-purple-700",
  Resources: "bg-emerald-50 text-emerald-700",
  "About GSA": "bg-gray-100 text-gray-600",
};

interface SearchResultsProps {
  initialQuery: string;
}

export function SearchResults({ initialQuery }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <>
      {/* ── Full-width search bar row ── */}
      <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <form onSubmit={handleSubmit} role="search">
            <div className="flex items-center overflow-hidden rounded-full border border-gray-300 bg-white shadow-sm transition-shadow hover:shadow-md">
              <Search
                className="ml-4 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search GSA.gov…"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-gray-900 outline-none"
                aria-label="Search query"
                autoFocus={!initialQuery}
              />
              <button
                type="submit"
                className="bg-gsa-blue hover:bg-gsa-blue-hover px-5 py-3 text-sm font-medium text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Results area ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats line */}
        <p className="mb-6 text-sm text-gray-500" aria-live="polite">
          {initialQuery ? (
            <>
              About{" "}
              <span className="font-medium text-gray-700">4,231 results</span>{" "}
              for{" "}
              <span className="font-medium text-gray-900">
                &ldquo;{initialQuery}&rdquo;
              </span>{" "}
              <span className="text-gray-400">(0.43 seconds)</span>
            </>
          ) : (
            "Enter a search term above to find results on GSA.gov."
          )}
        </p>

        {/* Result cards */}
        {initialQuery && (
          <div className="space-y-7">
            {MOCK_RESULTS.map((result, i) => (
              <article key={i}>
                {/* Favicon + URL breadcrumb */}
                <div className="mb-0.5 flex items-center gap-1.5">
                  <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gsa-navy">
                    <span
                      className="text-[9px] font-bold leading-none text-white"
                      aria-hidden="true"
                    >
                      G
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{result.url}</span>
                </div>

                {/* Title link */}
                <a
                  href={result.href}
                  className="mb-1 block text-xl font-normal leading-snug text-gsa-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-blue rounded"
                >
                  {result.title}
                </a>

                {/* Snippet */}
                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {result.description}
                </p>

                {/* Category badge */}
                <span
                  className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[result.category] ?? "bg-gray-100 text-gray-500"}`}
                >
                  {result.category}
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
