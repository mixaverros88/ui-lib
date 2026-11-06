import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BaseField from './BaseField.vue'

describe('BaseField label association', () => {
  it('links the label to the slotted control when labelFor is not set', async () => {
    const wrapper = mount(BaseField, { props: { label: 'Name' }, slots: { default: '<input />' } })
    await nextTick()
    const id = wrapper.find('input').attributes('id')
    expect(id).toBeTruthy()
    expect(wrapper.find('label').attributes('for')).toBe(id)
  })

  it('keeps an id the control already has', async () => {
    const wrapper = mount(BaseField, { props: { label: 'Name' }, slots: { default: '<input id="own" />' } })
    await nextTick()
    expect(wrapper.find('label').attributes('for')).toBe('own')
  })

  it('prefers an explicit labelFor', async () => {
    const wrapper = mount(BaseField, {
      props: { label: 'Name', labelFor: 'x' },
      slots: { default: '<input />' },
    })
    await nextTick()
    expect(wrapper.find('label').attributes('for')).toBe('x')
    expect(wrapper.find('input').attributes('id')).toBeUndefined()
  })
})
