import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import BaseDateTimePicker from './BaseDateTimePicker.vue'

function picker(props: Record<string, unknown> = {}, attrs: Record<string, unknown> = {}) {
  return mount(BaseDateTimePicker, { props, attrs }).findComponent(VueDatePicker)
}

describe('BaseDateTimePicker', () => {
  it('defaults to date + 24h time, teleported, with the dd/MM/yyyy HH:mm format', () => {
    const dp = picker()
    expect(dp.props('timePicker')).toBe(false)
    expect(dp.props('timeConfig')).toMatchObject({ enableTimePicker: true, is24: true })
    expect(dp.props('formats')).toEqual({ input: 'dd/MM/yyyy HH:mm' })
    expect(dp.props('teleport')).toBe(true)
  })

  it("mode 'date' hides the time picker", () => {
    const dp = picker({ mode: 'date' })
    expect(dp.props('timeConfig')).toMatchObject({ enableTimePicker: false })
    expect(dp.props('formats')).toEqual({ input: 'dd/MM/yyyy' })
  })

  it("mode 'time' switches to the time-only picker, 12h when is24=false", () => {
    const dp = picker({ mode: 'time', is24: false })
    expect(dp.props('timePicker')).toBe(true)
    expect(dp.props('formats')).toEqual({ input: 'hh:mm a' })
  })

  it('custom format and timeConfig override the defaults', () => {
    const dp = picker({ format: 'yyyy-MM-dd', timeConfig: { enableSeconds: true } })
    expect(dp.props('formats')).toEqual({ input: 'yyyy-MM-dd' })
    expect(dp.props('timeConfig')).toMatchObject({ enableTimePicker: true, enableSeconds: true })
  })

  it('passes unknown props through to VueDatePicker', () => {
    const dp = picker({}, { range: true, placeholder: 'Pick a date' })
    expect(dp.props('range')).toBe(true)
    expect(dp.props('placeholder')).toBe('Pick a date')
  })

  it('re-emits update:modelValue (v-model contract)', async () => {
    const wrapper = mount(BaseDateTimePicker)
    const date = new Date(2026, 8, 27, 10, 30)
    wrapper.findComponent(VueDatePicker).vm.$emit('update:model-value', date)
    expect(wrapper.emitted('update:modelValue')).toEqual([[date]])
  })
})
