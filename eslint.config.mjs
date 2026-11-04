import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([".next/**", "build/**", "node_modules/**", ".node_modules-corrupt-*/**", ".npm-cache/**", "coverage/**"]),
  { files: ["next-env.d.ts"], rules: { "@typescript-eslint/triple-slash-reference": "off" } }
]);
