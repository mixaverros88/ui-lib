<template>
  <span v-if="hasAmount && shouldBeGreen" class="font-bold text-green-800">
    {{ amount }} <span v-if="showCurrency">&euro;</span>
  </span>

  <span v-if="hasAmount && !shouldBeGreen" :class="[baseClasses, shouldBeRed ? 'text-red-800' : 'text-gray-800']">
    {{ amount }} <span v-if="showCurrency">&euro;</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    required: false
  },
  beforeAmount: {
    type: Number,
    default: null,
    required: false
  },
  showCurrency: {
    type: Boolean,
    default: true,
    required: false
  },
})

const hasAmount = computed(() => props.amount !== null && props.amount !== undefined)
const isNegative = computed(() => hasAmount.value && props.amount! < 0)
const isBelowBefore = computed(() => {
  if (props.beforeAmount === null || props.beforeAmount === undefined) return false
  return props.amount! < props.beforeAmount
})
const shouldBeRed = computed(() => isNegative.value || isBelowBefore.value)
const shouldBeGreen = computed(() => !isNegative.value && !isBelowBefore.value && !(props.beforeAmount === null || props.beforeAmount === undefined))
const baseClasses = 'font-bold'
</script>
