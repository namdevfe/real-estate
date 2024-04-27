/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-50": "#EDEFF6",
        "primary-200": "#B7BFD9",
        "primary-500": "#4A60A1",
        "primary-700": "#2C3A61",
        black: "#363A3D",
        "black-dark": "#1E2640",
        gray: "#6D737A",
        "gray-light": "#889099",
      },
    },
  },
  plugins: [],
};
