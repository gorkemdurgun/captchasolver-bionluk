import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      protest: ["Protest Strike", "sans-serif"]
    },
    boxShadow: {
      "button-hover": "0px 10px 0 rgba(0, 0, 0, 0.2)"
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};
