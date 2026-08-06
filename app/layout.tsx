import type { Metadata } from 'next'
import { Cinzel, Cormorant_Garamond, Archivo } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { NoiseOverlay } from '@/components/NoiseOverlay'
import { SpaceBackdrop } from '@/components/SpaceBackdrop'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { KeyboardNav } from '@/components/KeyboardNav'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cinzel',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: 'INNOSXNCE',
  description: 'Motivasi. Disiplin. Konsistensi. Satu persen lebih baik setiap hari.',
  openGraph: {
    title: 'INNOSXNCE',
    description: 'One percent better. Every day.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cinzel.variable} ${cormorant.variable} ${archivo.variable}`}>
      <body>
        <Providers>
          <SpaceBackdrop />
          <NoiseOverlay />
          <KeyboardNav />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
