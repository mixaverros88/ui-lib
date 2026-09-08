import { describe, it, expect } from 'vitest'
import type { SpecField } from '../types/specField'
import { buildSpecParams, firstInvalidNumericSpec } from './specForm'

// Mirrors a typical backend catalogue shape: required numerics carry a
// default, the optional field carries `default: null` (the optionality
// convention — blank means "knob disabled").
const specs: SpecField[] = [
  { key: 'amountPerSymbol', label: 'Amount per symbol ($)', type: 'decimal', default: 4, min: 1, step: 0.01, options: null, help: '' },
  { key: 'stopLossPercent', label: 'Stop loss (%)', type: 'decimal', default: null, min: 0.1, step: 0.1, options: null, help: '' },
]

describe('firstInvalidNumericSpec', () => {
  it('flags a blank required numeric field', () => {
    expect(firstInvalidNumericSpec(specs, { amountPerSymbol: '', stopLossPercent: 1 }))
      .toBe('Amount per symbol ($)')
  })

  it.each([['' as const], [null as never], [undefined as never]])(
    'accepts a blank optional field (cleared → %j)',
    (blank) => {
      expect(firstInvalidNumericSpec(specs, { amountPerSymbol: 10, stopLossPercent: blank }))
        .toBeNull()
    },
  )

  it('still validates a non-blank value on an optional field', () => {
    expect(firstInvalidNumericSpec(specs, { amountPerSymbol: 10, stopLossPercent: NaN }))
      .toBe('Stop loss (%)')
    expect(firstInvalidNumericSpec(specs, { amountPerSymbol: 10, stopLossPercent: 2.5 }))
      .toBeNull()
  })

  it('flags a fractional value on an integer field', () => {
    const withInt: SpecField[] = [
      ...specs,
      { key: 'quantityPerSymbol', label: 'Quantity per symbol (shares)', type: 'integer', default: 0, min: 0, step: 1, options: null, help: '' },
    ]
    const base = { amountPerSymbol: 10, stopLossPercent: 1 }
    expect(firstInvalidNumericSpec(withInt, { ...base, quantityPerSymbol: 0.1 }))
      .toBe('Quantity per symbol (shares)')
    expect(firstInvalidNumericSpec(withInt, { ...base, quantityPerSymbol: 2 })).toBeNull()
  })

  it('accepts a fully valid value set and tolerates missing specs', () => {
    expect(firstInvalidNumericSpec(specs, { amountPerSymbol: 10, stopLossPercent: 1 })).toBeNull()
    expect(firstInvalidNumericSpec(undefined, {})).toBeNull()
  })
})

describe('buildSpecParams', () => {
  it('seeds from defaults, keeping caller-supplied overlaps', () => {
    expect(buildSpecParams(specs, { amountPerSymbol: 10 }).amountPerSymbol).toBe(10)
    expect(buildSpecParams(specs, {}).amountPerSymbol).toBe(4)
  })

  it('seeds an optional field with null (renders as an empty input)', () => {
    expect(buildSpecParams(specs, {}).stopLossPercent).toBeNull()
  })

  it('returns an empty map when there are no specs', () => {
    expect(buildSpecParams(undefined, { anything: 1 })).toEqual({})
  })
})
