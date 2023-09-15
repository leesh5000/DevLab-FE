/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
      },
      width: {
        '1/8': 'calc(100% / 8)',
        '1/9': 'calc(100% / 9)',
        '1/10': 'calc(100% / 10)',
        '1/11': 'calc(100% / 11)',
        '1/14': 'calc(100% / 14)',
        '1/16': 'calc(100% / 16)',
        '1/18': 'calc(100% / 18)',
        '1/20': 'calc(100% / 20)',
      }
    },
  },
  plugins: [],
}
