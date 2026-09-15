import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import Hero from './components/Hero.jsx'
import IntentTabs from './components/IntentTabs.jsx'
import LiveStatus from './components/LiveStatus.jsx'
import MapPanel from './components/MapPanel.jsx'
import Recommendations from './components/Recommendations.jsx'
import BottomRow from './components/BottomRow.jsx'
import Footer from './components/Footer.jsx'
import Icon from './components/Icon.jsx'
import { navItems } from './data/mock.js'

export default function App() {
  const [nav, setNav] = useState('home')
  const [intent, setIntent] = useState('exercise')
  const [query, setQuery] = useState('')

  return (
    <div className="flex min-h-screen">
      <Sidebar active={nav} onSelect={setNav} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar query={query} onQueryChange={setQuery} />

        <main className="flex-1 pb-24 lg:pb-0">
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

        <Footer />
      </div>

      {/* Phone/tablet navigation, since the sidebar is desktop-only */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-edge bg-ink-900/95 backdrop-blur lg:hidden">
        <div className="no-scrollbar flex items-center justify-between gap-1 overflow-x-auto px-2 py-2">
          {navItems.map((item) => {
            const isActive = item.id === nav
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setNav(item.id)}
                className={[
                  'flex min-w-[64px] flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[10px] transition',
                  isActive ? 'bg-blue-600/90 font-semibold text-white' : 'text-slate-400',
                ].join(' ')}
              >
                <Icon name={item.icon} className="h-[18px] w-[18px]" />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
