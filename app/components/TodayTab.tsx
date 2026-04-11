'use client'

import { useState } from 'react'
import { DAYS } from '../data/days'
import { useLanguage } from '../context/LanguageContext'

export default function TodayTab({
  dayIdx,
  setDayIdx,
  onScanClick,
  onRecipesClick,
}: {
  dayIdx: number
  setDayIdx: (i: number) => void
  onScanClick: () => void
  onRecipesClick: () => void
}) {
  const [storyOpen, setStoryOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const day = DAYS[dayIdx]

  const DAY_NAMES = [
    t.palmSunday,
    t.holyMonday,
    t.holyTuesday,
    t.holyWednesday,
    t.holyThursday,
    t.goodFriday,
    t.holySaturday,
  ]

  const rules = [
    { label: t.meat,  icon: '🥩', ok: false },
    { label: t.dairy, icon: '🧀', ok: false },
    { label: t.fish,  icon: '🐟', ok: day.fish },
    { label: t.oil,   icon: '🫒', ok: day.oil },
    { label: t.wine,  icon: '🍷', ok: day.wine },
  ]

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-0 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.greekOrthodox}</p>
            <h1 className="text-2xl font-black text-[#1A1A2E]">Νηστεία <span className="text-[#3DBE7A]">☦</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-2 rounded-xl"
            >
              {language === 'en' ? '🇬🇷 GR' : '🇦🇺 EN'}
            </button>
            <button
              onClick={onScanClick}
              className="bg-[#3DBE7A] text-white text-sm font-bold px-4 py-2 rounded-xl"
            >
              📷 Scan
            </button>
          </div>
        </div>

        {/* Day strip */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => { setDayIdx(i); setStoryOpen(false) }}
              className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all ${
                dayIdx === i
                  ? 'bg-[#1A1A2E] text-white border-[#1A1A2E]'
                  : 'bg-white text-gray-400 border-gray-200'
              }`}
            >
              {d.icon} {DAY_NAMES[i]}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

        {/* Day card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
              {day.icon}
            </div>
            <div>
              <h2 className="text-lg font-black text-[#1A1A2E]">{DAY_NAMES[dayIdx]}</h2>
              <p className="text-xs text-gray-400">{day.date}</p>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-[#F0FAF5] rounded-xl px-3 py-2 mb-3">
            <p className="text-sm text-[#2D7A55] font-medium leading-relaxed">💬 {t.days[dayIdx].tip}</p>
          </div>

          {/* Rules grid */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t.today}</p>
          <div className="flex gap-2">
            {rules.map((rule) => (
              <div
                key={rule.label}
                className={`flex-1 rounded-xl py-2 text-center ${rule.ok ? 'bg-[#F0FAF5]' : 'bg-red-50'}`}
              >
                <p className="text-xl">{rule.icon}</p>
                <p className="text-[10px] text-gray-400 font-semibold mt-1">{rule.label}</p>
                <p className={`text-xs font-black mt-0.5 ${rule.ok ? 'text-[#3DBE7A]' : 'text-red-400'}`}>
                  {rule.ok ? t.ok : t.no}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Story card */}
        <div
          className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer"
          onClick={() => setStoryOpen(!storyOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl flex-shrink-0">
              📜
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">{t.storyBehindToday}</p>
                <p className="text-sm font-bold text-[#1A1A2E]">{t.days[dayIdx].storyTitle}</p>
            </div>
            <span className="text-amber-400 text-lg">{storyOpen ? '▲' : '▼'}</span>
          </div>
          {storyOpen && (
            <div className="mt-3 pt-3 border-t border-gray-100">
             <p className="text-sm text-gray-500 leading-relaxed">{t.days[dayIdx].story}</p>
            </div>
          )}
        </div>

        {/* Scan CTA */}
        <button
          onClick={onScanClick}
          className="w-full bg-[#3DBE7A] text-white font-black text-base py-4 rounded-2xl shadow-lg"
        >
          {t.scanAProduct}
        </button>

        {/* Recipe shortcut */}
        <div
          onClick={onRecipesClick}
          className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 cursor-pointer"
        >
          <div className="text-3xl">🍽️</div>
          <div className="flex-1">
            <p className="text-sm font-black text-[#1A1A2E]">{t.whatShouldICook}</p>
            <p className="text-xs text-gray-400">{t.fastingRecipesToday}</p>
          </div>
          <span className="text-[#3DBE7A] text-lg">→</span>
        </div>

      </div>
    </div>
  )
}