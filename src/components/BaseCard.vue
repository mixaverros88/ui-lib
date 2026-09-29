<template>
  <section
    class="rounded-xl border border-slate-200 bg-white text-left shadow-sm dark:border-slate-700 dark:bg-slate-900"
  >
    <header
      v-if="title || subtitle || $slots.actions"
      class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-3 dark:border-slate-700"
    >
      <div class="min-w-0">
        <h2 v-if="title" class="text-base font-semibold text-slate-900 dark:text-slate-100">{{ title }}</h2>
        <p v-if="subtitle" class="text-sm text-slate-500 dark:text-slate-400">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </header>
    <div :class="padding === 'sm' ? 'p-4' : padding === 'none' ? '' : 'p-5'">
      <slot />
    </div>
    <footer
      v-if="$slots.footer"
      class="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 px-5 py-3 dark:border-slate-700"
    >
      <slot name="footer" />
    </footer>
  </section>
</template>

<script setup lang="ts">
/**
 * Bordered surface card — the shared chrome for forms, filter/search panels
 * and any grouped content. Optional header (title / subtitle / `actions`
 * slot), a padded body (default slot) and an optional `footer` slot for
 * submit / cancel buttons.
 */
interface Props {
  title?: string
  subtitle?: string
  /** Body padding: 'md' (p-5, default), 'sm' (p-4, e.g. filter bars) or 'none'. */
  padding?: 'md' | 'sm' | 'none'
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  padding: 'md',
})
</script>
