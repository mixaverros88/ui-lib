import { onBeforeUnmount, onMounted } from 'vue'

/** How long the tab must be hidden before coming back reloads the page's data; quick switches keep it. */
export const REFRESH_AFTER_AWAY_MS = 30_000

/**
 * Calls `refresh` when the browser tab becomes visible again after `afterMs` or more hidden, since server data
 * changes while the user is elsewhere. The first load is left to the component.
 */
export function useRefreshOnReturn(refresh: () => unknown, afterMs = REFRESH_AFTER_AWAY_MS): void {
  let hiddenAt: number | null = null

  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      hiddenAt ??= Date.now()
      return
    }
    if (hiddenAt !== null && Date.now() - hiddenAt >= afterMs) void refresh()
    hiddenAt = null
  }

  onMounted(() => document.addEventListener('visibilitychange', onVisibilityChange))
  onBeforeUnmount(() => document.removeEventListener('visibilitychange', onVisibilityChange))
}
