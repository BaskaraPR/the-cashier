import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
        xl: "1200px",
        lg: "810px",
        sm: "360px",
      },
      colors: {
        black: "#121212",
        white: "#fff",

        neutral: {
          50: "#F8F8F8",
          100: "#DBDBDB",
          200: "#C5C5C5",
          300: "#ABABAB",
          400: "#929292",
          500: "#787777",
          600: "#5F5C5C",
          700: "#454242",
        },

        primary: {
          50: "#FFEEEF",
          100: "#FF8388",
          200: "#FF8388",
          300: "#FF5157",
          400: "#ED1C24",
          500: "#BA050C",
          600: "#870005",
          700: "#540003",
        },

        secondary: {
          50: "#EDF9FF",
          100: "#B7E8FF",
          200: "#81D7FF",
          300: "#4CC6FF",
          400: "#34A9E0",
          500: "#1F86B7",
          600: "#0E658E",
          700: "#044666",
        },

        warning: {
          50: "#FFFDFA",
          100: "#FFF9EE",
          200: "#FFF7E1",
          300: "#FFEAB3",
          400: "#FFDD82",
          500: "#FFC62B",
          600: "#FFAD0D",
          700: "#FE9B0E",
        },

        success: {
          50: "#FBFEFC",
          100: "#F2FAF6",
          200: "#E5F5EC",
          300: "#C0E5D1",
          400: "#97D4B4",
          500: "#6BC497",
          600: "#47B881",
          700: "#0C9D61",
        },

        info: {
          50: "#F8FCFF",
          100: "#F1F8FF",
          200: "#E4F2FF",
          300: "#BDDDFF",
          400: "#93C8FF",
          500: "#4BA1FF",
          600: "#3B82F6",
          700: "#3A70E2",
        },

        purple: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
          700: "#7E22CE",
          800: "#6B21A8",
          900: "#581C87",
        },
      },
    },
  },
  plugins: [],
};

export default config;