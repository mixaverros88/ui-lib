import { describe, it, expect } from 'vitest'
import { rowKeyMissing, rowValueMissing } from './kvRows'

describe('rowValueMissing', () => {
  it('is false for a fully blank row', () => {
    expect(rowValueMissing({ key: '', value: '' })).toBe(false)
    expect(rowValueMissing({})).toBe(false)
  })

  it('is true when the key is filled but the value is blank', () => {
    expect(rowValueMissing({ key: 'X-Trace', value: '' })).toBe(true)
    expect(rowValueMissing({ key: 'X-Trace', value: '   ' })).toBe(true)
    expect(rowValueMissing({ key: 'X-Trace' })).toBe(true)
  })

  it('is false when both sides are filled', () => {
    expect(rowValueMissing({ key: 'X-Trace', value: 'abc' })).toBe(false)
  })

  it('exempts absent matchers — they carry no value by design', () => {
    expect(rowValueMissing({ key: 'X-Trace', value: '', matcherType: 'absent' })).toBe(false)
  })

  it('treats whitespace-only keys as blank', () => {
    expect(rowValueMissing({ key: '   ', value: '' })).toBe(false)
  })
})

describe('rowKeyMissing', () => {
  it('is false for a fully blank row', () => {
    expect(rowKeyMissing({ key: '', value: '' })).toBe(false)
    expect(rowKeyMissing({})).toBe(false)
  })

  it('is true when the value is filled but the key is blank', () => {
    expect(rowKeyMissing({ key: '', value: 'abc' })).toBe(true)
    expect(rowKeyMissing({ key: '  ', value: 'abc' })).toBe(true)
  })

  it('is false when both sides are filled', () => {
    expect(rowKeyMissing({ key: 'X-Trace', value: 'abc' })).toBe(false)
  })

  it('exempts absent matchers', () => {
    expect(rowKeyMissing({ key: '', value: 'abc', matcherType: 'absent' })).toBe(false)
  })
})
