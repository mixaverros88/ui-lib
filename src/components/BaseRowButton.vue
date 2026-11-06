<template>
  <button
    type="button"
    class="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium shadow-sm transition-colors"
    :class="VARIANT_CLASS[variant]"
    @click.stop
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
// Compact button for a table's Actions column: outline (neutral), primary (green) or danger (red). Stops click propagation so it works inside clickable rows.
withDefaults(defineProps<{ variant?: 'outline' | 'primary' | 'danger' }>(), {
  variant: 'outline',
})

const VARIANT_CLASS = {
  outline:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
  primary: 'border border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800',
  danger: 'border border-red-400 bg-red-400 text-white hover:bg-red-500',
}
</script>
