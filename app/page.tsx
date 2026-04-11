'use client'
import React from 'react'
import { useLanguage } from './context/LanguageContext'
import { useState } from 'react'
import TodayTab from './components/TodayTab'
import ScanTab from './components/ScanTab'
import RecipesTab from './components/RecipesTab'
import GuideTab from './components/GuideTab'
import ForYouTab from './components/ForYouTab'

const TABS = [
  { label: 'Today',   icon: '☀️' },
  { label: 'Scan',    icon: '📷' },
  { label: 'Recipes', icon: '🍽️' },
  { label: 'Guide',   icon: '📖' },
  { label: 'For You', icon: '✨' },
]

export default function Home() {
  const { language, toggleLanguage } = useLanguage()
  const [tab, setTab] = useState(0)
  const [dayIdx, setDayIdx] = useState(5)
  const [scannerOpen, setScannerOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#F4F6F8] flex justify-center">
      <div className="w-full max-w-sm flex flex-col h-screen">

        {/* Screen content */}
        <div className="flex-1 overflow-hidden">
          {tab === 0 && (
            <TodayTab
              dayIdx={dayIdx}
              setDayIdx={setDayIdx}
              onScanClick={() => setTab(1)}
            />
          )}
          {tab === 1 && (
            <ScanTab
              dayIdx={dayIdx}
              onScannerOpen={() => setScannerOpen(true)}
              onScannerClose={() => setScannerOpen(false)}
            />
          )}
          {tab === 2 && <RecipesTab dayIdx={dayIdx} />}
          {tab === 3 && <GuideTab />}
          {tab === 4 && <ForYouTab dayIdx={dayIdx} />}
        </div>

<div className={`bg-white border-t border-gray-100 flex shadow-lg ${scannerOpen ? 'hidden' : ''}`}>
  {TABS.map((t, i) => (
    <button
      key={i}
      onClick={() => setTab(i)}
      className="flex-1 flex flex-col items-center py-2 gap-1"
    >
      <span className="text-xl">{t.icon}</span>
      <span className={`text-[10px] font-bold ${tab === i ? 'text-[#3DBE7A]' : 'text-gray-300'}`}>
        {t.label}
      </span>
      {tab === i && <div className="w-4 h-0.5 rounded-full bg-[#3DBE7A]" />}
    </button>
  ))}
</div>
        

      </div>
    </main>
  )
}