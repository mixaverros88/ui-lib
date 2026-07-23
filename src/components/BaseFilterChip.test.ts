import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseFilterChip from './BaseFilterChip.vue'

describe('BaseFilterChip', () => {
  it('renders the label prop, overridden by the default slot', () => {
    expect(mount(BaseFilterChip, { props: { label: 'Buy' } }).text()).toBe('Buy')
    expect(
      mount(BaseFilterChip, { props: { label: 'x' }, slots: { default: 'Sell' } }).text(),
    ).toBe('Sell')
  })

  it('switches from the tinted idle skin to the solid active fill', () => {
    const idle = mount(BaseFilterChip, { props: { color: 'sky', active: false } })
    expect(idle.get('button').classes()).toContain('bg-sky-50')
    expect(idle.get('button').attributes('aria-pressed')).toBe('false')

    const active = mount(BaseFilterChip, { props: { color: 'sky', active: true } })
    expect(active.get('button').classes()).toContain('bg-sky-500')
    expect(active.get('button').classes()).toContain('text-white')
    expect(active.get('button').attributes('aria-pressed')).toBe('true')
  })

  it('lets native click listeners through, blocked when disabled', async () => {
    let clicks = 0
    const chip = mount(BaseFilterChip, {
      props: { label: 'Buy' },
      attrs: { onClick: () => clicks++ },
    })
    await chip.get('button').trigger('click')
    expect(clicks).toBe(1)

    const off = mount(BaseFilterChip, {
      props: { label: 'Buy', disabled: true },
      attrs: { onClick: () => clicks++ },
    })
    expect(off.get('button').attributes('disabled')).toBeDefined()
  })

  it('forwards the title tooltip', () => {
    const chip = mount(BaseFilterChip, { props: { label: 'Buy', title: 'Show buys' } })
    expect(chip.get('button').attributes('title')).toBe('Show buys')
  })
})
