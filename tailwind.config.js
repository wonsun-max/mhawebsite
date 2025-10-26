// FILE: tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // if you have pages folder
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#001F3F', // A deep, academic navy blue
        'light-gray': '#F5F5F5', // A soft, light gray
        'white': '#FFFFFF', // Pure white
        // You can add more shades if needed, e.g., 'navy-blue-light': '#1A3A5F'
      },
    },
  },
  plugins: [],
}
