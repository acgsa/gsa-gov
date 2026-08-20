import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "IT Services | Technology",
  description:
    "GSA offers pre-competed IT contract vehicles and professional services that help agencies acquire technology quickly and compliantly.",
};

export default function ItServicesPage() {
  return (
    <InfoPage
      eyebrow="Technology"
      breadcrumbs={[{ label: "Technology", href: "/technology" }]}
      title="IT Services"
      intro="GSA gives federal agencies fast, compliant access to information technology products and professional services through pre-competed contract vehicles and expert acquisition support."
      sections={[
        {
          id: "overview",
          heading: "IT contract vehicles",
          body: (
            <>
              <p>
                GSA maintains a portfolio of pre-competed IT contract vehicles —
                including government-wide acquisition contracts (GWACs) and
                IT-focused Multiple Award Schedules — that let agencies acquire
                hardware, software, and services without running lengthy
                standalone procurements.
              </p>
              <p>
                These vehicles cover everything from cloud and cybersecurity to
                software development and IT support, giving contracting officers
                flexible, best-in-class options that meet federal requirements.
              </p>
            </>
          ),
        },
        {
          id: "support",
          heading: "Professional services and support",
          body: (
            <>
              <p>
                Beyond contract vehicles, GSA provides acquisition expertise to
                help agencies scope requirements, structure competitions, and
                manage IT engagements through delivery. This support is
                especially valuable for complex, multi-vendor technology
                programs.
              </p>
              <p>
                Agencies can also access assisted acquisition services, where
                GSA manages the full IT procurement lifecycle on their behalf.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Services", href: "/technology/services" },
        { label: "Platforms", href: "/technology/platforms" },
        { label: "Transformation", href: "/technology/transformation" },
      ]}
    />
  );
}
