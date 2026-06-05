import { describe, it, expect } from 'vitest'
import {
  fmtNumber,
  fmtDate,
  fmtDateTime,
  fmtDateShort,
  fmtPrice,
  fmtPct,
  fmtUsd,
} from './format'

const EM_DASH = '—'

// Fraction digits are locale-stable even when the grouping/decimal
// separator is not, so assert on the count rather than the exact string.
function fractionLen(s: string): number {
  const m = s.match(/[.,](\d+)$/)
  return m ? m[1].length : 0
}

describe('fmtNumber', () => {
  it('renders an em-dash for null/undefined', () => {
    expect(fmtNumber(null)).toBe(EM_DASH)
    expect(fmtNumber(undefined)).toBe(EM_DASH)
  })

  it('renders an em-dash for empty/whitespace strings', () => {
    expect(fmtNumber('')).toBe(EM_DASH)
    expect(fmtNumber('   ')).toBe(EM_DASH)
  })

  it('renders an em-dash for non-numeric strings and non-finite values', () => {
    expect(fmtNumber('abc')).toBe(EM_DASH)
    expect(fmtNumber(Infinity)).toBe(EM_DASH)
    expect(fmtNumber(NaN)).toBe(EM_DASH)
  })

  it('formats numbers with the default of 4 fraction digits', () => {
    expect(fractionLen(fmtNumber(1))).toBe(4)
  })

  it('honours the digits argument', () => {
    expect(fractionLen(fmtNumber(1.5, 2))).toBe(2)
  })

  it('accepts numeric strings', () => {
    expect(fractionLen(fmtNumber('3.14159', 2))).toBe(2)
    expect(fmtNumber('0', 2)).toMatch(/^0[.,]00$/)
  })
})

describe('fmtDate', () => {
  it('renders an em-dash for empty input', () => {
    expect(fmtDate(null)).toBe(EM_DASH)
    expect(fmtDate(undefined)).toBe(EM_DASH)
    expect(fmtDate('')).toBe(EM_DASH)
  })

  it('falls back to the raw value on parse failure', () => {
    expect(fmtDate('not a date')).toBe('not a date')
  })

  it('formats a valid ISO string', () => {
    const out = fmtDate('2026-05-30T12:00:00Z')
    expect(out).not.toBe(EM_DASH)
    expect(out).not.toBe('Invalid Date')
    expect(out.length).toBeGreaterThan(0)
  })

  it('formats an epoch value', () => {
    expect(fmtDate(0)).not.toBe(EM_DASH)
    expect(fmtDate(0)).not.toBe('Invalid Date')
  })
})

describe('fmtDateTime / fmtDateShort', () => {
  const ms = Date.UTC(2026, 4, 30, 12, 0)

  it('returns a non-empty label without "Invalid"', () => {
    expect(fmtDateTime(ms)).not.toContain('Invalid')
    expect(fmtDateTime(ms).length).toBeGreaterThan(0)
    expect(fmtDateShort(ms)).not.toContain('Invalid')
    expect(fmtDateShort(ms).length).toBeGreaterThan(0)
  })
})

describe('fmtPrice', () => {
  it('returns 0.00 for zero', () => {
    expect(fmtPrice(0)).toBe('0.00')
  })

  it('returns NaN for non-finite input', () => {
    expect(fmtPrice(NaN)).toBe('NaN')
  })

  it('scales precision up for sub-cent magnitudes', () => {
    expect(fractionLen(fmtPrice(0.00005))).toBe(8)
    expect(fractionLen(fmtPrice(0.005))).toBe(6)
    expect(fractionLen(fmtPrice(0.5))).toBe(4)
  })

  it('uses 3 digits for magnitudes under 100', () => {
    expect(fractionLen(fmtPrice(12.5))).toBe(3)
  })

  it('uses 2 digits for magnitudes of 100 or more', () => {
    expect(fractionLen(fmtPrice(150))).toBe(2)
  })
})

describe('fmtPct', () => {
  it('prefixes a sign', () => {
    expect(fmtPct(2.5)).toBe('+2.50%')
    expect(fmtPct(-1)).toBe('-1.00%')
    expect(fmtPct(0)).toBe('+0.00%')
  })

  it('honours the digits argument', () => {
    expect(fmtPct(3.14159, 3)).toBe('+3.142%')
  })
})

describe('fmtUsd', () => {
  it('formats a signed USD amount', () => {
    expect(fmtUsd(5)).toBe('+$5.00')
    expect(fmtUsd(-3.5)).toBe('-$3.50')
    expect(fmtUsd(0)).toBe('+$0.00')
  })
})
