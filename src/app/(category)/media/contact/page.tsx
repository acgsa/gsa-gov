import type { Metadata } from "next";
import { InfoPage } from "@/templates/InfoPage";

export const metadata: Metadata = {
  title: "Contact & FOIA | Media",
  description:
    "Contact GSA, submit a FOIA request, or find the right office for your inquiry.",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Media"
      breadcrumbs={[{ label: "Media", href: "/media" }]}
      title="Contact & FOIA"
      intro="Whether you're a federal agency looking for support, a vendor with a contracting question, or a member of the public, here's how to reach the right team at GSA."
      sections={[
        {
          id: "contact",
          heading: "Contact GSA",
          body: (
            <>
              <p>
                GSA&rsquo;s main public contact number is 1-844-472-4GSA
                (1-844-472-4472). For acquisition-related questions, the Federal
                Acquisition Service help desk can be reached through the GSA
                Advantage! portal or by email. For real estate inquiries,
                contact the relevant regional GSA office.
              </p>
              <p>
                Media inquiries should be directed to the Office of Strategic
                Communication. Congressional inquiries are handled by the Office
                of Congressional and Intergovernmental Affairs. For questions
                about specific contracts or orders, contact the responsible
                contracting officer listed in the contract.
              </p>
            </>
          ),
        },
        {
          id: "foia",
          heading: "Freedom of Information Act (FOIA)",
          body: (
            <>
              <p>
                GSA is committed to transparency and responds to FOIA requests
                for agency records within the statutory timeframes. Requesters
                can submit FOIA requests through GSA&rsquo;s online FOIA portal
                or by mail to the GSA FOIA Requester Service Center in
                Washington, D.C.
              </p>
              <p>
                GSA&rsquo;s FOIA reading room contains frequently requested
                documents, making many records available without the need for a
                formal request. Requesters are encouraged to check the reading
                room before submitting a request. The GSA FOIA Public Liaison is
                available to assist requesters with questions about the process.
              </p>
            </>
          ),
        },
      ]}
      related={[
        { label: "Latest News", href: "/news" },
        { label: "Reports & data", href: "/media/reports" },
        { label: "How we're organized", href: "/about-gsa#organization" },
      ]}
    />
  );
}
