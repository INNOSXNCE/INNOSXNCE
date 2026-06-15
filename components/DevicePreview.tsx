'use client'
import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { useLang } from '@/lib/lang-context'
import { COPY } from '@/lib/copy'

interface DevicePreviewProps {
  name: string
  artStyle: CSSProperties
}

export function DevicePreview({ name, artStyle }: DevicePreviewProps) {
  const { lang } = useLang()
  const notif = COPY[lang].deviceNotif
  const [clock, setClock] = useState('')
  const [clockDate, setClockDate] = useState('')

  useEffect(() => {
    const update = () => {
      const d = new Date()
      const p = (n: number) => String(n).padStart(2, '0')
      setClock(`${p(d.getHours())}:${p(d.getMinutes())}`)
      setClockDate(d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed"
      style={{
        right: 42,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        width: 228,
        height: 476,
        border: '9px solid #0a0a0a',
        borderRadius: 40,
        boxShadow: '0 30px 90px rgba(0,0,0,0.85), 0 0 0 1px #1d1d1d',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Wallpaper art */}
      <div style={{ ...artStyle, position: 'absolute', inset: 0 }} />

      {/* Dynamic island */}
      <div
        className="absolute"
        style={{
          top: 11,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 84,
          height: 22,
          background: '#000',
          borderRadius: 12,
          zIndex: 3,
        }}
      />

      {/* Clock */}
      <div className="absolute left-0 right-0 text-center" style={{ top: 62, zIndex: 2 }}>
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.82)' }}>
          {clockDate}
        </div>
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontWeight: 200, fontSize: 66, color: '#fff', lineHeight: 1, marginTop: 4 }}>
          {clock}
        </div>
      </div>

      {/* Wallpaper name */}
      <div
        className="absolute left-0 right-0 text-center"
        style={{
          top: '52%',
          fontFamily: 'var(--font-cinzel), serif',
          fontWeight: 700,
          fontSize: 24,
          color: 'rgba(255,255,255,0.92)',
          letterSpacing: '0.04em',
          zIndex: 2,
        }}
      >
        {name}
      </div>

      {/* Notification */}
      <div
        className="absolute left-[14px] right-[14px]"
        style={{
          bottom: 92,
          background: 'rgba(255,255,255,0.14)',
          backdropFilter: 'blur(10px)',
          borderRadius: 15,
          padding: '11px 13px',
          zIndex: 2,
        }}
      >
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)' }}>
          INNOSXNCE · {notif.time}
        </div>
        <div style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: 11, color: '#fff', marginTop: 3 }}>
          {notif.msg}
        </div>
      </div>

      {/* Home indicator */}
      <div
        className="absolute"
        style={{
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 92,
          height: 4,
          borderRadius: 2,
          background: 'rgba(255,255,255,0.6)',
          zIndex: 3,
        }}
      />
    </div>
  )
}
