import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from './BaseInput.vue'

describe('BaseInput', () => {
  it('renders the field skin, full-width md by default', () => {
    const wrapper = mount(BaseInput)
    const input = wrapper.find('input')
    expect(input.classes()).toEqual(
      expect.arrayContaining(['rounded', 'border', 'w-full', 'px-3', 'py-2', 'text-sm']),
    )
    expect(input.attributes('type')).toBe('text')
  })

  it('supports the compact size and inline (non-block) layout', () => {
    const wrapper = mount(BaseInput, { props: { size: 'sm', block: false } })
    const input = wrapper.find('input')
    expect(input.classes()).toEqual(expect.arrayContaining(['px-2', 'py-1.5']))
    expect(input.classes()).not.toContain('w-full')
  })

  it('emits the raw string on input (v-model contract)', async () => {
    const wrapper = mount(BaseInput, { props: { modelValue: '' } })
    await wrapper.find('input').setValue('12.5')
    expect(wrapper.emitted('update:modelValue')).toEqual([['12.5']])
  })

  it('passes through attrs and merges extra classes', () => {
    const wrapper = mount(BaseInput, {
      props: { type: 'number' },
      attrs: { step: '0.01', min: '0', placeholder: 'e.g. 5', class: 'font-mono' },
    })
    const input = wrapper.find('input')
    expect(input.attributes('step')).toBe('0.01')
    expect(input.attributes('min')).toBe('0')
    expect(input.attributes('placeholder')).toBe('e.g. 5')
    expect(input.classes()).toContain('font-mono')
    expect(input.attributes('type')).toBe('number')
  })
})
