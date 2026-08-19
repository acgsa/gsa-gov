/** Static asset module declarations for TypeScript */

// SVG files → Next.js StaticImageData (use with next/image, matching how
// Next statically imports SVGs). Mirrors the raster declarations below so the
// type resolves consistently whether or not next-env.d.ts is present (CI runs
// `tsc --noEmit` on a fresh checkout without a prior build).
declare module "*.svg" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}

// Image files → Next.js StaticImageData (use with next/image)
declare module "*.jpg" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}

declare module "*.jpeg" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}

declare module "*.webp" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}

declare module "*.avif" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}

declare module "*.png" {
  import type { StaticImageData } from "next/image";
  const src: StaticImageData;
  export default src;
}
