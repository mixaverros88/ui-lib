import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSelect from './BaseSelect.vue'

const slots = {
  default: '<option value="a">A</option><option value="b">B</option>',
}

describe('BaseSelect', () => {
  it('renders the field skin, full-width compact by default', () => {
    const wrapper = mount(BaseSelect, { slots })
    const select = wrapper.find('select')
    expect(select.classes()).toEqual(
      expect.arrayContaining(['rounded', 'border', 'w-full', 'px-2', 'py-1.5', 'text-sm']),
    )
  })

  it('supports md size and inline (non-block) layout', () => {
    const wrapper = mount(BaseSelect, { props: { size: 'md', block: false }, slots })
    const select = wrapper.find('select')
    expect(select.classes()).toEqual(expect.arrayContaining(['px-3', 'py-2']))
    expect(select.classes()).not.toContain('w-full')
  })

  it('reflects modelValue and emits the selected value on change', async () => {
    const wrapper = mount(BaseSelect, { props: { modelValue: 'a' }, slots })
    const select = wrapper.find('select')
    expect((select.element as HTMLSelectElement).value).toBe('a')
    await select.setValue('b')
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  })

  it('renders caller-provided options via the default slot', () => {
    const wrapper = mount(BaseSelect, { slots })
    expect(wrapper.findAll('option').map((o) => o.text())).toEqual(['A', 'B'])
  })
})
