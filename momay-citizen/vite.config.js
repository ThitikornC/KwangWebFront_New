import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // เสิร์ฟจาก public/ ของ Nuxt app หลัก ที่พาธ /momay-citizen/
  base: '/momay-citizen/',
  build: {
    outDir: '../public/momay-citizen',
    emptyOutDir: true,
  },
  server: { port: 5183, open: true },
})
