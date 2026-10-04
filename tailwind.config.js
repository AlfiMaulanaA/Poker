/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07111F',
        surface: {
          DEFAULT: '#111C2E',
          hover: '#192841',
          border: '#1E2D4A'
        },
        brand: {
          50: '#ecfeff',
          100: '#cffaff',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63'
        },
        poker: {
          felt: '#0B382B',
          feltBorder: '#1A4D3E',
          cyan: '#22D3EE',
          purple: '#8B5CF6',
          blue: '#3B82F6',
          emerald: '#10B981',
          orange: '#F97316',
          gold: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(34, 211, 238, 0.4)',
        table: '0 20px 50px -10px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 0, 0, 0.6)'
      }
    }
  },
  plugins: []
};
