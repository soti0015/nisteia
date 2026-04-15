'use client'

import { useEffect, useRef, useState } from 'react'
import Quagga from '@ericblade/quagga2'
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
  const scannerRef = useRef<HTMLDivElement>(null)
  const scannedRef = useRef(false)
  const torchRef = useRef(false)
  const streamRef = useRef<MediaStream | null>(null)
  const [result, setResult] = useState<ProductResult>(null)
  const [loading, setLoading] = useState(false)
  const [torchOn, setTorchOn] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [aiInput, setAiInput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
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
    if (!scannerRef.current) return

    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scannerRef.current,
        constraints: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      },
      locator: { patchSize: 'medium', halfSample: true },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
        readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader', 'code_128_reader'],
      },
      locate: true,
    }, (err) => {
      if (err) { console.error(err); return }
      Quagga.start()
      const video = scannerRef.current?.querySelector('video')
      if (video && video.srcObject) {
        streamRef.current = video.srcObject as MediaStream
      }
    })

    Quagga.onDetected(async (data) => {
      const code = data.codeResult.code
      if (!code || scannedRef.current) return
      const errors = data.codeResult.decodedCodes
        .filter(c => c.error !== undefined)
        .map(c => c.error as number)
      const avgError = errors.reduce((a, b) => a + b, 0) / errors.length
      if (avgError > 0.25) return
      scannedRef.current = true
      Quagga.stop()
      setLoading(true)
      await lookupProduct(code)
      setLoading(false)
    })

    return () => {
      try { Quagga.stop() } catch {}
    }
  }, [])

  async function lookupProduct(code: string) {
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      const data = await res.json()

      if (data.status === 0) {
        setNotFound(true)
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
        issues: [language === 'gr' ? 'Σφάλμα σύνδεσης.' : 'Could not look up product. Check your connection.'],
      })
    }
  }

  async function checkWithAI() {
    if (!aiInput.trim()) return
    setAiLoading(true)
    try {
      const res = await fetch('/api/checkproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: aiInput,
          day: day.name,
          fish: day.fish,
          oil: day.oil,
        }),
      })
      const data = await res.json()
      setResult({
        name: data.name || aiInput,
        brand: language === 'gr' ? '✨ Έλεγχος AI' : '✨ AI Check',
        ok: data.ok,
        issues: data.issues?.length > 0 ? data.issues : [data.reason],
      })
      setNotFound(false)
    } catch {
      setResult({
        name: aiInput,
        brand: '',
        ok: false,
        issues: [language === 'gr' ? 'Σφάλμα. Δοκίμασε ξανά.' : 'Something went wrong. Try again.'],
      })
    }
    setAiLoading(false)
  }

  function handleScanAgain() {
    setResult(null)
    setLoading(false)
    setNotFound(false)
    setAiInput('')
    scannedRef.current = false

    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scannerRef.current!,
        constraints: { facingMode: 'environment' },
      },
      decoder: {
        readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader', 'code_128_reader'],
      },
    }, (err) => {
      if (!err) Quagga.start()
    })

    Quagga.onDetected(async (data) => {
      const code = data.codeResult.code
      if (!code || scannedRef.current) return
      scannedRef.current = true
      Quagga.stop()
      setLoading(true)
      await lookupProduct(code)
      setLoading(false)
    })
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
      console.log('Torch not supported')
    }
  }

  return (
    <div className="fixed inset-0 z-[999] flex flex-col bg-black">

      {/* Camera feed */}
      <div ref={scannerRef} className="absolute inset-0" style={{ overflow: 'hidden' }} />

      <style>{`
        #interactive canvas, #interactive .drawingBuffer { display: none !important; }
        #interactive video { width: 100% !important; height: 100% !important; object-fit: cover; position: absolute; top: 0; left: 0; }
        @keyframes scanline {
          0%, 100% { top: 20%; opacity: 0.4; }
          50% { top: 80%; opacity: 1; }
        }
      `}</style>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-10 pb-4 bg-gradient-to-b from-black/70 to-transparent">
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
      {!result && !loading && !notFound && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="relative w-72 h-40">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#3DBE7A] rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#3DBE7A] rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#3DBE7A] rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#3DBE7A] rounded-br-lg" />
            <div
              className="absolute left-2 right-2 h-0.5 bg-[#3DBE7A] opacity-80"
              style={{ animation: 'scanline 2s ease-in-out infinite' }}
            />
          </div>
          <p className="text-white/70 text-sm mt-5">{t.pointAtBarcode}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
          <div className="bg-black/60 rounded-2xl px-8 py-5 flex flex-col items-center gap-3">
            <p className="text-3xl">🔍</p>
            <p className="text-white font-bold">{t.lookingUp}</p>
          </div>
        </div>
      )}

      {/* Not found — AI fallback bottom sheet */}
      {notFound && !loading && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl shadow-2xl">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>
          <div className="px-4 pb-8 pt-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl flex-shrink-0">
                🤔
              </div>
              <div>
                <p className="text-base font-black text-[#1A1A2E]">
                  {language === 'gr' ? 'Προϊόν δεν βρέθηκε' : 'Product not found'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {language === 'gr'
                    ? 'Πληκτρολόγησε το όνομα και το AI θα ελέγξει'
                    : 'Type the name and AI will check it for you'
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && checkWithAI()}
                placeholder={language === 'gr' ? 'π.χ. Γάλα Βρώμης Macro...' : 'e.g. Macro Oat Milk...'}
                className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-3 text-sm text-[#1A1A2E] outline-none focus:border-[#3DBE7A]"
                autoFocus
              />
              <button
                onClick={checkWithAI}
                disabled={aiLoading}
                className={`px-4 rounded-xl font-black text-sm text-white ${aiLoading ? 'bg-gray-300' : 'bg-[#3DBE7A]'}`}
              >
                {aiLoading ? '...' : (language === 'gr' ? 'Έλεγχος' : 'Check')}
              </button>
            </div>

            <button
              onClick={handleScanAgain}
              className="w-full py-3 rounded-2xl border-2 border-gray-200 text-gray-400 font-black text-sm"
            >
              {language === 'gr' ? 'Σάρωσε ξανά' : 'Scan Again'}
            </button>
          </div>
        </div>
      )}

      {/* Result bottom sheet */}
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