<template>
  <div :class="computeCss()" role="alert">
    <InformationCircleIcon class="w-6 h-6 text-gray-400"/>
    <div>
      <span class="font-medium pl-1">{{ title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { AlertEnum } from "../enums/AlertEnum";
import { PropType } from "vue";
import { getBaseColor } from "../utils/util";

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: AlertEnum.ERROR
  },
  color: {
    type: Object as PropType<AlertEnum>,
    required: false,
    default: AlertEnum.ERROR
  }
})

function computeCss() {
  let baseColor = getBaseColor(props.color);
  return "flex items-center p-4 mb-4 text-sm text-" + baseColor + "-800 border border-" + baseColor + "-300 rounded-lg bg-" + baseColor + "-50 dark:bg-gray-800 dark:text-" + baseColor + "-400 dark:border-" + baseColor + "-800"
}
</script>
