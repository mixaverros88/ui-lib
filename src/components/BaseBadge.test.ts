import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseBadge from './BaseBadge.vue'
import { ColorsEnums } from '../enums/ColorsEnums'

describe('BaseBadge', () => {
  it('renders nothing without slot content', () => {
    expect(mount(BaseBadge).html()).toBe('<!--v-if-->')
  })

  it('applies the colour classes and humanizes underscores', () => {
    const w = mount(BaseBadge, { props: { color: ColorsEnums.BLUE }, slots: { default: 'PROFIT_TARGET' } })
    expect(w.text()).toBe('PROFIT TARGET')
    expect(w.classes()).toContain('bg-blue-100')
  })

  it('does not animate by default', () => {
    const w = mount(BaseBadge, { slots: { default: 'OPEN' } })
    expect(w.classes()).not.toContain('animate-pulse')
  })

  it('pulses when blink is set, and stops under reduced motion', () => {
    const w = mount(BaseBadge, { props: { blink: true }, slots: { default: 'OPEN' } })
    expect(w.classes()).toContain('animate-pulse')
    expect(w.classes()).toContain('motion-reduce:animate-none')
  })
})
