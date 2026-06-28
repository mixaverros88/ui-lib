import { ref, watch, effectScope } from 'vue'

/**
 * Shared collapsed/expanded state for the desktop sidebar.
 *
 * Module-scoped singleton (mirrors useMobileSidebar) so `BaseSidebar` and
 * the page layout (`BaseAppLayout`, which offsets `<main>` by the sidebar
 * width) stay in sync. When collapsed, the sidebar shrinks to an icon-only
 * rail on desktop.
 *
 * The preference is persisted to localStorage. The first consumer can pass
 * an options object to override the key; subsequent callers reuse the same
 * singleton and the option is only consulted on the first call.
 */
export interface UseSidebarCollapseOptions {
  /** localStorage key used to persist the preference. */
  storageKey?: string
}

const collapsed = ref(false)

let initialized = false
let configuredStorageKey = 'mgv-sidebar-collapsed'

function initialize(storageKey: string) {
  if (initialized) {
    return
  }
  initialized = true
  configuredStorageKey = storageKey

  if (typeof window !== 'undefined') {
    const saved = window.localStorage?.getItem(configuredStorageKey)
    if (saved) {
      collapsed.value = saved === 'true'
    }

    // Detached scope so the persistence watcher lives for the app's
    // lifetime and is NOT torn down when the first consuming component
    // unmounts.
    const scope = effectScope(true)
    scope.run(() => {
      watch(collapsed, (value) => {
        window.localStorage?.setItem(configuredStorageKey, String(value))
      })
    })
  }
}

export function useSidebarCollapse(options?: UseSidebarCollapseOptions) {
  initialize(options?.storageKey ?? configuredStorageKey)

  function collapse() {
    collapsed.value = true
  }
  function expand() {
    collapsed.value = false
  }
  function toggle() {
    collapsed.value = !collapsed.value
  }

  return { collapsed, collapse, expand, toggle }
}
