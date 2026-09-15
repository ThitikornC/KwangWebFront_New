import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import Icon from './Icon.jsx'
import { placeIcon } from './mapIcons.js'
import {
  activityPoints,
  airLegend,
  airStations,
  corridor,
  crowdZones,
  mapConfig,
  mapLegend,
  mapPlaces,
  mapTabs,
  parking,
} from '../data/mock.js'

const legendColor = (legend, level) => legend.find((item) => item.id === level)?.color ?? '#94a3b8'

const parkingTone = (level) => (level >= 60 ? '#10b981' : level >= 35 ? '#f59e0b' : '#f43f5e')

const FIT_OPTIONS = { padding: [48, 48], maxZoom: 16 }

// Frames whatever the active layer is showing, so no marker ends up clipped by
// the panel edge when the layer changes.
function FitBounds({ points }) {
  const map = useMap()
  // The map is already created at these bounds, so the first run would only
  // re-request the same tiles — skip it and react to layer changes instead.
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    if (points.length) map.fitBounds(points, FIT_OPTIONS)
  }, [map, points])

  return null
}

export default function MapPanel() {
  const [activeTab, setActiveTab] = useState('map')
  const [map, setMap] = useState(null)
  const shellRef = useRef(null)

  const legend = useMemo(() => {
    if (activeTab === 'air') return { title: 'คุณภาพอากาศ', items: airLegend }
    if (activeTab === 'parking' || activeTab === 'activity') return null
    return { title: 'ความหนาแน่น', items: mapLegend }
  }, [activeTab])

  // Points the active layer draws — also what the map frames itself around.
  const layerPoints = useMemo(() => {
    const byTab = {
      map: mapPlaces,
      crowd: crowdZones,
      air: airStations,
      parking,
      activity: activityPoints,
    }
    return [...corridor, ...(byTab[activeTab] ?? []).map((item) => item.position)]
  }, [activeTab])

  const recenter = useCallback(() => {
    map?.flyToBounds(layerPoints, { ...FIT_OPTIONS, duration: 0.6 })
  }, [map, layerPoints])

  const toggleFullscreen = useCallback(() => {
    const shell = shellRef.current
    if (!shell) return

    // Leaflet needs a nudge once the container has finished resizing.
    const done = () => window.setTimeout(() => map?.invalidateSize(), 150)
    if (document.fullscreenElement) document.exitFullscreen().then(done)
    else shell.requestFullscreen?.().then(done)
  }, [map])

  return (
    <section ref={shellRef} className="panel flex flex-col overflow-hidden">
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-edge px-3 py-3">
        {mapTabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                'flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition',
                isActive
                  ? 'bg-blue-600 text-white shadow-[0_10px_24px_-14px_rgba(59,130,246,1)]'
                  : 'border border-edge bg-ink-700/50 text-slate-300 hover:text-white',
              ].join(' ')}
            >
              {tab.icon && <Icon name={tab.icon} className="h-4 w-4" />}
              {tab.label}
            </button>
          )
        })}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="ml-auto hidden h-9 w-9 shrink-0 place-items-center rounded-lg border border-edge bg-ink-700/50 text-slate-300 transition hover:text-white sm:grid"
          aria-label="ขยายแผนที่เต็มจอ"
        >
          <Icon name="expand" className="h-4 w-4" />
        </button>
      </div>

      <div className="relative min-h-[320px] flex-1">
        <MapContainer
          ref={setMap}
          bounds={layerPoints}
          boundsOptions={FIT_OPTIONS}
          minZoom={mapConfig.minZoom}
          maxZoom={mapConfig.maxZoom}
          zoomControl={false}
          // ซูมด้วยล้อเมาส์และนิ้ว (pinch) ได้ — Leaflet จะใส่คลาส leaflet-touch-zoom
          // /leaflet-touch-drag ให้เอง ทำให้ touch-action ของ container ถูกต้องตามนั้น
          scrollWheelZoom
          touchZoom
          doubleClickZoom
          className="h-full w-full"
        >
          <TileLayer
            url={mapConfig.tileUrl}
            attribution={mapConfig.tileAttribution}
            subdomains={mapConfig.tileSubdomains}
            maxZoom={mapConfig.maxZoom}
          />

          <FitBounds points={layerPoints} />

          {/* Chom Nan 500M Corridor — the spine of the view, shown on every layer */}
          <Polyline
            positions={corridor}
            pathOptions={{ color: '#38bdf8', weight: 6, opacity: 0.75, lineCap: 'round' }}
          />

          {activeTab === 'map' &&
            mapPlaces.map((place) => (
              <Marker key={place.id} position={place.position} icon={placeIcon(place.icon, place.tone)}>
                <Popup>
                  <strong>{place.name}</strong>
                  <br />
                  {place.detail}
                </Popup>
              </Marker>
            ))}

          {activeTab === 'crowd' &&
            crowdZones.map((zone) => {
              const color = legendColor(mapLegend, zone.level)
              return (
                <Circle
                  key={zone.id}
                  center={zone.position}
                  radius={zone.radius}
                  pathOptions={{ color, fillColor: color, fillOpacity: 0.28, weight: 1.5 }}
                >
                  <Popup>
                    <strong>{zone.label}</strong>
                    <br />
                    {zone.value}
                  </Popup>
                </Circle>
              )
            })}

          {activeTab === 'air' &&
            airStations.map((station) => {
              const color = legendColor(airLegend, station.level)
              return (
                <Circle
                  key={station.id}
                  center={station.position}
                  radius={station.radius}
                  pathOptions={{ color, fillColor: color, fillOpacity: 0.22, weight: 1.5 }}
                >
                  <Popup>
                    <strong>{station.label}</strong>
                    <br />
                    {station.value}
                  </Popup>
                </Circle>
              )
            })}

          {activeTab === 'parking' &&
            parking.map((lot) => (
              <Marker key={lot.id} position={lot.position} icon={placeIcon('parking', 'blue')}>
                <Popup>
                  <strong>{lot.label}</strong>
                  <br />
                  <span style={{ color: parkingTone(lot.level) }}>{lot.value}</span>
                </Popup>
              </Marker>
            ))}

          {activeTab === 'activity' &&
            activityPoints.map((point) => (
              <Marker key={point.id} position={point.position} icon={placeIcon(point.icon, point.tone)}>
                <Popup>
                  <strong>{point.name}</strong>
                  <br />
                  {point.detail}
                </Popup>
              </Marker>
            ))}
        </MapContainer>

        {legend && (
          <div className="pointer-events-none absolute right-3 top-3 z-[500] rounded-xl border border-edge bg-ink-900/85 p-3 backdrop-blur">
            <p className="mb-2 text-[11px] font-semibold text-white">{legend.title}</p>
            <ul className="space-y-1.5">
              {legend.items.map((item) => (
                <li key={item.id} className="flex items-center gap-2 text-[11px] text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="absolute bottom-8 right-3 z-[500] flex flex-col overflow-hidden rounded-lg border border-edge bg-ink-900/85 backdrop-blur">
          <button
            type="button"
            onClick={() => map?.zoomIn()}
            className="grid h-9 w-9 place-items-center text-slate-300 transition hover:text-white"
            aria-label="ซูมเข้า"
          >
            <Icon name="plus" className="h-4 w-4" />
          </button>
          <span className="h-px bg-edge" />
          <button
            type="button"
            onClick={() => map?.zoomOut()}
            className="grid h-9 w-9 place-items-center text-slate-300 transition hover:text-white"
            aria-label="ซูมออก"
          >
            <Icon name="minus" className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={recenter}
          className="absolute bottom-8 right-[60px] z-[500] grid h-9 w-9 place-items-center rounded-lg border border-edge bg-ink-900/85 text-slate-300 backdrop-blur transition hover:text-white"
          aria-label="กลับไปยังย่านใจกลางเมือง"
        >
          <Icon name="locate" className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
