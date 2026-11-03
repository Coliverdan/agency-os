import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F9F5",
        surface: "#FFFFFF",
        forest: {
          50: "#EEF5F1",
          100: "#D6E7DC",
          200: "#B0D1BD",
          300: "#83B597",
          400: "#4D936D",
          500: "#2B734E",
          600: "#1B5739",
          700: "#12442C",
          800: "#0C3623",
          900: "#08291A",
          950: "#051A10",
        },
        lime: {
          50: "#FCFFE5",
          100: "#F7FFC2",
          200: "#EFFF8A",
          300: "#E3FF47",
          400: "#D4FF32",
          500: "#BEFA3C",
          600: "#9ED425",
          700: "#75A118",
          800: "#5B7C16",
          900: "#4B6617",
        },
        ink: {
          primary: "#0E241D",
          secondary: "#475D54",
          muted: "#7E948B",
          faint: "#B5C5BD",
        },
        sand: {
          50: "#FDFDFB",
          100: "#FAF9F4",
          200: "#F4F3EA",
          300: "#EAE7D8",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(10, 40, 30, 0.04), 0 8px 30px rgba(10, 40, 30, 0.06)",
        float: "0 10px 40px rgba(8, 41, 26, 0.12)",
        glow: "0 0 30px rgba(190, 250, 60, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;

