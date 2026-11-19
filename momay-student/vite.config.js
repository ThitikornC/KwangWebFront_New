import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// หน้า Student ถูกคัดลอกมาทั้งไฟล์ ไอคอนในนั้นอ้างพาธแบบ absolute (/icons/*.png)
// ตอน build เสิร์ฟผ่าน Nuxt พาธนี้ตรงกับ public/icons ของ Nuxt พอดี แต่ตอน dev
// Vite เสิร์ฟ public/ ไว้ใต้ base จึงต้องแมป /icons ให้เองเพื่อไม่ต้องแก้ไฟล์ที่ลอกมา
const serveIconsAtRoot = () => ({
  name: 'serve-icons-at-root',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url?.startsWith('/icons/')) req.url = `/momay-student${req.url}`
      next()
    })
  },
})

export default defineConfig({
  plugins: [react(), serveIconsAtRoot()],
  // เสิร์ฟจาก public/ ของ Nuxt app หลัก ที่พาธ /momay-student/
  base: '/momay-student/',
  build: {
    outDir: '../public/momay-student',
    emptyOutDir: true,
  },
  server: {
    port: 5184,
    open: true,
    // โมเดลคำนวณอยู่ที่ utils/ ของ Nuxt app แม่ ต้องอนุญาตให้อ่านนอก root
    fs: { allow: ['..'] },
  },
})
