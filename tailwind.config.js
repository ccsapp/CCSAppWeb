/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B23296",
        background: "#292D40",
        foreground: "#1A1F29",
        warning: "#DB5D5D",
        secondary: "#AFB1D2",
      },
      fontFamily: {
        heading: ['Roboto Condensed', 'Helvetica', 'sans-serif'],
        body: ['Roboto' , 'Helvetica', 'sans-serif']
      }
    },
  },
  plugins: [],
}
