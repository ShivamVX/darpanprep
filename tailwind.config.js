/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darpan: {
          navy: '#0A0E17',
          midnight: '#0B1020',
          indigo: '#141B34',
          surface: '#161F33',
          gold: '#F5B941',
          amber: '#F59E0B',
          amberDark: '#D97706',
          ivory: '#FAFAF8',
          royal: '#3B82F6'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        display: ['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}
