import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import BaseSidebarUser from './BaseSidebarUser.vue'

const global = { stubs: { RouterLink: RouterLinkStub } }

describe('BaseSidebarUser', () => {
  it('shows initials, name and email', () => {
    const wrapper = mount(BaseSidebarUser, { props: { name: 'john.doe', email: 'j@d.test' }, global })
    expect(wrapper.text()).toContain('JD')
    expect(wrapper.text()).toContain('john.doe')
    expect(wrapper.text()).toContain('j@d.test')
  })

  it('links to the profile when `to` is set', () => {
    const wrapper = mount(BaseSidebarUser, { props: { name: 'test', to: { name: 'Profile' } }, global })
    expect(wrapper.findComponent(RouterLinkStub).props('to')).toEqual({ name: 'Profile' })
  })

  it('emits logout from the button, and can hide it', async () => {
    const wrapper = mount(BaseSidebarUser, { props: { name: 'test' }, global })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('logout')).toHaveLength(1)
    expect(mount(BaseSidebarUser, { props: { name: 'test', showLogout: false }, global }).find('button').exists()).toBe(false)
  })
})
