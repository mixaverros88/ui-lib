import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseDetailList from './BaseDetailList.vue'

describe('BaseDetailList', () => {
  it('renders each label with its value', () => {
    const wrapper = mount(BaseDetailList, {
      props: { items: [{ label: 'Status', value: 'PUBLISHED' }, { label: 'Count', value: 3 }] },
    })
    expect(wrapper.findAll('dt').map((d) => d.text())).toEqual(['Status', 'Count'])
    expect(wrapper.findAll('dd').map((d) => d.text())).toEqual(['PUBLISHED', '3'])
  })

  it('shows the empty text for missing values', () => {
    const wrapper = mount(BaseDetailList, {
      props: { items: [{ label: 'Link', value: null }, { label: 'Tags', value: '' }], emptyText: 'n/a' },
    })
    expect(wrapper.findAll('dd').map((d) => d.text())).toEqual(['n/a', 'n/a'])
  })

  it('renders href values as external links and applies mono', () => {
    const wrapper = mount(BaseDetailList, {
      props: { items: [{ label: 'Link', value: 'open', href: 'https://x.test' }, { label: 'Id', value: 'abc', mono: true }] },
    })
    const a = wrapper.find('a')
    expect(a.attributes('href')).toBe('https://x.test')
    expect(a.attributes('target')).toBe('_blank')
    expect(wrapper.findAll('dd')[1].classes()).toContain('font-mono')
  })

  it('switches the grid columns', () => {
    expect(mount(BaseDetailList, { props: { items: [], columns: 1 } }).classes()).not.toContain('sm:grid-cols-[repeat(2,minmax(0,1fr))]')
    expect(mount(BaseDetailList, { props: { items: [] } }).classes()).toContain('sm:grid-cols-[repeat(2,minmax(0,1fr))]')
    expect(mount(BaseDetailList, { props: { items: [], columns: 3 } }).classes()).toContain('lg:grid-cols-[repeat(3,minmax(0,1fr))]')
  })
})
