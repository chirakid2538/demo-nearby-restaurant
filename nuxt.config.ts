// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@invictus.codes/nuxt-vuetify',
    "@pinia/nuxt",
    'nuxt-swiper',
  ],
  vuetify: {
    vuetifyOptions: {
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      styles: true,
      autoImport: true,
      useVuetifyLabs: true,
    }
  },
  swiper: {
    prefix: 'Swiper',
    styleLang: 'css',
    modules: ['navigation', 'pagination'], // all modules are imported by default
  },
  runtimeConfig: {
    googleMapSecretKey: process.env.GOOGLE_MAP_SECRET_KEY,
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      auth: process.env.REDIS_AUTH,
      password: process.env.REDIS_PASSWORD
    },
    public: {
      googleMapSecretKey: process.env.GOOGLE_MAP_SECRET_KEY,
    }
  }
})
