'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function EasterScreen({ onEnter }: { onEnter: () => void }) {
  const [show, setShow] = useState(false)
  const { language } = useLanguage()
  const [showEaster, setShowEaster] = useState(isEasterSunday())

  useEffect(() => {
    setTimeout(() => setShow(true), 100)
  }, [])

  function isEasterSunday(): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const easter = new Date('2025-04-20')
  easter.setHours(0, 0, 0, 0)
  return today.getTime() === easter.getTime()
}

if (showEaster) {
  return <EasterScreen onEnter={() => setShowEaster(false)} />
}
  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)' }}
    >
      {/* Candle glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)', animation: 'pulse 3s ease-in-out infinite' }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.25; }
        }
        @keyframes flicker {
          0%, 100% { transform: translateX(-50%) scaleY(1); }
          25% { transform: translateX(-50%) scaleY(1.05) skewX(2deg); }
          75% { transform: translateX(-50%) scaleY(0.95) skewX(-2deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Candle */}
      <div className="relative mb-8" style={{ animation: 'fadeUp 1.5s ease forwards' }}>
        <div className="relative mx-auto" style={{ width: '40px' }}>
          {/* Flame */}
          <div className="absolute bottom-full left-1/2 mb-1"
            style={{
              width: '16px', height: '28px',
              background: 'linear-gradient(to top, #FFD700, #FF8C00, #FF4500)',
              borderRadius: '50% 50% 20% 20%',
              transform: 'translateX(-50%)',
              animation: 'flicker 1.5s ease-in-out infinite',
              boxShadow: '0 0 20px 8px rgba(255, 200, 0, 0.4)',
            }}
          />
          {/* Candle body */}
          <div className="mx-auto rounded-sm"
            style={{ width: '20px', height: '80px', background: 'linear-gradient(to right, #f5f5dc, #fffde7, #f5f5dc)' }}
          />
        </div>
      </div>

      {/* Cross */}
      <p className="text-5xl mb-6" style={{ animation: 'fadeUp 1.5s ease 0.3s both' }}>☦️</p>

      {/* Main message */}
      <div className="text-center px-8" style={{ animation: 'fadeUp 1.5s ease 0.6s both' }}>
        <h1 className="font-black text-white mb-2" style={{ fontSize: '36px', textShadow: '0 0 30px rgba(255,215,0,0.5)' }}>
          Χριστός Ανέστη!
        </h1>
        <h2 className="font-black mb-6" style={{ fontSize: '24px', color: '#FFD700' }}>
          Christ is Risen!
        </h2>
        <p className="text-white/70 text-base leading-relaxed mb-2">
          {language === 'gr'
            ? 'Η νηστεία τελείωσε. Η γιορτή αρχίζει.'
            : 'The fast is over. The feast begins.'
          }
        </p>
        <p className="text-white/50 text-sm">
          {language === 'gr'
            ? 'Αληθώς Ανέστη! ☦️'
            : 'Truly He is Risen! ☦️'
          }
        </p>
      </div>

      {/* Divider */}
      <div className="w-24 h-px bg-white/20 my-8" style={{ animation: 'fadeUp 1.5s ease 0.9s both' }} />

      {/* Enter button */}
      <div style={{ animation: 'fadeUp 1.5s ease 1.2s both' }}>
        <button
          onClick={onEnter}
          className="px-8 py-4 rounded-2xl font-black text-base"
          style={{ background: '#FFD700', color: '#1A1A2E' }}
        >
          {language === 'gr' ? 'Μπες στην Εφαρμογή →' : 'Enter the App →'}
        </button>
      </div>

      {/* Bottom note */}
      <p className="text-white/30 text-xs mt-8 text-center px-8" style={{ animation: 'fadeUp 1.5s ease 1.5s both' }}>
        {language === 'gr'
          ? 'Νηστεία · Ορθόδοξος Οδηγός'
          : 'Νηστεία · Orthodox Fasting Guide'
        }
      </p>

    </div>
  )
}