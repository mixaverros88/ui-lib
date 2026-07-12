import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EarningsCard from './EarningsCard.vue'

describe('EarningsCard', () => {
  it('formats a finite amount with currency and decimals', () => {
    const w = mount(EarningsCard, { props: { amount: 1234.5, currency: '$', decimals: 2 } })
    expect(w.text()).toContain('$1,234.50')
  })

  it('falls back to a zeroed amount when given NaN (never renders "NaN")', () => {
    const w = mount(EarningsCard, { props: { amount: Number.NaN } })
    expect(w.text()).not.toContain('NaN')
    expect(w.text()).toContain('$0.00')
  })

  it('falls back to a zeroed amount when given Infinity', () => {
    const w = mount(EarningsCard, { props: { amount: Number.POSITIVE_INFINITY } })
    expect(w.text()).not.toContain('Infinity')
    expect(w.text()).toContain('$0.00')
  })

  it('defaults to the orange accent for backward compatibility', () => {
    const w = mount(EarningsCard, { props: { amount: 1 } })
    expect(w.html()).toContain('border-orange-300')
  })

  it('applies the emerald accent when requested', () => {
    const w = mount(EarningsCard, { props: { amount: 1, accent: 'emerald' } })
    expect(w.html()).toContain('border-emerald-300')
    expect(w.html()).not.toContain('border-orange-300')
  })

  it('applies the red accent when requested explicitly', () => {
    const w = mount(EarningsCard, { props: { amount: 1, accent: 'red' } })
    expect(w.html()).toContain('border-red-300')
  })

  describe('compact mode', () => {
    it('keeps the large layout by default (backward compatibility)', () => {
      const w = mount(EarningsCard, { props: { amount: 1 } })
      expect(w.html()).toContain('p-6')
      expect(w.html()).toContain('text-4xl')
      expect(w.html()).not.toContain('text-lg')
    })

    it('renders tighter padding and smaller type when compact', () => {
      const w = mount(EarningsCard, { props: { amount: 1, compact: true } })
      const html = w.html()
      expect(html).toContain('p-3')
      expect(html).toContain('text-lg')
      expect(html).not.toContain('text-4xl')
    })

    it('moves the trend glyph into the top-right corner when compact', () => {
      const w = mount(EarningsCard, { props: { amount: 1, compact: true } })
      expect(w.html()).toContain('absolute right-2 top-2')
    })

    it('still applies the signed loss theme in compact mode', () => {
      const w = mount(EarningsCard, {
        props: { amount: -5, compact: true, signed: true, accent: 'emerald' },
      })
      expect(w.html()).toContain('border-red-300')
      expect(w.html()).toContain('p-3')
    })
  })

  describe('signed (P&L) mode', () => {
    // The "up-trend" arrowhead the default glyph uses; absent in the loss glyph.
    const UP_GLYPH = 'points="16 7 22 7 22 13"'
    const DOWN_GLYPH = 'points="16 17 22 17 22 11"'

    it('renders the red loss theme and a downward glyph for a negative amount', () => {
      const w = mount(EarningsCard, {
        props: { amount: -5, signed: true, accent: 'emerald' },
      })
      const html = w.html()
      expect(html).toContain('border-red-300') // loss recolour overrides emerald
      expect(html).not.toContain('border-emerald-300')
      expect(html).toContain(DOWN_GLYPH)
      expect(html).not.toContain(UP_GLYPH)
      // Existing convention is currency-then-value, so a negative reads "$-5.00".
      expect(w.text()).toContain('$-5.00')
    })

    it('keeps the chosen accent and upward glyph for a non-negative amount', () => {
      const w = mount(EarningsCard, {
        props: { amount: 5, signed: true, accent: 'emerald' },
      })
      const html = w.html()
      expect(html).toContain('border-emerald-300')
      expect(html).not.toContain('border-red-300')
      expect(html).toContain(UP_GLYPH)
    })

    it('treats exactly zero as non-negative (no loss theme)', () => {
      const w = mount(EarningsCard, { props: { amount: 0, signed: true, accent: 'emerald' } })
      expect(w.html()).not.toContain('border-red-300')
      expect(w.html()).toContain('border-emerald-300')
    })

    it('does NOT apply the loss theme to a negative amount unless signed is set', () => {
      // Backward compatibility: without `signed`, a negative amount is just a
      // number rendered in the normal accent (no auto-red).
      const w = mount(EarningsCard, { props: { amount: -5, accent: 'emerald' } })
      expect(w.html()).not.toContain('border-red-300')
      expect(w.html()).toContain('border-emerald-300')
    })

    it('coerces a stringified negative amount before the sign check', () => {
      const w = mount(EarningsCard, {
        // The API can hand back numbers as JSON strings.
        props: { amount: '-0.01' as unknown as number, signed: true, accent: 'emerald' },
      })
      expect(w.html()).toContain('border-red-300')
      expect(w.text()).toContain('$-0.01')
    })
  })
})
