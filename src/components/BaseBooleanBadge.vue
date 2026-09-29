<template>
  <span
    class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset"
    :class="value
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/30'
      : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-400/30'"
  >
    <CheckCircleIcon v-if="value" class="h-3.5 w-3.5" aria-hidden="true" />
    <XCircleIcon v-else class="h-3.5 w-3.5" aria-hidden="true" />
    {{ value ? trueLabel : falseLabel }}
  </span>
</template>

<script setup lang="ts">
/**
 * Yes/no status pill for boolean columns ("Verified", "Has API", …):
 * a green check pill when true, a red cross pill when false.
 */
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid'

interface Props {
  value?: boolean | null
  trueLabel?: string
  falseLabel?: string
}

withDefaults(defineProps<Props>(), {
  value: false,
  trueLabel: 'Yes',
  falseLabel: 'No',
})
</script>
