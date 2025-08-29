// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module', '@nuxt/image'],
  image:{
    dir: "assets/",
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        cssLayer: {
          name: 'primevue',
          order: 'primevue '
        },
      },
    },
  },
})