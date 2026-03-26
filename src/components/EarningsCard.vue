<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  amount?: number
  subtitle?: string
  badge?: string
  currency?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'TOTAL EARNINGS',
  amount: 0,
  subtitle: 'Lifetime commission',
  badge: '',
  currency: '$',
})

const formattedAmount = computed(() => {
  return props.currency + props.amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
})
</script>

<template>
  <div class="relative rounded-xl border-2 border-dashed border-orange-300 bg-white p-6">
    <!-- Badge -->
    <div
      v-if="badge"
      class="absolute right-4 top-4 rounded-md bg-orange-100 px-3 py-1 text-xs font-bold tracking-wide text-orange-500"
    >
      {{ badge }}
    </div>

    <!-- Header row -->
    <div class="flex items-start justify-between">
      <div>
        <!-- Title -->
        <p class="text-sm font-bold tracking-wide text-gray-800">
          {{ title }}
        </p>

        <!-- Amount -->
        <p class="mt-1 text-4xl font-bold text-gray-400">
          {{ formattedAmount }}
        </p>

        <!-- Subtitle -->
        <p class="mt-1 text-sm font-medium text-orange-400">
          {{ subtitle }}
        </p>
      </div>

      <!-- Chart icon -->
      <div class="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
        <svg
          class="h-6 w-6 text-orange-400"
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
