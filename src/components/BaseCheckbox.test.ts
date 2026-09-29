import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCheckbox from './BaseCheckbox.vue'

describe('BaseCheckbox', () => {
  it('is rounded and emerald when checked', () => {
    const input = mount(BaseCheckbox).find('input')
    expect(input.classes()).toEqual(expect.arrayContaining(['rounded-md', 'text-emerald-600', 'accent-emerald-600']))
  })

  it('reflects modelValue and emits the new value on change', async () => {
    const wrapper = mount(BaseCheckbox, { props: { modelValue: false } })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).checked).toBe(false)
    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.emitted('change')).toEqual([[true]])
  })

  it('renders the label and forwards attrs to the input', () => {
    const wrapper = mount(BaseCheckbox, { props: { label: 'Remember me' }, attrs: { id: 'remember' } })
    expect(wrapper.text()).toBe('Remember me')
    expect(wrapper.find('input').attributes('id')).toBe('remember')
  })

  it('can be disabled', () => {
    const wrapper = mount(BaseCheckbox, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })
})
