/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'xsm': { 'max': '766px' },
      'md': { 'max': '767px' },
      'lg': '768px'
    },
    extend: {},
  },
  plugins: [],
}

