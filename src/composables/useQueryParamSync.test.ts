import { describe, it, expect, vi, beforeEach } from 'vitest'

const replace = vi.fn()
let query: Record<string, string> = {}

vi.mock('vue-router', () => ({
  useRoute: () => ({ query }),
  useRouter: () => ({ replace }),
}))

import { useQueryParamSync } from './useQueryParamSync'

beforeEach(() => {
  replace.mockReset()
  query = {}
})

describe('qparam / qenum', () => {
  it('reads string params and returns "" for absent ones', () => {
    query = { q: 'AMD' }
    const { qparam } = useQueryParamSync()
    expect(qparam('q')).toBe('AMD')
    expect(qparam('missing')).toBe('')
  })

  it('qenum only accepts allowed values, else the fallback', () => {
    query = { range: '7D', bogus: 'nope' }
    const { qenum } = useQueryParamSync()
    expect(qenum('range', ['1D', '7D', '30D'], '1D')).toBe('7D')
    expect(qenum('bogus', ['a', 'b'], 'a')).toBe('a')
    expect(qenum('missing', ['a', 'b'], 'b')).toBe('b')
  })
})

describe('replaceQuery', () => {
  it('replaces when the query differs', () => {
    query = { q: 'old' }
    const { replaceQuery } = useQueryParamSync()
    replaceQuery({ q: 'new' })
    expect(replace).toHaveBeenCalledWith({ query: { q: 'new' } })
  })

  it('no-ops when the query already matches (same keys and values)', () => {
    query = { q: 'AMD', range: '7D' }
    const { replaceQuery } = useQueryParamSync()
    replaceQuery({ q: 'AMD', range: '7D' })
    expect(replace).not.toHaveBeenCalled()
  })

  it('replaces when a key is removed (defaults omitted)', () => {
    query = { q: 'AMD', range: '7D' }
    const { replaceQuery } = useQueryParamSync()
    replaceQuery({ q: 'AMD' })
    expect(replace).toHaveBeenCalledWith({ query: { q: 'AMD' } })
  })
})
