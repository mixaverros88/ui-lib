import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCodeBlock from './BaseCodeBlock.vue'
import { useTheme } from '../composables/useTheme'

function ensureLight() {
  const { isDark, toggleTheme } = useTheme()
  if (isDark.value) toggleTheme()
}

describe('BaseCodeBlock', () => {
  beforeEach(() => {
    ensureLight()
  })

  it('renders the code verbatim inside a <pre>', () => {
    const code = '{\n  "a": 1\n}'
    const wrapper = mount(BaseCodeBlock, { props: { code } })
    const pre = wrapper.find('pre')
    expect(pre.exists()).toBe(true)
    expect(pre.text()).toBe(code)
    expect(pre.classes()).toContain('font-mono')
    expect(pre.classes()).toContain('overflow-auto')
  })

  it('defaults to the soft variant at size sm', () => {
    const wrapper = mount(BaseCodeBlock, { props: { code: 'x' } })
    const classes = wrapper.find('pre').classes()
    expect(classes).toContain('bg-gray-100')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('px-5')
    expect(classes).not.toContain('border')
  })

  it('renders the bordered variant with a border and card fill', () => {
    const wrapper = mount(BaseCodeBlock, {
      props: { code: 'x', variant: 'bordered' },
    })
    const classes = wrapper.find('pre').classes()
    expect(classes).toContain('border')
    expect(classes).toContain('bg-white')
    expect(classes).toContain('border-gray-200')
  })

  it('renders dense padding at size xs', () => {
    const wrapper = mount(BaseCodeBlock, { props: { code: 'x', size: 'xs' } })
    const classes = wrapper.find('pre').classes()
    expect(classes).toContain('text-xs')
    expect(classes).toContain('p-3')
  })

  it('applies maxHeightClass and merges fallthrough classes', () => {
    const wrapper = mount(BaseCodeBlock, {
      props: { code: 'x', maxHeightClass: 'max-h-96' },
      attrs: { class: 'mx-4' },
    })
    const classes = wrapper.find('pre').classes()
    expect(classes).toContain('max-h-96')
    expect(classes).toContain('mx-4')
  })

  it('switches palette when the theme flips', async () => {
    const wrapper = mount(BaseCodeBlock, { props: { code: 'x' } })
    const { toggleTheme } = useTheme()
    toggleTheme()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('pre').classes()).toContain('bg-gray-800/70')
    toggleTheme()
  })
})
