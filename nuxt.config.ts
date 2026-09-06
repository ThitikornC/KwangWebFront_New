// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'node-server',
    prerender: {
      autoSubfolderIndex: false
    }
  },

  // Server config for Railway
  devServer: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000
  },

  app: {
    baseURL: '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        { src: 'https://unpkg.com/aos@2.3.1/dist/aos.js', defer: true },
      ]
    },
  },
  typescript: {
    strict: true
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
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
    mongodbUri: process.env.MONGODB_URI,
    railwayApiKey: process.env.RAILWAY_API_KEY,
    lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    lineUserId: process.env.LINE_USER_ID,
    baseUrl: process.env.BASE_URL || 'https://www.kwangunlimit.com',
    public: {
      appURL: process.env.APP_URL || 'https://www.kwangunlimit.com',
      apiURL: process.env.API_BASE_URL || "https://kwangwebbacknew-production.up.railway.app",
      firebaseApiKey: process.env.FIREBASE_API_KEY || "",
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID || "",
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
      firebaseAppId: process.env.FIREBASE_APP_ID || "",
    },
  },
  ssr: false
})
