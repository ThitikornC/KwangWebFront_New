import { useState } from 'react'
import TopBar from './components/TopBar.jsx'
import Hero from './components/Hero.jsx'
import IntentTabs from './components/IntentTabs.jsx'
import LiveStatus from './components/LiveStatus.jsx'
import MapPanel from './components/MapPanel.jsx'
import Recommendations from './components/Recommendations.jsx'
import BottomRow from './components/BottomRow.jsx'
import SurveyBanner from './components/SurveyBanner.jsx'

export default function App() {
  const [intent, setIntent] = useState('exercise')
  const [query, setQuery] = useState('')

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar query={query} onQueryChange={setQuery} />

      <SurveyBanner />

      <main className="flex-1">
        <Hero />
        <IntentTabs active={intent} onSelect={setIntent} />

        <div className="space-y-4 px-4 pb-6 sm:px-6">
          {/* Live status sits beside the map on wide screens, as in the design */}
          <div className="grid gap-4 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
            <LiveStatus />
            <MapPanel />
          </div>

          <Recommendations />
          <BottomRow />
        </div>
      </main>
    </div>
  )
}
