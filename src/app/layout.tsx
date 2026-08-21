import type { Metadata } from "next";
import { Inter, JetBrains_Mono, EB_Garamond, Geist } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  // Variable axis (400–800) — supports the design-spec weights (e.g. 474 on
  // the homepage hero H1) alongside the standard 400/600/700 usages.
  weight: "variable",
  variable: "--font-garamond",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "U.S. General Services Administration",
    template: "%s | GSA",
  },
  description:
    "The U.S. General Services Administration delivers value and savings in real estate, acquisition, technology, and other mission-support services across government.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${ebGaramond.variable} ${geist.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
