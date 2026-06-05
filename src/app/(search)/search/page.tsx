import { SearchResults } from "@/components/modules/SearchResults";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q?.trim() ? `"${q.trim()}" — GSA Search` : "Search GSA.gov",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  return <SearchResults initialQuery={query} />;
}
