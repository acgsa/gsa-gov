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

const footerSections = {
  Partners: [
    { label: "SAM.gov", href: "https://sam.gov" },
    { label: "USA.gov", href: "https://usa.gov" },
    { label: "CIO.gov", href: "https://cio.gov" },
    { label: "FOIA.gov", href: "https://foia.gov" },
    { label: "Login.gov", href: "https://login.gov" },
  ],
  Resources: [
    { label: "About GSA", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Accessibility Statement", href: "/accessibility" },
    { label: "Vulnerability Disclosure", href: "/security" },
    { label: "Performance Reports", href: "/performance" },
    { label: "FOIA requests", href: "/foia" },
    { label: "No FEAR Act", href: "/no-fear-act" },
    { label: "Office of the Inspector General", href: "/oig" },
  ],
  "For Employees": [
    { label: "For your startup", href: "/startups" },
    { label: "HR Links", href: "/hr" },
    { label: "IT Service Desk", href: "/it-help" },
  ],
} as const;

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

export function SiteFooter() {
  return (
    <footer className="bg-gsa-navy text-white" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ── Seal + name + social ── */}
          <div className="flex flex-col items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/GSA_Seal_Updated_2026.svg"
              alt="GSA Seal"
              width={72}
              height={72}
              className="opacity-90"
            />
            <p className="text-white/60 text-sm font-medium leading-snug max-w-[180px]">
              U.S. General Services Administration
            </p>
            {/* Social icons */}
            <nav
              aria-label="GSA social media"
              className="flex items-center gap-3 mt-1"
            >
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                >
                  <Icon size={18} />
                </a>
              ))}
            </nav>
          </div>

          {/* ── Link columns ── */}
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <h2 className="text-white/40 text-[11px] font-semibold uppercase tracking-widest mb-4">
                {title}
              </h2>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/65 hover:text-white text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
