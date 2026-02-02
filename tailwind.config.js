/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blood:"#ff0000",
        darkbg:"#050505",
      },
      boxShadow:{
        neon:"0 0 20px red",
      }
    },
  },
  plugins: [],
}

