/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,ts,tsx}", "./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#FF6600" }
    }
  },
  plugins: []
};
