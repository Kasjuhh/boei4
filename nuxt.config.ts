// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: ['@headlessui/vue'],
  },

  plugins: [
    { src: '~/plugins/keycloak.client.ts', mode: 'client' },
  ],

  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/leaflet']
})