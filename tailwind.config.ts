import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bento: {
          blue: '#3B5BFF',
          orange: '#FB5607',
          pink: '#FF006E',
          purple: '#8338EC',
          sky: '#3A86FF',
        },
        neutral: {
          white: '#FFFFFF',
          light: '#F4F4F6',
          mid: '#71717A',
          dark: '#27272A',
          black: '#09090B',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
