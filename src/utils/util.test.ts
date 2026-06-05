import { describe, it, expect } from 'vitest'
import { getBaseColor, getBaseColorOf } from './util'
import { AlertEnum } from '../enums/AlertEnum'
import { ColorsEnums } from '../enums/ColorsEnums'

describe('getBaseColor', () => {
  it('maps each alert variant to a Tailwind colour name', () => {
    expect(getBaseColor(AlertEnum.ERROR)).toBe('red')
    expect(getBaseColor(AlertEnum.SUCCESS)).toBe('green')
    expect(getBaseColor(AlertEnum.INFO)).toBe('gray')
    expect(getBaseColor(AlertEnum.WARNING)).toBe('yellow')
  })
})

describe('getBaseColorOf', () => {
  it('maps each colour enum to a Tailwind colour name', () => {
    expect(getBaseColorOf(ColorsEnums.GREEN)).toBe('green')
    expect(getBaseColorOf(ColorsEnums.RED)).toBe('red')
    expect(getBaseColorOf(ColorsEnums.BLUE)).toBe('blue')
    expect(getBaseColorOf(ColorsEnums.YELLOW)).toBe('yellow')
    expect(getBaseColorOf(ColorsEnums.BLACK)).toBe('black')
    expect(getBaseColorOf(ColorsEnums.GRAY)).toBe('gray')
  })

  it('returns an empty string for NONE', () => {
    expect(getBaseColorOf(ColorsEnums.NONE)).toBe('')
  })
})
