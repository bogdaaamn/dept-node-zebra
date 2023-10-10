const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.astro"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["MaisonNeueMG", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        onyx: "#121212",
        dark: "#67727b",
        light: "#818181",
      },
      backgroundImage: {
        "default-noise": "url('/noise.png')",
      },
    },
  },
  plugins: [],
};
