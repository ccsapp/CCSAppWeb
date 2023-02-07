/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#B23296",
        background: "#292D40",
        foreground: "#1A1F29",
        warning: "#DB5D5D",
        secondary: "#5D5D5D",
        modalbg: "#585D78",
        modalsecondary: "#34363D",
        toastBg: "#E39116",
        sliderBg: "#FF9900",
      },
      fontFamily: {
        heading: ["Roboto Condensed", "Helvetica", "sans-serif"],
        body: ["Roboto", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
