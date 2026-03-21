<template>
  <hr v-if="mode === LineEnum.BASE" class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
  <hr v-if="mode === LineEnum.BASE_SHORTER" class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
  <hr v-if="mode === LineEnum.SQUARE" class="w-8 h-8 mx-auto my-8 bg-gray-200 border-0 rounded md:my-12 dark:bg-gray-700">
</template>

<script lang="ts" setup>
import { LineEnum } from "../enums/LineEnum";

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: LineEnum.BASE
  }
})
</script>
