'use client'

import { useState } from 'react'
import { DAYS } from '../data/days'
import { useLanguage } from '../context/LanguageContext'

export type Suggestion = { name: string; desc: string; emoji: string }

export default function ForYouTab({
  dayIdx,
  selected,
  setSelected,
  suggestions,
  setSuggestions,
}: {
  dayIdx: number
  selected: string[]
  setSelected: (s: string[]) => void
  suggestions: Suggestion[] | null
  setSuggestions: (s: Suggestion[] | null) => void
}) {
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()

  const day = DAYS[dayIdx]

  function togglePref(food: string) {
    setSelected(selected.includes(food) ? selected.filter(f => f !== food) : [...selected, food])
    setSuggestions(null)
  }

  async function getSuggestions() {
    if (selected.length === 0) return
    setLoading(true)
    setSuggestions(null)

    const rules = `No meat, no dairy, no eggs. Fish: ${day.fish ? 'allowed' : 'not allowed'}. Oil: ${day.oil ? 'allowed' : 'not allowed'}.`

    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day: day.name, rules, ingredients: selected }),
      })
      const data = await res.json()
      setSuggestions(data.suggestions)
    } catch {
      setSuggestions([{ name: 'Something went wrong', desc: 'Please try again.', emoji: '⚠️' }])
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col h-full">

      <div className="bg-white px-4 pt-6 pb-4 border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{t.personalisedFor}</p>
        <h2 className="text-2xl font-black text-[#1A1A2E]">{t.forYou}</h2>
        <p className="text-sm text-gray-400 mt-1">{t.pickIngredients}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">

        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.whatDoYouLike}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {t.foodPrefs.map(food => (
            <button
              key={food}
              onClick={() => togglePref(food)}
              className={`px-3 py-2 rounded-full text-xs font-bold border-2 transition-all ${
                selected.includes(food)
                  ? 'bg-[#1A1A2E] text-white border-[#1A1A2E]'
                  : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              {food}
            </button>
          ))}
        </div>

        {selected.length > 0 && (
          <button
            onClick={getSuggestions}
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-black text-base mb-4 transition-all ${
              loading ? 'bg-gray-300' : 'bg-[#3DBE7A] shadow-lg'
            }`}
          >
            {loading ? t.findingIdeas : t.suggestMeals}
          </button>
        )}

        {selected.length === 0 && (
          <div className="bg-gray-100 rounded-2xl p-6 text-center">
            <p className="text-3xl mb-2">👆</p>
            <p className="text-sm text-gray-400">{t.pickOne}</p>
          </div>
        )}

        {suggestions && !loading && (
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.yourSuggestions}</p>
            {suggestions.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex gap-3 items-start">
                <div className="w-12 h-12 rounded-xl bg-[#F0FAF5] flex items-center justify-center text-2xl flex-shrink-0">
                  {s.emoji}
                </div>
                <div>
                  <p className="text-sm font-black text-[#1A1A2E]">{s.name}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setSuggestions(null)}
              className="w-full py-3 rounded-xl border-2 border-[#3DBE7A] text-[#3DBE7A] font-black text-sm"
            >
              {t.tryDifferent}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}