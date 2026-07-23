import { useRoute, useRouter } from 'vue-router'

/**
 * URL-query mirroring helpers for filterable views: read a filter's initial
 * state from the query string once on setup, then write changes back with
 * `replaceQuery` so a filtered view can be copied, shared and bookmarked
 * without filter tweaks piling up in the browser history.
 */
export function useQueryParamSync() {
  const route = useRoute()
  const router = useRouter()

  /** String value of a query param ('' when absent or repeated). */
  function qparam(name: string): string {
    const v = route.query[name]
    return typeof v === 'string' ? v : ''
  }

  /**
   * Enum-ish param: only values from `allowed` pass; anything else in a
   * hand-edited URL falls back to the default.
   */
  function qenum<T extends string>(name: string, allowed: readonly T[], fallback: T): T {
    const v = qparam(name)
    return (allowed as readonly string[]).includes(v) ? (v as T) : fallback
  }

  /**
   * Mirror the given params into the URL with `router.replace` (not `push`),
   * no-oping when nothing changed so timers/auto-refresh don't issue redundant
   * navigations. Callers omit default values so the address stays clean.
   */
  function replaceQuery(next: Record<string, string>): void {
    const current = route.query
    const same =
      Object.keys(next).length === Object.keys(current).length &&
      Object.entries(next).every(([k, v]) => current[k] === v)
    if (!same) void router.replace({ query: next })
  }

  return { qparam, qenum, replaceQuery }
}
