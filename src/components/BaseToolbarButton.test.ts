import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseToolbarButton from './BaseToolbarButton.vue'

describe('BaseToolbarButton', () => {
  it('renders the neutral pill shape by default', () => {
    const wrapper = mount(BaseToolbarButton, { props: { label: 'Refresh' } })
    const cls = wrapper.find('button').classes()
    expect(cls).toContain('rounded-lg')
    expect(cls).toContain('py-2')
    expect(cls).toContain('font-medium')
    expect(cls).toContain('disabled:opacity-50')
    expect(wrapper.text()).toBe('Refresh')
  })

  it('keeps the danger variant on the pill shape with the red palette', () => {
    const wrapper = mount(BaseToolbarButton, {
      props: { label: 'Delete', variant: 'danger' },
    })
    const cls = wrapper.find('button').classes()
    expect(cls).toContain('rounded-lg')
    expect(cls).toContain('bg-red-600')
  })

  it('renders the ghost variant as the slate h-9 rounded-md outline button', () => {
    const wrapper = mount(BaseToolbarButton, {
      props: { label: 'Close', variant: 'ghost' },
    })
    const cls = wrapper.find('button').classes()
    expect(cls).toContain('h-9')
    expect(cls).toContain('rounded-md')
    expect(cls).toContain('px-4')
    expect(cls).toContain('font-semibold')
    expect(cls).toContain('border-slate-300')
    expect(cls).toContain('disabled:opacity-40')
    expect(cls).not.toContain('rounded-lg')
    expect(cls).not.toContain('py-2')
  })

  it('emits click and honours disabled', async () => {
    const wrapper = mount(BaseToolbarButton, { props: { label: 'Go' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)

    const disabled = mount(BaseToolbarButton, { props: { label: 'Go', disabled: true } })
    expect(disabled.find('button').attributes('disabled')).toBeDefined()
  })
})
