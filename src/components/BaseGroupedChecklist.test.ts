import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseGroupedChecklist from './BaseGroupedChecklist.vue'

const GROUPS = [
  { key: 'STOCK', label: 'Stocks', items: ['AMD', 'NVDA'] },
  { key: 'ETF', label: 'ETFs', items: [] },
  { key: 'CRYPTO', label: 'Crypto', items: ['BTC/USD'] },
]

function mountList(modelValue: string[] = []) {
  return mount(BaseGroupedChecklist, {
    props: {
      groups: GROUPS,
      modelValue,
      allAriaLabel: 'Select all symbols',
      itemAriaLabel: (s: string) => `Pick ${s}`,
      'onUpdate:modelValue': () => {},
    },
  })
}

const box = (w: ReturnType<typeof mountList>, label: string) =>
  w.find<HTMLInputElement>(`input[aria-label="${label}"]`)

const lastEmit = (w: ReturnType<typeof mountList>) =>
  (w.emitted('update:modelValue') as string[][][]).at(-1)![0]

describe('BaseGroupedChecklist', () => {
  it('renders non-empty groups with counts and reflects the model', () => {
    const w = mountList(['AMD'])
    expect(w.text()).toContain('Select all (3)')
    expect(w.text()).toContain('Stocks (2)')
    expect(w.text()).not.toContain('ETFs')
    expect(box(w, 'Pick AMD').element.checked).toBe(true)
    expect(box(w, 'Pick NVDA').element.checked).toBe(false)
    expect(box(w, 'Select all Stocks').element.checked).toBe(false)
    expect(box(w, 'Select all symbols').element.checked).toBe(false)
  })

  it('toggles one item', async () => {
    const w = mountList(['AMD'])
    await box(w, 'Pick BTC/USD').trigger('change')
    expect(lastEmit(w)).toEqual(['AMD', 'BTC/USD'])
    await box(w, 'Pick AMD').trigger('change')
    expect(lastEmit(w)).toEqual([])
  })

  it('selects and clears a whole group, leaving others alone', async () => {
    const w = mountList(['BTC/USD'])
    await box(w, 'Select all Stocks').trigger('change')
    expect(lastEmit(w)).toEqual(['AMD', 'NVDA', 'BTC/USD'])
    await w.setProps({ modelValue: ['AMD', 'NVDA', 'BTC/USD'] })
    await box(w, 'Select all Stocks').trigger('change')
    expect(lastEmit(w)).toEqual(['BTC/USD'])
  })

  it('master checkbox selects everything, then clears everything', async () => {
    const w = mountList([])
    await box(w, 'Select all symbols').trigger('change')
    expect(lastEmit(w)).toEqual(['AMD', 'NVDA', 'BTC/USD'])
    await w.setProps({ modelValue: ['AMD', 'NVDA', 'BTC/USD'] })
    expect(box(w, 'Select all symbols').element.checked).toBe(true)
    await box(w, 'Select all symbols').trigger('change')
    expect(lastEmit(w)).toEqual([])
  })

  it('emits in group order regardless of click order', async () => {
    const w = mountList(['BTC/USD'])
    await box(w, 'Pick AMD').trigger('change')
    expect(lastEmit(w)).toEqual(['AMD', 'BTC/USD'])
  })
})
