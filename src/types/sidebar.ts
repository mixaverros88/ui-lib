import type { Component } from 'vue'

/**
 * A single nav button inside a sidebar section.
 *
 *   • `name` — Vue Router route name. Used both for activation matching
 *     (`route.name === item.name`) and for the `router.push` target.
 *   • `label` — display text.
 *   • `icon` — Vue component to render as the leading icon (typically a
 *     Heroicon).
 */
export interface NavItem {
  name: string
  label: string
  icon: Component
}

/**
 * A grouped section of nav items rendered with a small uppercase header.
 */
export interface NavSection {
  title: string
  items: NavItem[]
}
