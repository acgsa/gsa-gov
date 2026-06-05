/** Static asset module declarations for TypeScript */

// SVG files → string URL (use with <img>, not next/image)
declare module "*.svg" {
  const src: string;
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
