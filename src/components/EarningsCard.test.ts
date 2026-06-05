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
})
