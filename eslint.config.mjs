import nextConfig from "eslint-config-next";
import security from "eslint-plugin-security";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  // Next.js flat config (includes React, TypeScript, accessibility rules)
  ...nextConfig,

  // OWASP-aligned security rules (NIST SA-11, RA-5)
  {
    plugins: { security },
    rules: {
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-eval-with-expression": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-possible-timing-attacks": "warn",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default eslintConfig;
