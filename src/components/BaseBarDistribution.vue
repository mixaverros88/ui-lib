<script setup lang="ts">
// Compact value-distribution chart: one thin rounded bar per distinct value,
// count labelled on top and the value underneath — scrolls sideways when
// there are many bars. Pure Tailwind, no chart library. Extracted from
// TradeAutomation's variant-stats modal, where it summarises how often each
// parameter value occurs across generated strategy variants.
import { computed } from 'vue'
import type { DistributionBar } from '../types/distribution'

const props = withDefaults(
  defineProps<{
    /** Bars in display order (callers sort ascending for numeric values). */
    bars: DistributionBar[]
    /** Accessible description of what the chart shows. */
    ariaLabel?: string
    /** Noun for each bar's tooltip count, e.g. "variant" → "3 variants". */
    countNoun?: string
    /** Tooltip prefix before the value, e.g. the field name. */
    titlePrefix?: string
    /** Height of the tallest bar, in px. */
    maxBarHeight?: number
    /** Tailwind classes for the bar fill. */
    barClass?: string
  }>(),
  {
    ariaLabel: 'Value distribution',
    countNoun: 'item',
    titlePrefix: '',
    maxBarHeight: 56,
    barClass: 'bg-emerald-500/80 dark:bg-emerald-400/80',
  },
)

const maxCount = computed(() => Math.max(1, ...props.bars.map((b) => b.count)))

const barHeight = (b: DistributionBar): number =>
  Math.max(3, Math.round((b.count / maxCount.value) * props.maxBarHeight))

const barTitle = (b: DistributionBar): string =>
  `${props.titlePrefix ? `${props.titlePrefix} ` : ''}${b.label}: ${b.count} ${props.countNoun}${
    b.count === 1 ? '' : 's'
  }`
</script>

<template>
  <div
    class="flex items-end gap-1.5 overflow-x-auto pb-1"
    role="img"
    :aria-label="ariaLabel"
  >
    <div
      v-for="b in bars"
      :key="b.label"
      class="flex min-w-7 flex-1 flex-col items-center gap-0.5"
      :title="barTitle(b)"
    >
      <span class="text-[10px] tabular-nums text-slate-400 dark:text-slate-500">
        {{ b.count }}
      </span>
      <div
        class="w-full max-w-8 rounded-t"
        :class="barClass"
        :style="{ height: `${barHeight(b)}px` }"
      />
      <span
        class="max-w-full truncate font-mono text-[10px] text-slate-500 dark:text-slate-400"
        :title="b.label"
      >
        {{ b.label }}
      </span>
    </div>
  </div>
</template>
