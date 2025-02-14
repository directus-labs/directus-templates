import pluginJs from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import pluginPromise from "eslint-plugin-promise";
import pluginReact from "eslint-plugin-react";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended, // Core ESLint recommendations
  importPlugin.flatConfigs.recommended, // Import plugin recommendations
  ...tseslint.configs.recommended, // TypeScript ESLint recommendations
  pluginPromise.configs["flat/recommended"], // Promise plugin recommendations
  pluginReact.configs.flat.recommended, // React plugin recommendations
  pluginReact.configs.flat["jsx-runtime"], // Use React's new JSX runtime
  eslintConfigPrettier, // Prettier integration
  ...tailwind.configs["flat/recommended"], // TailwindCSS plugin recommendations
  {
    rules: {
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "newline-before-return": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/migration-from-tailwind-2": "off",
      "import/no-unresolved": "off",
      "import/no-named-as-default": "off",
      // ! TO COMPILE SHADCN EXAMPLES, PLEASE REMOVE AS NEEDED
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "off",
      "tailwindcss/no-unnecessary-arbitrary-value": "off",
      "tailwindcss/classnames-order": "off",
      "import/named": "off",
      "import/no-named-as-default-member": "off",
    },
  },
  // ! ===================== DISCLAIMER =====================
  // ! There is no official solution available for new ESLint 9 flat config structure for NextJS
  // ! The solution is taken from the community and may not be the best practice, use it at your own risk
  // ? Ref: https://github.com/vercel/next.js/discussions/49337?sort=top#discussioncomment-5998603
  // ! ======================================================
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "off",
      // ! TO COMPILE SHADCN EXAMPLES, PLEASE REMOVE AS NEEDED
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    ignores: [".next/*"],
  },
];
