/**
 * Jest configuration for unit tests (utility/library logic + component tests).
 *
 * Uses ts-jest to run TypeScript tests directly and mirrors the `@/*` path
 * alias from tsconfig.json so tests can import project modules the same way
 * source files do. Written in CommonJS (.js) so no extra `ts-node` dependency
 * is required to load the config itself.
 *
 * Default environment is `node` (cheapest) — component tests opt into jsdom
 * per-file with a `@jest-environment jsdom` docblock.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/scripts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  moduleNameMapper: {
    // Static media imports: Next.js resolves these to StaticImageData at build
    // time; Jest has no such loader, so route them to a shaped stub.
    "\\.(jpg|jpeg|png|gif|webp|avif|svg|mov|mp4|pdf)$":
      "<rootDir>/test/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
