import { describe, it, expect } from 'vitest'
import { computePnL } from './pnl'

describe('computePnL', () => {
  it('computes absolute and percent PnL for a profitable position', () => {
    expect(computePnL({ buyPrice: 100, lastPrice: 110, filledQty: 5 })).toEqual({
      pnlUsd: 50,
      pnlPct: 10,
    })
  })

  it('computes a loss', () => {
    expect(computePnL({ buyPrice: 100, lastPrice: 90, filledQty: 2 })).toEqual({
      pnlUsd: -20,
      pnlPct: -10,
    })
  })

  it('accepts numeric strings', () => {
    expect(computePnL({ buyPrice: '100', lastPrice: '110', filledQty: '5' })).toEqual({
      pnlUsd: 50,
      pnlPct: 10,
    })
  })

  it('returns nulls when any input is missing', () => {
    const nulls = { pnlUsd: null, pnlPct: null }
    expect(computePnL({ buyPrice: null, lastPrice: 110, filledQty: 5 })).toEqual(nulls)
    expect(computePnL({ buyPrice: 100, lastPrice: undefined, filledQty: 5 })).toEqual(nulls)
    expect(computePnL({ buyPrice: 100, lastPrice: 110, filledQty: null })).toEqual(nulls)
  })

  it('returns nulls for non-finite inputs (guards Number(null) === 0 footgun)', () => {
    expect(computePnL({ buyPrice: 100, lastPrice: 'abc', filledQty: 5 })).toEqual({
      pnlUsd: null,
      pnlPct: null,
    })
  })

  it('returns nulls when buyPrice is not positive', () => {
    const nulls = { pnlUsd: null, pnlPct: null }
    expect(computePnL({ buyPrice: 0, lastPrice: 110, filledQty: 5 })).toEqual(nulls)
    expect(computePnL({ buyPrice: -5, lastPrice: 110, filledQty: 5 })).toEqual(nulls)
  })

  it('returns nulls when lastPrice is not positive (corrupt row / bad quote, not a real -100% loss)', () => {
    const nulls = { pnlUsd: null, pnlPct: null }
    expect(computePnL({ buyPrice: 100, lastPrice: 0, filledQty: 2 })).toEqual(nulls)
    expect(computePnL({ buyPrice: 100, lastPrice: -5, filledQty: 2 })).toEqual(nulls)
  })
})
