/**
 * Lines of business used for the "Alignment" (30 pt) criterion.
 *
 * Derived from src/lib/wayfinder-data.ts (Real Estate, Acquisition,
 * Technology) plus the two cross-cutting audiences the new site serves:
 * the general public and federal employees. This is injected into the
 * scoring prompt so the model judges alignment against the SAME mission
 * taxonomy the redesigned site is organized around.
 */

export interface LineOfBusiness {
  key: string;
  label: string;
  /** Short description that anchors the model's alignment judgement. */
  description: string;
}

export const LINES_OF_BUSINESS: LineOfBusiness[] = [
  {
    key: "real-estate",
    label: "Real Estate",
    description:
      "Federal buildings and workspace: leasing, portfolio management, design & construction, historic preservation, property sales, workplace optimization.",
  },
  {
    key: "acquisition",
    label: "Acquisition",
    description:
      "Buying and selling for government: MAS/Schedules, GWACs, assisted acquisition, acquisition policy & training, small business, category management, opportunities.",
  },
  {
    key: "technology",
    label: "Technology",
    description:
      "Shared government technology: AI adoption, Login.gov, cloud.gov, digital.gov, IT purchasing, legacy modernization, digital services.",
  },
  {
    key: "public",
    label: "General public information",
    description:
      "Mission, leadership, news, savings/accountability reporting, and general information the public needs about GSA.",
  },
  {
    key: "fed-employee",
    label: "Federal employee / internal-facing info",
    description:
      "Guidance and services aimed at federal employees and agency partners (e.g., travel, per diem, SmartPay, employee resources).",
  },
];

/** One-line taxonomy string for the prompt. */
export function linesOfBusinessPromptBlock(): string {
  return LINES_OF_BUSINESS.map(
    (lob) => `- ${lob.label}: ${lob.description}`,
  ).join("\n");
}
