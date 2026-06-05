import type { Metadata } from "next";
import { Inter, JetBrains_Mono, EB_Garamond } from "next/font/google";
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
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "U.S. General Services Administration",
    template: "%s | GSA",
  },
  description:
    "The U.S. General Services Administration delivers value and savings in real estate, acquisition, technology, and other mission-support services across government.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${ebGaramond.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
