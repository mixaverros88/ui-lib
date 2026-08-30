import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseBarDistribution from './BaseBarDistribution.vue'
import type { DistributionBar } from '../types/distribution'

const BARS: DistributionBar[] = [
  { label: '0.5', count: 1 },
  { label: '1', count: 4 },
  { label: '2', count: 2 },
]

describe('BaseBarDistribution', () => {
  it('renders one bar per entry with its count and label', () => {
    const wrap = mount(BaseBarDistribution, { props: { bars: BARS } })
    const bars = wrap.findAll('div[title]')
    expect(bars).toHaveLength(3)
    expect(wrap.text()).toContain('4')
    expect(wrap.text()).toContain('0.5')
  })

  it('scales bar heights against the tallest count, with a 3px floor', () => {
    const wrap = mount(BaseBarDistribution, {
      props: { bars: [...BARS, { label: '9', count: 0 }], maxBarHeight: 56 },
    })
    const heights = wrap
      .findAll('.rounded-t')
      .map((el) => el.attributes('style'))
    // count 4 → full height; count 2 → half; count 0 → 3px floor.
    expect(heights[1]).toContain('height: 56px')
    expect(heights[2]).toContain('height: 28px')
    expect(heights[3]).toContain('height: 3px')
  })

  it('builds singular/plural tooltips with the prefix and noun', () => {
    const wrap = mount(BaseBarDistribution, {
      props: { bars: BARS, titlePrefix: 'Take profit', countNoun: 'variant' },
    })
    const titles = wrap
      .findAll('div[title]')
      .map((el) => el.attributes('title'))
    expect(titles[0]).toBe('Take profit 0.5: 1 variant')
    expect(titles[1]).toBe('Take profit 1: 4 variants')
  })

  it('exposes the aria label on the chart container', () => {
    const wrap = mount(BaseBarDistribution, {
      props: { bars: BARS, ariaLabel: 'Distribution of X' },
    })
    expect(wrap.get('[role="img"]').attributes('aria-label')).toBe('Distribution of X')
  })
})
