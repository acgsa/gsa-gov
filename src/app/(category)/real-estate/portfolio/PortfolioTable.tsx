"use client";

import { DataPage } from "@/templates/DataPage";

interface PortfolioRow extends Record<string, unknown> {
  region: string;
  buildings: number;
  sqft: string;
  owned: string;
  leased: string;
  utilization: string;
  status: string;
}

const rows: PortfolioRow[] = [
  {
    region: "National Capital Region",
    buildings: 428,
    sqft: "64.2M",
    owned: "71%",
    leased: "29%",
    utilization: "62%",
    status: "Active",
  },
  {
    region: "New England",
    buildings: 122,
    sqft: "11.4M",
    owned: "58%",
    leased: "42%",
    utilization: "71%",
    status: "Active",
  },
  {
    region: "Northeast & Caribbean",
    buildings: 387,
    sqft: "29.8M",
    owned: "63%",
    leased: "37%",
    utilization: "68%",
    status: "Active",
  },
  {
    region: "Mid-Atlantic",
    buildings: 214,
    sqft: "18.6M",
    owned: "54%",
    leased: "46%",
    utilization: "65%",
    status: "Active",
  },
  {
    region: "Southeast Sunbelt",
    buildings: 341,
    sqft: "24.1M",
    owned: "60%",
    leased: "40%",
    utilization: "74%",
    status: "Active",
  },
  {
    region: "Great Lakes",
    buildings: 198,
    sqft: "16.9M",
    owned: "55%",
    leased: "45%",
    utilization: "67%",
    status: "Active",
  },
  {
    region: "Heartland",
    buildings: 174,
    sqft: "13.7M",
    owned: "66%",
    leased: "34%",
    utilization: "70%",
    status: "Active",
  },
  {
    region: "Greater Southwest",
    buildings: 289,
    sqft: "22.3M",
    owned: "61%",
    leased: "39%",
    utilization: "72%",
    status: "Active",
  },
  {
    region: "Rocky Mountain",
    buildings: 143,
    sqft: "10.2M",
    owned: "68%",
    leased: "32%",
    utilization: "73%",
    status: "Active",
  },
  {
    region: "Pacific Rim",
    buildings: 312,
    sqft: "28.4M",
    owned: "57%",
    leased: "43%",
    utilization: "69%",
    status: "Active",
  },
  {
    region: "Northwest/Arctic",
    buildings: 167,
    sqft: "12.1M",
    owned: "72%",
    leased: "28%",
    utilization: "77%",
    status: "Active",
  },
];

const columns = [
  { key: "region" as const, label: "Region", sortable: true },
  { key: "buildings" as const, label: "Buildings", sortable: true },
  { key: "sqft" as const, label: "Total Sq Ft", sortable: false },
  { key: "owned" as const, label: "Owned", sortable: false },
  { key: "leased" as const, label: "Leased", sortable: false },
  {
    key: "utilization" as const,
    label: "Utilization",
    sortable: true,
    render: (value: unknown) => {
      const pct = parseInt(String(value));
      const color =
        pct >= 75
          ? "text-green-700 bg-green-50"
          : pct >= 60
            ? "text-yellow-700 bg-yellow-50"
            : "text-red-700 bg-red-50";
      return (
        <span
          className={`inline-block px-2 py-0.5 rounded text-[12px] font-semibold ${color}`}
        >
          {String(value)}
        </span>
      );
    },
  },
  { key: "status" as const, label: "Status", sortable: false },
];

/**
 * Client wrapper for the portfolio DataPage. The utilization column uses a
 * `render` function, which cannot be passed across the server → client
 * boundary — so the whole table config lives inside this client component.
 */
export function PortfolioTable() {
  return (
    <DataPage
      breadcrumbs={[
        { label: "Real Estate", href: "/real-estate" },
        { label: "Portfolio Tools", href: "/real-estate/portfolio" },
      ]}
      eyebrow="Real Estate · Data"
      title="Portfolio Tools"
      intro="GSA manages approximately 360 million rentable square feet of federally owned and leased space across 11 regions. This table reflects Q2 2026 data from OASIS."
      columns={columns}
      rows={rows}
      tableCaption="Federal real estate portfolio by GSA region, Q2 2026"
      lastUpdated="June 2026"
      notes={
        <p>
          Utilization rates are derived from Occupancy Agreement survey data and
          badge-based access logs. Buildings below 60% utilization are flagged
          for consolidation review. Figures are rounded to the nearest tenth.
          Source: OASIS, Public Buildings Service.
        </p>
      }
    />
  );
}
