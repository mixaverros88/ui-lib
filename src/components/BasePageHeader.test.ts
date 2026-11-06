import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasePageHeader from './BasePageHeader.vue'

const hasGauge = (wrapper: ReturnType<typeof mount>) =>
  wrapper.find('h1 span[aria-hidden="true"]').exists()

describe('BasePageHeader accent', () => {
  it('shows the gauge bar by default on icon-less headers', () => {
    expect(hasGauge(mount(BasePageHeader, { props: { title: 'Dashboard' } }))).toBe(true)
  })

  it('hides the gauge bar when an icon badge is present', () => {
    const wrapper = mount(BasePageHeader, {
      props: { title: 'Dashboard' },
      slots: { icon: '<svg />' },
    })
    expect(hasGauge(wrapper)).toBe(false)
  })

  it('honours an explicit opt-out and opt-in', () => {
    expect(hasGauge(mount(BasePageHeader, { props: { title: 'A', accent: false } }))).toBe(false)
    const withIcon = mount(BasePageHeader, {
      props: { title: 'A', accent: true },
      slots: { icon: '<svg />' },
    })
    expect(hasGauge(withIcon)).toBe(true)
  })
})
