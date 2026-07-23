<script setup lang="ts">
// Compact per-item breakdown meant to sit under a summary/stat card (pairs
// with EarningsCard). Each item renders on its own line — label left, value
// right in monospace. A null/undefined value (a source that is unconfigured,
// unreachable, or has no matching rows) shows a dash rather than a
// misleading 0. With `signed`, values gain an explicit "+" and are coloured
// green/red by sign.
import type { StatBreakdownItem } from '../types/statBreakdown'

const props = withDefaults(
  defineProps<{
    items: StatBreakdownItem[]
    currency?: string
    decimals?: number
    signed?: boolean
  }>(),
  { currency: '', decimals: 2, signed: false },
)

function fmt(v: number | null | undefined): string {
  if (v === null || v === undefined) return '—'
  // Sign sits before the currency symbol ("-$3.00", "+$5.00" — same shape
  // as fmtUsd); the plus only appears in signed mode.
  const sign = v < 0 ? '-' : props.signed ? '+' : ''
  return `${sign}${props.currency}${Math.abs(v).toFixed(props.decimals)}`
}

function color(v: number | null | undefined): string {
  if (!props.signed || v === null || v === undefined) {
    return 'text-slate-500 dark:text-slate-400'
  }
  return v >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
}
</script>

<template>
  <div class="mt-1.5 space-y-0.5 px-1">
    <div
      v-for="item in items"
      :key="item.label"
      class="flex items-center justify-between text-[11px]"
    >
      <span class="text-slate-400 dark:text-slate-500">{{ item.label }}</span>
      <span class="font-mono tabular-nums font-medium" :class="color(item.value)">
        {{ fmt(item.value) }}
      </span>
    </div>
  </div>
</template>
