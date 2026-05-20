import { ref, watch, effectScope } from 'vue'

/**
 * Shared dark/light theme controller.
 *
 * Singleton ref + `<html class="dark">` sync + localStorage persistence.
 * The first consumer can pass an options object to override the
 * localStorage key (each consuming app should pick a unique key so two
 * backoffices on the same origin don't fight). Defaults to `'mgv-theme'`.
 *
 * Subsequent callers get the same singleton; the options are only
 * consulted on the first call.
 */
export interface UseThemeOptions {
  /** localStorage key used to persist the preference. */
  storageKey?: string
}

const isDark = ref(false)

// Idempotent flag: initialization and the DOM-sync watcher should run once,
// and only when the composable is first invoked in a browser environment.
let initialized = false
let configuredStorageKey = 'mgv-theme'

function initialize(storageKey: string) {
  if (initialized) return
  initialized = true
  configuredStorageKey = storageKey

  // Read saved preference / system preference.
  if (typeof window !== 'undefined') {
    const saved = window.localStorage?.getItem(configuredStorageKey)
    if (saved) {
      isDark.value = saved === 'dark'
    } else if (typeof window.matchMedia === 'function') {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  // Use a detached effect scope so the watcher lives for the app's lifetime
  // and is NOT torn down when the first component that called useTheme() unmounts.
  if (typeof document !== 'undefined') {
    const scope = effectScope(true)
    scope.run(() => {
      watch(
        isDark,
        (value) => {
          document.documentElement.classList.toggle('dark', value)
          window.localStorage?.setItem(configuredStorageKey, value ? 'dark' : 'light')
        },
        { immediate: true },
      )
    })
  }
}

export function useTheme(options?: UseThemeOptions) {
  initialize(options?.storageKey ?? configuredStorageKey)

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme,
  }
}
