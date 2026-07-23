import { describe, it, expect, beforeEach } from 'vitest'
import { useFieldClasses } from './useFieldClasses'
import { useTheme } from './useTheme'

// useTheme is a module-level singleton — grab its ref once and flip it
// per test. localStorage is cleared so a previous test's persisted theme
// can't leak into the initial value.
beforeEach(() => {
  localStorage.clear()
})

describe('useFieldClasses', () => {
  it('returns the light-mode strings when isDark is false', () => {
    const { isDark } = useTheme()
    isDark.value = false
    const f = useFieldClasses()
    expect(f.label.value).toBe('text-gray-600')
    expect(f.input.value).toContain('bg-white')
    expect(f.input.value).toContain('focus:ring-emerald-500')
  })

  it('returns the dark-mode strings when isDark is true', () => {
    const { isDark } = useTheme()
    isDark.value = true
    const f = useFieldClasses()
    expect(f.label.value).toBe('text-gray-300')
    expect(f.input.value).toContain('bg-gray-800')
  })

  it('requiredInput flags empty values with the red skin', () => {
    const { isDark } = useTheme()
    isDark.value = false
    const f = useFieldClasses()
    expect(f.requiredInput('')).toContain('border-red-400')
    expect(f.requiredInput('   ')).toContain('border-red-400')
    expect(f.requiredInput(undefined)).toContain('border-red-400')
    expect(f.requiredInput(null)).toContain('border-red-400')
  })

  it('requiredInput falls back to the standard skin for filled values', () => {
    const { isDark } = useTheme()
    isDark.value = false
    const f = useFieldClasses()
    expect(f.requiredInput('hello')).toBe(f.input.value)
    expect(f.requiredInput(0)).toBe(f.input.value) // 0 is a real value, not empty
  })

  it('requiredInput follows the active theme', () => {
    const { isDark } = useTheme()
    isDark.value = true
    const f = useFieldClasses()
    expect(f.requiredInput('')).toContain('bg-gray-800')
    expect(f.requiredInput('')).toContain('border-red-500')
  })
})
