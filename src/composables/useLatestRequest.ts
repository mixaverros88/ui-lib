import { getCurrentScope, onScopeDispose } from 'vue'

/** One begun request: its abort signal and whether it is still the latest. */
export interface LatestRequestToken {
  /** Pass to fetch(); aborted as soon as a newer request begins (or on cancel). */
  signal: AbortSignal
  /**
   * True while no newer begin() / cancel() has happened. Check it after every
   * await before writing state, so a superseded response can never clobber
   * the newer one's — and only the latest call clears its loading flag.
   */
  isLatest: () => boolean
}

/**
 * "Latest request wins" guard for views that refetch on every filter change,
 * poll, or Refresh click. Each `begin()` aborts the previous in-flight request
 * on the wire and hands back a fresh AbortSignal plus an `isLatest()` check
 * (a monotonic request id), so a slow, stale response that still lands can be
 * dropped instead of racing the fresh one.
 *
 * `cancel()` aborts the in-flight request and invalidates it without starting
 * a new one (e.g. the selection was cleared). When called inside a component
 * setup / effect scope, the in-flight request is cancelled automatically on
 * unmount.
 *
 * ```ts
 * const latest = useLatestRequest()
 * async function load() {
 *   const req = latest.begin()
 *   loading.value = true
 *   try {
 *     const res = await fetchThings(req.signal)
 *     if (!req.isLatest()) return
 *     rows.value = res
 *   } catch (e) {
 *     if (!req.isLatest() || isAbortError(e)) return
 *     error.value = String(e)
 *   } finally {
 *     if (req.isLatest()) loading.value = false
 *   }
 * }
 * ```
 */
export function useLatestRequest(): {
  begin: () => LatestRequestToken
  cancel: () => void
} {
  let seq = 0
  let ctrl: AbortController | null = null

  function begin(): LatestRequestToken {
    const mine = ++seq
    ctrl?.abort()
    const c = new AbortController()
    ctrl = c
    return { signal: c.signal, isLatest: () => mine === seq }
  }

  function cancel(): void {
    ++seq
    ctrl?.abort()
    ctrl = null
  }

  if (getCurrentScope()) onScopeDispose(cancel)

  return { begin, cancel }
}

/**
 * True for the rejection an aborted fetch() produces (a DOMException — or, in
 * some runtimes, a plain Error — named "AbortError"). Superseded / cancelled
 * requests should be swallowed silently rather than shown as an error.
 */
export function isAbortError(e: unknown): boolean {
  return (
    (typeof DOMException !== 'undefined' && e instanceof DOMException && e.name === 'AbortError') ||
    (e instanceof Error && e.name === 'AbortError')
  )
}
