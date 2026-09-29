import { describe, it, expect, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import BaseSearchSelect from './BaseSearchSelect.vue'
import type { DropdownOption } from '../types/dropdown'

const options: DropdownOption[] = [
  { value: 1, label: 'Alice' },
  { value: 2, label: 'Bob' },
  { value: 3, label: 'Carol', disabled: true },
]

let wrapper: VueWrapper | undefined
afterEach(() => wrapper?.unmount())

function mountIt(props: Record<string, unknown> = {}) {
  wrapper = mount(BaseSearchSelect, { props: { options, ...props }, attachTo: document.body })
  return wrapper
}

describe('BaseSearchSelect', () => {
  it('shows the placeholder, or the selected label in single mode', async () => {
    const w = mountIt({ placeholder: 'Select User' })
    expect(w.find('input').attributes('placeholder')).toBe('Select User')
    await w.setProps({ modelValue: 2 })
    expect(w.find('input').attributes('placeholder')).toBe('Bob')
  })

  it('opens on focus and filters options by the typed text', async () => {
    const w = mountIt()
    const input = w.find('input')
    await input.trigger('focus')
    expect(w.findAll('[role=option]')).toHaveLength(3)
    await input.setValue('ali')
    expect(w.findAll('[role=option]').map((o) => o.text())).toEqual(['Alice'])
  })

  it('shows a no-results row when nothing matches', async () => {
    const w = mountIt({ noResultsText: 'Nothing.' })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('zzz')
    expect(w.find('[role=listbox]').text()).toBe('Nothing.')
  })

  it('emits the picked value and closes in single mode', async () => {
    const w = mountIt()
    await w.find('input').trigger('focus')
    await w.findAll('[role=option]')[1].trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[2]])
    expect(w.find('[role=listbox]').exists()).toBe(false)
  })

  it('ignores disabled options', async () => {
    const w = mountIt()
    await w.find('input').trigger('focus')
    await w.findAll('[role=option]')[2].trigger('click')
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })

  it('toggles values and stays open in multiple mode', async () => {
    const w = mountIt({ multiple: true, modelValue: [1] })
    await w.find('input').trigger('focus')
    await w.findAll('[role=option]')[1].trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([[1, 2]])
    await w.findAll('[role=option]')[0].trigger('click')
    expect(w.emitted('update:modelValue')?.[1]).toEqual([[]])
    expect(w.find('[role=listbox]').exists()).toBe(true)
  })

  it('renders chips for selected values and removes one on ×', async () => {
    const w = mountIt({ multiple: true, modelValue: [1, 2] })
    const remove = w.find('[aria-label="Remove Alice"]')
    expect(remove.exists()).toBe(true)
    await remove.trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[[2]]])
  })

  it('removes the last chip on Backspace with an empty search', async () => {
    const w = mountIt({ multiple: true, modelValue: [1, 2] })
    await w.find('input').trigger('keydown', { key: 'Backspace' })
    expect(w.emitted('update:modelValue')).toEqual([[[1]]])
  })

  it('picks with the keyboard, skipping disabled rows', async () => {
    const w = mountIt()
    const input = w.find('input')
    await input.trigger('keydown', { key: 'ArrowDown' }) // opens, Alice active
    await input.trigger('keydown', { key: 'ArrowDown' }) // Bob
    await input.trigger('keydown', { key: 'ArrowDown' }) // Carol disabled → wraps to Alice
    await input.trigger('keydown', { key: 'Enter' })
    expect(w.emitted('update:modelValue')).toEqual([[1]])
  })

  it('clears to null (single) or [] (multiple)', async () => {
    const single = mountIt({ modelValue: 1 })
    await single.find('[aria-label="Clear selection"]').trigger('click')
    expect(single.emitted('update:modelValue')).toEqual([[null]])
    single.unmount()

    const multi = mountIt({ multiple: true, modelValue: [1] })
    await multi.find('[aria-label="Clear selection"]').trigger('click')
    expect(multi.emitted('update:modelValue')).toEqual([[[]]])
  })

  it('closes on Escape and on an outside click', async () => {
    const w = mountIt()
    await w.find('input').trigger('focus')
    await w.find('input').trigger('keydown', { key: 'Escape' })
    expect(w.find('[role=listbox]').exists()).toBe(false)

    await w.find('input').trigger('blur')
    await w.find('input').trigger('focus')
    expect(w.find('[role=listbox]').exists()).toBe(true)
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await w.vm.$nextTick()
    expect(w.find('[role=listbox]').exists()).toBe(false)
  })
})
