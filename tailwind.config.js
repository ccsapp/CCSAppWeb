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
        active: "#60BA36",
        upcoming: "#D38034",
      },
      fontFamily: {
        heading: ["Roboto Condensed", "Helvetica", "sans-serif"],
        body: ["Roboto", "Helvetica", "sans-serif"],
      },
      maxWidth: {
        xxs: "16rem",
      },
      gridTemplateColumns: {
        "create-rental": "repeat(2, 1fr) 5.75rem",
      },
    },
  },
  plugins: [],
};
