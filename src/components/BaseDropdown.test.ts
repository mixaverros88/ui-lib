import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseDropdown from './BaseDropdown.vue'
import type { DropdownOption } from '../types/dropdown'

const options: DropdownOption[] = [
  { value: '1', label: 'Alice' },
  { value: '2', label: 'Bob', title: 'Bob the builder' },
  { value: '3', label: 'Carol', disabled: true },
]

describe('BaseDropdown', () => {
  it('shows the placeholder when nothing is selected', () => {
    const wrapper = mount(BaseDropdown, {
      props: { options, modelValue: null, placeholder: 'Select Social User' },
    })
    const trigger = wrapper.get('button')
    expect(trigger.text()).toContain('Select Social User')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    // Menu is closed until the trigger is clicked.
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
  })

  it('shows the selected option label instead of the placeholder', () => {
    const wrapper = mount(BaseDropdown, {
      props: { options, modelValue: '2', placeholder: 'Select Social User' },
    })
    expect(wrapper.get('button').text()).toContain('Bob')
    expect(wrapper.get('button').text()).not.toContain('Select Social User')
  })

  it('opens the menu and renders one row per option on click', async () => {
    const wrapper = mount(BaseDropdown, { props: { options, modelValue: null } })
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
    const rows = wrapper.findAll('[role="option"]')
    expect(rows.map((r) => r.text())).toEqual(['Alice', 'Bob', 'Carol'])
    expect(rows[1].attributes('title')).toBe('Bob the builder')
  })

  it('emits update:modelValue and closes when a row is chosen', async () => {
    const wrapper = mount(BaseDropdown, { props: { options, modelValue: null } })
    await wrapper.get('button').trigger('click')
    await wrapper.findAll('[role="option"] button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['2']])
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
  })

  it('does not emit for a disabled row', async () => {
    const wrapper = mount(BaseDropdown, { props: { options, modelValue: null } })
    await wrapper.get('button').trigger('click')
    await wrapper.findAll('[role="option"] button')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('marks the selected row with aria-selected and the active fill', async () => {
    const wrapper = mount(BaseDropdown, { props: { options, modelValue: '1' } })
    await wrapper.get('button').trigger('click')
    const rows = wrapper.findAll('[role="option"]')
    expect(rows[0].attributes('aria-selected')).toBe('true')
    expect(rows[1].attributes('aria-selected')).toBe('false')
    expect(rows[0].get('button').classes()).toContain('bg-emerald-500')
  })
})
