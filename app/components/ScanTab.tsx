'use client'

import { useState, useCallback } from 'react'
import { DAYS } from '../data/days'
import BarcodeScanner from './BarcodeScanner'

const PRODUCTS: Record<string, { name: string; brand: string; emoji: string; meat: boolean; dairy: boolean; fish: boolean; oil: boolean }> = {
  'DEMO1': { name: 'Vetta Pasta', brand: 'Vetta', emoji: '🍝', meat: false, dairy: false, fish: false, oil: false },
  'DEMO2': { name: 'Chicken Stock Cubes', brand: 'Maggi', emoji: '🍗', meat: true, dairy: false, fish: false, oil: false },
  '9310036009101': { name: 'Heinz Baked Beans', brand: 'Heinz', emoji: '🫘', meat: false, dairy: false, fish: false, oil: false },
  '9310072003698': { name: 'Sao Crackers', brand: "Arnott's", emoji: '🍘', meat: false, dairy: false, fish: false, oil: true },
  '5010477348478': { name: 'Dairy Milk', brand: 'Cadbury', emoji: '🍫', meat: false, dairy: true, fish: false, oil: false },
}

export default function ScanTab({ dayIdx }: { dayIdx: number }) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<null | { name: string; brand: string; emoji: string; ok: boolean; issues: string[]; pct: number }>(null)
  const [error, setError] = useState('')
  const [showScanner, setShowScanner] = useState(false)

  const day = DAYS[dayIdx]

  function checkProduct(code?: string) {
    const value = code || input
    setError('')
    setResult(null)
    const key = value.trim().toUpperCase()
    const product = PRODUCTS[key] || PRODUCTS[value.trim()]
    if (!key) { setError('Enter a barcode to check.'); return }
    if (!product) { setError('Product not found. Try DEMO1, DEMO2 or 9310036009101'); return }

    const issues: string[] = []
    if (product.meat) issues.push('Contains meat 🥩')
    if (product.dairy) issues.push('Contains dairy 🧀')
    if (product.fish && !day.fish) issues.push('Contains fish 🐟')
    if (product.oil && !day.oil) issues.push('Contains oil 🫒')

    const pct = Math.round(((4 - issues.length) / 4) * 100)
    setResult({ ...product, issues, pct, ok: issues.length === 0 })
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
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Checking for</p>
        <h2 className="text-2xl font-black text-[#1A1A2E]">{day.name}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

        {/* Camera button + input */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <button
            onClick={() => setShowScanner(true)}
            className="w-full bg-[#1A1A2E] text-white font-black text-base py-4 rounded-xl mb-3"
          >
            📷 Open Camera Scanner
          </button>
          <p className="text-xs text-gray-400 text-center mb-3">or type a barcode below</p>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && checkProduct()}
              placeholder="DEMO1, DEMO2, or barcode..."
              className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm text-[#1A1A2E] outline-none focus:border-[#3DBE7A]"
            />
            <button
              onClick={() => checkProduct()}
              className="bg-[#3DBE7A] text-white font-black text-sm px-4 rounded-xl"
            >
              Check
            </button>
          </div>
        </div>

        {/* Example products */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Try these</p>
        {Object.entries(PRODUCTS).slice(0, 4).map(([code, p]) => (
          <button
            key={code}
            onClick={() => { setInput(code); setResult(null); setError('') }}
            className="w-full bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3 text-left"
          >
            <span className="text-2xl">{p.emoji}</span>
            <div>
              <p className="text-sm font-bold text-[#1A1A2E]">{p.name}</p>
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
                  {result.ok ? 'You can eat this!' : 'Avoid this today'}
                </p>
              </div>
              {result.issues.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Why not?</p>
                  {result.issues.map((issue, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <p className="text-sm font-semibold text-gray-600">{issue}</p>
                      <p className="text-xs font-bold text-red-400">Not today</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Scanner overlay */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}

    </div>
  )
}