/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:    "#FDFFE2",
        secondary:  "#83B4FF",
        alternate:  "#5A72A0",
        last:       "#1A2130",
      },
    },
  },
  plugins: [],
};
