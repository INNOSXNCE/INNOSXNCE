'use client'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface PageFlashContextValue {
  startFlash: (href: string) => void
}

const PageFlashContext = createContext<PageFlashContextValue>({ startFlash: () => {} })

export function PageFlashProvider({ children }: { children: ReactNode }) {
  const [flashing, setFlashing] = useState(false)
  const router = useRouter()

  const startFlash = useCallback(
    (href: string) => {
      setFlashing(true)
      setTimeout(() => {
        router.push(href)
        window.scrollTo(0, 0)
        setTimeout(() => setFlashing(false), 140)
      }, 120)
    },
    [router],
  )

  return (
    <PageFlashContext.Provider value={{ startFlash }}>
      {children}
      {flashing && <div className="fixed inset-0 bg-black pointer-events-none" style={{ zIndex: 190 }} />}
    </PageFlashContext.Provider>
  )
}

export function usePageFlash() {
  return useContext(PageFlashContext)
}
