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
        liafrik: {
          50: '#EAF4FF',
          100: '#D2E7FF',
          200: '#A8D0FF',
          300: '#7DB8FF',
          400: '#52A0FF',
          500: '#3D9BFF',
          600: '#0070E0',
          700: '#005BB5',
          800: '#004A91',
          900: '#003266',
          950: '#001F40',
        },
        cyanx: {
          400: '#22D3EE',
          500: '#00BFE0',
          600: '#0099C4',
        },
        ink: {
          DEFAULT: '#0F172A',
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
        'premium': '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(0,112,224,0.14), 0 24px 60px -20px rgba(0,112,224,0.16)',
        'glow': '0 0 0 1px rgba(0,112,224,0.08), 0 8px 30px -6px rgba(0,112,224,0.28), 0 20px 60px -16px rgba(0,112,224,0.22)',
        'float': '0 2px 4px rgba(15,23,42,0.04), 0 16px 40px -12px rgba(0,112,224,0.20)',
        'card': '0 1px 2px rgba(15,23,42,0.04), 0 6px 20px -8px rgba(0,112,224,0.10)',
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
