import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseStatBreakdown from './BaseStatBreakdown.vue'
import type { StatBreakdownItem } from '../types/statBreakdown'

const items: StatBreakdownItem[] = [
  { label: 'Alpaca', value: 12.5 },
  { label: 'Kraken', value: -3 },
  { label: 'Binance', value: null },
]

describe('BaseStatBreakdown', () => {
  it('renders one row per item with label and formatted value', () => {
    const wrapper = mount(BaseStatBreakdown, {
      props: { items, currency: '$' },
    })
    const rows = wrapper.findAll('.flex')
    expect(rows).toHaveLength(3)
    expect(rows[0].text()).toContain('Alpaca')
    expect(rows[0].text()).toContain('$12.50')
  })

  it('renders an em-dash for null values instead of a misleading 0', () => {
    const wrapper = mount(BaseStatBreakdown, { props: { items } })
    const rows = wrapper.findAll('.flex')
    expect(rows[2].text()).toContain('—')
    expect(rows[2].text()).not.toContain('0.00')
  })

  it('honours the decimals prop', () => {
    const wrapper = mount(BaseStatBreakdown, {
      props: { items: [{ label: 'BTC', value: 0.5 }], decimals: 8 },
    })
    expect(wrapper.text()).toContain('0.50000000')
  })

  it('prefixes a plus and colours by sign when signed', () => {
    const wrapper = mount(BaseStatBreakdown, {
      props: { items, currency: '$', signed: true },
    })
    const values = wrapper.findAll('.font-mono')
    expect(values[0].text()).toBe('+$12.50')
    expect(values[0].classes().join(' ')).toContain('text-emerald-600')
    expect(values[1].text()).toBe('-$3.00')
    expect(values[1].classes().join(' ')).toContain('text-red-600')
    // Null rows stay neutral even in signed mode.
    expect(values[2].classes().join(' ')).toContain('text-slate-500')
  })

  it('stays neutral-coloured when signed is off', () => {
    const wrapper = mount(BaseStatBreakdown, {
      props: { items: [{ label: 'Alpaca', value: 12.5 }] },
    })
    expect(wrapper.find('.font-mono').classes().join(' ')).toContain('text-slate-500')
  })
})
