import { onMounted, onUnmounted, readonly, ref, type Ref } from 'vue'

export interface UsePollingOptions {
  /** Run `fn` immediately when polling starts (mount / resume). Default true. */
  immediate?: boolean
  /**
   * Pause the interval while the tab is hidden and refresh + resume when it
   * becomes visible again — a hidden tab has no reason to keep waking the
   * backend. Default true.
   */
  pauseWhenHidden?: boolean
}

/**
 * Visibility-gated polling loop bound to the component lifecycle.
 *
 * Starts on mount, stops on unmount. With `pauseWhenHidden` (the default)
 * the interval is torn down on `document.visibilitychange` → hidden and
 * re-armed — with an immediate refresh — when the tab is shown again.
 *
 * Pass `intervalMs: null` for a refresh-only mode: `fn` runs on mount and
 * on every return-to-visible, but no interval is scheduled. Useful for
 * "reload this badge when the user comes back" data that doesn't warrant
 * a timer.
 *
 * Rejections from an async `fn` are the caller's to handle — catch inside
 * `fn`; the loop itself never swallows or reports them.
 */
export function usePolling(
  fn: () => void | Promise<void>,
  intervalMs: number | null,
  options: UsePollingOptions = {},
): { start: () => void; stop: () => void; active: Readonly<Ref<boolean>> } {
  const { immediate = true, pauseWhenHidden = true } = options

  let timer: ReturnType<typeof setInterval> | null = null
  const active = ref(false)
  // True only when the visibility handler paused an ACTIVE loop. A loop the
  // caller stopped explicitly (stop(), e.g. an auto-refresh toggle) must stay
  // stopped across hide/show cycles instead of being silently restarted.
  let suspendedByVisibility = false

  function startTimer() {
    if (timer !== null || intervalMs === null) return
    timer = setInterval(() => void fn(), intervalMs)
  }

  function stopTimer() {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  function start() {
    suspendedByVisibility = false
    if (active.value) return
    active.value = true
    if (immediate) void fn()
    startTimer()
  }

  function stop() {
    suspendedByVisibility = false
    active.value = false
    stopTimer()
  }

  function onVisibilityChange() {
    if (document.visibilityState === 'visible') {
      // Only resume a loop THIS handler paused — a caller-stopped loop
      // stays stopped. Refresh right away so stale data doesn't linger
      // for a full interval after the user returns, then re-arm the timer.
      if (!suspendedByVisibility) return
      suspendedByVisibility = false
      active.value = true
      void fn()
      startTimer()
    } else {
      if (!active.value) return
      active.value = false
      stopTimer()
      suspendedByVisibility = true
    }
  }

  onMounted(() => {
    start()
    if (pauseWhenHidden) {
      document.addEventListener('visibilitychange', onVisibilityChange)
    }
  })

  onUnmounted(() => {
    stop()
    if (pauseWhenHidden) {
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  })

  return { start, stop, active: readonly(active) }
}
