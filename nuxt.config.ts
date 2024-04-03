// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@sidebase/nuxt-auth'],
  alias: {
    '@gateway': '~/composables/gateway',
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      'postcss-nested': {},
      tailwindcss: {},
    },
  },
  runtimeConfig: {
    googleClientSecret: '',
    googleClientId: '',
    authSecret: '',
    public: {
      url: '',
      mapsApiKey: '',
    },
  },
  build: {
    transpile: ['@fortawesome/vue-fontawesome'],
  },
  auth: {
    provider: {
      type: 'authjs',
    },
    globalAppMiddleware: true,
  },
  // pwa: {
  //   manifest: {
  //     name: "Gageo",
  //     short_name: "Gageo",
  //     description: "Gageo -- A geolocation client.",
  //     theme_color: "#FFFFFF",
  //     background_color: "#FFFFFF",
  //     icons: [
  //       {
  //         src: "/pwa/pwa-64x64.png",
  //         sizes: "64x64",
  //         type: "image/png",
  //       },
  //       {
  //         src: "/pwa/pwa-192x192.png",
  //         sizes: "192x192",
  //         type: "image/png",
  //       },
  //       {
  //         src: "/pwa/pwa-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //       },
  //       {
  //         src: "/pwa/maskable-icon-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //       },
  //       {
  //         src: "/pwa/apple-touch-icon-180x180.png",
  //         sizes: "180x180",
  //         type: "image/png",
  //       },
  //     ],
  //     screenshots: [
  //       {
  //         src: "/pwa/mobile.png",
  //         sizes: "400x800",
  //         type: "image/png",
  //         form_factor: "narrow",
  //         label: "Application",
  //       },
  //       {
  //         src: "/pwa/desktop.png",
  //         sizes: "1280x920",
  //         type: "image/png",
  //         form_factor: "wide",
  //         label: "Application",
  //       },
  //     ],
  //   },
  //   workbox: {
  //     navigateFallback: "/",
  //   },
  //   devOptions: {
  //     enabled: true,
  //     type: "module",
  //   },
  // },
});
