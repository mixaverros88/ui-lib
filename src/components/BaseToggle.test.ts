import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseToggle from './BaseToggle.vue'

describe('BaseToggle', () => {
  it('reflects the value in aria-checked and the track colour', () => {
    const off = mount(BaseToggle, { props: { modelValue: false } })
    expect(off.find('[role=switch]').attributes('aria-checked')).toBe('false')
    expect(off.find('[role=switch]').classes()).toContain('bg-slate-200')

    const on = mount(BaseToggle, { props: { modelValue: true, color: 'red' } })
    expect(on.find('[role=switch]').attributes('aria-checked')).toBe('true')
    expect(on.find('[role=switch]').classes()).toContain('bg-red-600')
  })

  it('uses the red off track with offTone="red"', () => {
    const w = mount(BaseToggle, { props: { modelValue: false, offTone: 'red' } })
    expect(w.find('[role=switch]').classes()).toContain('bg-red-200')
  })

  it('emits update:modelValue and change with the flipped value', async () => {
    const w = mount(BaseToggle, { props: { modelValue: false } })
    await w.find('[role=switch]').trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[true]])
    expect(w.emitted('change')).toEqual([[true]])
  })

  it('does nothing while disabled', async () => {
    const w = mount(BaseToggle, { props: { modelValue: true, disabled: true } })
    await w.find('[role=switch]').trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })

  it('renders the label, or uses ariaLabel when there is none', () => {
    expect(mount(BaseToggle, { props: { label: 'Crawler' } }).text()).toBe('Crawler')
    const w = mount(BaseToggle, { props: { ariaLabel: 'Alive' } })
    expect(w.find('[role=switch]').attributes('aria-label')).toBe('Alive')
  })
})
