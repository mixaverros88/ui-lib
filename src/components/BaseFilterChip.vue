<template>
  <!--
    Colour-coded toggleable filter chip — the one-click event/category filter
    buttons above a data feed (extracted from TradeAutomation's Trade Log).
    Idle: tinted border/background in the semantic colour. Active: solid fill
    with white text. `aria-pressed` reflects the toggle state.

    Layout (height, flex sizing) is the caller's: pass classes like
    `h-9 flex-1` through the class attribute.

    The click handler falls through natively to the root <button> — bind
    @click on the component as usual; a disabled chip blocks it.
  -->
  <button
    type="button"
    :disabled="disabled"
    :title="title"
    :aria-pressed="active"
    class="whitespace-nowrap rounded-md border px-3 text-sm font-semibold text-center transition-colors focus:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="active ? ACTIVE[color] : IDLE[color]"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
type FilterChipColor = 'emerald' | 'sky' | 'amber' | 'red' | 'slate'

withDefaults(
  defineProps<{
    /** Chip text; the default slot overrides it. */
    label?: string
    /** Semantic colour of both the idle tint and the active solid fill. */
    color?: FilterChipColor
    /** Whether the chip's filter is currently applied (solid fill). */
    active?: boolean
    disabled?: boolean
    /** Native tooltip. */
    title?: string
  }>(),
  { label: '', color: 'slate', active: false, disabled: false, title: undefined },
)

// Full literal class strings (no dynamic concatenation) so Tailwind detects
// them at build time. Idle: tinted; active: solid with white text.
const IDLE: Record<FilterChipColor, string> = {
  emerald:
    'border-emerald-300 dark:border-emerald-700/60 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 focus-visible:ring-emerald-500',
  sky:
    'border-sky-300 dark:border-sky-700/60 bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/30 focus-visible:ring-sky-500',
  amber:
    'border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 focus-visible:ring-amber-500',
  red:
    'border-red-300 dark:border-red-700/60 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 focus-visible:ring-red-500',
  slate:
    'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-emerald-500',
}

const ACTIVE: Record<FilterChipColor, string> = {
  emerald:
    'border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500',
  sky: 'border-sky-500 bg-sky-500 text-white hover:bg-sky-600 focus-visible:ring-sky-500',
  amber: 'border-amber-500 bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500',
  red: 'border-red-500 bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500',
  slate: 'border-slate-600 bg-slate-600 text-white hover:bg-slate-700 focus-visible:ring-emerald-500',
}
</script>
