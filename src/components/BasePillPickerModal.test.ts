import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasePillPickerModal from './BasePillPickerModal.vue'
import type { PillPickerItem } from '../types/pillPicker'

const items: PillPickerItem[] = [
  { id: 'STOCK:AAPL', label: 'AAPL', group: 'STOCK' },
  { id: 'STOCK:MSFT', label: 'MSFT', group: 'STOCK', title: 'Microsoft' },
  { id: 'CRYPTO:BTC/USD', label: 'BTC/USD', group: 'CRYPTO' },
]

const groups = [
  { value: 'STOCK', label: 'Stock' },
  { value: 'CRYPTO', label: 'Crypto' },
]

function mountPicker(props: Record<string, unknown> = {}) {
  return mount(BasePillPickerModal, {
    props: { title: 'Pick one', items, ...props },
    global: { stubs: { teleport: true } },
  })
}

// Pills are the buttons inside the flex-wrap grid — not the segmented
// control's buttons and not the footer Close.
function pillLabels(wrapper: ReturnType<typeof mountPicker>): string[] {
  return wrapper
    .findAll('.flex.flex-wrap.gap-2 > button')
    .map((b) => b.text())
}

describe('BasePillPickerModal', () => {
  it('renders one pill per item and emits pick with the clicked item', async () => {
    const wrapper = mountPicker()
    expect(pillLabels(wrapper)).toEqual(['AAPL', 'MSFT', 'BTC/USD'])
    await wrapper.findAll('.flex.flex-wrap.gap-2 > button')[1].trigger('click')
    expect(wrapper.emitted('pick')).toEqual([[items[1]]])
  })

  it('narrows by free text, case-insensitively, and shows the no-match message', async () => {
    const wrapper = mountPicker({ noMatchMessage: 'nothing here' })
    await wrapper.find('input').setValue('btc')
    expect(pillLabels(wrapper)).toEqual(['BTC/USD'])
    await wrapper.find('input').setValue('zzz')
    expect(wrapper.text()).toContain('nothing here')
  })

  it('renders the group toggle with All prepended and narrows by group', async () => {
    const wrapper = mountPicker({ groups })
    // Re-query before each click — the grid re-render replaces the buttons,
    // so a wrapper captured before a click goes stale.
    const seg = () => wrapper.findAll('[role="group"] button')
    expect(seg().map((b) => b.text())).toEqual(['All', 'Stock', 'Crypto'])
    await seg()[2].trigger('click')
    expect(pillLabels(wrapper)).toEqual(['BTC/USD'])
    await seg()[0].trigger('click')
    expect(pillLabels(wrapper)).toEqual(['AAPL', 'MSFT', 'BTC/USD'])
  })

  it('hides the group toggle when no groups are passed', () => {
    const wrapper = mountPicker()
    expect(wrapper.find('[role="group"]').exists()).toBe(false)
  })

  it('shows the empty message instead of the filter row when there are no items', () => {
    const wrapper = mountPicker({ items: [], emptyMessage: 'nothing configured' })
    expect(wrapper.text()).toContain('nothing configured')
    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('applies the mono font to the input and pills only when asked', () => {
    const mono = mountPicker({ mono: true })
    expect(mono.find('input').classes()).toContain('font-mono')
    expect(mono.findAll('.flex.flex-wrap.gap-2 > button')[0].classes()).toContain('font-mono')

    const plain = mountPicker()
    expect(plain.find('input').classes()).not.toContain('font-mono')
  })

  it('forwards an item title to the pill tooltip', () => {
    const wrapper = mountPicker()
    expect(
      wrapper.findAll('.flex.flex-wrap.gap-2 > button')[1].attributes('title'),
    ).toBe('Microsoft')
  })

  it('emits close from the footer button', async () => {
    const wrapper = mountPicker({ closeText: 'Dismiss' })
    const buttons = wrapper.findAll('button')
    const closeBtn = buttons[buttons.length - 1]
    expect(closeBtn.text()).toBe('Dismiss')
    await closeBtn.trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
