/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        //   blob: {
        //     '0%': { transform: 'translate(0%, 0%) scale(1)' },
        //     '33%': { transform: 'translate(30%, -50%) scale(1.2)' },
        //     '66%': { transform: 'translate(-20%, 20%) scale(0.8)' },
        //     '100%': { transform: 'translate(0%, 0%) scale(1)' }
        //   },
        bounceFromLeft: {
          '0%,100%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic- bezier(0, 0, 0.2, 1)'
          }
        }

      },
      animation: {
        //   'blob': 'blob 7s infinite',
        'bounce-from-left': 'bounceFromLeft 1s infinite'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

