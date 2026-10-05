<template>
  <dl class="grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-4 text-left" :class="columns === 2 ? 'sm:grid-cols-[repeat(2,minmax(0,1fr))]' : columns === 3 ? 'sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]' : ''">
    <div v-for="item in items" :key="item.label" class="min-w-0">
      <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ item.label }}</dt>
      <dd class="mt-1 break-words text-sm text-slate-900 dark:text-slate-100" :class="item.mono ? 'font-mono' : ''">
        <a
          v-if="item.href && !isEmpty(item.value)"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-emerald-600 hover:underline dark:text-emerald-400"
        >{{ item.value }}</a>
        <span v-else-if="isEmpty(item.value)" class="text-slate-400 dark:text-slate-500">{{ emptyText }}</span>
        <template v-else>{{ item.value }}</template>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
// Column classes use the arbitrary-value form on purpose (see
// noSharedResponsiveGrid.test.ts): plain responsive column utilities would ship
// in the lib CSS, which consumers import AFTER their own utilities, and override
// the consumers' larger-breakpoint grid columns.
/**
 * Read-only label/value grid for detail pages — the "view" counterpart of a
 * form. Empty values render `emptyText` (—); `href` makes the value an
 * external link; `mono` sets it in the monospace face (ids, hashes).
 */
import type { DetailItem } from '../types/detail'

interface Props {
  items: readonly DetailItem[]
  /** Columns from `sm` up (1 column on phones). */
  columns?: 1 | 2 | 3
  emptyText?: string
}

withDefaults(defineProps<Props>(), {
  columns: 2,
  emptyText: '—',
})

function isEmpty(v: DetailItem['value']): boolean {
  return v === null || v === undefined || v === ''
}
</script>
