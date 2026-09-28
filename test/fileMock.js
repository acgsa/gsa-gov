/**
 * Static-asset stub for Jest.
 *
 * Next.js turns `import img from "./x.jpg"` into a StaticImageData object at
 * build time. Jest has no such loader, so every component that transitively
 * imports an image would fail to resolve the module. This stub stands in for
 * all binary/media imports and shapes itself like StaticImageData so
 * `next/image` can render it without warnings.
 */
module.exports = {
  src: "/test-stub.png",
  height: 100,
  width: 100,
  blurDataURL: "/test-stub.png",
  blurWidth: 8,
  blurHeight: 8,
};
