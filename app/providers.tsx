'use client'
import { LangProvider } from '@/lib/lang-context'
import { PageFlashProvider } from '@/lib/page-flash-context'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <PageFlashProvider>{children}</PageFlashProvider>
    </LangProvider>
  )
}
