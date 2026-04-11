'use client'

import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/browser'

type ProductResult = {
  name: string
  brand: string
  ok: boolean
  issues: string[]
} | null

export default function BarcodeScanner({
  onClose,
  day,
}: {
  onClose: () => void
  day: { name: string; fish: boolean; oil: boolean; wine: boolean }
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const readerRef = useRef<BrowserMultiFormatReader | null>(null)
  const [result, setResult] = useState<ProductResult>(null)
  const [loading, setLoading] = useState(false)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const reader = new BrowserMultiFormatReader()
    readerRef.current = reader

    reader.decodeFromVideoDevice(
      undefined,
      videoRef.current!,
      async (res, err) => {
        if (res && !scanned) {
          setScanned(true)
          setLoading(true)
          const code = res.getText()
          await lookupProduct(code)
          setLoading(false)
        }
      }
    )

    return () => {
      reader.reset()
    }
  }, [])

  async function lookupProduct(code: string) {
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${code}.json`
      )
      const data = await res.json()

      if (data.status === 0) {
        setResult({
          name: 'Product not found',
          brand: 'Not in database',
          ok: false,
          issues: ['This product is not in the Open Food Facts database yet.'],
        })
        return
      }

      const product = data.product
      const name = product.product_name || 'Unknown Product'
      const brand = product.brands || 'Unknown Brand'
      const ingredients = (product.ingredients_text || '').toLowerCase()

      const hasMeat = /chicken|beef|pork|lamb|bacon|ham|turkey|meat/.test(ingredients)
      const hasDairy = /milk|cheese|butter|cream|yogurt|yoghurt|whey|lactose/.test(ingredients)
      const hasFish = /fish|salmon|tuna|cod|prawn|shrimp|anchovy|seafood/.test(ingredients)
      const hasOil = /vegetable oil|olive oil|sunflower oil|canola oil|palm oil/.test(ingredients)

      const issues: string[] = []
      if (hasMeat) issues.push('Contains meat 🥩')
      if (hasDairy) issues.push('Contains dairy 🧀')
      if (hasFish && !day.fish) issues.push('Contains fish 🐟')
      if (hasOil && !day.oil) issues.push('Contains oil 🫒')

      setResult({ name, brand, ok: issues.length === 0, issues })

    } catch {
      setResult({
        name: 'Error',
        brand: '',
        ok: false,
        issues: ['Could not look up product. Check your connection.'],
      })
    }
  }

  function handleScanAgain() {
    setResult(null)
    setLoading(false)
    setScanned(false)
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 z-10">
        <p className="text-white font-black text-lg">Scan Barcode</p>
        <button
          onClick={onClose}
          className="text-white text-sm font-bold bg-white/20 px-3 py-1 rounded-full"
        >
          Cancel
        </button>
      </div>

      {/* Camera */}
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
        />

        {/* Viewfinder overlay */}
        {!result && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-64 h-40 border-2 border-white rounded-2xl" />
            <p className="text-white/70 text-sm mt-4">
              Point at a barcode
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-white font-bold text-lg">Looking up product...</p>
          </div>
        )}

        {/* Result overlay */}
        {result && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-end justify-end p-4">
            <div className="w-full bg-white rounded-2xl overflow-hidden">
              <div className={`h-2 ${result.ok ? 'bg-[#3DBE7A]' : 'bg-red-400'}`} />
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-400">{result.brand}</p>
                    <p className="text-base font-black text-[#1A1A2E]">{result.name}</p>
                  </div>
                </div>

                <div className={`rounded-xl p-3 text-center mb-3 ${result.ok ? 'bg-[#F0FAF5]' : 'bg-red-50'}`}>
                  <p className="text-3xl mb-1">{result.ok ? '✅' : '🚫'}</p>
                  <p className={`text-base font-black ${result.ok ? 'text-[#3DBE7A]' : 'text-red-400'}`}>
                    {result.ok ? 'You can eat this!' : 'Avoid this today'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">on {day.name}</p>
                </div>

                {result.issues.length > 0 && (
                  <div className="mb-3">
                    {result.issues.map((issue, i) => (
                      <p key={i} className="text-sm text-gray-500 py-1 border-b border-gray-100 last:border-0">
                        {issue}
                      </p>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleScanAgain}
                    className="flex-1 py-3 rounded-xl border-2 border-[#1A1A2E] text-[#1A1A2E] font-black text-sm"
                  >
                    Scan Again
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl bg-[#1A1A2E] text-white font-black text-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}