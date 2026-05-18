// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: true,
  },

  css: [
    "./app/assets/css/variables.css",
    "./app/assets/css/forms.css",
    "./app/assets/css/main.css",
  ],

  typescript: {
    strict: true,
  },

  modules: ["@nuxt/fonts"],

  routeRules: {
    "/login": { prerender: true },
    "/register": { prerender: true },
    "/dashboard": { ssr: false },
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    mongodbUri: process.env.MONGODB_URI,
    public: {},
  },
});
