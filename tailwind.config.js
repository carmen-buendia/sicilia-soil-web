/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oliveGreen: "#5A6B47",
        wheatGold: "#E6B422",
        offWhite: "#FDFBF7",
        charcoalGray: "#1A1A1A",
        "sicilian-red": "#CD212A",
        "sicilian-yellow": "#FDB913",
      },
    },
  },
  plugins: [],
};
