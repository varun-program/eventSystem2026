/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    colors: {
      blood: "#e50914",
      dark: "#0a0a0a",
    },
    boxShadow: {
      glow: "0 0 25px rgba(229,9,20,0.8)",
    },
  },
},

  plugins: [],
}

