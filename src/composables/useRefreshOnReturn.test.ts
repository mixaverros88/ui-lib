import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h } from 'vue'
import { REFRESH_AFTER_AWAY_MS, useRefreshOnReturn } from './useRefreshOnReturn'

function setVisibility(state: 'hidden' | 'visible') {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => state })
  document.dispatchEvent(new Event('visibilitychange'))
}

describe('useRefreshOnReturn', () => {
  afterEach(() => vi.useRealTimers())

  function mountWith(refresh: () => void) {
    const app = createApp(
      defineComponent({
        setup() {
          useRefreshOnReturn(refresh)
          return () => h('div')
        },
      }),
    )
    app.mount(document.createElement('div'))
    return app
  }

  it('refreshes after a long absence', () => {
    vi.useFakeTimers()
    const refresh = vi.fn()
    const wrapper = mountWith(refresh)
    setVisibility('hidden')
    vi.advanceTimersByTime(REFRESH_AFTER_AWAY_MS)
    setVisibility('visible')
    expect(refresh).toHaveBeenCalledOnce()
    wrapper.unmount()
  })

  it('keeps the page after a quick switch', () => {
    vi.useFakeTimers()
    const refresh = vi.fn()
    const wrapper = mountWith(refresh)
    setVisibility('hidden')
    vi.advanceTimersByTime(REFRESH_AFTER_AWAY_MS - 1)
    setVisibility('visible')
    expect(refresh).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
