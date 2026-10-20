'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Mirrors the header nav order, so the number keys match what is on screen.
const KEY_MAP: Record<string, string> = {
  '1': '/',
  '2': '/wallpapers',
  '3': '/tutorials',
  '4': '/community',
  // '5': '/innoproductions', — hidden while nav entry is commented out in Header.
}

export function KeyboardNav() {
  const router = useRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const href = KEY_MAP[e.key]
      if (!href || e.metaKey || e.ctrlKey || e.altKey) return
      // A digit typed into a field (the brief form's video count, say) is
      // input, not a request to leave the page.
      const target = e.target as HTMLElement | null
      if (target?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? '')) return
      router.push(href)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [router])

  return null
}
