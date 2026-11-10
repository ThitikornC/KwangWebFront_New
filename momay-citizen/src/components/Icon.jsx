// Single inline-SVG icon set. Every glyph shares the same 24x24 box and
// inherits currentColor, so icons can be tinted with text-* utilities.
//
// The glyphs are stored as raw markup strings rather than JSX so that Leaflet
// map markers — which only accept an HTML string — can reuse the exact same
// table instead of pulling react-dom/server into the client bundle.
export const iconPaths = {
  home: '<path d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5M9.5 20v-6h5v6" />',
  search: '<circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" />',
  map: '<path d="m3 6.5 6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5z" /><path d="M9 4v13.5M15 6.5V20" />',
  calendar:
    '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" />',
  car:
    '<path d="M4 16v2.5h2.5V16M17.5 16v2.5H20V16" /><path d="M3.5 16v-3.6l1.9-4.2A2 2 0 0 1 7.2 7h9.6a2 2 0 0 1 1.8 1.2l1.9 4.2V16z" /><path d="M3.5 12.4h17M7.5 14.2h.01M16.5 14.2h.01" />',
  star: '<path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9z" />',
  clipboard:
    '<rect x="4.5" y="4.5" width="15" height="16" rx="2.5" /><path d="M9 3h6v3.5H9zM8.5 11h7M8.5 15h4.5" />',
  bell: '<path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2h-14zM10 20.5a2.2 2.2 0 0 0 4 0" />',
  user: '<circle cx="12" cy="9" r="3.4" /><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />',
  sun:
    '<circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" />',
  run:
    '<circle cx="14.5" cy="4.6" r="1.9" /><path d="m8 21 2.6-5.1-2.2-2.6.8-4.6 3.4-1.3 2.4 2.7 3 1.1M10.4 15.9l3.6 1.3 1 3.8M6.2 9.6l2.4-1.2" />',
  food:
    '<path d="M7 3v8.5M4.5 3v4.8a2.5 2.5 0 0 0 5 0V3M7 11.5V21" /><path d="M17.5 21v-7.5c2 0 2.8-1.2 2.8-4.3S19.2 3 17.5 3s-2.8 3-2.8 6.2 0.9 4.3 2.8 4.3" />',
  cafe:
    '<path d="M4.5 8h12v5.5a4.5 4.5 0 0 1-4.5 4.5H9a4.5 4.5 0 0 1-4.5-4.5z" /><path d="M16.5 9.5h1.8a2.4 2.4 0 0 1 0 4.8h-1.8M4 21h13" />',
  tree: '<path d="m12 3 4.5 6h-2.6L18 14.6H6L10.1 9H7.5z" /><path d="M12 14.6V21" />',
  music:
    '<path d="M9 18V6.2l10-2v11.4" /><circle cx="6.6" cy="18" r="2.6" /><circle cx="16.6" cy="15.6" r="2.6" />',
  dots:
    '<circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none" />',
  people:
    '<circle cx="9" cy="8.4" r="3" /><path d="M3.4 18.8a5.6 5.6 0 0 1 11.2 0" /><path d="M16 6.2a3 3 0 0 1 0 5.9M17.2 14.2a5.6 5.6 0 0 1 3.4 4.6" />',
  leaf:
    '<path d="M20 4.5c0 9-5.2 13-10 13a5 5 0 0 1-5-5c0-5.4 5.7-8 15-8z" /><path d="M5.5 20.5c2-5.5 5.6-9 10-11" />',
  thermo:
    '<path d="M10 14.2V5.6a2 2 0 0 1 4 0v8.6a4 4 0 1 1-4 0z" /><path d="M12 10.5v5.4" />',
  parking:
    '<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.5" /><path d="M9.6 17V7.4h3.2a2.9 2.9 0 0 1 0 5.8H9.6" />',
  heart: '<path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4c0 5-7.5 9.4-7.5 9.4z" />',
  arrowRight: '<path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />',
  chevronRight: '<path d="m9.5 5.5 6.5 6.5-6.5 6.5" />',
  chevronLeft: '<path d="M14.5 5.5 8 12l6.5 6.5" />',
  expand: '<path d="M9 3.5H3.5V9M15 3.5h5.5V9M9 20.5H3.5V15M15 20.5h5.5V15" />',
  plus: '<path d="M12 5.5v13M5.5 12h13" />',
  minus: '<path d="M5.5 12h13" />',
  locate: '<circle cx="12" cy="12" r="4" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />',
  clock: '<circle cx="12" cy="12" r="8.5" /><path d="M12 7.2V12l3.2 2" />',
  pin:
    '<path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15 12 21 12 21z" /><circle cx="12" cy="10.4" r="2.4" />',
  fire: '<path d="M12 2.8s1.2 3.1-.9 5.6c-1.6 2-3.8 2.2-3.8 5.4A5.2 5.2 0 0 0 12 19.8a5.2 5.2 0 0 0 5.2-5.2c0-4.1-3-4.8-3-7.6-1.2 1.3-2.2 1.9-2.2 3.4-1.4-1-1.8-3-1.8-3z" />',
  temple:
    '<path d="m12 3 7 4.2H5zM6.5 7.2v4.4M17.5 7.2v4.4M4.5 11.6h15v4.2h-15zM6.5 15.8V20M17.5 15.8V20M3.5 20.5h17" />',
  sparkleStar: '<path d="m12 3.2 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8z" />',
  walk:
    '<circle cx="13" cy="4.4" r="1.9" /><path d="m9 21 2.4-5.6-1.9-2.8 1-4.4 3-.9 1.7 3.2 2.6 1.3M11.4 15.4l3.1 1.4.9 4.2" />',
}

// Standalone SVG markup, for places that need a string instead of an element
// (Leaflet div icons). `color` is baked in because there is no CSS ancestor to
// inherit currentColor from inside a Leaflet marker.
export function iconMarkup(name, { size = 17, strokeWidth = 2, color = 'currentColor' } = {}) {
  const glyph = iconPaths[name]
  if (!glyph) return ''

  return (
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" ` +
    `stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
    `${glyph}</svg>`
  )
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.7, ...rest }) {
  const glyph = iconPaths[name]
  if (!glyph) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      // Static, developer-authored markup from the table above — no user input.
      dangerouslySetInnerHTML={{ __html: glyph }}
      {...rest}
    />
  )
}
