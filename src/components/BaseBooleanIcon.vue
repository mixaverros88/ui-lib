<template>
  <span v-if="value == null">{{ emptyText }}</span>
  <span v-else class="inline-flex align-middle" :title="value ? trueLabel : falseLabel">
    <CheckCircleIcon v-if="value" class="h-5 w-5 shrink-0 text-emerald-500" :aria-label="trueLabel" />
    <XCircleIcon v-else class="h-5 w-5 shrink-0 text-red-500" :aria-label="falseLabel" />
  </span>
</template>

<script setup lang="ts">
// Icon-only yes/no flag for dense tables: green tick or red cross with the label in the tooltip, emptyText when the value is unknown. Use BaseBooleanBadge when the label should be visible.
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid'

withDefaults(
  defineProps<{
    value?: boolean | null
    trueLabel?: string
    falseLabel?: string
    emptyText?: string
  }>(),
  { value: null, trueLabel: 'Yes', falseLabel: 'No', emptyText: '—' },
)
</script>
