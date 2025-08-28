// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, tailwind-utilities, primevue '
        },
      },
    },
  },
})