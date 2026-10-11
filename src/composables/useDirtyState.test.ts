import { describe, it, expect } from 'vitest'
import { reactive } from 'vue'
import { stableStringify, useDirtyState } from './useDirtyState'

describe('stableStringify', () => {
  it('ignores key order at every depth but keeps array order', () => {
    expect(stableStringify({ b: 1, a: { d: 2, c: 3 } })).toBe(stableStringify({ a: { c: 3, d: 2 }, b: 1 }))
    expect(stableStringify([1, 2])).not.toBe(stableStringify([2, 1]))
  })
})

describe('useDirtyState', () => {
  it('starts clean, turns dirty on an edit and clean again when reverted', () => {
    const form = reactive({ name: 'a', params: { x: 1 } as Record<string, number> })
    const { dirty } = useDirtyState(() => form)
    expect(dirty.value).toBe(false)
    form.params.x = 2
    expect(dirty.value).toBe(true)
    form.params.x = 1
    expect(dirty.value).toBe(false)
  })

  it('markClean() adopts the current state as the baseline', () => {
    const form = reactive({ name: 'a' })
    const { dirty, markClean } = useDirtyState(() => form)
    form.name = 'b'
    expect(dirty.value).toBe(true)
    markClean()
    expect(dirty.value).toBe(false)
  })

  it('a reordered but equal object is not an edit', () => {
    const form = reactive<{ params: Record<string, number> }>({ params: { a: 1, b: 2 } })
    const { dirty } = useDirtyState(() => form)
    form.params = { b: 2, a: 1 }
    expect(dirty.value).toBe(false)
  })
})
