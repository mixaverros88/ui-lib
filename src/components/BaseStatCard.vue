<template>
  <component
    :is="to ? RouterLink : 'div'"
    v-bind="to ? { to } : {}"
    class="relative block rounded-xl border-2 border-dashed bg-white p-5 transition-colors dark:bg-slate-800"
    :class="[cls.border, to ? 'hover:bg-slate-50 dark:hover:bg-slate-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500' : '']"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 text-left">
        <p class="truncate text-sm font-bold tracking-wide text-gray-800 dark:text-slate-200">
          {{ title }}
        </p>
        <p class="mt-1 truncate text-3xl font-bold" :class="cls.value">
          {{ value }}
        </p>
        <p v-if="subtitle" class="mt-1 text-sm font-medium" :class="cls.subtitle">
          {{ subtitle }}
        </p>
        <slot />
      </div>
      <div
        v-if="$slots.icon"
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        :class="cls.iconBox"
      >
        <slot name="icon" :icon-class="`h-6 w-6 ${cls.icon}`" />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
/**
 * Dashboard stat tile in the EarningsCard style (dashed accent border,
 * bold title, big value, accent subtitle, tinted icon chip) but for any
 * value — counts, labels, pre-formatted numbers. Pass `to` to make the whole
 * card a router link. The `icon` slot fills the chip (receives `iconClass`);
 * the `default` slot adds extra content under the subtitle.
 *
 */
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

type Accent = 'emerald' | 'sky' | 'amber' | 'red' | 'slate'

interface Props {
  title: string
  value?: string | number
  subtitle?: string
  /** Border / value / subtitle / icon tint. */
  accent?: Accent
  /** Makes the card a router link. */
  to?: RouteLocationRaw
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  subtitle: '',
  accent: 'emerald',
  to: undefined,
})

// Full literal class strings per accent so Tailwind can see every class.
const ACCENTS: Record<Accent, { border: string; value: string; subtitle: string; iconBox: string; icon: string }> = {
  emerald: {
    border: 'border-emerald-300 dark:border-emerald-700',
    value: 'text-emerald-500 dark:text-emerald-400',
    subtitle: 'text-emerald-500 dark:text-emerald-400',
    iconBox: 'bg-emerald-50 dark:bg-emerald-900/30',
    icon: 'text-emerald-500',
  },
  sky: {
    border: 'border-sky-300 dark:border-sky-700',
    value: 'text-sky-500 dark:text-sky-400',
    subtitle: 'text-sky-500 dark:text-sky-400',
    iconBox: 'bg-sky-50 dark:bg-sky-900/30',
    icon: 'text-sky-500',
  },
  amber: {
    border: 'border-amber-300 dark:border-amber-700',
    value: 'text-amber-500 dark:text-amber-400',
    subtitle: 'text-amber-500 dark:text-amber-400',
    iconBox: 'bg-amber-50 dark:bg-amber-900/30',
    icon: 'text-amber-500',
  },
  red: {
    border: 'border-red-300 dark:border-red-700',
    value: 'text-red-500 dark:text-red-400',
    subtitle: 'text-red-500 dark:text-red-400',
    iconBox: 'bg-red-50 dark:bg-red-900/30',
    icon: 'text-red-500',
  },
  slate: {
    border: 'border-slate-300 dark:border-slate-600',
    value: 'text-slate-700 dark:text-slate-200',
    subtitle: 'text-slate-500 dark:text-slate-400',
    iconBox: 'bg-slate-100 dark:bg-slate-700/50',
    icon: 'text-slate-500 dark:text-slate-300',
  },
}

const cls = computed(() => ACCENTS[props.accent])
</script>
