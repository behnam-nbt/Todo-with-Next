/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 1.5s ease-out forwards',
        'fade-in': 'fadeIn 1.5s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-50%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      fontFamily: {
        custom: ['Vazir', 'sans-serif'],
      },
      screens: {
        '2xl': '1536px',
      },
    },
  },
  darkMode: "class",
};
