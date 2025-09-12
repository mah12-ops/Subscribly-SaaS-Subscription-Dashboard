/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#065f46",
        accent: "#14b8a6",
        dark: "#2C2C2C",
      },
    },
  },
  plugins: [],
}
