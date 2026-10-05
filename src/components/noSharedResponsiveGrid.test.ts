import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

// Consumers import the lib CSS AFTER their own Tailwind utilities, so any
// grid-cols-N utility a lib source ships lands in that later stylesheet and
// wins every equal-specificity tie against the consumer's own copy:
//   - a breakpoint-prefixed one overrides the consumer's larger-breakpoint
//     columns (a 7-column stat grid collapses to 2);
//   - an unprefixed one overrides ALL of the consumer's responsive columns
//     (a 3-column grid stacks into 1 at every width).
// Lib sources must use the arbitrary-value forms instead, e.g.
// grid-cols-[minmax(0,1fr)] or grid-cols-[repeat(2,minmax(0,1fr))] (behind a
// breakpoint prefix as needed) — no consumer class collides with those.
// Test files are excluded from Tailwind's scan (@source not in style.css), so
// they're skipped here too. No literal class tokens in this file on purpose.
const PLAIN = new RegExp(String.raw`(?<![\w-])(?:(?:sm|md|lg|xl|2xl):)?grid-cols-\d+\b`, 'g')

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) return sources(p)
    return /\.(vue|ts|css)$/.test(f) && !f.endsWith('.test.ts') ? [p] : []
  })
}

describe('lib sources', () => {
  it('use no plain grid-cols-N utilities (prefixed or not)', () => {
    const offenders = sources(join(__dirname, '..')).flatMap((p) =>
      [...readFileSync(p, 'utf8').matchAll(PLAIN)].map((m) => `${p}: ${m[0]}`),
    )
    expect(offenders).toEqual([])
  })
})
