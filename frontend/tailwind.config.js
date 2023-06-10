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
    },
  },
  plugins: [],
};
