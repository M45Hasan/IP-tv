/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom colors
        primary: "#ED9901", // yellow
        primary_hov: "#DAAD01", // black
        secondary: "#1C1C1C", // black
        global: "#ffffff", // white
      },
    },
  },
  plugins: [],
};
