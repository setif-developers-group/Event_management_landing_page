/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Roboto', 'sans-serif'],   // main body font
      heading: ['Roboto', 'sans-serif'] // optional alias
    },
      colors: {
        brand: {
          DEFAULT: "#40B878",  // your main brand color
          dark: "#0F1629",     // darker shade
          light: "#1772CD",    // lighter shade
        },
      },
    },
  },

  plugins: [],
}

