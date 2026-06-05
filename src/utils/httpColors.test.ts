import { describe, it, expect } from 'vitest'
import {
  methodBadgeSolid,
  methodBadgeBright,
  statusBadgeSolid,
  statusBadgeTinted,
} from './httpColors'

describe('methodBadgeSolid', () => {
  it('maps known methods (case-insensitive)', () => {
    expect(methodBadgeSolid('GET')).toBe('bg-blue-600')
    expect(methodBadgeSolid('get')).toBe('bg-blue-600')
    expect(methodBadgeSolid('DELETE')).toBe('bg-red-600')
  })

  it('falls back to gray for missing/unknown methods', () => {
    expect(methodBadgeSolid()).toBe('bg-gray-600')
    expect(methodBadgeSolid('TRACE')).toBe('bg-gray-600')
  })
})

describe('methodBadgeBright', () => {
  it('maps known methods', () => {
    expect(methodBadgeBright('POST')).toBe('bg-green-500')
  })

  it('falls back to gray', () => {
    expect(methodBadgeBright()).toBe('bg-gray-500')
    expect(methodBadgeBright('WAT')).toBe('bg-gray-500')
  })
})

describe('statusBadgeSolid', () => {
  it('buckets by status class', () => {
    expect(statusBadgeSolid(204)).toBe('bg-emerald-600')
    expect(statusBadgeSolid(301)).toBe('bg-blue-600')
    expect(statusBadgeSolid(404)).toBe('bg-amber-600')
    expect(statusBadgeSolid(500)).toBe('bg-red-600')
  })

  it('falls back to gray for missing/unknown codes', () => {
    expect(statusBadgeSolid()).toBe('bg-gray-600')
    expect(statusBadgeSolid(100)).toBe('bg-gray-600')
  })
})

describe('statusBadgeTinted', () => {
  it('returns dark-theme classes', () => {
    expect(statusBadgeTinted(200, true)).toBe('bg-green-500/15 text-green-400')
    expect(statusBadgeTinted(404, true)).toBe('bg-yellow-500/15 text-yellow-400')
    expect(statusBadgeTinted(500, true)).toBe('bg-red-500/15 text-red-400')
  })

  it('returns light-theme classes', () => {
    expect(statusBadgeTinted(200, false)).toBe('bg-green-100 text-green-800')
    expect(statusBadgeTinted(404, false)).toBe('bg-yellow-100 text-yellow-800')
  })

  it('defaults a missing status to 2xx', () => {
    expect(statusBadgeTinted(undefined, false)).toBe('bg-green-100 text-green-800')
  })
})
