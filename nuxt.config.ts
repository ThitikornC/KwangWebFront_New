// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // script:[
      //   { src: 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js', defer: true }
      // ]
      script: [
        { src: 'https://unpkg.com/aos@2.3.1/dist/aos.js', defer: true },
      ]
    },
  },
  // target: 'static',
  typescript: {
    strict: true
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  experimental: {
    cookieStore: true
  },
runtimeConfig: {
  public: {
    appURL: "http://localhost:3000",
    apiURL: process.env.API_BASE_URL || "https://kwangwebbacknew-production.up.railway.app",
    firebaseApiKey: process.env.FIREBASE_API_KEY || "",
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID || "",
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
    firebaseAppId: process.env.FIREBASE_APP_ID || "",
  },
},

  nitro: {
    prerender: {
      autoSubfolderIndex: false
    },
    preset: "node-server"
  },
  
  ssr: false
})
