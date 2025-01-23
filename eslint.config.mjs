import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
   
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
          "no-console": "off", // Disable the no-console rule
          "no-unused-vars": "off", // Disable the no-unused-vars rule
          "react/prop-types": "off", // Disable the react/prop-types rule
          "react/no-unescaped-entities": "off",
          "@next/next/no-page-custom-font": "off",
          "@typescript-eslint/no-explicit-any": "off",
        },
      },
    ],
  },
];

export default eslintConfig;
