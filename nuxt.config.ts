// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  routeRules:{
    '/' : {redirect : '/public/'}
  },
  modules: [
    '@nuxtjs/tailwindcss', 
    '@primevue/nuxt-module', 
    '@nuxt/image', 
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'],
  image:{
    dir: "assets/",
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
        cssLayer: {
          name: 'primevue',
          darkModeSelector: "none",
          order: 'primevue, tailwind-base, tailwind-utilities'
        },
      },
    },
  },
})
