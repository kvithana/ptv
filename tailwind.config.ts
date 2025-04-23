import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        train: "rgb(var(--color-ptv-train) / <alpha-value>)",
        tram: "rgb(var(--color-ptv-tram) / <alpha-value>)",
        bus: "rgb(var(--color-ptv-bus) / <alpha-value>)",
        vline: "rgb(var(--color-ptv-vline) / <alpha-value>)",
        "network-grey": "rgb(var(--color-ptv-network-grey) / <alpha-value>)",
        "mid-grey": "rgb(var(--color-ptv-mid-grey) / <alpha-value>)",
        "warm-grey": "rgb(var(--color-ptv-warm-grey) / <alpha-value>)",
        disruptions: "rgb(var(--color-ptv-disruptions) / <alpha-value>)",
        myki: "rgb(var(--color-ptv-myki) / <alpha-value>)",
        // Digital display colors
        background: "rgb(var(--color-background) / <alpha-value>)",
        display: "rgb(var(--color-display) / <alpha-value>)",
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        divider: "rgb(var(--color-divider) / <alpha-value>)",
        input: "rgb(var(--color-input) / <alpha-value>)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      sans: ["Network Sans", "cursive"],
      serif: ["Network Sans", "cursive"],
      mono: ["Consolas", "Monaco", "monospace"],
    },
  },
  plugins: [],
}
export default config
