import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // เสิร์ฟจาก public/ ของ Nuxt app หลัก ที่พาธ /momay-student-faculty/
  base: '/momay-student-faculty/',
  build: {
    outDir: '../public/momay-student-faculty',
    emptyOutDir: true,
  },
  server: {
    port: 5185,
    // engine ของผังคณะอยู่ที่ utils/ ของ Nuxt app แม่ (faculty.ts) หน้านี้ import มาใช้ตรง ๆ
    // ไม่ได้ลอกมาวางซ้ำ เพราะสารของหน้านี้คือ "ข้อมูลชุดเดียวกัน คนละประสบการณ์"
    // ถ้าลอกมา ตัวเลขสองฝั่งจะหลุดจากกันทันทีที่ใครแก้ข้างเดียว
    fs: { allow: ['..'] },
  },
})
