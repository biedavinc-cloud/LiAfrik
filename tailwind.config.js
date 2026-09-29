/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Glacial Indifference', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Glacial Indifference', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Brand palette derived from the official Liafrik logo:
        // navy #031637 / #031D58 and orange #FBA70A.
        liafrik: {
          50: '#F1F6FD',
          100: '#E0EAFB',
          200: '#BDD2F4',
          300: '#86AAEA',
          400: '#4B7EDD',
          500: '#2658BA',
          600: '#031D58',
          700: '#031637',
          800: '#020F27',
          900: '#020B1B',
          950: '#01060F',
        },
        // Secondary royal blue: the lighter end of navy gradients.
        cyanx: {
          400: '#5691F0',
          500: '#245FCC',
          600: '#1442A3',
        },
        // Logo orange: small highlights only.
        accent: {
          50: '#FFF8E6',
          100: '#FFEFC2',
          200: '#FFDD85',
          300: '#FECB4D',
          400: '#FDBB25',
          500: '#FBA70A',
          600: '#D98A00',
          700: '#9A5F00',
        },
        ink: {
          DEFAULT: '#031637',
          soft: '#1E293B',
          muted: '#475569',
          light: '#64748B',
        },
        cloud: {
          50: '#FBFCFE',
          100: '#F7F9FC',
          200: '#EFF4FB',
          300: '#E3EBF6',
        },
      },
      boxShadow: {
        'premium': '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(3,29,88,0.12), 0 24px 60px -20px rgba(3,29,88,0.14)',
        'glow': '0 0 0 1px rgba(3,29,88,0.07), 0 8px 30px -6px rgba(3,29,88,0.24), 0 20px 60px -16px rgba(3,29,88,0.19)',
        'float': '0 2px 4px rgba(15,23,42,0.04), 0 16px 40px -12px rgba(3,29,88,0.17)',
        'card': '0 1px 2px rgba(15,23,42,0.04), 0 6px 20px -8px rgba(3,29,88,0.09)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'elastic': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
