/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ats': ['Arial', 'Calibri', 'Times New Roman', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}