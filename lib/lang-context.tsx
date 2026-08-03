'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Lang } from './types'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue>({ lang: 'id', setLang: () => {} })

const STORAGE_KEY = 'innosxnce.lang'

const isLang = (v: unknown): v is Lang => v === 'id' || v === 'en'

export function LangProvider({ children }: { children: ReactNode }) {
  // Always starts at 'id' so the server render and the first client render
  // agree. A stored preference is applied right after mount rather than during
  // render, which would cause a hydration mismatch.
  const [lang, setLangState] = useState<Lang>('id')

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      // Storage can throw in private mode or when blocked by policy.
      // Falling through leaves the default 'id' in place.
    }
    if (!isLang(saved)) return
    // Deferred a tick to satisfy react-hooks/set-state-in-effect, the same
    // pattern used in Header and ScrollHero. Still runs before the next paint.
    queueMicrotask(() => setLangState(saved))
  }, [])

  // Keep the document language in step with the toggle. Without this the
  // <html lang="id"> from the root layout stays put, so screen readers announce
  // English copy with Indonesian pronunciation and search engines mislabel the
  // page.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // The preference just will not survive a reload; the toggle still works.
    }
  }, [])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
