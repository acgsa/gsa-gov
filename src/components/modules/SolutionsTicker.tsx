"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";

import coe from "@/assets/brands/COE.png";
import dataGov from "@/assets/brands/data_gov.png";
import fedramp from "@/assets/brands/FedRAMP_Logo.svg.png";
import goGov from "@/assets/brands/Go.gov Logo_COLOR.png";
import loginGov from "@/assets/brands/logindotgov-logo.png";
import pif from "@/assets/brands/PIF.svg";
import sam from "@/assets/brands/SAM_slab.svg";

interface Solution {
  src: StaticImageData;
  /** Accessible name for the brand/solution */
  name: string;
  href: string;
}

const solutions: Solution[] = [
  { src: sam, name: "SAM.gov", href: "https://sam.gov" },
  { src: loginGov, name: "Login.gov", href: "https://login.gov" },
  { src: fedramp, name: "FedRAMP", href: "https://www.fedramp.gov" },
  { src: dataGov, name: "Data.gov", href: "https://data.gov" },
  { src: goGov, name: "Go.gov", href: "https://go.gov" },
  {
    src: pif,
    name: "Presidential Innovation Fellows",
    href: "https://pif.gov",
  },
  { src: coe, name: "Centers of Excellence", href: "https://coe.gsa.gov" },
];

/** Duplicate list so the seamless loop appears continuous */
const track = [...solutions, ...solutions];

/**
 * GSA Solutions logo ticker — a continuously scrolling marquee of the
 * government platforms and programs GSA delivers.
 */
export function SolutionsTicker() {
  return (
    <section
      className="bg-white py-12"
      aria-label="GSA solutions and platforms"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xs font-bold tracking-[0.18em] uppercase text-usds-steel-600 mb-8">
          GSA Solutions
        </h2>
      </div>

      {/* Full-bleed marquee track */}
      {/* Fade masks on left/right edges */}
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{
            background:
              "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <div
          className="flex items-center animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:scrollbar-hide"
          aria-hidden="true"
        >
          {track.map((solution, i) => (
            <a
              key={i}
              href={solution.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className="flex items-center justify-center flex-shrink-0 px-14 md:px-20 opacity-90 hover:opacity-100 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gsa-live rounded"
            >
              <Image
                src={solution.src}
                alt=""
                className="h-16 md:h-24 w-auto object-contain"
                sizes="300px"
              />
            </a>
          ))}
        </div>

        {/* Accessible static list for screen readers and keyboard users */}
        <ul className="sr-only">
          {solutions.map((solution) => (
            <li key={solution.name}>
              <a href={solution.href} target="_blank" rel="noopener noreferrer">
                {solution.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
