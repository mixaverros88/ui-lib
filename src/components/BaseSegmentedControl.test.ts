import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSegmentedControl from './BaseSegmentedControl.vue'
import type { SegmentedOption } from '../types/segmented'

const options: SegmentedOption[] = [
  { value: 'ALL', label: 'All' },
  { value: 'STOCK', label: 'Stock' },
  { value: 'CRYPTO', label: 'Crypto', title: 'Crypto pairs' },
]

describe('BaseSegmentedControl', () => {
  it('renders one button per option and marks the selected one', () => {
    const wrapper = mount(BaseSegmentedControl, {
      props: { options, modelValue: 'STOCK' },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons.map((b) => b.text())).toEqual(['All', 'Stock', 'Crypto'])
    expect(buttons[1].attributes('aria-pressed')).toBe('true')
    expect(buttons[0].attributes('aria-pressed')).toBe('false')
    expect(buttons[1].classes()).toContain('bg-emerald-500')
    expect(buttons[0].classes()).toContain('bg-slate-50')
    expect(buttons[2].attributes('title')).toBe('Crypto pairs')
  })

  it('emits update:modelValue with the clicked option value', async () => {
    const wrapper = mount(BaseSegmentedControl, {
      props: { options, modelValue: 'ALL' },
    })
    await wrapper.findAll('button')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['CRYPTO']])
  })

  it('uses the emerald-600 fill and wider padding in the wide variant', () => {
    const wrapper = mount(BaseSegmentedControl, {
      props: { options, modelValue: 'ALL', variant: 'wide' },
    })
    const active = wrapper.findAll('button')[0]
    expect(active.classes()).toContain('bg-emerald-600')
    expect(active.classes()).toContain('px-4')
  })

  it('renders the toolbar variant with h-9 divide-x wrapper and uppercase buttons', () => {
    const wrapper = mount(BaseSegmentedControl, {
      props: { options, modelValue: 'ALL', variant: 'toolbar' },
    })
    expect(wrapper.find('div').classes()).toContain('h-9')
    expect(wrapper.find('div').classes()).toContain('divide-x')
    expect(wrapper.findAll('button')[0].classes()).toContain('uppercase')
  })

  it('announces itself as a labelled group only when ariaLabel is set', () => {
    const labelled = mount(BaseSegmentedControl, {
      props: { options, modelValue: 'ALL', ariaLabel: 'Exchange' },
    })
    expect(labelled.find('div').attributes('role')).toBe('group')
    expect(labelled.find('div').attributes('aria-label')).toBe('Exchange')

    const bare = mount(BaseSegmentedControl, { props: { options, modelValue: 'ALL' } })
    expect(bare.find('div').attributes('role')).toBeUndefined()
  })

  it('lets optionClass override the fill classes per option', () => {
    const wrapper = mount(BaseSegmentedControl, {
      props: {
        options,
        modelValue: 'ALL',
        optionClass: (opt: SegmentedOption, active: boolean) =>
          active ? 'bg-red-500 text-white' : 'text-red-600',
      },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('bg-red-500')
    expect(buttons[1].classes()).toContain('text-red-600')
    // Layout classes stay owned by the variant.
    expect(buttons[0].classes()).toContain('px-3')
  })
})
