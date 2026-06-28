import { describe, it, expect, beforeEach } from 'vitest'
import { useNotifications } from './useNotifications'

describe('useNotifications', () => {
  beforeEach(() => {
    // Singleton state persists across tests — reset it each time.
    const { clear, closePanel } = useNotifications()
    clear()
    closePanel()
  })

  it('counts only unread notifications', () => {
    const { setNotifications, unreadCount } = useNotifications()
    setNotifications([
      { id: 1, title: 'a' },
      { id: 2, title: 'b', read: true },
      { id: 3, title: 'c' },
    ])
    expect(unreadCount.value).toBe(2)
  })

  it('markAllRead clears the unread count', () => {
    const { setNotifications, markAllRead, unreadCount } = useNotifications()
    setNotifications([
      { id: 1, title: 'a' },
      { id: 2, title: 'b' },
    ])
    expect(unreadCount.value).toBe(2)
    markAllRead()
    expect(unreadCount.value).toBe(0)
  })

  it('markRead marks a single notification read', () => {
    const { setNotifications, markRead, unreadCount } = useNotifications()
    setNotifications([
      { id: 1, title: 'a' },
      { id: 2, title: 'b' },
    ])
    markRead(1)
    expect(unreadCount.value).toBe(1)
  })

  it('add prepends newest-first and remove deletes by id', () => {
    const { add, remove, notifications } = useNotifications()
    add({ id: 1, title: 'first' })
    add({ id: 2, title: 'second' })
    expect(notifications.value.map((n) => n.id)).toEqual([2, 1])
    remove(1)
    expect(notifications.value.map((n) => n.id)).toEqual([2])
  })

  it('toggles and sets the panel open state', () => {
    const { open, openPanel, closePanel, togglePanel } = useNotifications()
    expect(open.value).toBe(false)
    openPanel()
    expect(open.value).toBe(true)
    togglePanel()
    expect(open.value).toBe(false)
    togglePanel()
    expect(open.value).toBe(true)
    closePanel()
    expect(open.value).toBe(false)
  })
})
