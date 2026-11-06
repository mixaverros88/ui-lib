import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseRating from './BaseRating.vue'
import BaseBooleanIcon from './BaseBooleanIcon.vue'

describe('BaseRating', () => {
  it('shows the value and optional count', () => {
    expect(mount(BaseRating, { props: { rating: 4.26, count: 3 } }).text()).toContain('4.3 (3)')
    expect(mount(BaseRating, { props: { rating: 4 } }).text()).toBe('4.0')
  })
})

describe('BaseBooleanIcon', () => {
  it('renders a dash for unknown and a labelled icon otherwise', () => {
    expect(mount(BaseBooleanIcon, { props: { value: null } }).text()).toBe('—')
    const yes = mount(BaseBooleanIcon, { props: { value: true, trueLabel: 'Ναι' } })
    expect(yes.attributes('title')).toBe('Ναι')
  })
})
