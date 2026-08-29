import { describe, it, expect } from 'vitest'
import { isReactive } from 'vue'
import { normalizeClass } from '@vue/shared'
import { useThemeClasses } from './useThemeClasses'
import { useTheme } from './useTheme'

describe('useThemeClasses', () => {
  it('returns a reactive object whose properties are plain class strings', () => {
    const t = useThemeClasses()
    expect(isReactive(t)).toBe(true)
    expect(typeof t.primaryText).toBe('string')
    expect(t.primaryText).toMatch(/^text-/)
  })

  it('survives normalizeClass — the regression that leaked ref internals into class attrs', () => {
    // Before the reactive() fix, `:class="t.primaryText"` handed a raw
    // ComputedRef to normalizeClass, which rendered the ref's own keys
    // ("fn dep __v_isRef …") instead of the theme classes.
    const t = useThemeClasses()
    const normalized = normalizeClass(t.primaryText)
    expect(normalized).not.toContain('__v_isRef')
    expect(normalized).toBe(t.primaryText)
  })

  it('tracks theme flips', () => {
    const { isDark, toggleTheme } = useTheme()
    const t = useThemeClasses()
    const before = t.primaryText
    toggleTheme()
    expect(t.primaryText).not.toBe(before)
    expect(t.primaryText).toBe(isDark.value ? 'text-white' : 'text-gray-900')
    toggleTheme() // restore for other tests sharing the singleton theme
  })
})
