import { cloneVNode, createTextVNode, Fragment, Text, type VNode } from 'vue'

/** Raw enum names (BLUE_SKY, PROFIT_TARGET) → display text (BLUE SKY). */
export function humanizeEnum(value: string | null | undefined): string {
  return value == null ? '' : String(value).replace(/_/g, ' ')
}

/**
 * Rewrites underscores to spaces in slot text so callers can pass raw enum
 * names. Plain text nodes are rewritten and fragments (v-for / v-if) are
 * walked; elements pass through untouched unless their tag is in `tags`, in
 * which case their string children are rewritten too (e.g. `<option>`).
 */
export function humanizeTextVNodes(nodes: VNode[], tags: readonly string[] = []): VNode[] {
  return nodes.map((node) => {
    if (node.type === Text && typeof node.children === 'string') {
      return createTextVNode(humanizeEnum(node.children))
    }
    if (node.type === Fragment && Array.isArray(node.children)) {
      const clone = cloneVNode(node)
      clone.children = humanizeTextVNodes(node.children as VNode[], tags)
      return clone
    }
    if (typeof node.type === 'string' && tags.includes(node.type)) {
      const clone = cloneVNode(node)
      if (typeof node.children === 'string') {
        clone.children = humanizeEnum(node.children)
      } else if (Array.isArray(node.children)) {
        clone.children = humanizeTextVNodes(node.children as VNode[], tags)
      }
      return clone
    }
    return node
  })
}
