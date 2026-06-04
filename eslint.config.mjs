import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import security from "eslint-plugin-security";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  // Next.js base rules (includes React, TypeScript, accessibility)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // OWASP-aligned security rules (NIST SA-11, RA-5)
  // Detects: object injection, unsafe regex, eval, prototype pollution, etc.
  security.configs.recommended,

  {
    rules: {
      // Security: flag potentially unsafe patterns
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-eval-with-expression": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-possible-timing-attacks": "warn",

      // TypeScript: no unsafe any
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default eslintConfig;
