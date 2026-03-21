<template>
<div v-if="isLoading" id="toast-top-right" :class="computeMainComponentCss()" role="alert">

  <div class="flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
    <div v-if="mode == BaseToastEnum.ERROR" :class="computeModeCss()">
      <ExclamationCircleIcon class="h-6 w-6 text-red-500" />
      <span class="sr-only">Error icon</span>
    </div>
    <div v-else-if="mode == BaseToastEnum.SUCCESS" :class="computeModeCss()">
      <CheckCircleIcon class="h-6 w-6 text-green-500" />
      <span class="sr-only">Check icon</span>
    </div>
    <div v-else-if="mode == BaseToastEnum.WARNING" :class="computeModeCss()">
      <ExclamationTriangleIcon class="h-6 w-6 text-yellow-500" />
      <span class="sr-only">Warning icon</span>
    </div>

    <div class="ml-3 text-sm font-normal">{{ description }}</div>

    <button v-if="hasCloseIcon" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
      <span class="sr-only">Close</span>
      <XMarkIcon
          class="h-6 w-6 text-gray-500 cursor-pointer"
          @click="isLoading = !isLoading"
      />
    </button>
  </div>

</div>
</template>

<script lang="ts" setup>
import { ExclamationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { ref, PropType } from "vue";
import { BaseToastEnum } from "../enums/BaseToastEnum";
import { PositioningEnum } from "../enums/PositioningEnum";

const props = defineProps({
  mode: {
    type: Object as PropType<BaseToastEnum>,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hasCloseIcon: {
    type: Boolean,
    required: false,
    default: true
  },
  positioning: {
    type: String,
    required: false,
    default: 'right'
  }
})

function computeModeCss() {
  let basePositioning = "";
  switch (props.mode) {
    case (BaseToastEnum.ERROR):
      basePositioning = "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200"
      break;
    case (BaseToastEnum.SUCCESS):
      basePositioning = "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200"
      break;
    case (BaseToastEnum.WARNING):
      basePositioning = "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200"
      break;
  }
  return 'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ' + basePositioning;
}

function computeMainComponentCss() {
  let basePositioning = "top-5 right-5";
  switch (props.positioning) {
    case (PositioningEnum.BOTTOM_LEFT):
      basePositioning = "bottom-5"
      break;
    case (PositioningEnum.TOP_LEFT):
      basePositioning = "top-5"
      break;
    case (PositioningEnum.TOP_RIGHT):
      basePositioning = "top-5 right-5"
      break;
    case (PositioningEnum.BOTTOM_RIGHT):
      basePositioning = "bottom-5 right-5"
      break;
  }
  return 'fixed flex items-center w-full max-w-md p-4 space-x-4 divide-x rounded-lg ' + basePositioning + ' space-x';
}

const isLoading = ref(true);

function disable() {
  setTimeout(() => isLoading.value = false, 1000000);
}

disable()
</script>
