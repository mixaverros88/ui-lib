import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from './BaseCard.vue'
import BaseField from './BaseField.vue'

describe('BaseCard', () => {
  it('renders the bordered surface with the body slot', () => {
    const wrapper = mount(BaseCard, { slots: { default: '<p>body</p>' } })
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['rounded-xl', 'border', 'shadow-sm']))
    expect(wrapper.find('p').text()).toBe('body')
    expect(wrapper.find('header').exists()).toBe(false)
    expect(wrapper.find('footer').exists()).toBe(false)
  })

  it('renders header (title, subtitle, actions) and footer when given', () => {
    const wrapper = mount(BaseCard, {
      props: { title: 'Template', subtitle: 'Edit it' },
      slots: { actions: '<button>New</button>', footer: '<button>Save</button>' },
    })
    expect(wrapper.find('header h2').text()).toBe('Template')
    expect(wrapper.find('header').text()).toContain('Edit it')
    expect(wrapper.find('header button').text()).toBe('New')
    expect(wrapper.find('footer button').text()).toBe('Save')
  })

  it('supports compact and no body padding', () => {
    expect(mount(BaseCard, { props: { padding: 'sm' } }).find('section > div').classes()).toContain('p-4')
    expect(mount(BaseCard, { props: { padding: 'none' } }).find('section > div').classes()).toEqual([])
  })
})

describe('BaseField', () => {
  it('renders label (wired to the control), control and hint', () => {
    const wrapper = mount(BaseField, {
      props: { label: 'Name', labelFor: 'name', hint: 'Your name', required: true },
      slots: { default: '<input id="name" />' },
    })
    expect(wrapper.find('label').attributes('for')).toBe('name')
    expect(wrapper.find('label').text()).toBe('Name*')
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.text()).toContain('Your name')
  })

  it('shows the error instead of the hint', () => {
    const wrapper = mount(BaseField, { props: { label: 'Name', hint: 'h', error: 'Required' } })
    expect(wrapper.find('[role=alert]').text()).toBe('Required')
    expect(wrapper.text()).not.toContain('h\n')
  })

  it('uses the small uppercase label and flex growth for filter bars', () => {
    const wrapper = mount(BaseField, { props: { label: 'Search', compact: true, grow: true } })
    expect(wrapper.find('label').classes()).toEqual(expect.arrayContaining(['uppercase', 'text-xs']))
    expect(wrapper.classes()).toContain('flex-1')
  })
})
