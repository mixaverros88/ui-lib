<template>
  <router-link v-if="to" :to="to" custom v-slot="{ navigate }">
    <button :type="props.type" :class="computeCss()" :disabled="isDisable || isLoading" @click="navigate">
      <div v-if="isLoading" class="inline-flex items-center">
        <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
      </div>
      <span v-if="!iconLeft">{{ description }}</span>
      <slot></slot>
      <span v-if="iconLeft">{{ description }}</span>
    </button>
  </router-link>
  <button v-else :type="props.type" :class="computeCss()" :disabled="isDisable || isLoading">
    <div v-if="isLoading" class="inline-flex items-center">
      <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import { useTheme } from "../composables/useTheme";

const { isDark } = useTheme();

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
  iconLeft: {
    type: Boolean,
    required: false,
    default: false
  },
  isRounded: {
    type: Boolean,
    required: false
  },
  outline: {
    type: Boolean,
    required: false,
    default: false
  },
  ghost: {
    type: Boolean,
    required: false,
    default: false
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

// Per-colour outlined palette. Full literal class strings (no dynamic
// concatenation) so Tailwind detects them at build time. The `light` /
// `dark` split mirrors the `isDark ? … : …` pattern the apps use.
function outlineCss() {
  const palette: Record<string, { light: string; dark: string }> = {
    [BaseButtonEnum.BLUE]: {
      light: 'text-blue-700 border-blue-300 hover:bg-blue-50',
      dark: 'text-blue-400 border-blue-500/40 hover:bg-blue-500/10',
    },
    [BaseButtonEnum.GREEN]: {
      light: 'text-green-700 border-green-300 hover:bg-green-50',
      dark: 'text-green-400 border-green-500/40 hover:bg-green-500/10',
    },
    [BaseButtonEnum.EMERALD]: {
      light: 'text-emerald-700 border-emerald-300 hover:bg-emerald-50',
      dark: 'text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/10',
    },
    [BaseButtonEnum.RED]: {
      light: 'text-red-700 border-red-300 hover:bg-red-50',
      dark: 'text-red-400 border-red-500/40 hover:bg-red-500/10',
    },
    [BaseButtonEnum.YELLOW]: {
      light: 'text-yellow-700 border-yellow-300 hover:bg-yellow-50',
      dark: 'text-yellow-400 border-yellow-500/40 hover:bg-yellow-500/10',
    },
    [BaseButtonEnum.PURPLE]: {
      light: 'text-purple-700 border-purple-300 hover:bg-purple-50',
      dark: 'text-purple-400 border-purple-500/40 hover:bg-purple-500/10',
    },
    [BaseButtonEnum.SKY]: {
      light: 'text-sky-700 border-sky-300 hover:bg-sky-50',
      dark: 'text-sky-400 border-sky-500/40 hover:bg-sky-500/10',
    },
    [BaseButtonEnum.AMBER]: {
      light: 'text-amber-700 border-amber-300 hover:bg-amber-50',
      dark: 'text-amber-400 border-amber-500/40 hover:bg-amber-500/10',
    },
    [BaseButtonEnum.GRAY]: {
      light: 'text-gray-700 border-gray-300 hover:bg-gray-50',
      dark: 'text-gray-300 border-gray-600 hover:bg-gray-800',
    },
    [BaseButtonEnum.DARK]: {
      light: 'text-gray-700 border-gray-300 hover:bg-gray-50',
      dark: 'text-gray-300 border-gray-600 hover:bg-gray-800',
    },
    [BaseButtonEnum.WHITE]: {
      light: 'text-gray-700 border-gray-300 hover:bg-gray-50',
      dark: 'text-gray-300 border-gray-600 hover:bg-gray-800',
    },
  };
  const entry = palette[props.color] ?? palette[BaseButtonEnum.BLUE];
  const tone = isDark.value ? entry.dark : entry.light;
  const isDisabled = props.isDisable || props.isLoading;
  return isDisabled
    ? `border bg-transparent ${tone} opacity-50 cursor-not-allowed`
    : `focus:outline-none border bg-transparent ${tone}`;
}

// Per-colour ghost palette: borderless, transparent fill, coloured text,
// tinted hover. Shades match the app conventions (light 500/600-text +
// 50/100-hover, dark 300/400-text + 500/10-hover). Theme-aware via the
// shared `isDark` ref. Full literal strings so Tailwind detects them.
function ghostCss() {
  const palette: Record<string, { light: string; dark: string }> = {
    [BaseButtonEnum.BLUE]: {
      light: 'text-blue-600 hover:bg-blue-50',
      dark: 'text-blue-400 hover:bg-blue-500/10',
    },
    [BaseButtonEnum.GREEN]: {
      light: 'text-green-600 hover:bg-green-50',
      dark: 'text-green-400 hover:bg-green-500/10',
    },
    [BaseButtonEnum.EMERALD]: {
      light: 'text-emerald-600 hover:bg-emerald-50',
      dark: 'text-emerald-400 hover:bg-emerald-500/10',
    },
    [BaseButtonEnum.SKY]: {
      light: 'text-sky-600 hover:bg-sky-50',
      dark: 'text-sky-400 hover:bg-sky-500/10',
    },
    [BaseButtonEnum.RED]: {
      light: 'text-red-500 hover:bg-red-50',
      dark: 'text-red-400 hover:bg-red-500/10',
    },
    [BaseButtonEnum.AMBER]: {
      light: 'text-amber-700 hover:bg-amber-50',
      dark: 'text-amber-300 hover:bg-amber-500/10',
    },
    [BaseButtonEnum.YELLOW]: {
      light: 'text-yellow-600 hover:bg-yellow-50',
      dark: 'text-yellow-400 hover:bg-yellow-500/10',
    },
    [BaseButtonEnum.PURPLE]: {
      light: 'text-purple-600 hover:bg-purple-50',
      dark: 'text-purple-400 hover:bg-purple-500/10',
    },
    [BaseButtonEnum.GRAY]: {
      light: 'text-gray-500 hover:bg-gray-100',
      dark: 'text-gray-400 hover:bg-gray-800',
    },
    [BaseButtonEnum.DARK]: {
      light: 'text-gray-500 hover:bg-gray-100',
      dark: 'text-gray-400 hover:bg-gray-800',
    },
    [BaseButtonEnum.WHITE]: {
      light: 'text-gray-500 hover:bg-gray-100',
      dark: 'text-gray-400 hover:bg-gray-800',
    },
  };
  const entry = palette[props.color] ?? palette[BaseButtonEnum.GRAY];
  const tone = isDark.value ? entry.dark : entry.light;
  const isDisabled = props.isDisable || props.isLoading;
  return isDisabled
    ? `bg-transparent ${tone} opacity-60 cursor-not-allowed`
    : `focus:outline-none bg-transparent ${tone} cursor-pointer`;
}

function computeCss() {
  const isDisabled = props.isDisable || props.isLoading;
  let commonCss = "inline-flex items-center";
  let css;
  switch (props.color) {
    case BaseButtonEnum.BLUE: {
      css = isDisabled
        ? 'text-white bg-blue-400 cursor-not-allowed'
        : 'focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300';
      break;
    }
    case BaseButtonEnum.WHITE: {
      css = isDisabled
        ? 'text-gray-900 bg-gray-200 border border-gray-200 cursor-not-allowed'
        : 'focus:outline-none text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200';
      break;
    }
    case BaseButtonEnum.DARK: {
      css = isDisabled
        ? 'text-white bg-gray-400 cursor-not-allowed'
        : 'focus:outline-none text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300';
      break;
    }
    case BaseButtonEnum.GREEN: {
      css = isDisabled
        ? 'text-white bg-green-400 cursor-not-allowed'
        : 'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300';
      break;
    }
    case BaseButtonEnum.EMERALD: {
      css = isDisabled
        ? 'text-white bg-emerald-400 cursor-not-allowed'
        : 'focus:outline-none text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300';
      break;
    }
    case BaseButtonEnum.RED: {
      css = isDisabled
        ? 'text-white bg-red-400 cursor-not-allowed'
        : 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300';
      break;
    }
    case BaseButtonEnum.YELLOW: {
      css = isDisabled
        ? 'text-white bg-yellow-300 cursor-not-allowed'
        : 'focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300';
      break;
    }
    case BaseButtonEnum.PURPLE: {
      css = isDisabled
        ? 'text-white bg-purple-400 cursor-not-allowed'
        : 'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300';
      break;
    }
    case BaseButtonEnum.SKY: {
      css = isDisabled
        ? 'text-white bg-sky-400 cursor-not-allowed'
        : 'focus:outline-none text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300';
      break;
    }
    case BaseButtonEnum.AMBER: {
      css = isDisabled
        ? 'text-white bg-amber-300 cursor-not-allowed'
        : 'focus:outline-none text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300';
      break;
    }
    case BaseButtonEnum.GRAY: {
      css = isDisabled
        ? 'text-white bg-gray-400 cursor-not-allowed'
        : 'focus:outline-none text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300';
      break;
    }
    default: {
      css = isDisabled
        ? 'text-white bg-blue-400 cursor-not-allowed'
        : 'focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300';
      break;
    }
  }

  // Outlined / secondary style: transparent fill, coloured text + border,
  // tinted hover. Theme-aware via the shared `isDark` ref because the
  // consuming apps drive dark mode through a `.dark` class toggle, not the
  // `prefers-color-scheme`-based `dark:` variant. Overrides the filled
  // `css` computed above when `outline` is set.
  if (props.outline) {
    css = outlineCss();
  }

  // Ghost / borderless style: like outline but with no border — colour
  // lives only in the text + tinted hover. Takes precedence over outline
  // if somehow both are set.
  if (props.ghost) {
    css = ghostCss();
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

  let fontSize = "font-medium";
  return commonCss + " " + size + " " + css + " " + fontSize + " " + rounded;
}
</script>
