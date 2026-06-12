<template>
  <div :class="computeCss()" role="alert">
    <component :is="iconComponent" class="w-6 h-6 flex-shrink-0" :class="iconColorClass"/>
    <div>
      <span class="font-medium pl-1">{{ title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'
import { AlertEnum } from "../enums/AlertEnum";
import { computed, PropType } from "vue";
import { getBaseColor } from "../utils/util";

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  color: {
    type: String as PropType<AlertEnum>,
    required: false,
    default: AlertEnum.ERROR
  }
})

// Icon + tint follow the alert mode so an error doesn't render with a
// neutral info glyph.
const iconComponent = computed(() => {
  switch (props.color) {
    case AlertEnum.SUCCESS: return CheckCircleIcon;
    case AlertEnum.WARNING: return ExclamationTriangleIcon;
    case AlertEnum.INFO: return InformationCircleIcon;
    default: return ExclamationCircleIcon;
  }
})

const iconColorClass = computed(() => {
  switch (props.color) {
    case AlertEnum.SUCCESS: return 'text-green-500';
    case AlertEnum.WARNING: return 'text-yellow-500';
    case AlertEnum.INFO: return 'text-gray-500';
    default: return 'text-red-500';
  }
})

function computeCss() {
  let baseColor = getBaseColor(props.color);
  return "flex items-center p-4 mb-4 text-sm text-" + baseColor + "-800 border border-" + baseColor + "-300 rounded-lg bg-" + baseColor + "-50 dark:bg-gray-800 dark:text-" + baseColor + "-400 dark:border-" + baseColor + "-800"
}
</script>
