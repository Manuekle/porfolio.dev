import animations from "@midudev/tailwind-animations"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        header: "var(--color-header)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    animations,
    function ({ addVariant }) {
      addVariant("any-hover", "@media (any-hover: hover) { &:hover }")
    },
  ],
}