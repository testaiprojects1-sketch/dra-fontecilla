import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        ivory: "#F3EEE6",
        burgundy: {
          DEFAULT: "#6E1E2B",
          dark: "#551722",
        },
        charcoal: "#232323",
        gold: "#B49A6A",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      letterSpacing: {
        brand: "0.18em",
        section: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
