<template>
  <router-link v-if="to" :to="to">
    <button :type="props.type" :class="computeCss()" :disabled="isDisable">
      <span v-if="!iconLeft">{{ description }}</span>
      <slot></slot>
      <span v-if="iconLeft">{{ description }}</span>
    </button>
  </router-link>
  <button v-else :type="props.type" :class="computeCss()" :disabled="isDisable">
    <div v-if="isLoading">
      <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
      </svg>
    </div>
    <span v-if="!iconLeft">{{ description }}</span>
    <slot></slot>
    <span v-if="iconLeft">{{ description }}</span>
  </button>
</template>

<script lang="ts" setup>
import { BaseButtonEnum } from "../enums/BaseButtonEnum";
import { BaseButtonSizeEnum } from "../enums/BaseButtonSizeEnum";

const props = defineProps({
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false,
    default: BaseButtonEnum.BLUE
  },
  to: {
    type: String,
    required: false
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    required: false,
    default: 'button'
  },
  icon: {
    type: String,
    required: false
  },
  iconSize: {
    type: String,
    required: false
  },
  iconLeft: {
    type: String,
    required: false
  },
  isRounded: {
    type: Boolean,
    required: false
  },
  isDisable: {
    type: Boolean,
    required: false
  },
  size: {
    type: String,
    required: false
  },
  isLoading: {
    type: Boolean,
    required: false
  },
})

function computeCss() {
  let commonCss = "inline-flex items-center";
  let css;
  switch (props.color) {
    case BaseButtonEnum.BLUE: {
      css = 'focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300';
      if (props.isDisable) { css += " bg-blue-400"; }
      break;
    }
    case BaseButtonEnum.WHITE: {
      css = 'focus:outline-none text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200';
      if (props.isDisable) { css += " bg-gray-400"; }
      break;
    }
    case BaseButtonEnum.DARK: {
      css = 'focus:outline-none text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 ';
      if (props.isDisable) { css += " bg-gray-400"; }
      break;
    }
    case BaseButtonEnum.GREEN: {
      css = 'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300';
      if (props.isDisable) { css += " bg-green-400"; }
      break;
    }
    case BaseButtonEnum.RED: {
      css = 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300';
      if (props.isDisable) { css += " bg-red-400"; }
      break;
    }
    case BaseButtonEnum.YELLOW: {
      css = 'focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300';
      if (props.isDisable) { css += " bg-yellow-400"; }
      break;
    }
    case BaseButtonEnum.PURPLE: {
      css = 'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 px-5 py-2.5 mb-2';
      if (props.isDisable) { css += " bg-purple-400"; }
      break;
    }
  }

  let size = "px-5 py-2.5 mr-2 mb-2 text-sm";
  switch (props.size) {
    case BaseButtonSizeEnum.EXTRA_SMALL: { size = 'px-3 py-2 text-xs'; break; }
    case BaseButtonSizeEnum.SMALL: { size = 'px-3 py-2 text-sm'; break; }
    case BaseButtonSizeEnum.BASE: { size = 'px-5 py-2.5 text-sm'; break; }
    case BaseButtonSizeEnum.LARGE: { size = 'px-5 py-3 text-base'; break; }
    case BaseButtonSizeEnum.EXTRA_LARGE: { size = 'px-6 py-3.5 text-base'; break; }
  }

  let rounded = "rounded-lg";
  if (props.isRounded) { rounded = "rounded-full"; }
  if (props.isDisable) { css += " cursor-not-allowed"; }

  let fontSize = "font-medium";
  return commonCss + " " + size + " " + css + " " + fontSize + " " + rounded;
}
</script>
