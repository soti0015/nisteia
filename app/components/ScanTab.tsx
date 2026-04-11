'use client'

import { useState, useCallback } from 'react'
import { DAYS } from '../data/days'
import { useLanguage } from '../context/LanguageContext'
import BarcodeScanner from './BarcodeScanner'

const PRODUCTS: Record<string, { name: string; brand: string; emoji: string; meat: boolean; dairy: boolean; fish: boolean; oil: boolean }> = {
  '9310036009101': { name: 'Heinz Baked Beans', brand: 'Heinz', emoji: '🫘', meat: false, dairy: false, fish: false, oil: false },
  '9300675033019': { name: 'Weet-Bix', brand: 'Sanitarium', emoji: '🌾', meat: false, dairy: false, fish: false, oil: false },
  '9310587002271': { name: 'Vegemite', brand: 'Bega', emoji: '🫙', meat: false, dairy: false, fish: false, oil: false },
  '9310017009009': { name: 'Tip Top White Bread', brand: 'Tip Top', emoji: '🍞', meat: false, dairy: false, fish: false, oil: true },
  '9310023007553': { name: 'Milo', brand: 'Nestlé', emoji: '🥛', meat: false, dairy: true, fish: false, oil: false },
  '9310164007957': { name: 'Uncle Tobys Oats', brand: 'Uncle Tobys', emoji: '🌾', meat: false, dairy: false, fish: false, oil: false },
  '9310076007558': { name: 'SPC Tomato Soup', brand: 'SPC', emoji: '🍅', meat: false, dairy: false, fish: false, oil: false },
  '9310539000016': { name: 'Sanitarium Peanut Butter', brand: 'Sanitarium', emoji: '🥜', meat: false, dairy: false, fish: false, oil: true },
  '9310397000043': { name: 'Praise Olive Oil', brand: 'Praise', emoji: '🫒', meat: false, dairy: false, fish: false, oil: true },
  '9310076200013': { name: 'SPC Chickpeas', brand: 'SPC', emoji: '🫘', meat: false, dairy: false, fish: false, oil: false },
  '9310076200020': { name: 'SPC Lentils', brand: 'SPC', emoji: '🍲', meat: false, dairy: false, fish: false, oil: false },
  '9310023015015': { name: 'Nescafe Blend 43', brand: 'Nestlé', emoji: '☕', meat: false, dairy: false, fish: false, oil: false },
  '9300616012042': { name: 'Arnott\'s Vita-Weat', brand: 'Arnott\'s', emoji: '🍘', meat: false, dairy: false, fish: false, oil: true },
  '9310055002012': { name: 'Berri Orange Juice', brand: 'Berri', emoji: '🍊', meat: false, dairy: false, fish: false, oil: false },
  '9310076007480': { name: 'SPC Four Bean Mix', brand: 'SPC', emoji: '🫘', meat: false, dairy: false, fish: false, oil: false },
}

const PRODUCTS_GR: Record<string, string> = {
  '9310036009101': 'Φασόλια Heinz',
  '9300675033019': 'Weet-Bix Sanitarium',
  '9310587002271': 'Vegemite',
  '9310017009009': 'Λευκό Ψωμί Tip Top',
  '9310023007553': 'Milo Nestlé',
  '9310164007957': 'Βρώμη Uncle Tobys',
  '9310076007558': 'Σούπα Ντομάτας SPC',
  '9310539000016': 'Φυστικοβούτυρο Sanitarium',
  '9310397000043': 'Ελαιόλαδο Praise',
  '9310076200013': 'Ρεβύθια SPC',
  '9310076200020': 'Φακές SPC',
  '9310023015015': 'Καφές Nescafe',
  '9300616012042': 'Κράκερ Vita-Weat',
  '9310055002012': 'Χυμός Πορτοκαλιού Berri',
  '9310076007480': 'Τέσσερα Είδη Φασολιών SPC',
}

export default function ScanTab({ dayIdx, onScannerOpen, onScannerClose }: {
  dayIdx: number
  onScannerOpen: () => void
  onScannerClose: () => void
}) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<null | { name: string; brand: string; emoji: string; ok: boolean; issues: string[]; pct: number }>(null)
  const [error, setError] = useState('')
  const [showScanner, setShowScanner] = useState(false)
  const { t, language } = useLanguage()

  const day = DAYS[dayIdx]
  const DAY_NAMES = [
    t.palmSunday, t.holyMonday, t.holyTuesday, t.holyWednesday,
    t.holyThursday, t.goodFriday, t.holySaturday,
  ]

  async function checkProduct(code?: string) {
    const value = code || input
    setError('')
    setResult(null)

    if (!value.trim()) { setError(language === 'gr' ? 'Εισάγετε barcode.' : 'Enter a barcode to check.'); return }

    const key = value.trim().toUpperCase()
    const local = PRODUCTS[key] || PRODUCTS[value.trim()]

    if (local) {
      const issues: string[] = []
      if (local.meat) issues.push(language === 'gr' ? `Περιέχει ${t.meat} 🥩` : `Contains ${t.meat} 🥩`)
      if (local.dairy) issues.push(language === 'gr' ? `Περιέχει ${t.dairy} 🧀` : `Contains ${t.dairy} 🧀`)
      if (local.fish && !day.fish) issues.push(language === 'gr' ? `Περιέχει ${t.fish} 🐟` : `Contains ${t.fish} 🐟`)
      if (local.oil && !day.oil) issues.push(language === 'gr' ? `Περιέχει ${t.oil} 🫒` : `Contains ${t.oil} 🫒`)
      const pct = Math.round(((4 - issues.length) / 4) * 100)
      const displayName = language === 'gr' ? (PRODUCTS_GR[key] || local.name) : local.name
      setResult({ ...local, name: displayName, issues, pct, ok: issues.length === 0 })
      return
    }

    try {
      setError(t.lookingUp)
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${value.trim()}.json`)
      const data = await res.json()

      if (data.status === 0) {
        setError(language === 'gr' ? 'Προϊόν δεν βρέθηκε. Δοκίμασε άλλο barcode.' : 'Product not found. Try scanning another barcode.')
        return
      }

      const product = data.product
      const name = product.product_name || (language === 'gr' ? 'Άγνωστο Προϊόν' : 'Unknown Product')
      const brand = product.brands || (language === 'gr' ? 'Άγνωστη Μάρκα' : 'Unknown Brand')
      const ingredients = (product.ingredients_text || '').toLowerCase()

      const meat = /chicken|beef|pork|lamb|meat|bacon|ham|turkey/.test(ingredients)
      const dairy = /milk|cheese|butter|cream|yogurt|yoghurt|whey|lactose|casein/.test(ingredients)
      const fish = /fish|salmon|tuna|cod|prawn|shrimp|anchovy|seafood/.test(ingredients)
      const oil = /vegetable oil|olive oil|sunflower oil|canola oil|palm oil/.test(ingredients)

      const issues: string[] = []
      if (meat && !fish) issues.push(language === 'gr' ? `Περιέχει ${t.meat} 🥩` : `Contains ${t.meat} 🥩`)
      if (dairy) issues.push(language === 'gr' ? `Περιέχει ${t.dairy} 🧀` : `Contains ${t.dairy} 🧀`)
      if (fish && !day.fish) issues.push(language === 'gr' ? `Περιέχει ${t.fish} 🐟` : `Contains ${t.fish} 🐟`)
      if (oil && !day.oil) issues.push(language === 'gr' ? `Περιέχει ${t.oil} 🫒` : `Contains ${t.oil} 🫒`)

      const pct = Math.round(((4 - issues.length) / 4) * 100)
      setError('')
      setResult({ name, brand, emoji: '🛒', issues, pct, ok: issues.length === 0 })

    } catch {
      setError(language === 'gr' ? 'Σφάλμα σύνδεσης. Έλεγξε το internet.' : 'Could not look up product. Check your connection.')
    }
  }

  const handleScan = useCallback((code: string) => {
    setInput(code)
    setShowScanner(false)
    setTimeout(() => checkProduct(code), 300)
  }, [day])

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{t.checkingFor}</p>
        <h2 className="text-2xl font-black text-[#1A1A2E]">{DAY_NAMES[dayIdx]}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

        {/* Camera button */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <button
            onClick={() => { setShowScanner(true); onScannerOpen() }}
            className="w-full bg-[#1A1A2E] text-white font-black text-lg py-5 rounded-xl"
          >
            {t.openCameraScanner}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            {t.pointAtBarcode}
          </p>
        </div>

        {/* Example products */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.tryThese}</p>
        {Object.entries(PRODUCTS).slice(0, 4).map(([code, p]) => (
          <button
            key={code}
            onClick={() => { setInput(code); setResult(null); setError('') }}
            className="w-full bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3 text-left"
          >
            <span className="text-2xl">{p.emoji}</span>
            <div>
              <p className="text-sm font-bold text-[#1A1A2E]">
                {language === 'gr' ? (PRODUCTS_GR[code] || p.name) : p.name}
              </p>
              <p className="text-xs text-gray-400">{p.brand} · {code}</p>
            </div>
          </button>
        ))}

        {/* Error */}
        {error && (
          <div className="bg-red-50 rounded-xl p-3 text-sm text-red-400 font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className={`h-2 ${result.ok ? 'bg-[#3DBE7A]' : 'bg-red-400'}`} />
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {result.emoji}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">{result.brand}</p>
                  <p className="text-base font-black text-[#1A1A2E]">{result.name}</p>
                </div>
              </div>
              <div className={`rounded-xl p-4 text-center mb-3 ${result.ok ? 'bg-[#F0FAF5]' : 'bg-red-50'}`}>
                <p className="text-4xl mb-2">{result.ok ? '✅' : '🚫'}</p>
                <p className={`text-lg font-black ${result.ok ? 'text-[#3DBE7A]' : 'text-red-400'}`}>
                  {result.ok ? t.youCanEatThis : t.avoidThisToday}
                </p>
              </div>
              {result.issues.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t.whyNot}</p>
                  {result.issues.map((issue, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <p className="text-sm font-semibold text-gray-600">{issue}</p>
                      <p className="text-xs font-bold text-red-400">{t.notToday}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showScanner && (
        <BarcodeScanner
          day={day}
          onClose={() => { setShowScanner(false); onScannerClose() }}
        />
      )}

    </div>
  )
}