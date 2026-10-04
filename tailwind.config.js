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
        bg: '#F8FAFC',
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F1F5F9',
          border: '#E2E8F0'
        },
        ludo: {
          red: '#FF4D6D',
          green: '#22C55E',
          yellow: '#FFC312',
          blue: '#3B82F6',
          purple: '#7C5CFF',
          cyan: '#06B6D4',
          ink: '#1E293B'
        },
        poker: {
          felt: '#15803D',
          feltDark: '#166534',
          feltBorder: '#B45309'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fredoka', 'Outfit', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 4px 0 rgba(30, 41, 59, 0.05), 0 15px 35px -15px rgba(30, 41, 59, 0.15)',
        glow: '0 0 25px -5px rgba(59, 130, 246, 0.35)',
        table: '0 20px 45px -10px rgba(0, 0, 0, 0.35), inset 0 0 40px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
};
