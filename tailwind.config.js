/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require("tw-elements/dist/plugin")
  ],
}
