# MOMAY CITIZEN — dashboard (React)

หน้า dashboard "See & Act" ของ MOMAY CITIZEN สร้างด้วย React 18 + Vite + Tailwind CSS
แยกเป็นโปรเจกต์อิสระจาก Nuxt app หลักในโฟลเดอร์แม่

## รันโปรเจกต์

```bash
cd momay-citizen
npm install
npm run dev      # http://localhost:5183
npm run build    # ออกเป็น static ที่ dist/
```

## โครงสร้าง

```
src/
  App.jsx                 layout หลัก + state ของ nav / intent / search
  tones.js                map สีตาม tone ที่ใช้ร่วมกันทุก component
  data/mock.js            ข้อมูลทั้งหมดของหน้า (จุดเดียวที่ต้องแก้ตอนต่อ API)
  components/
    Sidebar.jsx           เมนูซ้าย (desktop) + โลโก้
    TopBar.jsx            ค้นหา / อากาศ / วันเวลา / แจ้งเตือน
    Hero.jsx              ภาพเมืองยามค่ำ + หัวเรื่อง "วันนี้คุณอยากทำอะไร?"
    IntentTabs.jsx        แถบหมวดกิจกรรม 7 ปุ่ม
    LiveStatus.jsx        การ์ดสถานการณ์เรียลไทม์ 4 ตัวชี้วัด
    MapPanel.jsx          แผนที่ Leaflet + tab เลเยอร์ + legend + ปุ่มซูม/เต็มจอ
    mapIcons.js           สร้างหมุด Leaflet จากชุดไอคอนเดียวกับหน้าอื่น
    Recommendations.jsx   การ์ดสถานที่แนะนำ (กดหัวใจบันทึกได้)
    BottomRow.jsx         กิจกรรมใกล้คุณ / ที่จอดรถ / ช่วงเวลาที่แนะนำ
    Footer.jsx            แถบล่าง เทศบาลนครพิษณุโลก
    Icon.jsx              ชุดไอคอน inline SVG ทั้งหมด (ใช้ร่วมกับหมุดแผนที่)
```

## แผนที่

ใช้ **Leaflet + react-leaflet** ปักหมุดด้วยพิกัดจริงย่านใจกลางพิษณุโลก
มี 5 เลเยอร์สลับได้จาก tab ด้านบน: สถานที่ / ความหนาแน่น / คุณภาพอากาศ /
ที่จอดรถ / กิจกรรม — แต่ละเลเยอร์แผนที่จะ fit ขอบเขตให้เองโดยอัตโนมัติ

ข้อควรรู้ 2 เรื่องก่อนขึ้น production:

1. **Tile provider** — ตอนนี้ใช้ tile มาตรฐานของ OpenStreetMap ซึ่งไม่ต้องใช้ API key
   แต่ tile usage policy ของ OSM รองรับแค่ทราฟฟิกน้อย ๆ ถ้าจะใช้งานจริงให้เปลี่ยน
   `mapConfig.tileUrl` ไปเป็น tile server ของตัวเอง หรือผู้ให้บริการที่มีสไตล์
   dark สำเร็จรูป (CARTO / Stadia / MapTiler — ต้องมีคีย์) แล้วลบ CSS filter
   ของ `.leaflet-tile-pane` ใน `index.css` ออก
2. **พิกัด** — lat/lng ใน `mock.js` เป็นค่าโดยประมาณรอบใจกลางเมือง พอสำหรับเดโม
   ควรแทนด้วยพิกัดจริงหรือ GeoJSON จากเทศบาลก่อนนำเสนอจริง

## ต่อ API

ทุก component อ่านข้อมูลจาก `src/data/mock.js` อย่างเดียว เวลาจะต่อ backend จริง
ให้เปลี่ยน export แต่ละตัวเป็นค่าที่ fetch มา (หรือทำ hook ครอบ) โดยคงรูปร่างข้อมูลเดิมไว้
component ไม่ต้องแก้

## รูปภาพ

คัดลอกมาจาก `public/momay/` ของโปรเจกต์หลัก ถ้าจะเปลี่ยนรูปจริงของพิษณุโลก
วางไฟล์ทับใน `momay-citizen/public/momay/` แล้วแก้ path ใน `mock.js`
