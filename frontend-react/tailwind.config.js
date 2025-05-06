/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          700: '#795548',
          800: '#5D4037',
          900: '#3E2723',
        }
      }
    },
  },
  plugins: [],
}