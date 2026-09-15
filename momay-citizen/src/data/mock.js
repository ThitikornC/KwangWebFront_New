import { asset } from '../asset.js'

// Mock data for the MOMAY CITIZEN dashboard.
// Swap these constants for API responses when the backend is ready —
// every component reads its content from here and nothing else.

export const navItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'explore', label: 'Explore', icon: 'search' },
  { id: 'map', label: 'Map', icon: 'map' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'transport', label: 'Transport', icon: 'car' },
  { id: 'favorites', label: 'Favorites', icon: 'star' },
  { id: 'plan', label: 'My Plan', icon: 'clipboard' },
]

export const header = {
  searchPlaceholder: 'ค้นหาสถานที่ ร้านค้า กิจกรรม...',
  weather: {
    temp: '29°C',
    title: 'อากาศดี',
    note: 'เหมาะกับการออกไปข้างนอก',
  },
  date: 'อังคาร 10 ธ.ค. 2567',
  time: '08:24',
  notifications: 3,
}

export const hero = {
  image: asset('momay/demo-bg-01.webp'),
  eyebrow: 'วันนี้...',
  title: 'คุณอยากทำอะไร?',
  lines: [
    'ให้ MOMAY แนะนำพื้นที่ที่เหมาะกับคุณ',
    'จากสถานการณ์จริงของเมืองพิษณุโลก',
  ],
  script: ['Same City', 'A Better Day'],
  place: ['Chom Nan 500M Corridor', 'Phitsanulok'],
}

export const intents = [
  { id: 'exercise', icon: 'run', label: 'ออกกำลังกาย', sub: 'เดิน วิ่ง ปั่น', tone: 'cyan' },
  { id: 'eat', icon: 'food', label: 'กิน / ตลาด', sub: 'ของอร่อย ใกล้คุณ', tone: 'rose' },
  { id: 'cafe', icon: 'cafe', label: 'คาเฟ่ / พักผ่อน', sub: 'นั่งชิล พบเพื่อน', tone: 'amber' },
  { id: 'river', icon: 'tree', label: 'เดินเล่นริมน้ำ', sub: 'ชมบรรยากาศ', tone: 'sky' },
  { id: 'event', icon: 'music', label: 'กิจกรรม / Event', sub: 'งานเทศกาล', tone: 'violet' },
  { id: 'travel', icon: 'car', label: 'เดินทาง / จอดรถ', sub: 'เช็คเส้นทาง ที่จอด', tone: 'blue' },
  { id: 'more', icon: 'dots', label: 'เพิ่มเติม', sub: 'ดูทั้งหมด', tone: 'slate' },
]

export const liveStatus = {
  place: 'Chom Nan 500M Corridor',
  metrics: [
    {
      id: 'crowd',
      icon: 'people',
      tone: 'sky',
      label: 'ความหนาแน่นผู้คน',
      value: 'ปกติ',
      note: '(ประมาณ 40%)',
    },
    {
      id: 'air',
      icon: 'leaf',
      tone: 'emerald',
      label: 'คุณภาพอากาศ',
      value: 'ดี',
      note: 'PM2.5 18 µg/m³',
    },
    {
      id: 'temp',
      icon: 'thermo',
      tone: 'rose',
      label: 'อุณหภูมิ',
      value: '29°C',
      note: 'รู้สึกสบาย',
    },
    {
      id: 'traffic',
      icon: 'car',
      tone: 'blue',
      label: 'การจราจร',
      value: 'คล่องตัว',
      note: 'ไม่มีปัญหาหลัก',
    },
  ],
}

// --- Map ------------------------------------------------------------------
// Rendered with Leaflet over CARTO dark raster tiles.
// NOTE: the lat/lng below are approximate positions around central Phitsanulok,
// good enough to demo the layers. Replace them with surveyed coordinates
// (or GeoJSON from the city) before this goes in front of anyone official.

export const mapConfig = {
  // The initial view is fitted to whatever the active layer draws, so there is
  // no fixed center/zoom here — only the range the user may zoom within.
  minZoom: 12,
  maxZoom: 18,
  // Standard OpenStreetMap tiles — no API key needed. They ship light, so the
  // tile pane is darkened with a CSS filter (see `.leaflet-tile-pane` in
  // index.css) to match the dashboard.
  //
  // OSM's tile policy only covers modest traffic: before this goes live, point
  // tileUrl at your own tile server or a keyed provider (CARTO / Stadia /
  // MapTiler all serve a ready-made dark style) and drop the CSS filter.
  tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileAttribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  tileSubdomains: 'abc',
}

export const mapTabs = [
  { id: 'map', label: 'แผนที่', icon: 'map' },
  { id: 'crowd', label: 'ความหนาแน่น' },
  { id: 'air', label: 'คุณภาพอากาศ' },
  { id: 'parking', label: 'ที่จอดรถ' },
  { id: 'activity', label: 'กิจกรรม' },
]

export const mapLegend = [
  { id: 'very-high', label: 'หนาแน่นมาก', color: '#f43f5e' },
  { id: 'high', label: 'ค่อนข้างหนาแน่น', color: '#f59e0b' },
  { id: 'normal', label: 'ปกติ', color: '#84cc16' },
  { id: 'low', label: 'ไม่หนาแน่น', color: '#10b981' },
]

export const airLegend = [
  { id: 'unhealthy', label: 'เริ่มมีผลต่อสุขภาพ', color: '#f43f5e' },
  { id: 'moderate', label: 'ปานกลาง', color: '#f59e0b' },
  { id: 'good', label: 'ดี', color: '#84cc16' },
  { id: 'very-good', label: 'ดีมาก', color: '#10b981' },
]

// The "Chom Nan 500M Corridor" walking route highlighted in the hero.
export const corridor = [
  [16.8168, 100.2609],
  [16.8181, 100.2617],
  [16.8196, 100.2622],
  [16.8212, 100.2628],
  [16.8228, 100.2633],
  [16.8243, 100.2636],
]

export const mapPlaces = [
  { id: 'wat-yai', name: 'วัดใหญ่ (พระพุทธชินราช)', detail: 'สักการะ ขอพร', icon: 'temple', tone: 'rose', position: [16.8243, 100.2636] },
  { id: 'talad-nuea', name: 'ตลาดเหนือ', detail: 'ตลาดสด เช้า–สาย', icon: 'food', tone: 'rose', position: [16.8266, 100.2617] },
  { id: 'talad-tai', name: 'ตลาดใต้', detail: 'ของอร่อยพื้นเมือง', icon: 'food', tone: 'rose', position: [16.8139, 100.2622] },
  { id: 'river-cafe', name: 'The River Cafe', detail: 'วิวสวย นั่งสบาย', icon: 'cafe', tone: 'amber', position: [16.8174, 100.2598] },
  { id: 'riverwalk', name: 'ทางเดินริมน้ำน่าน', detail: 'บรรยากาศดี คนไม่หนาแน่น', icon: 'run', tone: 'emerald', position: [16.8194, 100.2631] },
  { id: 'ekathotsarot', name: 'สะพานเอกาทศรถ', detail: 'จุดชมวิวริมน้ำ', icon: 'pin', tone: 'sky', position: [16.8217, 100.2609] },
]

export const crowdZones = [
  { id: 'wat-yai', label: 'วัดใหญ่', level: 'high', value: 'ค่อนข้างหนาแน่น (68%)', radius: 220, position: [16.8243, 100.2636] },
  { id: 'talad-tai', label: 'ตลาดใต้', level: 'very-high', value: 'หนาแน่นมาก (85%)', radius: 200, position: [16.8139, 100.2622] },
  { id: 'talad-nuea', label: 'ตลาดเหนือ', level: 'normal', value: 'ปกติ (44%)', radius: 190, position: [16.8266, 100.2617] },
  { id: 'riverwalk', label: 'ทางเดินริมน้ำ', level: 'normal', value: 'ปกติ (40%)', radius: 240, position: [16.8194, 100.2631] },
  { id: 'river-cafe', label: 'ย่านคาเฟ่ริมน้ำ', level: 'low', value: 'ไม่หนาแน่น (22%)', radius: 180, position: [16.8174, 100.2598] },
]

export const airStations = [
  { id: 'city-hall', label: 'สถานีเทศบาล', level: 'good', value: 'PM2.5 18 µg/m³', radius: 220, position: [16.8212, 100.2652] },
  { id: 'riverside', label: 'สถานีริมน้ำน่าน', level: 'very-good', value: 'PM2.5 12 µg/m³', radius: 200, position: [16.8196, 100.2620] },
  { id: 'market', label: 'สถานีตลาดใต้', level: 'moderate', value: 'PM2.5 34 µg/m³', radius: 190, position: [16.8142, 100.2628] },
  { id: 'station', label: 'สถานีรถไฟ', level: 'good', value: 'PM2.5 21 µg/m³', radius: 200, position: [16.8258, 100.2684] },
]

export const activityPoints = [
  { id: 'walking-street', name: 'งานถนนคนเดิน ตลาดใต้', detail: '17:00 – 22:00 น.', icon: 'music', tone: 'violet', position: [16.8141, 100.2617] },
  { id: 'river-run', name: 'วิ่งริมน่าน ทุกเย็น', detail: '17:30 – 19:00 น.', icon: 'run', tone: 'emerald', position: [16.8204, 100.2626] },
  { id: 'temple-fair', name: 'ทำบุญไหว้พระ วัดใหญ่', detail: '06:00 – 18:00 น.', icon: 'temple', tone: 'amber', position: [16.8245, 100.2639] },
]


export const recommendations = [
  {
    id: 'riverwalk',
    image: asset('momay/demo-bg-03.webp'),
    badge: { label: 'แนะนำเลย', icon: 'run', tone: 'emerald' },
    icon: 'run',
    tone: 'emerald',
    title: 'ทางเดินริมน้ำน่าน',
    subtitle: 'บรรยากาศดี คนไม่หนาแน่น',
    distance: '4 นาที (300 ม.)',
    tags: ['เดินเล่น', 'ออกกำลังกาย'],
  },
  {
    id: 'talad-tai',
    image: asset('momay/cta-bg.webp'),
    badge: { label: 'กำลังนิยม', icon: 'fire', tone: 'rose' },
    icon: 'food',
    tone: 'rose',
    title: 'ตลาดใต้',
    subtitle: 'ของอร่อยพื้นเมือง',
    distance: '6 นาที (450 ม.)',
    tags: ['กิน', 'ช้อป'],
  },
  {
    id: 'river-cafe',
    image: asset('momay/demo-bg-05.webp'),
    badge: null,
    icon: 'cafe',
    tone: 'amber',
    title: 'The River Cafe',
    subtitle: 'วิวสวย นั่งสบาย',
    distance: '8 นาที (600 ม.)',
    tags: ['คาเฟ่', 'พักผ่อน'],
  },
  {
    id: 'wat-yai',
    image: asset('momay/demo-bg-04.webp'),
    badge: null,
    icon: 'temple',
    tone: 'sky',
    title: 'วัดใหญ่ (พระพุทธชินราช)',
    subtitle: 'สักการะ ขอพร',
    distance: '10 นาที (750 ม.)',
    tags: ['วัฒนธรรม', 'ท่องเที่ยว'],
  },
]

export const nearbyEvent = {
  image: asset('momay/hero-people.webp'),
  title: 'งานถนนคนเดิน ตลาดใต้',
  time: '17:00 – 22:00 น.',
  place: 'ตลาดใต้',
}

export const parking = [
  { id: 'talad-tai', label: 'ลานจอดรถตลาดใต้', value: 'ว่าง 40%', level: 40, position: [16.8134, 100.2631] },
  { id: 'wat-yai', label: 'ลานจอดรถวัดใหญ่', value: 'ว่าง 60%', level: 60, position: [16.8249, 100.2645] },
  { id: 'municipal', label: 'ลานจอดรถเทศบาล', value: 'ว่าง 70%', level: 70, position: [16.8216, 100.2661] },
]

export const bestTimes = [
  { id: 'river', label: 'เดินเล่นริมน้ำ', time: '06:00 – 09:00' },
  { id: 'eat', label: 'กิน / ตลาด', time: '11:00 – 14:00' },
  { id: 'cafe', label: 'คาเฟ่ / พักผ่อน', time: '15:00 – 18:00' },
  { id: 'view', label: 'บรรยากาศสวย', time: '18:00 – 21:00' },
]

export const footer = {
  org: 'เทศบาลนครพิษณุโลก',
  orgEn: 'Phitsanulok Municipality',
  words: ['People', 'Spaces', 'Better Tomorrows'],
  quote: '"เมืองที่น่าอยู่ คือเมืองที่คนมีความสุข"',
}
