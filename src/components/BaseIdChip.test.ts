import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseIdChip from './BaseIdChip.vue'

describe('BaseIdChip', () => {
  it('shows the label and the full id in the tooltip', () => {
    const w = mount(BaseIdChip, { props: { label: 'ord', value: 'abc-123-def' } })
    expect(w.text()).toContain('ord')
    expect(w.get('code').text()).toBe('abc-123-def')
    expect(w.get('code').attributes('title')).toBe('abc-123-def')
  })

  it('labels the copy button from label + value, or copyLabel when given', () => {
    const plain = mount(BaseIdChip, { props: { label: 'id', value: 'x1' } })
    expect(plain.get('button[aria-label="Copy id x1"]').exists()).toBe(true)
    const custom = mount(BaseIdChip, { props: { label: 'id', value: 'x1', copyLabel: 'tx id' } })
    expect(custom.get('button[aria-label="Copy tx id"]').exists()).toBe(true)
  })

  it('renders the action button only with actionLabel, emitting the value', async () => {
    expect(mount(BaseIdChip, { props: { value: 'x1' } }).findAll('button')).toHaveLength(1)
    const w = mount(BaseIdChip, { props: { value: 'x1', actionLabel: 'Search this id' } })
    await w.get('button[aria-label="Search this id"]').trigger('click')
    expect(w.emitted('action')).toEqual([['x1']])
  })
})
