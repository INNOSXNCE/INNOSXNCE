'use client'
import { useEffect, useState } from 'react'
import { BOOT } from '@/lib/data'

export function BootSequence() {
  const [booting, setBooting] = useState(false)
  const [step, setStep] = useState(0)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let booted = false
    try { booted = !!sessionStorage.getItem('innosxnce_booted') } catch {}
    if (booted || reduce) return

    const T = (ms: number, fn: () => void) => setTimeout(fn, ms)
    const timers = [
      T(0,    () => setBooting(true)),
      T(680,  () => setStep(1)),
      T(1360, () => setStep(2)),
      T(2040, () => { setFlash(true); setBooting(false) }),
      T(2200, () => setFlash(false)),
      T(2260, () => { try { sessionStorage.setItem('innosxnce_booted', '1') } catch {} }),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (!booting && !flash) return null

  return (
    <>
      {booting && (
        <div
          className="fixed inset-0 bg-black flex items-center justify-center"
          style={{ zIndex: 200 }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              fontWeight: 700,
              fontSize: 'clamp(40px, 8vw, 92px)',
              color: '#fff',
              letterSpacing: '0.08em',
            }}
          >
            {BOOT[step]}
          </div>
        </div>
      )}
      {flash && <div className="fixed inset-0 bg-white" style={{ zIndex: 210 }} />}
    </>
  )
}
