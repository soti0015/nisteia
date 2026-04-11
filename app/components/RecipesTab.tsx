'use client'

import { useState } from 'react'
import { DAYS } from '../data/days'

const RECIPES = [
  { name: 'Bean Soup', greek: 'Φασολάδα', emoji: '🫘', time: '45 min', diff: 'Easy', oilOk: true, fishOk: false, desc: 'The national fasting dish. Warm and filling.', steps: ['Boil white beans until soft or use canned.', 'Fry onion, carrot and celery in olive oil.', 'Add tomatoes and beans, simmer 20 min.', 'Season with salt, pepper and lemon.'] },
  { name: 'Lentil Soup', greek: 'Φακές', emoji: '🍲', time: '30 min', diff: 'Easy', oilOk: false, fishOk: false, desc: 'No oil needed. Perfect for strict fast days.', steps: ['Rinse lentils and boil in water.', 'Add onion, garlic, bay leaf and canned tomatoes.', 'Simmer 25 min until thick.', 'Add a splash of red wine vinegar at the end.'] },
  { name: 'Taramasalata', greek: 'Ταραμοσαλάτα', emoji: '🐟', time: '10 min', diff: 'Easy', oilOk: true, fishOk: true, desc: 'Fish roe dip. Palm Sunday only.', steps: ['Blend tarama with soaked white bread.', 'Slowly drizzle in olive oil while blending.', 'Add lemon juice and blend until creamy.', 'Serve with Lagana bread or pita.'] },
  { name: 'Sesame Bread', greek: 'Λαγάνα', emoji: '🍞', time: '2 hrs', diff: 'Medium', oilOk: true, fishOk: false, desc: 'Flat bread traditional for Palm Sunday.', steps: ['Mix flour, yeast, water, oil and salt into dough.', 'Let rise 1 hour.', 'Flatten onto tray and press sesame seeds on top.', 'Bake at 200°C for 25 min until golden.'] },
  { name: 'Spinach Rice', greek: 'Σπανακόριζο', emoji: '🌿', time: '30 min', diff: 'Easy', oilOk: true, fishOk: false, desc: 'Simple, nutritious and delicious with lemon.', steps: ['Sauté onion and spring onions in olive oil.', 'Add rice and stir for 1 min.', 'Add spinach, stock and dill.', 'Simmer covered 18 min then finish with lemon.'] },
  { name: 'Halva', greek: 'Χαλβάς', emoji: '🍮', time: '20 min', diff: 'Easy', oilOk: false, fishOk: false, desc: 'Sweet fasting dessert. No eggs or butter.', steps: ['Toast semolina in a dry pan until golden.', 'Boil water and sugar to make syrup.', 'Pour syrup into semolina carefully.', 'Stir fast, pour into mould, cool and serve with cinnamon.'] },
]

export default function RecipesTab({ dayIdx }: { dayIdx: number }) {
  const [openRecipe, setOpenRecipe] = useState<string | null>(null)
  const day = DAYS[dayIdx]

  const suitable = RECIPES.filter(r => (!r.fishOk || day.fish) && (!r.oilOk || day.oil))
  const other = RECIPES.filter(r => !suitable.includes(r))

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Fasting</p>
        <h2 className="text-2xl font-black text-[#1A1A2E]">Recipes</h2>
        <p className="text-sm text-gray-400 mt-1">Tap a recipe to see how to make it.</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">

        {/* Good for today */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[#3DBE7A]" />
          <p className="text-sm font-black text-[#1A1A2E]">Good for today</p>
        </div>

        {suitable.map((rec) => {
          const isOpen = openRecipe === rec.name
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
                  <p className="text-sm font-black text-[#1A1A2E]">{rec.name}</p>
                  <p className="text-xs text-gray-400 italic">{rec.greek} · {rec.time}</p>
                  <p className="text-xs text-gray-500 mt-1">{rec.desc}</p>
                </div>
                <span className="text-[#3DBE7A] text-base flex-shrink-0">{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-4 pb-4 pt-3 bg-gray-50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#3DBE7A] mb-3">How to make it</p>
                  {rec.steps.map((step, j) => (
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

        {/* Not available today */}
        {other.length > 0 && (
          <>
            <div className="flex items-center gap-2 mt-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-sm font-black text-[#1A1A2E]">Not available today</p>
            </div>
            {other.map((rec) => (
              <div key={rec.name} className="bg-white rounded-2xl shadow-sm overflow-hidden opacity-40">
                <div className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {rec.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-[#1A1A2E]">{rec.name}</p>
                    <p className="text-xs text-gray-400 italic">{rec.greek} · {rec.time}</p>
                    <p className="text-xs text-gray-500 mt-1">{rec.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}