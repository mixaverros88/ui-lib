<template>
  <!--
    The "×" remove-row affordance used beside repeatable form rows
    (extracted from WireMate's CreateMock, where the identical red ×
    button appeared on every key/value, matcher, and cookie row).

    Renders a multiplication sign; name it for screen readers via
    `aria-label` (falls through as an attr, as do `title`, `disabled`,
    and any extra classes like `pt-1` / `self-start`).
  -->
  <button
    type="button"
    class="px-2 text-lg leading-none text-red-400 hover:text-red-600 transition-colors cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:text-gray-400"
    @click="emit('click')"
  >
    &times;
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ click: [] }>()
</script>
