การ deploy Cloudflare Worker ด้วย `wrangler` (อัตโนมัติจาก repo)

ไฟล์ที่เพิ่ม:
- `wrangler.toml` (root) — กำหนดค่า Worker, route และตัวแปรพื้นฐาน
- `scripts/cloudflare/espresso-proxy-worker.js` — โค้ด Worker (มีอยู่แล้ว)

ก่อนเริ่ม: คุณต้องมี `account_id` และ `zone_id` ของ Cloudflare
- `account_id`: หาได้จากหน้า Account Home (URL หรือ Account settings)
- `zone_id`: หาได้จากหน้า Overview ของ domain (kwangunlimit.com)

ขั้นตอนสั้นๆ (copy/paste):

1) ติดตั้ง `wrangler` (ถ้ายังไม่ติดตั้ง)

```bash
npm install -g wrangler
```

2) เข้าสู่ระบบ Cloudflare ผ่าน `wrangler`

```bash
wrangler login
```

3) แก้ไฟล์ `wrangler.toml`
- เปิด `wrangler.toml` และแทนที่ `YOUR_ACCOUNT_ID` และ `YOUR_ZONE_ID` ด้วยค่าจริง
- ถ้าต้องการเปลี่ยน `BACKEND_BASE` ให้แก้ใน `[vars]` หรือใช้ `wrangler secret` สำหรับค่าสำคัญ

4) ตั้งค่า Secrets (ถ้าจำเป็น)
- ถ้าคุณต้องการเก็บค่าเป็น secret เช่น API_KEY ให้ใช้คำสั่ง:

```bash
wrangler secret put MY_SECRET_NAME
# แล้วพิมพ์ค่าที่ต้องการ (prompt)
```

5) Publish Worker

```bash
# จาก root ของ repo
wrangler publish
```

6) ตรวจสอบ
- เปิด https://www.kwangunlimit.com/espresso/001 (หรือ runNo ที่มี) เพื่อตรวจสอบการทำงาน
 - เปิด https://www.kwangunlimit.com/espresso/001 (หรือ runNo ที่มี) เพื่อตรวจสอบการทำงาน

หมายเหตุและข้อควรระวัง:
- หาก `BACKEND_BASE` ชี้ไปยัง `https://www.kwangunlimit.com` และ backend ตัวเดียวกันเป็นที่เก็บ `/api/espresso` จะต้องแน่ใจว่า endpoint นั้นเข้าถึงได้สาธารณะหรือ Worker มีสิทธิ์เข้าถึง
- ถ้า target app (lead.url) ใช้ absolute paths อาจต้องปรับ app ให้รองรับการใช้งานภายใต้ path `/espresso/<id>` หรือ Worker ต้อง rewrite HTML (ซับซ้อนขึ้น)
- สำหรับการตั้ง route แบบ production แนะนำตั้งใน Cloudflare Dashboard ให้มั่นใจว่า `www.kwangunlimit.com/espresso/*` เชื่อมกับ Worker ที่ deploy
 - คำสั่ง deploy (ใหม่ของ Wrangler): `wrangler deploy` (แทน `wrangler publish` ในรุ่นล่าสุด)

ต้องการให้ผมสร้างตัวอย่าง `wrangler` GitHub Action workflow ด้วยไหม (เพื่อ deploy อัตโนมัติเมื่อ push)?
