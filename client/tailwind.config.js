/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        pr: '#d4151b',
        sr: '#da2026',
        pb: '#1282c5',
        sb: '#27bbee',
      },
    },
  },
  plugins: [flowbite.plugin(),],
}
