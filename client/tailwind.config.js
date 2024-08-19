/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        main: '#080A1A',
        subMain: '#F20000',
        dry: '#0B0F25',
        star: '#FFB000',
        text: '#C0C0C0',
        border: '#4e536e',
        dryGray: '#E0D5D5'
      },
      height: {
        header: '560px',
        rate: '400px'
      }
      ,
      fontSize: {
        h1: '2.5rem'
      },
      screens: {
        xs: '475px'
      }
    },
  },
  plugins: [],
}

