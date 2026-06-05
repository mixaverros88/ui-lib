<script setup lang="ts">
import { computed } from 'vue'

/**
 * Accent colour of the card. Defaults to `orange` so existing consumers are
 * unaffected; `emerald` lets a host app tint the card to a green-themed brand.
 * Each accent carries the full literal Tailwind class strings (rather than a
 * single interpolated hue) so the classes are statically detectable and the
 * two themes can differ in more than hue — e.g. orange renders the amount in
 * neutral grey while emerald renders it in the accent itself.
 */
type Accent = 'orange' | 'emerald'

interface Props {
  title?: string
  amount?: number
  subtitle?: string
  badge?: string
  currency?: string
  decimals?: number
  accent?: Accent
}

const props = withDefaults(defineProps<Props>(), {
  title: 'TOTAL EARNINGS',
  amount: 0,
  subtitle: 'Lifetime commission',
  badge: '',
  currency: '$',
  decimals: 2,
  accent: 'orange',
})

const ACCENTS: Record<Accent, {
  border: string
  badge: string
  amount: string
  subtitle: string
  iconBox: string
  icon: string
}> = {
  orange: {
    border: 'border-orange-300 dark:border-orange-700',
    badge: 'bg-orange-100 text-orange-500 dark:bg-orange-900/40 dark:text-orange-400',
    amount: 'text-gray-400 dark:text-slate-300',
    subtitle: 'text-orange-400 dark:text-orange-400',
    iconBox: 'bg-orange-50 dark:bg-orange-900/30',
    icon: 'text-orange-400',
  },
  emerald: {
    border: 'border-emerald-300 dark:border-emerald-700',
    badge: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
    amount: 'text-emerald-500 dark:text-emerald-400',
    subtitle: 'text-emerald-500 dark:text-emerald-400',
    iconBox: 'bg-emerald-50 dark:bg-emerald-900/30',
    icon: 'text-emerald-500',
  },
}

const cls = computed(() => ACCENTS[props.accent])

const formattedAmount = computed(() => {
  // Guard against NaN/Infinity reaching toLocaleString (which would render the
  // literal "NaN"); fall back to a zeroed amount so the card stays readable.
  const amount = Number.isFinite(props.amount) ? props.amount : 0
  return (
    props.currency +
    amount.toLocaleString('en-US', {
      minimumFractionDigits: props.decimals,
      maximumFractionDigits: props.decimals,
    })
  )
})
</script>

<template>
  <div
    class="relative rounded-xl border-2 border-dashed bg-white p-6 dark:bg-slate-800"
    :class="cls.border"
  >
    <!-- Badge -->
    <div
      v-if="badge"
      class="absolute right-4 top-4 rounded-md px-3 py-1 text-xs font-bold tracking-wide"
      :class="cls.badge"
    >
      {{ badge }}
    </div>

    <!-- Header row -->
    <div class="flex items-start justify-between">
      <div>
        <!-- Title -->
        <p class="text-sm font-bold tracking-wide text-gray-800 dark:text-slate-200">
          {{ title }}
        </p>

        <!-- Amount -->
        <p class="mt-1 text-4xl font-bold" :class="cls.amount">
          {{ formattedAmount }}
        </p>

        <!-- Subtitle -->
        <p class="mt-1 text-sm font-medium" :class="cls.subtitle">
          {{ subtitle }}
        </p>
      </div>

      <!-- Chart icon -->
      <div
        class="mt-6 flex h-12 w-12 items-center justify-center rounded-xl"
        :class="cls.iconBox"
      >
        <svg
          class="h-6 w-6"
          :class="cls.icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      </div>
    </div>
  </div>
</template>
