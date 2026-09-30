import { describe, it, expect } from 'vitest'
import { h, Fragment, createTextVNode } from 'vue'
import { humanizeEnum, humanizeTextVNodes } from './humanize'

describe('humanizeEnum', () => {
  it('replaces every underscore with a space', () => {
    expect(humanizeEnum('BLUE_SKY')).toBe('BLUE SKY')
    expect(humanizeEnum('A_B_C')).toBe('A B C')
  })

  it('returns an empty string for null / undefined', () => {
    expect(humanizeEnum(null)).toBe('')
    expect(humanizeEnum(undefined)).toBe('')
  })
})

describe('humanizeTextVNodes', () => {
  it('rewrites text nodes and walks fragments', () => {
    const [text, frag] = humanizeTextVNodes([
      createTextVNode('PROFIT_TARGET'),
      h(Fragment, [createTextVNode('RSI_REVERT')]),
    ])
    expect(text.children).toBe('PROFIT TARGET')
    expect((frag.children as any[])[0].children).toBe('RSI REVERT')
  })

  it('leaves elements alone unless their tag is listed', () => {
    const span = h('span', 'KEEP_ME')
    expect(humanizeTextVNodes([span])[0]).toBe(span)

    const [opt] = humanizeTextVNodes([h('option', { value: 'BLUE_SKY' }, 'BLUE_SKY')], ['option'])
    expect(opt.children).toBe('BLUE SKY')
    expect(opt.props?.value).toBe('BLUE_SKY')
  })
})
