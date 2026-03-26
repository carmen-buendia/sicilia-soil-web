/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
         colors: {
        'sicilia-terra': '#B43F2B',
        'sicilia-ocra': '#E6B17E',
        'sicilia-oliva': '#5F6B3D',
        'sicilia-argilla': '#C4A27A',
        'sicilia-miele': '#F5D7B3',
        'sicilia-pietra': '#F5F0E6',
        'sicilia-carbon': '#2C2C2C',
      },
    },
  },
  plugins: [],
};
