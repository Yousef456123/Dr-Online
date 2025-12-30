/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d5e7ff',
          200: '#aed3ff',
          300: '#7bb8ff',
          400: '#4e9cff',
          500: '#1f7eff',
          600: '#0c63db',
          700: '#084db3',
          800: '#063a86',
          900: '#042456',
        },
        accent: '#00d2ff',
        midnight: '#081f3b',
      },
      backgroundImage: {
        'hero-pattern':
          'linear-gradient(120deg, #0c63db 0%, #1f7eff 40%, #5f9dff 100%)',
        'card-gradient':
          'linear-gradient(135deg, rgba(15,76,129,0.95), rgba(14,116,144,0.95))',
      },
      boxShadow: {
        glass: '0 20px 60px rgba(9, 37, 80, 0.15)',
      },
      fontFamily: {
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

