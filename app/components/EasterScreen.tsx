'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function EasterScreen({ onEnter }: { onEnter: () => void }) {
  const [show, setShow] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    setTimeout(() => setShow(true), 100)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F6F8] transition-opacity duration-700 ${show ? 'opacity-100' : 'opacity-0'}`}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flicker {
          0%, 100% { transform: translateX(-50%) scaleY(1); }
          25% { transform: translateX(-50%) scaleY(1.08) skewX(2deg); }
          75% { transform: translateX(-50%) scaleY(0.95) skewX(-2deg); }
        }
      `}</style>

      {/* Candle */}
      <div style={{ animation: 'fadeUp 1s ease 0.1s both' }} className="mb-6">
        <div className="relative mx-auto" style={{ width: '40px' }}>
          <div
            className="absolute bottom-full left-1/2 mb-1"
            style={{
              width: '16px',
              height: '26px',
              background: 'linear-gradient(to top, #FFD700, #FF8C00, #FF6B00)',
              borderRadius: '50% 50% 20% 20%',
              transform: 'translateX(-50%)',
              animation: 'flicker 1.8s ease-in-out infinite',
              boxShadow: '0 0 16px 6px rgba(255,200,0,0.3)',
            }}
          />
          <div
            className="mx-auto rounded-sm"
            style={{
              width: '18px',
              height: '70px',
              background: 'linear-gradient(to right, #e8e8d8, #fffff0, #e8e8d8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      </div>

      {/* Cross */}
      <p
        className="text-5xl mb-4"
        style={{ animation: 'fadeUp 1s ease 0.3s both' }}
      >
        ☦️
      </p>

      {/* Main message */}
      <div
        className="text-center px-8 mb-6"
        style={{ animation: 'fadeUp 1s ease 0.5s both' }}
      >
        <h1
          className="font-black text-[#1A1A2E] mb-1"
          style={{ fontSize: '32px' }}
        >
          Χριστός Ανέστη!
        </h1>
        <h2
          className="font-black text-[#3DBE7A] mb-5"
          style={{ fontSize: '20px' }}
        >
          Christ is Risen!
        </h2>

        <div className="bg-white rounded-2xl px-6 py-5 shadow-sm">
          <p className="text-[#1A1A2E] text-sm font-medium leading-relaxed mb-2">
            {language === 'gr'
              ? 'Η νηστεία τελείωσε. Η γιορτή αρχίζει.'
              : 'The fast is over. The feast begins.'
            }
          </p>
          <p className="text-gray-400 text-xs">
            {language === 'gr' ? 'Αληθώς Ανέστη! ☦️' : 'Truly He is Risen! ☦️'}
          </p>
        </div>
      </div>

      {/* Button */}
      <div style={{ animation: 'fadeUp 1s ease 0.7s both' }}>
        <button
          onClick={onEnter}
          className="bg-[#3DBE7A] text-white font-black text-base px-10 py-4 rounded-2xl shadow-lg"
          style={{ boxShadow: '0 6px 20px rgba(61,190,122,0.4)' }}
        >
          {language === 'gr' ? 'Μπες στην Εφαρμογή →' : 'Enter the App →'}
        </button>
      </div>

      {/* Bottom note */}
      <p
        className="text-gray-300 text-xs mt-8"
        style={{ animation: 'fadeUp 1s ease 0.9s both' }}
      >
        Νηστεία · Orthodox Fasting Guide
      </p>

    </div>
  )
}