import type { CSSProperties } from 'react'

const GLOW_POSITIONS = [
  '22% 24%', '76% 28%', '50% 16%', '30% 72%', '72% 70%', '50% 84%',
  '24% 46%', '78% 52%', '50% 50%', '34% 26%', '66% 24%', '50% 38%',
]

export function wpArt(i: number, red: boolean): CSSProperties {
  const g = GLOW_POSITIONS[i % GLOW_POSITIONS.length]
  const glow = red ? 'rgba(200,50,50,0.32)' : 'rgba(255,255,255,0.14)'
  return {
    position: 'absolute',
    inset: 0,
    background:
      'repeating-linear-gradient(180deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 4px),' +
      `radial-gradient(120% 90% at ${g}, ${glow} 0%, rgba(255,255,255,0.02) 32%, #000 70%),` +
      'linear-gradient(180deg,#0a0a0a,#000)',
  }
}

const PACK_GRADIENTS = [
  'radial-gradient(100% 130% at 30% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0.01) 45%, #000 75%), linear-gradient(180deg,#0b0b0b,#000)',
  'radial-gradient(100% 130% at 70% 0%, rgba(200,50,50,0.24), rgba(255,255,255,0.01) 45%, #000 75%), linear-gradient(180deg,#0a0a0a,#000)',
  'radial-gradient(120% 140% at 50% 0%, rgba(255,255,255,0.07), rgba(255,255,255,0) 42%, #000 72%), linear-gradient(180deg,#080808,#000)',
]

export function packArt(i: number): CSSProperties {
  return {
    position: 'relative',
    aspectRatio: '16 / 10',
    background: PACK_GRADIENTS[i % 3],
  }
}
