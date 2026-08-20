import Link from "next/link";
import {
  SiX,
  SiFacebook,
  SiInstagram,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

// LinkedIn was removed from Simple Icons — using the official path directly
function SiLinkedin() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-[18px] h-[18px]"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  { label: "GSA on X (Twitter)", href: "https://x.com/usgsa", Icon: SiX },
  {
    label: "GSA on YouTube",
    href: "https://youtube.com/usgsa",
    Icon: SiYoutube,
  },
  {
    label: "GSA on Facebook",
    href: "https://facebook.com/usgsa",
    Icon: SiFacebook,
  },
  {
    label: "GSA on Instagram",
    href: "https://instagram.com/usgsa",
    Icon: SiInstagram,
  },
  {
    label: "GSA on LinkedIn",
    href: "https://linkedin.com/company/usgsa",
    Icon: SiLinkedin,
  },
] as const;

const gsaLinks = [
  { label: "About GSA", href: "/about-gsa" },
  { label: "Leadership", href: "/resources/leadership" },
  { label: "Contact", href: "/media/contact" },
  { label: "Latest News", href: "/news" },
];

const workLinks = [
  { label: "Acquisition", href: "/acquisition" },
  { label: "Real Estate", href: "/real-estate" },
  { label: "Technology", href: "/technology" },
  { label: "Small Business", href: "/acquisition/small-business" },
  { label: "Opportunities for partners", href: "#" },
];

const accountabilityLinks = [
  { label: "Privacy", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "FOIA", href: "#" },
  { label: "Vulnerability Disclosure", href: "#" },
  { label: "Inspector General", href: "#" },
  { label: "Budget & Performance", href: "#" },
  { label: "USA.gov", href: "https://usa.gov" },
];

export function SiteFooter() {
  return (
    <footer className="bg-gsa-navy text-white" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-[1.15fr_1fr_1fr_1fr] gap-10 sm:gap-x-8 sm:gap-y-12 lg:gap-16">
          {/* ── Col 1: Seal + wordmark + social ── */}
          <div className="flex flex-col gap-5 sm:col-span-3 lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/New.svg" alt="GSA Seal" width={100} height={100} />
            <p className="font-garamond text-white font-bold text-[22px] leading-[1.2] max-w-[220px]">
              U.S. General Services Administration
            </p>
            <nav
              aria-label="GSA social media"
              className="flex items-center gap-5"
            >
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                >
                  <Icon size={20} />
                </a>
              ))}
            </nav>
          </div>

          {/* ── Col 2: GSA ── */}
          <div>
            <h2 className="text-white font-semibold text-[12px] tracking-[0.14em] uppercase mb-6">
              GSA
            </h2>
            <p className="font-garamond italic text-usds-steel-500 text-[18px] leading-[1.35] mb-8 max-w-[260px]">
              GSA is the engine of the United States federal government,
              accelerating mission delivery for the American people.
            </p>
            <ul className="space-y-4" role="list">
              {gsaLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white text-[15px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Work with GSA ── */}
          <div>
            <h2 className="text-white font-semibold text-[12px] tracking-[0.14em] uppercase mb-6">
              Work with GSA
            </h2>
            <ul className="space-y-4" role="list">
              {workLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white text-[15px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Accountability ── */}
          <div>
            <h2 className="text-white font-semibold text-[12px] tracking-[0.14em] uppercase mb-6">
              Accountability
            </h2>
            <ul className="space-y-4" role="list">
              {accountabilityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white text-[15px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/30 text-xs">
          <p>An official website of the United States government.</p>
          <p>© {new Date().getFullYear()} GSA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
