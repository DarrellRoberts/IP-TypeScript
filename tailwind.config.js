/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      'waterfall': 'url("./src/assets/waterfall.gif")',
      },
      colors: {
      'grey-trans': "rgb(49 48 48 / 75%)"
      } 
    },
  },
  plugins: [],
}