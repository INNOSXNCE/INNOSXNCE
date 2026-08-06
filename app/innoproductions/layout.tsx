import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InnoProductions: Jasa Edit Video | INNOSXNCE',
  description:
    'Rumah produksi di balik INNOSXNCE. Jasa edit video shortform, longform, dan podcast clipping dengan harga transparan dan turnaround jelas.',
  openGraph: {
    title: 'InnoProductions: Video Editing Studio',
    description:
      'The production house behind INNOSXNCE. Shortform, longform and podcast clipping with transparent pricing and a clear turnaround.',
    type: 'website',
  },
}

export default function InnoProductionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
