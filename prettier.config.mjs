export default {
  semi: false,
  printWidth: 120,
  singleQuote: false,
  tabWidth: 2,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "@mijn-ui/react-core",
    "@mijn-ui/react-theme",
    "@mijn-ui/react-hooks",
    "@mijn-ui/(.*)$",
    "@mijn-ui/react-utilities",
    "^@/components/(.*)$",
    "^@/app/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ["clsx", "cn", "tv"],
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    // make sure to put the prettier-plugin-tailwindcss at the end otherwise it will not work
    // see: https://github.com/tailwindlabs/prettier-plugin-tailwindcss?tab=readme-ov-file#compatibility-with-other-prettier-plugins
    "prettier-plugin-tailwindcss",
  ],
}
