/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pitch-dark': '#0F3D2E',
        'pitch-mid': '#17573F',
        'pitch-line': '#2C6B4C',
        'chalk': '#ECEFE7',
        'chalk-2': '#F7F8F4',
        'chalk-dim': '#C7CDBE',
        'ink': '#12201A',
        'ink-soft': '#4B5A51',
        'cone': '#FF6B35',
        'cone-dim': '#FFE1D1',
        'mustard': '#E8C547',
      },
    },
  },
  plugins: [],
}