/** พาธของไฟล์ใน public/ ให้ผูกกับ base ของแอป (ตอน build เสิร์ฟใต้ /momay-citizen/)
 *  เขียนพาธแบบไม่มี / นำหน้า เช่น asset('momay/demo-bg-01.webp') */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`.replace(/([^:])\/{2,}/g, '$1/')
