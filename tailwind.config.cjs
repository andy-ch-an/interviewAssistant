/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      'HankRnd': ['HankRnd', 'mono'],
    },
    extend: {
      width: {
        '22': '5.5rem',
      },
      colors: {
        lightBlue: '#76A8FF',
        lightPurple: '#BF82FF',
        cyanBlue: '#1E88E5',
        lightestBlue: '#E7EEFB',
        lightRed: '#EF9A9A',
        gray: '#687284',
        background: '#F7F8FA'
      },
    },
  },
  plugins: [],
}
