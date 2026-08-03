'use client'
import { LangProvider } from '@/lib/lang-context'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return <LangProvider>{children}</LangProvider>
}
