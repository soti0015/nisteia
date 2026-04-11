'use client'

import { useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

export default function BarcodeScanner({
  onScan,
  onClose,
}: {
  onScan: (code: string) => void
  onClose: () => void
}) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const isRunning = useRef(false)

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 220, height: 220 } },
      (decodedText) => {
        if (isRunning.current) {
          isRunning.current = false
          scanner.stop().catch(() => {})
          onScan(decodedText)
        }
      },
      () => {}
    ).then(() => {
      isRunning.current = true
    }).catch(() => {
      console.error('Camera failed to start')
    })

    return () => {
      if (isRunning.current) {
        isRunning.current = false
        scanner.stop().catch(() => {})
      }
    }
  }, [onScan])

  function handleCancel() {
    if (isRunning.current) {
      isRunning.current = false
      scannerRef.current?.stop().catch(() => {})
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between px-4 py-4">
        <p className="text-white font-black text-lg">Scan Barcode</p>
        <button
          onClick={handleCancel}
          className="text-white text-sm font-bold bg-white/20 px-3 py-1 rounded-full"
        >
          Cancel
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div id="qr-reader" className="w-full max-w-xs rounded-2xl overflow-hidden" />
        <p className="text-white/60 text-sm mt-6 text-center">
          Point the camera at a product barcode
        </p>
      </div>
    </div>
  )
}