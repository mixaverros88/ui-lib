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
  return 'block p-8 border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 ' + props.bgColor;
}
</script>
