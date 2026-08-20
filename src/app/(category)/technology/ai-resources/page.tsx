import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "AI Resources | Technology",
  description:
    "GSA provides secure, government-approved AI tools, guidance, and platforms that help federal agencies adopt artificial intelligence responsibly.",
};

export default function AiResourcesPage() {
  return (
    <InfoPage
      eyebrow="Technology"
      breadcrumbs={[{ label: "Technology", href: "/technology" }]}
      title="AI Resources"
      intro="GSA helps federal agencies adopt artificial intelligence responsibly — providing secure, government-approved AI tools, practical guidance, and shared platforms that scale AI capabilities across government."
      sections={[
        {
          id: "overview",
          heading: "AI tools for federal employees",
          body: (
            <>
              <p>
                Through platforms like USAi, GSA gives federal employees secure
                access to government-approved generative AI tools at scale.
                These tools help staff draft, summarize, analyze, and automate
                routine work while meeting federal security and privacy
                requirements.
              </p>
              <p>
                GSA vets AI capabilities against federal standards so agencies
                can adopt them with confidence, without each agency having to
                independently evaluate and authorize every tool.
              </p>
            </>
          ),
        },
        {
          id: "guidance",
          heading: "Guidance and governance",
          body: (
            <>
              <p>
                GSA publishes practical guidance on responsible AI use,
                procurement of AI capabilities, and governance practices aligned
                with government-wide policy. Agencies can access playbooks,
                use-case libraries, and community-of-practice resources.
              </p>
              <p>
                GSA also supports agencies in evaluating AI vendors, structuring
                pilots, and measuring outcomes so that AI investments deliver
                real mission value.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Transformation", href: "/technology/transformation" },
        { label: "Platforms", href: "/technology/platforms" },
        { label: "Services", href: "/technology/services" },
      ]}
    />
  );
}
