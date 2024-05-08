/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const flowbite = require("flowbite-react/tailwind")
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content()
  ],
  theme: {
    extend: {
      backgroundImage:{
        banner:"url('./src/assets/bg.jpg')"
      }
    },
  },
  
  plugins: [flowbite.plugin()],
}

