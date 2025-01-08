import animationPlugin from "tailwindcss-animate"
import { mijnui } from "@mijn-ui/react-theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@mijn-ui/react-theme/dist/**/*.js",
  ],
  theme: {
    extends: {
      colors: {
        sidbar: {
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [animationPlugin, mijnui()],
}
