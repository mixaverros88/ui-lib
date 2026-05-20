import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Wire up a callback to fire on Escape key press for the lifetime of the
 * calling component. Listener is attached on mount and detached on unmount,
 * so it's safe to use in modals that may mount/unmount many times.
 */
export function useEscapeKey(handler: () => void): void {
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') handler()
  }

  onMounted(() => document.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
}
