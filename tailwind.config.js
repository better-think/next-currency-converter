module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./core-elements/**/*.{js,ts,jsx,tsx}",
    "./connectors/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'danger': {
          DEFAULT: 'color: rgb(225 29 72);',
        },
      }
    },
    container: {
      center: true,
    },
    textColor: (theme) => ({
      ...theme('colors'),
      error: '#EB6237',
    }),
  },
  plugins: [],
}
