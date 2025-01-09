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
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
        },
      },
      keyframes: {
        "collapsible-down": {
          from: { height: "0", opacity: "0" },
          to: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
          },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
          },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 150ms ease-out",
        "collapsible-up": "collapsible-up 150ms ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [animationPlugin, mijnui()],
}
