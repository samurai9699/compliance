/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          dark: {
            DEFAULT: '#0F172A', // Dark navy
            lighter: '#1E293B', // Lighter navy
            accent: '#334155', // Medium navy
          },
          accent: {
            gold: '#D4B483',
            teal: '#2DD4BF',
            lavender: '#A78BFA',
          },
          glow: {
            teal: '#2DD4BF33',
            gold: '#D4B48333',
            lavender: '#A78BFA33',
          },
        },
        fontFamily: {
          sans: ['Inter var', 'system-ui', 'sans-serif'],
        },
        animation: {
          'gradient-x': 'gradient-x 15s ease infinite',
          'fade-in': 'fade-in 0.5s ease-out',
          'slide-up': 'slide-up 0.5s ease-out',
          'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        },
        keyframes: {
          'gradient-x': {
            '0%, 100%': {
              'background-size': '200% 200%',
              'background-position': 'left center',
            },
            '50%': {
              'background-size': '200% 200%',
              'background-position': 'right center',
            },
          },
          'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          'slide-up': {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          'glow-pulse': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'dark-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.857 8.485 15.272 9.9l7.9-7.9h-.83L27.03 0h-4.687zm16.97 0L47.8 8.485 46.384 9.9l-7.9-7.9h.828L33.626 0h5.687zm-12.284 0l9.9 9.9-1.415 1.414L25.272 1.414 26.686 0h-2.83L21.03 0h6zM38.03 0L40.858 2.828 39.443 4.243 33.857 -1.343V0h4.173zm-17.656 0l7.9 7.9-1.415 1.415-7.9-7.9h1.414L20.687 0h-.313zm22.313 0L42.687 0l-1.414 1.414L33.857 -7.172V-5.757L42.343 2.828z' fill='%23334155' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        },
      },
    },
    plugins: [],
  };