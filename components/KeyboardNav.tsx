'use client'
import { useEffect } from 'react'
import { usePageFlash } from '@/lib/page-flash-context'

const KEY_MAP: Record<string, string> = {
  '1': '/',
  '2': '/manifesto',
  '3': '/wallpapers',
  '4': '/tutorials',
  '5': '/community',
  '6': '/journal',
}

export function KeyboardNav() {
  const { startFlash } = usePageFlash()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const href = KEY_MAP[e.key]
      if (href && !e.metaKey && !e.ctrlKey && !e.altKey) startFlash(href)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [startFlash])

  return null
}
