/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#FFFFFF",
          0: "#AAC5F2",
          200: "#7AA2E5",
          400: "#5585D6",
          600: "#366BC6",
          800: "#134FB4",
          alt: "#000000",
        },
        secondary: {
          base: "#808080",
          alt: "#999999",
        },
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [require("daisyui")],
};
