import { describe, it, expect } from 'vitest'
import { findNativeDateInputs } from '../../scripts/check-date-inputs.mjs'

describe('findNativeDateInputs', () => {
  it.each(['date', 'time', 'datetime-local', 'month', 'week'])('flags a raw input of type %s', (type) => {
    expect(findNativeDateInputs(`<input type="${type}" />`)).toEqual([{ line: 1, type }])
  })

  it('flags BaseInput in either casing, across lines, and reports the opening line', () => {
    const source = `<div />\n<BaseInput\n  v-model="day"\n  type="date"\n/>\n<base-input type="time" />`
    expect(findNativeDateInputs(source)).toEqual([
      { line: 2, type: 'date' },
      { line: 6, type: 'time' },
    ])
  })

  it('ignores other input types, other elements and comments', () => {
    const source = `<input type="text" /><BaseInput type="number" /><NotificationTypeBadge type="date" />
<!-- <input type="date"> -->`
    expect(findNativeDateInputs(source)).toEqual([])
  })
})
