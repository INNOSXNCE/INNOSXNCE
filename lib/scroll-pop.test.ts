import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  clamp01,
  easeOutCubic,
  scrollProgress,
  popTransform,
  popSettled,
  popBand,
} from './scroll-pop.ts'

test('clamp01 bounds to [0,1]', () => {
  assert.equal(clamp01(-0.5), 0)
  assert.equal(clamp01(0.5), 0.5)
  assert.equal(clamp01(1.5), 1)
})

test('easeOutCubic endpoints', () => {
  assert.equal(easeOutCubic(0), 0)
  assert.equal(easeOutCubic(1), 1)
  assert.ok(easeOutCubic(0.5) > 0.5) // ease-out is above the diagonal
})

test('scrollProgress is 0 when section top sits at the start line', () => {
  // startFrac 1.0, endFrac 0.5, viewport 1000 -> start=1000, end=500
  assert.equal(scrollProgress(1000, 1000, 1.0, 0.5), 0)
})

test('scrollProgress is 1 when section top reaches the end line', () => {
  assert.equal(scrollProgress(500, 1000, 1.0, 0.5), 1)
})

test('scrollProgress interpolates linearly between the lines', () => {
  // halfway between 1000 and 500 is 750
  assert.equal(scrollProgress(750, 1000, 1.0, 0.5), 0.5)
})

test('scrollProgress clamps past the end line', () => {
  assert.equal(scrollProgress(100, 1000, 1.0, 0.5), 1)
  assert.equal(scrollProgress(1200, 1000, 1.0, 0.5), 0)
})

test('scrollProgress returns 1 for degenerate viewport or band', () => {
  assert.equal(scrollProgress(500, 0, 1.0, 0.5), 1)
  assert.equal(scrollProgress(500, 1000, 0.5, 0.5), 1)
})

test('popTransform endpoints: hidden-small at 0, settled at 1', () => {
  const a = popTransform(0)
  assert.equal(a.opacity, 0.2)
  assert.equal(a.transform, 'translateY(100px) scale(0.6)')
  const b = popTransform(1)
  assert.equal(b.opacity, 1)
  assert.equal(b.transform, 'translateY(0px) scale(1)')
})

test('popSettled: settled at 1, not settled at 0', () => {
  assert.equal(popSettled(1), true)
  assert.equal(popSettled(0), false)
})

test('popSettled opens before raw progress reaches 1 (ease-out tail)', () => {
  // easeOutCubic(0.8) = 1 - 0.2^3 = 0.992 >= 0.9 -> already clickable
  assert.equal(popSettled(0.8), true)
  // easeOutCubic(0.5) = 0.875 < 0.9 -> still visibly popping, not yet clickable
  assert.equal(popSettled(0.5), false)
})

test('the gate opens while the card is still perceptibly small (no looks-final-but-dead seam)', () => {
  let firstSettled: number | null = null
  for (let p = 0; p <= 1.0001; p += 0.005) {
    if (popSettled(p)) { firstSettled = p; break }
  }
  assert.ok(firstSettled !== null && firstSettled < 1)
  const scale = Number(popTransform(firstSettled!).transform.match(/scale\(([^)]+)\)/)![1])
  // Below the ~1% perceptibility floor: the card is visibly settling, not "final", when it becomes clickable.
  assert.ok(scale < 0.99, `expected gate-open scale < 0.99, got ${scale}`)
})

test('popBand narrows the settle point on smaller screens', () => {
  const narrow = popBand(390)
  const wide = popBand(1440)
  assert.equal(narrow.startFrac, 1.0)
  assert.equal(wide.startFrac, 1.0)
  // smaller screens finish the pop earlier in the rise (higher settle) => smaller endFrac
  assert.ok(narrow.endFrac < wide.endFrac)
})
