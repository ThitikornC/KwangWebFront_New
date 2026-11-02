import L from 'leaflet'
import { iconMarkup } from './Icon.jsx'
import { tone } from '../tones.js'

// Leaflet only accepts an HTML string for a marker, so the shared icon table is
// rendered to markup and wrapped in the same circular badge used elsewhere.
export function placeIcon(name, toneName) {
  const t = tone(toneName)

  return L.divIcon({
    className: 'momay-pin',
    html: `<span class="momay-pin__badge" style="background:${t.dot}">${iconMarkup(name, { color: '#fff' })}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  })
}
