/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveUpRight: {
          '0%': {
            opacity: 0,
            transform: 'translateY(100%) translateX(0)'
          },
          '30%': {
            opacity: 1,
            transform: 'translateY(-10%) translateX(10%)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) translateX(0)'
          }
        },
        bounceFromLeft: {
          '0%,100%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateX(-25%)',
            animationTimingFunction: 'cubic- bezier(0, 0, 0.2, 1)'
          }
        },
        slide: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          }
        }

      },
      animation: {
        //   'blob': 'blob 7s infinite',
        'slide': 'slide 20s linear infinite',
        'move-up-right': 'moveUpRight 0.5 ease-out',
        'bounce-from-left': 'bounceFromLeft 1s infinite'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

