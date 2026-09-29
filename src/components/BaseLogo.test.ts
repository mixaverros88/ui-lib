import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount, RouterLinkStub } from '@vue/test-utils'
import BaseLogo from './BaseLogo.vue'

describe('BaseLogo', () => {
  it('gives each instance its own gradient ids and references them', () => {
    const Two = defineComponent({ render: () => [h(BaseLogo), h(BaseLogo)] })
    const wrapper = mount(Two, { global: { stubs: { RouterLink: RouterLinkStub } } })

    const svgs = wrapper.findAll('svg')
    expect(svgs).toHaveLength(2)

    const ids = svgs.map((svg) => svg.findAll('linearGradient').map((g) => g.attributes('id')))
    // No id is shared between the two logos.
    expect(ids[0].filter((id) => ids[1].includes(id))).toEqual([])

    // Every fill in a logo points at a gradient inside that same logo.
    svgs.forEach((svg, i) => {
      svg.findAll('path').forEach((path) => {
        const ref = path.attributes('fill')?.match(/^url\(#(.+)\)$/)?.[1]
        expect(ids[i]).toContain(ref)
      })
    })
  })
})
