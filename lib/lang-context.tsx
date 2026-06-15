'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Lang } from './types'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue>({ lang: 'id', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('id')
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
