<template>
  <div v-if="number">
    <span v-if="isNegative" class="flex items-center space-x-2">
      <BaseBadge :color="ColorsEnums.RED">{{ number }}{{ props.icon }}</BaseBadge>
      <ArrowDownIcon class="h-5 w-5 text-red-500" />
    </span>

    <span v-else class="flex items-center space-x-2">
      <BaseBadge :color="ColorsEnums.GREEN">{{ number }}{{ props.icon }}</BaseBadge>
      <ArrowUpIcon class="h-5 w-5 text-green-500" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from './BaseBadge.vue'
import { ColorsEnums } from '../enums/ColorsEnums'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  number: {
    type: Number,
    required: false
  },
  icon: {
    type: String,
    required: false
  }
})

const isNegative = computed(() => props.number !== null && props.number !== undefined && props.number < 0)
</script>
