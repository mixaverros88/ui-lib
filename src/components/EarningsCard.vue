<script setup lang="ts">
import { computed } from 'vue'

/**
 * Accent colour of the card. Defaults to `orange` so existing consumers are
 * unaffected; `emerald` lets a host app tint the card to a green-themed brand,
 * and `red` renders a loss/negative theme (also selected automatically by
 * `signed`, see below). Each accent carries the full literal Tailwind class
 * strings (rather than a single interpolated hue) so the classes are statically
 * detectable and the themes can differ in more than hue — e.g. orange renders
 * the amount in neutral grey while emerald/red render it in the accent itself.
 */
type Accent = 'orange' | 'emerald' | 'red'

interface Props {
  title?: string
  amount?: number
  subtitle?: string
  badge?: string
  currency?: string
  decimals?: number
  accent?: Accent
  /**
   * Treat the card as a signed P&L figure. When `true` and the amount is
   * negative, the card renders the loss theme automatically: the `red` accent
   * (border / amount / subtitle / icon-box recoloured) AND the trend glyph
   * flipped to point DOWN. A non-negative amount keeps the chosen `accent` and
   * the upward glyph. Defaults to `false` so existing consumers — which use the
   * card for always-positive totals like lifetime earnings — are unaffected.
   */
  signed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'TOTAL EARNINGS',
  amount: 0,
  subtitle: 'Lifetime commission',
  badge: '',
  currency: '$',
  decimals: 2,
  accent: 'orange',
  signed: false,
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
  red: {
    border: 'border-red-300 dark:border-red-700',
    badge: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
    amount: 'text-red-500 dark:text-red-400',
    subtitle: 'text-red-500 dark:text-red-400',
    iconBox: 'bg-red-50 dark:bg-red-900/30',
    icon: 'text-red-500',
  },
}

// Coerce once: the amount can arrive as a JSON string (e.g. "-0.01"); fall back
// to 0 for non-finite input (NaN/Infinity) so the card never renders "NaN".
const numericAmount = computed(() => {
  const n = Number(props.amount)
  return Number.isFinite(n) ? n : 0
})

// A loss only when the card is in signed mode and the value is below zero.
const isLoss = computed(() => props.signed && numericAmount.value < 0)

// In signed mode a negative amount forces the red loss theme; otherwise the
// caller-chosen accent stands.
const effectiveAccent = computed<Accent>(() => (isLoss.value ? 'red' : props.accent))

const cls = computed(() => ACCENTS[effectiveAccent.value])

const formattedAmount = computed(
  () =>
    props.currency +
    numericAmount.value.toLocaleString('en-US', {
      minimumFractionDigits: props.decimals,
      maximumFractionDigits: props.decimals,
    }),
)
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
          <!-- Loss: a downward trend line + down-right arrowhead (the upward
               glyph mirrored vertically). Otherwise the standard up-trend. -->
          <template v-if="isLoss">
            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
            <polyline points="16 17 22 17 22 11" />
          </template>
          <template v-else>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </template>
        </svg>
      </div>
    </div>
  </div>
</template>
