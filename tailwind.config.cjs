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
      'HankRndBlack': ['HankRndBlack', 'mono'],
      'HankRndLight': ['HankRndLight', 'mono'],
      'HankRndRegular': ['HankRndRegular', 'mono'],
      'HankRndBold': ['HankRndBold', 'mono']
    },
    extend: {
      width: {
        '22': '5.5rem',
      },
      colors: {
        lightBlue: '#76A8FF',
        lightestBlueDarker: '#64AAFD',
        lightPurple: '#BF82FF',
        cyanBlue: '#1E88E5',
        lightestBlue: '#E7EEFB',
        lightRed: '#EF9A9A',
        gray: '#687284',
        darkerGray: '#D4D2CB',
        background: '#F7F8FA',
        lightestGray: '#E0E0E0',
      },
    },
  },
  plugins: [],
}
