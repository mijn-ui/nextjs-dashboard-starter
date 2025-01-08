import { FlatCompat } from "@eslint/eslintrc"
import hooksPlugin from "eslint-plugin-react-hooks"
import tailwind from "eslint-plugin-tailwindcss"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  ...tailwind.configs["flat/recommended"],
  {
    ignores: ["node_modules/*", "out/*", ".next/*", "coverage"],
  },
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      tailwindcss: {
        config: "./tailwind.config.ts",
        callees: ["clsx", "tv", "cn"],
      },
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      "tailwindcss/no-custom-classname": "off",
      "import/no-anonymous-default-export": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]

export default configs
