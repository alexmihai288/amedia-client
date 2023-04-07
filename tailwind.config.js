/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      preWhite:'#ffffff',
        gray50:'#eaeef2',
        textGray:'#818b90',
        purple15:'#655DBB',
        pink5:'#BFACE2'
      },
      fontFamily:{
        'Karla' : ['Karla','sans-serif']
      }
    },
    screens: {
      'xs':'350px',
      // = > @media (min-width: 350px) { ... }
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}