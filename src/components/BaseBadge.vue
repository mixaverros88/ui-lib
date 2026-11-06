<template>
  <span v-if="hasDefaultSlot" :class="badgeClasses">
    <BadgeContent />
  </span>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { ColorsEnums } from "../enums/ColorsEnums";
import { humanizeTextVNodes } from '../utils/humanize'

const slots = useSlots()
const hasDefaultSlot = computed(() => !!slots.default)

// Badge labels are often raw enum names (PROFIT_TARGET, RSI_REVERT); render
// their underscores as spaces so callers don't have to humanize at every call
// site. Only plain text nodes are rewritten — element children pass through.
const BadgeContent = () => humanizeTextVNodes(slots.default?.() ?? [])

const props = defineProps({
  color: {
    type: String,
    required: false
  },
  // Pulse the badge to flag a live / in-progress state (e.g. an OPEN
  // position). Honours prefers-reduced-motion.
  blink: {
    type: Boolean,
    default: false
  }
})

const colorMap: Record<string, string> = {
  [ColorsEnums.RED]:    'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-300 dark:border-red-500/30',
  [ColorsEnums.GREEN]:  'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/15 dark:text-green-300 dark:border-green-500/30',
  [ColorsEnums.BLUE]:   'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30',
  [ColorsEnums.YELLOW]: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-300 dark:border-yellow-500/30',
  [ColorsEnums.GRAY]:   'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-500/15 dark:text-gray-300 dark:border-gray-500/30',
  [ColorsEnums.BLACK]:  'bg-gray-800 text-gray-100 border-gray-700',
  [ColorsEnums.NONE]:   'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
}

const defaultColor = colorMap[ColorsEnums.RED]

const badgeClasses = computed(() => {
  const colorClasses = (props.color && colorMap[props.color]) || defaultColor
  const blinkClasses = props.blink ? ' animate-pulse motion-reduce:animate-none' : ''
  return `inline-flex items-center gap-1 font-semibold text-xs leading-none px-3 py-1.5 rounded-full border ${colorClasses}${blinkClasses}`
})
</script>
