import { ref } from 'vue'

/**
 * Shared state for the responsive sidebar's open/closed status.
 *
 * Module-scoped singleton so the sidebar component and the page layout
 * (which typically marks `<main>` as `inert` while the menu is open)
 * stay in sync. There's only ever one sidebar at a time.
 */
const mobileOpen = ref(false)

export function useMobileSidebar() {
  function open() {
    mobileOpen.value = true
  }
  function close() {
    mobileOpen.value = false
  }
  function toggle() {
    mobileOpen.value = !mobileOpen.value
  }
  return { mobileOpen, open, close, toggle }
}
