import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Header Option — Seal + Wordmark Side by Side | Preview",
  description:
    "Preview of the alternate topbar layout with the GSA seal and wordmark side by side.",
};

export default function HeaderSideBySidePreviewPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gsa-savings mb-4">
        Header Option
      </p>
      <h1 className="font-garamond text-4xl font-semibold text-usds-ink mb-6">
        Seal + Wordmark, Side by Side
      </h1>
      <p className="text-lg leading-relaxed text-usds-steel-600 mb-6">
        This preview page uses the alternate{" "}
        <code className="font-mono text-[0.9em]">SiteHeaderSideBySide</code>{" "}
        topbar variant. On desktop (≥ 1024px), the GSA seal sits directly to the
        left of the wordmark in a single centered row, instead of the seal being
        stacked below the wordmark.
      </p>
      <p className="text-lg leading-relaxed text-usds-steel-600 mb-6">
        Scroll down to confirm the collapse-on-scroll behavior still works and
        that the sticky navigation and live ribbon below the header are
        unaffected.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-usds-steel-600 mb-10">
        <li>Date &amp; weather remain on the left.</li>
        <li>Seal (56px) + wordmark (26px) are grouped as one homepage link.</li>
        <li>&ldquo;Log in&rdquo; remains on the right.</li>
      </ul>
      <p className="text-sm text-usds-steel-500 mb-24">
        The production, locked <code className="font-mono">SiteHeader</code> is
        unchanged. This route exists only for side-by-side comparison.
      </p>

      {/* Spacer content so the page scrolls and the collapse can be observed */}
      {Array.from({ length: 8 }).map((_, i) => (
        <p
          key={i}
          className="text-base leading-relaxed text-usds-steel-500 mb-6"
        >
          Placeholder scroll content block {i + 1}. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. The U.S. General Services Administration
          provides workplaces, acquisition solutions, and technology services
          that help federal agencies serve the public more effectively and at
          lower cost to taxpayers.
        </p>
      ))}
    </div>
  );
}
