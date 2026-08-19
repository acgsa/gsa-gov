import Image from "next/image";
import usFlagSmall from "@/assets/logo/us_flag_small.png";

/**
 * Official US Government ribbon (usa.gov pattern).
 * Displayed at the top of every page on the site.
 */
export function GovBanner() {
  return (
    <div className="bg-usds-steel-900 py-1.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2">
        <Image
          src={usFlagSmall}
          alt="U.S. flag"
          width={16}
          height={11}
          className="flex-shrink-0"
          priority
        />
        <p className="text-white/55 text-xs">
          An official website of the United States government
        </p>
      </div>
    </div>
  );
}
