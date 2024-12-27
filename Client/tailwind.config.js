/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
const tailwindScrollbar = require('tailwind-scrollbar');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            wordBreak: 'break-word',
          },
        },
      }),
    },
  },
  plugins: [
    flowbite.plugin(),
    tailwindScrollbar,
    require('@tailwindcss/typography'),
  ],
}