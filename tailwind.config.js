/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores corporativos
        sicilia: {
          red: "#CD212A",
          yellow: "#FDB913",
        },
        // Fondo blanco roto
        background: "#FEF9E8",
        // Textos
        text: {
          primary: "#1F2937", // gray-800
          secondary: "#4B5563", // gray-600
          tertiary: "#9CA3AF", // gray-400
        },
      },
    },
  },
  plugins: [],
};
