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
        primary: "#6C63FF",
        secondary: "rgb(139 132 245)",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(90deg, #6C63FF 0%, #C100D4 50%, #82ECEE 100%)",
      },
      animation: {
        popup: "popup ease-in-out forwards 3s",
      },
      keyframes: {
        popup: {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
