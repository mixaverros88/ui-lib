import { ref, computed } from 'vue'
import type { NotificationItem } from '../types/notification'

/**
 * Shared notification state for the sidebar bell + `BaseNotificationPanel`.
 *
 * Module-scoped singleton (mirrors useMobileSidebar / useToast) so the
 * sidebar's unread badge, the bell's open/close toggle, and the panel all
 * read and mutate the same source. The consuming app owns the data: call
 * `setNotifications()` (or `add()`) to feed it in.
 *
 * There's only ever one notification surface per app, so a singleton is
 * the right shape here.
 */
const notifications = ref<NotificationItem[]>([])
const open = ref(false)

const unreadCount = computed(
  () => notifications.value.filter((n) => !n.read).length,
)

export function useNotifications() {
  function openPanel() {
    open.value = true
  }
  function closePanel() {
    open.value = false
  }
  function togglePanel() {
    open.value = !open.value
  }

  /** Replace the whole list (typical after a fetch). */
  function setNotifications(items: NotificationItem[]) {
    notifications.value = items
  }

  /** Prepend a single notification (newest first). */
  function add(item: NotificationItem) {
    notifications.value = [item, ...notifications.value]
  }

  /** Remove one by id. */
  function remove(id: NotificationItem['id']) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  /** Mark a single notification read. */
  function markRead(id: NotificationItem['id']) {
    notifications.value = notifications.value.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    )
  }

  /** Mark every notification read (clears the badge). */
  function markAllRead() {
    notifications.value = notifications.value.map((n) =>
      n.read ? n : { ...n, read: true },
    )
  }

  /** Remove every notification. */
  function clear() {
    notifications.value = []
  }

  return {
    notifications,
    unreadCount,
    open,
    openPanel,
    closePanel,
    togglePanel,
    setNotifications,
    add,
    remove,
    markRead,
    markAllRead,
    clear,
  }
}
