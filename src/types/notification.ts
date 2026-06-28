/**
 * A single entry rendered in `BaseNotificationPanel` and counted by the
 * sidebar's unread badge.
 *
 *   • `id`      — stable key, used for list rendering and mark/remove ops.
 *   • `title`   — bold headline line.
 *   • `message` — optional secondary line.
 *   • `time`    — optional pre-formatted timestamp (e.g. "2h ago"). The
 *                 library does not format dates for you.
 *   • `read`    — unread entries are highlighted and count toward the badge.
 *   • `type`    — drives the small status dot colour.
 */
export interface NotificationItem {
  id: string | number
  title: string
  message?: string
  time?: string
  read?: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
}
