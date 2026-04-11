'use client'

import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { useLanguage } from '../context/LanguageContext'

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
  const scannedRef = useRef(false)
  const controlsRef = useRef<{ stop: () => void } | null>(null)
  const torchRef = useRef(false)
  const streamRef = useRef<MediaStream | null>(null)
  const [result, setResult] = useState<ProductResult>(null)
  const [loading, setLoading] = useState(false)
  const [torchOn, setTorchOn] = useState(false)
  const { t, language } = useLanguage()

  const DAY_NAMES = [
    t.palmSunday, t.holyMonday, t.holyTuesday, t.holyWednesday,
    t.holyThursday, t.goodFriday, t.holySaturday,
  ]

  const DAYS_EN = ['Palm Sunday', 'Holy Monday', 'Holy Tuesday', 'Holy Wednesday', 'Holy Thursday', 'Good Friday', 'Holy Saturday']
  const dayIdx = DAYS_EN.indexOf(day.name)
  const displayDayName = dayIdx >= 0 ? DAY_NAMES[dayIdx] : day.name

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const reader = new BrowserMultiFormatReader()

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    }).then(stream => {
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    })

    reader.decodeFromVideoDevice(
      undefined,
      videoRef.current!,
      async (res) => {
        if (res && !scannedRef.current) {
          scannedRef.current = true
          setLoading(true)
          await lookupProduct(res.getText())
          setLoading(false)
        }
      }
    ).then((c) => {
      controlsRef.current = c
    }).catch(() => {})

    return () => {
      try { controlsRef.current?.stop() } catch {}
      try { streamRef.current?.getTracks().forEach(t => t.stop()) } catch {}
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
          name: language === 'gr' ? 'Προϊόν δεν βρέθηκε' : 'Product not found',
          brand: language === 'gr' ? 'Δεν υπάρχει στη βάση μας' : 'Not in our database',
          ok: false,
          issues: [language === 'gr' ? 'Αυτό το προϊόν δεν βρέθηκε. Δοκίμασε άλλο barcode.' : 'This product was not found. Try another barcode.'],
        })
        return
      }

      const p = data.product
      const name = p.product_name || (language === 'gr' ? 'Άγνωστο Προϊόν' : 'Unknown Product')
      const brand = p.brands || ''
      const ingredients = (p.ingredients_text || '').toLowerCase()

      const hasMeat  = /chicken|beef|pork|lamb|bacon|ham|turkey|meat/.test(ingredients)
      const hasDairy = /milk|cheese|butter|cream|yogurt|yoghurt|whey|lactose/.test(ingredients)
      const hasFish  = /fish|salmon|tuna|cod|prawn|shrimp|anchovy|seafood/.test(ingredients)
      const hasOil   = /vegetable oil|olive oil|sunflower oil|canola oil|palm oil/.test(ingredients)

      const issues: string[] = []
      const contains = language === 'gr' ? 'Περιέχει' : 'Contains'
      if (hasMeat)              issues.push(`${contains} ${t.meat} 🥩`)
      if (hasDairy)             issues.push(`${contains} ${t.dairy} 🧀`)
      if (hasFish && !day.fish) issues.push(`${contains} ${t.fish} 🐟`)
      if (hasOil  && !day.oil)  issues.push(`${contains} ${t.oil} 🫒`)

      setResult({ name, brand, ok: issues.length === 0, issues })
    } catch {
      setResult({
        name: language === 'gr' ? 'Σφάλμα' : 'Error',
        brand: '',
        ok: false,
        issues: [language === 'gr' ? 'Σφάλμα σύνδεσης. Έλεγξε το internet.' : 'Could not look up product. Check your connection.'],
      })
    }
  }

  function handleScanAgain() {
    setResult(null)
    setLoading(false)
    scannedRef.current = false
  }

  async function toggleTorch() {
    const stream = streamRef.current
    if (!stream) return
    const track = stream.getVideoTracks()[0]
    if (!track) return
    torchRef.current = !torchRef.current
    try {
      await (track as any).applyConstraints({
        advanced: [{ torch: torchRef.current }]
      })
      setTorchOn(torchRef.current)
    } catch {
      console.log('Torch not supported on this device')
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex flex-col">

      {/* Full screen camera */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-10 pb-4 bg-gradient-to-b from-black/60 to-transparent">
        <p className="text-white font-black text-lg">
          {language === 'gr' ? 'Σάρωση Barcode' : 'Scan Barcode'}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTorch}
            className={`text-sm font-bold px-3 py-1 rounded-full ${torchOn ? 'bg-yellow-400 text-black' : 'bg-white/20 text-white'}`}
          >
            {torchOn
              ? (language === 'gr' ? '🔦 Ανοιχτό' : '🔦 On')
              : (language === 'gr' ? '🔦 Κλειστό' : '🔦 Off')
            }
          </button>
          <button
            onClick={onClose}
            className="text-white text-sm font-bold bg-white/20 px-3 py-1 rounded-full"
          >
            {language === 'gr' ? 'Ακύρωση' : 'Cancel'}
          </button>
        </div>
      </div>

      {/* Viewfinder */}
      {!result && !loading && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="w-64 h-36 border-2 border-white/80 rounded-2xl" />
          <p className="text-white/70 text-sm mt-4">{t.pointAtBarcode}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="bg-black/50 rounded-2xl px-6 py-4 flex flex-col items-center gap-2">
            <p className="text-3xl">🔍</p>
            <p className="text-white font-bold">{t.lookingUp}</p>
          </div>
        </div>
      )}

      {/* Bottom sheet result */}
      {result && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl shadow-2xl">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>
          <div className="px-4 pb-8 pt-3">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${result.ok ? 'bg-[#F0FAF5]' : 'bg-red-50'}`}>
                {result.ok ? '✅' : '🚫'}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-semibold">{result.brand}</p>
                <p className="text-base font-black text-[#1A1A2E] leading-tight">{result.name}</p>
              </div>
            </div>

            <div className={`rounded-2xl px-4 py-3 mb-4 ${result.ok ? 'bg-[#F0FAF5]' : 'bg-red-50'}`}>
              <p className={`text-lg font-black ${result.ok ? 'text-[#3DBE7A]' : 'text-red-400'}`}>
                {result.ok ? t.youCanEatThis : t.avoidThisToday}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {language === 'gr' ? 'για' : 'on'} {displayDayName}
              </p>
            </div>

            {result.issues.length > 0 && (
              <div className="mb-4">
                {result.issues.map((issue, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
                    <p className="text-sm text-gray-500">{issue}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleScanAgain}
                className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-[#1A1A2E] font-black text-sm"
              >
                {t.scanAgain}
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-[#1A1A2E] text-white font-black text-sm"
              >
                {t.done}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}