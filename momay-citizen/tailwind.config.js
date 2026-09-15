/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#05091a',
          800: '#070d22',
          700: '#0a1330',
          600: '#0e1a3e',
          500: '#13224e',
        },
        edge: 'rgba(94,160,255,0.16)',
        glow: '#38bdf8',
      },
      fontFamily: {
        sans: ['"Noto Sans Thai"', '"Noto Sans"', 'system-ui', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        panel: '0 18px 44px -24px rgba(0,0,0,0.9)',
        ring: '0 0 0 1px rgba(94,160,255,0.18)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
        floatIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseDot: 'pulseDot 2s ease-in-out infinite',
        floatIn: 'floatIn .5s ease-out both',
      },
    },
  },
  plugins: [],
}
