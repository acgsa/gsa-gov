import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Preview-only static export toggle. When STATIC_EXPORT=true (used by the
// `build:static` script for the cloud.gov sandbox preview), Next emits a fully
// static `out/` directory. The default path — `next dev`, `npm run build`,
// tests, and any future dynamic/Payload deploy — is UNAFFECTED.
// See docs/decisions/ADR-007-cloudgov-sandbox-preview.md
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // Emit a static site only under the isolated preview build.
  ...(isStaticExport ? { output: "export" as const, trailingSlash: true } : {}),
  // Remote image hosts (leadership photos served from the legacy GSA CMS).
  // Static export cannot run the image optimizer, so emit plain <img> tags.
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gsa.gov",
        pathname: "/system/files/**",
      },
    ],
  },
  // Security headers. Only meaningful for the dynamic (server) app — `headers()`
  // is unsupported under `output: 'export'`, so it's omitted from the static
  // preview build (documented limitation in ADR-007).
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
                },
                {
                  key: "X-Frame-Options",
                  value: "DENY",
                },
                {
                  key: "X-XSS-Protection",
                  value: "1; mode=block",
                },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=()",
                },
              ],
            },
          ];
        },
      }),
};

// The Payload wrapper injects dynamic admin/API routes that cannot be statically
// exported. For the isolated static preview we export the plain Next config;
// the dynamic app keeps the full `withPayload()` integration.
export default isStaticExport ? nextConfig : withPayload(nextConfig);
