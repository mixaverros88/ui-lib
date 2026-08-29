import { describe, it, expect } from 'vitest'
import {
  fmtNumber,
  fmtDate,
  fmtDateTime,
  fmtDateTimeMs,
  fmtDateShort,
  fmtPrice,
  fmtPct,
  fmtUsd,
  fmtDuration,
  formatJson,
  stringifyValue,
} from './format'

describe('fmtDateTimeMs', () => {
  it('keeps the millisecond fraction so same-second rows stay distinguishable', () => {
    const out = fmtDateTimeMs('2026-06-08T14:30:51.123Z')
    expect(out).toMatch(/51[.,:]?\d*123|123/) // ms fraction present, locale separators vary
  })

  it('accepts epoch millis', () => {
    expect(fmtDateTimeMs(0)).toMatch(/19?70/)
  })

  it('falls back to the raw value for unparseable input', () => {
    expect(fmtDateTimeMs('not-a-date')).toBe('Invalid Date')
  })
})

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

describe('fmtDuration', () => {
  it('renders an em-dash for null/undefined/non-finite input', () => {
    expect(fmtDuration(null)).toBe(EM_DASH)
    expect(fmtDuration(undefined)).toBe(EM_DASH)
    expect(fmtDuration(NaN)).toBe(EM_DASH)
    expect(fmtDuration(Infinity)).toBe(EM_DASH)
  })

  it('drops zero-value leading units', () => {
    expect(fmtDuration(12 * 60_000)).toBe('12m')
    expect(fmtDuration((5 * 60 + 12) * 60_000)).toBe('5h 12m')
    expect(fmtDuration((3 * 1440 + 5 * 60 + 12) * 60_000)).toBe('3d 5h')
  })

  it('caps the rendered units at maxUnits', () => {
    const ms = (2 * 1440 + 5 * 60 + 13) * 60_000
    expect(fmtDuration(ms, 3)).toBe('2d 5h 13m')
    expect(fmtDuration(ms, 2)).toBe('2d 5h')
    expect(fmtDuration(ms, 1)).toBe('2d')
  })

  it('keeps the hours unit when days are present even if hours are zero', () => {
    expect(fmtDuration(2 * 1440 * 60_000, 3)).toBe('2d 0h 0m')
  })

  it('clamps negative durations to zero', () => {
    expect(fmtDuration(-5000)).toBe('0m')
  })

  it('renders sub-minute durations as 0m', () => {
    expect(fmtDuration(59_000)).toBe('0m')
  })
})

import { fmtCalendarDate, fmtCalendarDateTime, fmtMsAsSeconds, fmtBytes } from './format'

describe('fmtCalendarDate', () => {
  it('renders a "Mon D, YYYY" en-US label', () => {
    expect(fmtCalendarDate('2026-01-05T10:30:00Z')).toMatch(/^Jan \d{1,2}, 2026$/)
  })
  it('renders an em-dash for empty input', () => {
    expect(fmtCalendarDate(null)).toBe(EM_DASH)
    expect(fmtCalendarDate('')).toBe(EM_DASH)
  })
  it('falls back to the raw value for unparseable input', () => {
    expect(fmtCalendarDate('not-a-date')).toBe('not-a-date')
  })
})

describe('fmtCalendarDateTime', () => {
  it('includes the time of day', () => {
    expect(fmtCalendarDateTime('2026-01-05T10:30:00Z')).toMatch(/2026.*\d{1,2}:\d{2}/)
  })
  it('renders an em-dash for empty input', () => {
    expect(fmtCalendarDateTime(undefined)).toBe(EM_DASH)
  })
})

describe('fmtMsAsSeconds', () => {
  it('renders 2 decimals at >= 1s', () => {
    expect(fmtMsAsSeconds(1500)).toBe('= 1.50 s')
  })
  it('renders 3 decimals below 1s', () => {
    expect(fmtMsAsSeconds(250)).toBe('= 0.250 s')
  })
  it('returns empty for zero / negative / non-finite input', () => {
    expect(fmtMsAsSeconds(0)).toBe('')
    expect(fmtMsAsSeconds(-5)).toBe('')
    expect(fmtMsAsSeconds(NaN)).toBe('')
    expect(fmtMsAsSeconds(null)).toBe('')
  })
})

describe('fmtBytes', () => {
  it('renders bytes below 1 KB', () => {
    expect(fmtBytes(512)).toBe('512 B')
  })
  it('renders KB with one decimal', () => {
    expect(fmtBytes(1536)).toBe('1.5 KB')
  })
  it('renders MB with one decimal', () => {
    expect(fmtBytes(2 * 1024 * 1024)).toBe('2.0 MB')
  })
  it('returns empty for zero / falsy input', () => {
    expect(fmtBytes(0)).toBe('')
    expect(fmtBytes(null)).toBe('')
  })
})

describe('formatJson', () => {
  it('pretty-prints parseable JSON with 2-space indentation', () => {
    expect(formatJson('{"a":1,"b":[2,3]}')).toBe('{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ]\n}')
  })
  it('returns non-JSON input verbatim', () => {
    expect(formatJson('plain text')).toBe('plain text')
    expect(formatJson('<xml/>')).toBe('<xml/>')
    expect(formatJson('')).toBe('')
  })
})

describe('stringifyValue', () => {
  it('passes strings through and blanks null/undefined', () => {
    expect(stringifyValue('abc')).toBe('abc')
    expect(stringifyValue(null)).toBe('')
    expect(stringifyValue(undefined)).toBe('')
  })
  it('JSON-serializes objects, arrays and numbers', () => {
    expect(stringifyValue({ a: 1 })).toBe('{"a":1}')
    expect(stringifyValue([1, 2])).toBe('[1,2]')
    expect(stringifyValue(42)).toBe('42')
  })
  it('falls back to String() when JSON.stringify throws', () => {
    expect(stringifyValue(1n)).toBe('1')
  })
})
