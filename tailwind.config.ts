import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: 'rgba(10, 10, 10, 0.85)',
        terminal: {
          green: '#00FF41',
          dim: '#008F11',
          mid: '#00aa2a',
          amber: '#FFB000',
          cyan: '#00FFFF',
          red: '#FF0000',
          bg: '#0a0a0a',
          'card-bg': '#0d0d0d',
          border: '#00FF41',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 65, 0.3)',
        'glow-green-strong': '0 0 40px rgba(0, 255, 65, 0.5)',
        'glow-amber': '0 0 20px rgba(255, 176, 0, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.3)',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'flicker': 'flicker 0.15s infinite',
        'scanline-move': 'scanline-move 8s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'boot-fade': 'boot-fade 0.5s ease-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        flicker: {
          '0%': { opacity: '0.97' },
          '5%': { opacity: '0.95' },
          '10%': { opacity: '0.98' },
          '15%': { opacity: '0.96' },
          '20%': { opacity: '0.99' },
          '100%': { opacity: '0.98' },
        },
        'scanline-move': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'glow-pulse': {
          '0%, 100%': { textShadow: '0 0 4px rgba(0, 255, 65, 0.6)' },
          '50%': { textShadow: '0 0 8px rgba(0, 255, 65, 0.9), 0 0 20px rgba(0, 255, 65, 0.4)' },
        },
        'boot-fade': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
