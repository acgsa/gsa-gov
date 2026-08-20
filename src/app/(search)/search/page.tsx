import { SearchResults } from "@/components/modules/SearchResults";
import type { Metadata } from "next";

// Static metadata — the query is read client-side (see SearchResults) so this
// page can be statically exported. The `?q=` value is reflected in the UI, not
// the document title, which keeps the route fully static for the cloud.gov
// preview. See docs/decisions/ADR-007-cloudgov-sandbox-preview.md
export const metadata: Metadata = {
  title: "Search GSA.gov",
};

export default function SearchPage() {
  // No server `searchParams`: SearchResults parses `?q=` on the client so the
  // route renders statically. Works identically in the dynamic app.
  return <SearchResults initialQuery="" />;
}
