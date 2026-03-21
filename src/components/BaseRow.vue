<template>
  <div :class="computeCss()">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  bgColor: {
    type: String,
    required: false,
    default: "white"
  }
})

function computeCss() {
  return 'block p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 global ' + props.bgColor;
}
</script>
