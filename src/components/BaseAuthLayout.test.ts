import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import BaseAuthLayout from './BaseAuthLayout.vue'
import BaseBooleanBadge from './BaseBooleanBadge.vue'

const global = { stubs: { RouterLink: RouterLinkStub } }

describe('BaseAuthLayout', () => {
  it('renders the default logo, title, content and footer', () => {
    const wrapper = mount(BaseAuthLayout, {
      props: { title: 'Sign in' },
      slots: { default: '<form>form</form>', footer: 'No account? <a>Sign up</a>' },
      global,
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Sign in')
    expect(wrapper.find('form').text()).toBe('form')
    expect(wrapper.text()).toContain('No account? Sign up')
  })

  it('lets the logo slot replace the default logo', () => {
    const wrapper = mount(BaseAuthLayout, { slots: { logo: '<img alt="brand" />' }, global })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('widens the card with `wide`', () => {
    const card = (w: ReturnType<typeof mount>) => w.find('.rounded-xl')
    expect(card(mount(BaseAuthLayout, { global })).classes()).toContain('max-w-md')
    expect(card(mount(BaseAuthLayout, { props: { wide: true }, global })).classes()).toContain('max-w-3xl')
  })
})

describe('BaseBooleanBadge', () => {
  it('renders a green "Yes" pill for true and a red "No" pill for false', () => {
    const yes = mount(BaseBooleanBadge, { props: { value: true } })
    expect(yes.text()).toBe('Yes')
    expect(yes.classes()).toContain('bg-emerald-50')
    const no = mount(BaseBooleanBadge, { props: { value: false } })
    expect(no.text()).toBe('No')
    expect(no.classes()).toContain('bg-red-50')
  })

  it('uses custom labels and treats null as false', () => {
    const w = mount(BaseBooleanBadge, { props: { value: null, trueLabel: 'Verified', falseLabel: 'Not verified' } })
    expect(w.text()).toBe('Not verified')
  })
})
