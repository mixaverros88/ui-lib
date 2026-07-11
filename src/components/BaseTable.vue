<template>
  <!--
    Styling shell for data tables — NOT a data grid. Owns the table skin
    (slate header band, px-4 py-3 header cells, empty-state row); rows are
    the caller's own <tr> markup via the default slot, so cell content and
    per-cell styling stay fully in the caller's hands.

    Wrap it yourself for scrolling/card chrome (e.g. inside a BaseRow with
    overflow-x-auto). Same `dark:`-variant note as BaseInput.
  -->
  <table class="w-full text-sm">
    <thead class="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
      <tr class="text-left">
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
    <tbody>
      <tr v-if="empty">
        <td :colspan="columns.length" class="px-4 py-12 text-center text-slate-500">
          <slot name="empty">{{ emptyText }}</slot>
        </td>
      </tr>
      <slot />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { TableColumn } from '../types/table'

interface Props {
  columns: TableColumn[]
  /** True when there are no rows — renders the empty-state row. */
  empty?: boolean
  /** Fallback empty-state text; the `empty` slot overrides it. */
  emptyText?: string
}

withDefaults(defineProps<Props>(), {
  empty: false,
  emptyText: 'No rows.',
})
</script>
