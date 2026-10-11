import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useLatestRequest, isAbortError, type LatestRequestToken } from './useLatestRequest'

describe('useLatestRequest', () => {
  it('aborts and invalidates the previous request when a new one begins', () => {
    const latest = useLatestRequest()
    const a = latest.begin()
    expect(a.isLatest()).toBe(true)
    expect(a.signal.aborted).toBe(false)

    const b = latest.begin()
    expect(a.signal.aborted).toBe(true)
    expect(a.isLatest()).toBe(false)
    expect(b.isLatest()).toBe(true)
    expect(b.signal.aborted).toBe(false)
  })

  it('cancel() aborts the in-flight request without starting another', () => {
    const latest = useLatestRequest()
    const a = latest.begin()
    latest.cancel()
    expect(a.signal.aborted).toBe(true)
    expect(a.isLatest()).toBe(false)
    // A later begin() works normally.
    expect(latest.begin().isLatest()).toBe(true)
  })

  it('cancels the in-flight request when the owning component unmounts', () => {
    let token!: LatestRequestToken
    const wrapper = mount(
      defineComponent({
        setup() {
          token = useLatestRequest().begin()
          return () => h('div')
        },
      }),
    )
    expect(token.signal.aborted).toBe(false)
    wrapper.unmount()
    expect(token.signal.aborted).toBe(true)
    expect(token.isLatest()).toBe(false)
  })
})

describe('isAbortError', () => {
  it('recognises DOMException and Error abort rejections', () => {
    expect(isAbortError(new DOMException('aborted', 'AbortError'))).toBe(true)
    const e = new Error('aborted')
    e.name = 'AbortError'
    expect(isAbortError(e)).toBe(true)
  })

  it('rejects everything else', () => {
    expect(isAbortError(new Error('boom'))).toBe(false)
    expect(isAbortError(new DOMException('x', 'TimeoutError'))).toBe(false)
    expect(isAbortError('AbortError')).toBe(false)
    expect(isAbortError(null)).toBe(false)
  })
})
