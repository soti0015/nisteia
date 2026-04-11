'use client'

import { useState } from 'react'
import { DAYS } from '../data/days'
import { useLanguage } from '../context/LanguageContext'

const RECIPES = [
  { name: 'Bean Soup', greek: 'Φασολάδα', emoji: '🫘', time: '45 min', oilOk: true, fishOk: false },
  { name: 'Lentil Soup', greek: 'Φακές', emoji: '🍲', time: '30 min', oilOk: false, fishOk: false },
  { name: 'Taramasalata', greek: 'Ταραμοσαλάτα', emoji: '🐟', time: '10 min', oilOk: true, fishOk: true },
  { name: 'Sesame Bread', greek: 'Λαγάνα', emoji: '🍞', time: '2 hrs', oilOk: true, fishOk: false },
  { name: 'Spinach Rice', greek: 'Σπανακόριζο', emoji: '🌿', time: '30 min', oilOk: true, fishOk: false },
  { name: 'Halva', greek: 'Χαλβάς', emoji: '🍮', time: '20 min', oilOk: false, fishOk: false },
]

export default function RecipesTab({ dayIdx }: { dayIdx: number }) {
  const [openRecipe, setOpenRecipe] = useState<string | null>(null)
  const day = DAYS[dayIdx]
  const { t } = useLanguage()

  const suitable = RECIPES.filter(r => (!r.fishOk || day.fish) && (!r.oilOk || day.oil))
  const other = RECIPES.filter(r => !suitable.includes(r))

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{t.fasting}</p>
        <h2 className="text-2xl font-black text-[#1A1A2E]">{t.recipes}</h2>
        <p className="text-sm text-gray-400 mt-1">{t.tapToExpand}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">

        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[#3DBE7A]" />
          <p className="text-sm font-black text-[#1A1A2E]">{t.goodForToday}</p>
        </div>

        {suitable.map((rec) => {
          const isOpen = openRecipe === rec.name
          const translation = t.recipeList[RECIPES.indexOf(rec)]
          return (
            <div key={rec.name} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenRecipe(isOpen ? null : rec.name)}
                className="w-full p-4 flex items-center gap-3 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F0FAF5] flex items-center justify-center text-2xl flex-shrink-0">
                  {rec.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-[#1A1A2E]">{translation.name}</p>
                  <p className="text-xs text-gray-400 italic">{rec.greek} · {rec.time}</p>
                  <p className="text-xs text-gray-500 mt-1">{translation.desc}</p>
                </div>
                <span className="text-[#3DBE7A] text-base flex-shrink-0">{isOpen ? '▲' : '▼'}</span>
              </button>
              {isOpen && (
                <div className="border-t border-gray-100 px-4 pb-4 pt-3 bg-gray-50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#3DBE7A] mb-3">{t.howToMakeIt}</p>
                  {translation.steps.map((step, j) => (
                    <div key={j} className="flex gap-3 mb-3">
                      <div className="w-6 h-6 rounded-full bg-[#3DBE7A] text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                        {j + 1}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {other.length > 0 && (
          <>
            <div className="flex items-center gap-2 mt-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-sm font-black text-[#1A1A2E]">{t.notAvailableToday}</p>
            </div>
            {other.map((rec) => {
              const translation = t.recipeList[RECIPES.indexOf(rec)]
              return (
                <div key={rec.name} className="bg-white rounded-2xl shadow-sm overflow-hidden opacity-40">
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                      {rec.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-[#1A1A2E]">{translation.name}</p>
                      <p className="text-xs text-gray-400 italic">{rec.greek} · {rec.time}</p>
                      <p className="text-xs text-gray-500 mt-1">{translation.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}