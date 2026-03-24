<template>
  <span v-if="hasDefaultSlot" :class="badgeClasses">
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { ColorsEnums } from "../enums/ColorsEnums";

const slots = useSlots()
const hasDefaultSlot = computed(() => !!slots.default)

const props = defineProps({
  color: {
    type: String,
    required: false
  }
})

const colorMap: Record<string, string> = {
  [ColorsEnums.RED]:    'bg-red-100 text-red-700 border-red-200',
  [ColorsEnums.GREEN]:  'bg-green-100 text-green-700 border-green-200',
  [ColorsEnums.BLUE]:   'bg-blue-100 text-blue-700 border-blue-200',
  [ColorsEnums.YELLOW]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  [ColorsEnums.GRAY]:   'bg-gray-100 text-gray-700 border-gray-200',
  [ColorsEnums.NONE]:   'bg-gray-50 text-gray-600 border-gray-200',
}

const defaultColor = 'bg-red-100 text-red-700 border-red-200'

const badgeClasses = computed(() => {
  const colorClasses = (props.color && colorMap[props.color]) || defaultColor
  return `inline-flex items-center gap-1 font-semibold text-xs leading-none px-3 py-1.5 rounded-full border ${colorClasses}`
})
</script>
