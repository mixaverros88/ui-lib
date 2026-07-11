import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSpecFields from './BaseSpecFields.vue'
import type { SpecField } from '../types/specField'

const specs: SpecField[] = [
  { key: 'mode', label: 'Mode', type: 'select', options: ['fast', 'slow'] },
  { key: 'enabled', label: 'Enabled', type: 'boolean' },
  { key: 'threshold', label: 'Threshold', type: 'decimal', min: 0, help: 'Trigger level.' },
  { key: 'lookback', label: 'Lookback', type: 'integer' },
]

const params = { mode: 'fast', enabled: true, threshold: 1.5, lookback: 10 }

function mountFields(extra = {}) {
  return mount(BaseSpecFields, { props: { specs, params }, ...extra })
}

describe('BaseSpecFields', () => {
  it('renders a select, a checkbox and number inputs per spec type', () => {
    const wrapper = mountFields()
    expect(wrapper.findAll('select')).toHaveLength(1)
    expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(1)
    expect(wrapper.findAll('input[type="number"]')).toHaveLength(2)
    expect(wrapper.text()).toContain('Trigger level.')
  })

  it('defaults numeric steps to 1 for integers and 0.01 for decimals', () => {
    const inputs = mountFields().findAll('input[type="number"]')
    expect(inputs[0].attributes('step')).toBe('0.01')
    expect(inputs[1].attributes('step')).toBe('1')
    expect(inputs[0].attributes('min')).toBe('0')
  })

  it('emits update(key, value) for select changes', async () => {
    const wrapper = mountFields()
    await wrapper.find('select').setValue('slow')
    expect(wrapper.emitted('update')).toEqual([['mode', 'slow']])
  })

  it('emits update(key, checked) for checkbox toggles', async () => {
    const wrapper = mountFields()
    await wrapper.find('input[type="checkbox"]').setValue(false)
    expect(wrapper.emitted('update')).toEqual([['enabled', false]])
  })

  it('parses numeric input, passing unparseable values through raw', async () => {
    const wrapper = mountFields()
    const threshold = wrapper.findAll('input[type="number"]')[0]
    await threshold.setValue('2.25')
    await threshold.setValue('')
    expect(wrapper.emitted('update')).toEqual([
      ['threshold', 2.25],
      ['threshold', ''],
    ])
  })

  it('never mutates params directly', async () => {
    const frozen = Object.freeze({ ...params })
    const wrapper = mount(BaseSpecFields, { props: { specs, params: frozen } })
    await wrapper.find('select').setValue('slow')
    expect(frozen.mode).toBe('fast')
  })

  it('exposes each spec to the after slot', () => {
    const wrapper = mountFields({
      slots: {
        after: `<template #after="{ spec }"><p class="after-probe">{{ spec.key }}</p></template>`,
      },
    })
    expect(wrapper.findAll('.after-probe').map((p) => p.text())).toEqual([
      'mode',
      'enabled',
      'threshold',
      'lookback',
    ])
  })
})
