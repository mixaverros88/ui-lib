import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import BaseStatCard from './BaseStatCard.vue'

const global = { stubs: { RouterLink: RouterLinkStub } }

describe('BaseStatCard', () => {
  it('renders title, value and subtitle with the dashed accent border', () => {
    const wrapper = mount(BaseStatCard, {
      props: { title: 'Categories', value: 71, subtitle: 'in total', accent: 'sky' },
      global,
    })
    expect(wrapper.text()).toContain('Categories')
    expect(wrapper.text()).toContain('71')
    expect(wrapper.text()).toContain('in total')
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['border-dashed', 'border-sky-300']))
  })

  it('is a plain div without `to` and a router link with it', () => {
    expect(mount(BaseStatCard, { props: { title: 'A' }, global }).element.tagName).toBe('DIV')
    const link = mount(BaseStatCard, { props: { title: 'A', to: '/category' }, global })
    expect(link.findComponent(RouterLinkStub).props('to')).toBe('/category')
  })

  it('renders the icon chip only when the icon slot is filled', () => {
    const plain = mount(BaseStatCard, { props: { title: 'A' }, global })
    expect(plain.find('.rounded-xl .rounded-xl').exists()).toBe(false)
    const withIcon = mount(BaseStatCard, {
      props: { title: 'A', accent: 'red' },
      slots: { icon: '<template #icon="{ iconClass }"><i :class="iconClass" /></template>' },
      global,
    })
    expect(withIcon.find('i').classes()).toEqual(expect.arrayContaining(['h-6', 'w-6', 'text-red-500']))
  })

  it('omits the subtitle line when empty', () => {
    const wrapper = mount(BaseStatCard, { props: { title: 'A', value: 1 }, global })
    expect(wrapper.findAll('p')).toHaveLength(2)
  })
})
