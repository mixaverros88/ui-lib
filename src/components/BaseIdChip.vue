<template>
  <!--
    Compact id cell: a small uppercase label, the id truncated in a <code>
    pill (full value in the tooltip), a copy button, and — when
    `actionLabel` is set — a magnifier button that emits `action` (e.g.
    "search the log for this id"). Built for dense rows that carry several
    ids side by side (transaction / buy-order / sell-order).
  -->
  <div class="inline-flex items-center gap-1 font-mono text-[11px]">
    <span v-if="label" class="text-slate-500 dark:text-slate-400 uppercase tracking-wide">{{ label }}</span>
    <code
      class="truncate rounded bg-slate-100 px-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
      :class="maxWidthClass"
      :title="value"
    >{{ value }}</code>
    <BaseCopyButton :text="value" :label="copyLabel ?? `${label} ${value}`.trim()" icon-class="w-3.5 h-3.5" />
    <button
      v-if="actionLabel"
      type="button"
      :title="actionLabel"
      :aria-label="actionLabel"
      class="rounded px-0.5 text-slate-400 hover:bg-slate-100 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
      @click="emit('action', value)"
    >
      <MagnifyingGlassIcon class="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import BaseCopyButton from './BaseCopyButton.vue'

withDefaults(
  defineProps<{
    /** The id itself — shown truncated, copied in full. */
    value: string
    /** Short uppercase prefix ("id", "ord", "sell"). Omit for no prefix. */
    label?: string
    /** Copy button's tooltip / aria noun; defaults to "<label> <value>". */
    copyLabel?: string
    /** Tooltip / aria-label of the action button; the button only renders when set. */
    actionLabel?: string
    /** Width cap of the truncated id. */
    maxWidthClass?: string
  }>(),
  { label: '', copyLabel: undefined, actionLabel: undefined, maxWidthClass: 'max-w-[90px]' },
)

const emit = defineEmits<{ action: [value: string] }>()
</script>
