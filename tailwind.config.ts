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
        paper: "#FAF9F6",
        ink: "#1A1D21",
        teal: {
          DEFAULT: "#0F4C5C",
          soft: "#1A6B7D",
        },
        taupe: "#9A6A3F",
        success: "#3D7A4F",
        alert: "#B0522F",
        line: "#E4E2DC",
        muted: "#6B6E73",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(26, 29, 33, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
