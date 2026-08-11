/** Discount % for a struck-through original price vs. the current price, e.g. "Rp 129K" → "Rp 79K" is 39. */
export function percentOff(originalPrice: string, price: string): number {
  const parse = (s: string) => parseFloat(s.replace(/[^0-9.]/g, ''))
  const original = parse(originalPrice)
  const current = parse(price)
  return Math.round((1 - current / original) * 100)
}

/**
 * Nominal yang dihemat, misalnya "Rp 349K" → "Rp 249K" jadi "Rp100K".
 * Sengaja mengembalikan string agar formatnya konsisten dengan `price`
 * di TIERS, yang juga ditulis manual dalam satuan K.
 */
export function rupiahOff(originalPrice: string, price: string): string {
  const parse = (s: string) => parseFloat(s.replace(/[^0-9.]/g, ''))
  const diff = parse(originalPrice) - parse(price)
  return `Rp${diff}K`
}
