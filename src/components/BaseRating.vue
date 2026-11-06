<template>
  <span class="inline-flex items-center gap-0.5" :title="`${rating} / 5`">
    <template v-for="i in 5" :key="i">
      <StarSolid v-if="i <= Math.round(rating)" class="h-4 w-4 text-amber-400" aria-hidden="true" />
      <StarOutline v-else class="h-4 w-4 text-slate-300 dark:text-slate-600" aria-hidden="true" />
    </template>
    <span class="ml-1 font-mono text-xs text-slate-500 dark:text-slate-400">
      {{ rating.toFixed(1) }}<template v-if="count !== null"> ({{ count }})</template>
    </span>
  </span>
</template>

<script setup lang="ts">
// Read-only 0-5 star rating with its numeric value and optional review count.
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid'
import { StarIcon as StarOutline } from '@heroicons/vue/24/outline'

withDefaults(defineProps<{ rating: number; count?: number | null }>(), {
  count: null,
})
</script>
