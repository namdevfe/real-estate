/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-50": "#EDEFF6",
        "primary-200": "#B7BFD9",
        "primary-400": "#063053",
        "primary-500": "#4A60A1",
        "primary-700": "#2C3A61",
        "primary-900": "#0F1320",
        black: "#363A3D",
        "black-dark": "#1E2640",
        gray: "#6D737A",
        "gray-light": "#889099",
        "overlay-80": "rgba(0, 0, 0, 0.8)",
        "overlay-white-60": "rgba(255, 255, 255, 0.6)",
      },
      backgroundColor: {
        input: "#f6f6fa",
      },
      fontFamily: {
        public: ["Public Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        h1: ["3.25rem", "4.5rem"],
      },
      width: {
        sidebar: "260px",
      },
      height: {
        "header-top": "85px",
        "header-middle": "85px",
      },
      container: {
        center: true,
        padding: "24px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
