import type { Metadata } from "next";
import { TopicPage } from "@/templates/TopicPage";

// ── Card images ─────────────────────────────────────────────────────────────────
import cardPhotos from "@/assets/images/BUILDING/06162026_GSA Decorated building photos Social Media (7 of 25)_1024px.png";
import cardOfficialPhoto from "@/assets/images/ED/679554348_1512411687598557_6390952340232881774_n.jpg";

export const metadata: Metadata = {
  title: "Brand Resources | Media",
  description:
    "GSA brand guidelines, seal, logos, and visual identity resources for approved media and partner use.",
};

export default function BrandResourcesPage() {
  return (
    <TopicPage
      eyebrow="Media"
      eyebrowHref="/media"
      title="The GSA brand"
      intro="The official seal, program logos, and visual identity standards — everything approved partners and press need to represent GSA correctly."
      cta={{ label: "Request brand assets", href: "#" }}
      cards={[
        {
          title: "The GSA seal",
          body: "The official seal of the U.S. General Services Administration — reserved for official use, with strict rules on reproduction, clear space, and color.",
          src: "/logo/New.svg",
          alt: "Official GSA seal",
          ctaText: "Seal usage rules",
          ctaHref: "/media/logos",
        },
        {
          title: "Program logos",
          body: "Marks for GSA programs and services — GSA Fleet, GSA Advantage!, and Federal Acquisition Service — with standards for color, spacing, and typography.",
          src: cardPhotos,
          alt: "GSA headquarters building decorated with bunting",
          ctaText: "Browse the logos",
          ctaHref: "/media/logos",
        },
        {
          title: "Official photography",
          body: "High-resolution photography of federal buildings, projects, and events, available for approved editorial use.",
          src: cardOfficialPhoto,
          alt: "Official GSA photography",
          ctaText: "Open the photo gallery",
          ctaHref: "/media/photos",
        },
      ]}
      faqHeading="How can the brand be used?"
      faqs={[
        {
          question: "Who may use the GSA seal?",
          answer:
            "The seal is reserved for official agency use. Media and partners may reproduce it only in approved contexts — news coverage, event materials, and joint publications — and never in ways that imply endorsement.",
        },
        {
          question: "Can the seal or logos be altered?",
          answer:
            "No. Marks must be reproduced without alteration — no recoloring, stretching, cropping, or adding effects — and with the required clear space around them.",
        },
        {
          question: "What formats are available?",
          answer:
            "Vector artwork and high-resolution raster files are available for approved uses, along with color values and typography standards from the visual identity guidelines.",
        },
        {
          question: "How do I request assets?",
          answer:
            "Contact the GSA Office of Strategic Communication with your intended use and publication details. Requests are typically reviewed within a few business days.",
        },
      ]}
    />
  );
}
