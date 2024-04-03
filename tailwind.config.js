/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './composables/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      dropShadow: {
        'focus-green': 'filter: drop-shadow(0 25px 25px rgb(0 255 0 / 0.45));',
      },
    },
  },
  plugins: [],
};
