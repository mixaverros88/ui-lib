import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTextarea from './BaseTextarea.vue'

describe('BaseTextarea', () => {
  it('emits the typed value and passes attrs through', async () => {
    const wrapper = mount(BaseTextarea, { props: { modelValue: 'a' }, attrs: { rows: '3' } })
    expect(wrapper.attributes('rows')).toBe('3')
    await wrapper.setValue('ab')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['ab'])
  })

  it('renders null as empty', () => {
    const wrapper = mount(BaseTextarea, { props: { modelValue: null } })
    expect((wrapper.element as HTMLTextAreaElement).value).toBe('')
  })
})
