/**
 * Jest configuration for unit tests (utility/library logic).
 *
 * Uses ts-jest to run TypeScript tests directly and mirrors the `@/*` path
 * alias from tsconfig.json so tests can import project modules the same way
 * source files do. Written in CommonJS (.js) so no extra `ts-node` dependency
 * is required to load the config itself.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/scripts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
