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

import { methodBadgeTinted, statusBadgeSoft } from './httpColors'

describe('methodBadgeTinted', () => {
  it('gives each method its own hue (dark)', () => {
    expect(methodBadgeTinted('GET', true)).toBe('bg-blue-500/15 text-blue-400')
    expect(methodBadgeTinted('POST', true)).toBe('bg-emerald-500/15 text-emerald-400')
    expect(methodBadgeTinted('PUT', true)).toBe('bg-amber-500/15 text-amber-400')
    expect(methodBadgeTinted('DELETE', true)).toBe('bg-red-500/15 text-red-400')
    expect(methodBadgeTinted('PATCH', true)).toBe('bg-purple-500/15 text-purple-400')
    expect(methodBadgeTinted('HEAD', true)).toBe('bg-sky-500/15 text-sky-400')
  })
  it('uses the light palette when isDark is false', () => {
    expect(methodBadgeTinted('GET', false)).toBe('bg-blue-100 text-blue-700')
  })
  it('is case-insensitive and falls back to gray for unknown/ANY/missing', () => {
    expect(methodBadgeTinted('get', true)).toBe('bg-blue-500/15 text-blue-400')
    expect(methodBadgeTinted(undefined, false)).toBe('bg-gray-100 text-gray-600')
    expect(methodBadgeTinted('OPTIONS', false)).toBe('bg-gray-100 text-gray-600')
  })
})

describe('statusBadgeSoft', () => {
  it('buckets by status class (light)', () => {
    expect(statusBadgeSoft(201, false)).toBe('bg-emerald-100 text-emerald-700')
    expect(statusBadgeSoft(302, false)).toBe('bg-sky-100 text-sky-700')
    expect(statusBadgeSoft(404, false)).toBe('bg-amber-100 text-amber-700')
    expect(statusBadgeSoft(503, false)).toBe('bg-red-100 text-red-700')
  })
  it('uses tinted surfaces in dark mode', () => {
    expect(statusBadgeSoft(200, true)).toBe('bg-emerald-500/15 text-emerald-300')
  })
  it('defaults undefined to 200 and gray for out-of-range codes', () => {
    expect(statusBadgeSoft(undefined, false)).toBe('bg-emerald-100 text-emerald-700')
    expect(statusBadgeSoft(999, false)).toBe('bg-gray-100 text-gray-600')
    expect(statusBadgeSoft(100, true)).toBe('bg-gray-800 text-gray-400')
  })
})
