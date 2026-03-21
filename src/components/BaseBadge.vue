<template>
  <span v-if="hasDefaultSlot" :class="computeCss()">
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { getBaseColorOf } from "../utils/util";
const slots = useSlots()

const hasDefaultSlot = computed(() => !!slots.default)
const props = defineProps({
  color: {
    type: String,
    required: false
  }
})

function computeCss() {
  let color = getBaseColorOf(props.color);
  return "font-bold bg-" + color + "-100 text-" + color + "-800 text-xs mr-2 px-2.5 py-0.5 rounded-full";
}
</script>
