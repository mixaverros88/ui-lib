<template>
  <div :class="card ? CARD_CLASS : undefined">
    <!--
      Styling shell for data tables — NOT a data grid. Owns the table skin
      (slate header band, px-4 py-3 header cells, row dividers + hover,
      empty-state row); rows are the caller's own <tr> markup via the default
      slot, so cell content and per-cell styling stay fully in the caller's hands.

      `card` adds the shared card chrome (rounded border, surface, horizontal
      scroll). Leave it off when the caller already wraps the table itself
      (e.g. inside a BaseRow with overflow-x-auto). Same `dark:`-variant note
      as BaseInput.
    -->
    <table class="w-full text-sm">
      <thead class="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
        <tr class="text-left border-b border-slate-200 dark:border-slate-700">
          <th
            v-for="(col, i) in columns"
            :key="i"
            class="px-4 py-3"
            :class="col.align === 'right' ? 'text-right' : ''"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody
        class="divide-y divide-slate-200 dark:divide-slate-700 [&>tr]:transition-colors [&>tr:hover]:bg-slate-50 dark:[&>tr:hover]:bg-slate-800/40"
      >
        <tr v-if="empty">
          <td :colspan="columns.length" class="px-4 py-12 text-center text-slate-500">
            <slot name="empty">{{ emptyText }}</slot>
          </td>
        </tr>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '../types/table'

const CARD_CLASS =
  'overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900'

interface Props {
  columns: TableColumn[]
  /** True when there are no rows — renders the empty-state row. */
  empty?: boolean
  /** Fallback empty-state text; the `empty` slot overrides it. */
  emptyText?: string
  /** Wrap the table in the rounded, bordered, horizontally scrolling card. */
  card?: boolean
}

withDefaults(defineProps<Props>(), {
  empty: false,
  emptyText: 'No rows.',
  card: false,
})
</script>
