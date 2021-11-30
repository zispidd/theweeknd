module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  container: (theme) => ({
    center: true,
    padding: theme('spacing.4')
  }),
  variants: {
    extend: {},
  },
  plugins: []
}
