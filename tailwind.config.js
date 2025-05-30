/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#001f3f",
        "navy-light": "#00509E",
      },
    },
  },
  plugins: [],
};
