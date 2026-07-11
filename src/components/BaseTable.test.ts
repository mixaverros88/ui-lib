import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from './BaseTable.vue'
import type { TableColumn } from '../types/table'

const columns: TableColumn[] = [
  { label: 'Symbol' },
  { label: 'Qty', align: 'right' },
  { label: 'Bought' },
]

describe('BaseTable', () => {
  it('renders header cells with right-alignment where requested', () => {
    const wrapper = mount(BaseTable, { props: { columns } })
    const ths = wrapper.findAll('th')
    expect(ths.map((th) => th.text())).toEqual(['Symbol', 'Qty', 'Bought'])
    expect(ths[1].classes()).toContain('text-right')
    expect(ths[0].classes()).not.toContain('text-right')
    expect(ths[0].classes()).toEqual(expect.arrayContaining(['px-4', 'py-3']))
  })

  it('renders caller rows through the default slot', () => {
    const wrapper = mount(BaseTable, {
      props: { columns },
      slots: { default: '<tr><td>AMD</td><td>3</td><td>today</td></tr>' },
    })
    expect(wrapper.find('tbody td').text()).toBe('AMD')
    expect(wrapper.find('table').classes()).toEqual(expect.arrayContaining(['w-full', 'text-sm']))
  })

  it('renders the empty-state row spanning every column when empty', () => {
    const wrapper = mount(BaseTable, {
      props: { columns, empty: true, emptyText: 'Nothing here.' },
    })
    const td = wrapper.find('tbody td')
    expect(td.attributes('colspan')).toBe('3')
    expect(td.text()).toBe('Nothing here.')
  })

  it('prefers the empty slot over emptyText', () => {
    const wrapper = mount(BaseTable, {
      props: { columns, empty: true, emptyText: 'fallback' },
      slots: { empty: 'No trades match your filters.' },
    })
    expect(wrapper.find('tbody td').text()).toBe('No trades match your filters.')
  })

  it('renders no empty-state row when not empty', () => {
    const wrapper = mount(BaseTable, {
      props: { columns, empty: false },
      slots: { default: '<tr><td>row</td></tr>' },
    })
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
  })
})
