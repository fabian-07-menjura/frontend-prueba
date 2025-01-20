/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Archivos en la carpeta pages
    "./components/**/*.{js,ts,jsx,tsx}", // Archivos en la carpeta components
    "./app/**/*.{js,ts,jsx,tsx}", // Archivos en la carpeta app (si usas la App Directory de Next.js)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
