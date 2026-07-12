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
  /**
   * Dense variant for dashboards that tile many cards on one row: tighter
   * padding, smaller type, and the trend glyph shrunk into the top-right
   * corner (absolutely positioned so the amount keeps the full card width —
   * important for long values like 8-decimal BTC quantities). Don't combine
   * with `badge`: both occupy the top-right corner. Defaults to `false` so
   * existing consumers keep the large layout.
   */
  compact?: boolean
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
  compact: false,
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
    class="relative rounded-xl border-2 border-dashed bg-white dark:bg-slate-800"
    :class="[cls.border, compact ? 'p-3' : 'p-6']"
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
      <div class="min-w-0">
        <!-- Title: pr-8 in compact reserves only the corner the absolute icon
             occupies — the amount below keeps the full card width so long
             values (8-decimal BTC quantities) don't truncate. -->
        <p
          class="font-bold tracking-wide text-gray-800 dark:text-slate-200"
          :class="compact ? 'pr-8 text-xs' : 'text-sm'"
        >
          {{ title }}
        </p>

        <!-- Amount -->
        <p class="mt-1 font-bold truncate" :class="[cls.amount, compact ? 'text-lg' : 'text-4xl']">
          {{ formattedAmount }}
        </p>

        <!-- Subtitle -->
        <p class="mt-1 font-medium" :class="[cls.subtitle, compact ? 'text-xs' : 'text-sm']">
          {{ subtitle }}
        </p>
      </div>

      <!-- Chart icon -->
      <div
        class="flex items-center justify-center"
        :class="[
          cls.iconBox,
          compact ? 'absolute right-2 top-2 h-6 w-6 rounded-lg' : 'mt-6 h-12 w-12 rounded-xl',
        ]"
      >
        <svg
          :class="[cls.icon, compact ? 'h-3.5 w-3.5' : 'h-6 w-6']"
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
