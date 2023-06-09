/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A796FE",
        secondary: "#F44336",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(90deg, #F44336 0%, #C100D4 50%, #82ECEE 100%)",
      },
    },
  },
  plugins: [],
};
