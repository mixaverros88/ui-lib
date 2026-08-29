import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { usePolling, type UsePollingOptions } from './usePolling'

function mountWithPolling(
  fn: () => void,
  intervalMs: number | null,
  options?: UsePollingOptions,
) {
  let api!: ReturnType<typeof usePolling>
  const wrapper = mount(
    defineComponent({
      setup() {
        api = usePolling(fn, intervalMs, options)
        return () => h('div')
      },
    }),
  )
  return { wrapper, api }
}

function setVisibility(state: 'visible' | 'hidden') {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  })
  document.dispatchEvent(new Event('visibilitychange'))
}

describe('usePolling', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setVisibility('visible')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('runs immediately on mount and then on each interval', () => {
    const fn = vi.fn()
    mountWithPolling(fn, 1000)
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(4)
  })

  it('skips the initial call when immediate is false', () => {
    const fn = vi.fn()
    mountWithPolling(fn, 1000, { immediate: false })
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('pauses while hidden and refreshes + resumes on return to visible', async () => {
    const fn = vi.fn()
    mountWithPolling(fn, 1000)
    expect(fn).toHaveBeenCalledTimes(1)

    setVisibility('hidden')
    await nextTick()
    vi.advanceTimersByTime(5000)
    expect(fn).toHaveBeenCalledTimes(1) // no ticks while hidden

    setVisibility('visible')
    expect(fn).toHaveBeenCalledTimes(2) // immediate refresh on resume
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(3) // interval re-armed
  })

  it('with intervalMs null, runs on mount and on visibility resume only', () => {
    const fn = vi.fn()
    mountWithPolling(fn, null)
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(60000)
    expect(fn).toHaveBeenCalledTimes(1)

    setVisibility('hidden')
    setVisibility('visible')
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(60000)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('stops on unmount', () => {
    const fn = vi.fn()
    const { wrapper } = mountWithPolling(fn, 1000)
    wrapper.unmount()
    vi.advanceTimersByTime(5000)
    expect(fn).toHaveBeenCalledTimes(1)
    // and the visibility listener is gone too
    setVisibility('hidden')
    setVisibility('visible')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('exposes manual start/stop and an active flag', () => {
    const fn = vi.fn()
    const { api } = mountWithPolling(fn, 1000)
    expect(api.active.value).toBe(true)
    api.stop()
    expect(api.active.value).toBe(false)
    vi.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(1)
    api.start()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
