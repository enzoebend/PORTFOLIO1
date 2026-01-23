/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'sisr-dark': '#0a0b10',
        'sisr-cyan': '#00f5d4',
        'sisr-blue': '#1e40af', // Bleu Cisco
      },
    },
  },
  plugins: [],
}