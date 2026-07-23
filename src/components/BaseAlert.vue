<template>
  <!--
    Inline notice panel (error / warning / success / info).

    v2 (1.27.0): rewritten from the legacy dynamic-class version —
      • theme-aware via the shared `isDark` ref (same pattern as the other
        extracted components; no runtime-composed class names, so every
        class survives Tailwind's static scan)
      • optional default slot for body content below the title
      • `compact` variant for slim in-form warnings (text-xs, small icon)
    Backward compatible: `<BaseAlert title="..." :color="AlertEnum.X" />`
    renders the same single-line alert as before, mb-4 included.
  -->
  <div
    role="alert"
    class="flex gap-3 mb-4 rounded-lg border text-sm transition-colors"
    :class="[compact ? 'items-start px-3 py-2 text-xs' : 'items-start p-4', palette]"
  >
    <component
      :is="iconComponent"
      class="shrink-0"
      :class="[compact ? 'w-4 h-4 mt-px' : 'w-5 h-5 mt-0.5', iconColorClass]"
      aria-hidden="true"
    />
    <div class="min-w-0 flex-1">
      <p v-if="title" class="font-medium">{{ title }}</p>
      <!-- Body — caller-styled free-form content under the title. -->
      <slot />
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
import { AlertEnum } from '../enums/AlertEnum'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

interface Props {
  /** Bold headline. Optional when the slot carries the whole message. */
  title?: string
  /** Alert mode — drives palette and icon. Defaults to ERROR. */
  color?: AlertEnum
  /** Slim variant for in-form warnings: text-xs, smaller icon/padding. */
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  color: AlertEnum.ERROR,
  compact: false,
})

const { isDark } = useTheme()

// Literal palette table so Tailwind's scanner sees every class.
const PALETTES: Record<AlertEnum, { light: string; dark: string }> = {
  [AlertEnum.ERROR]: {
    light: 'bg-red-50 border-red-200 text-red-700',
    dark: 'bg-red-500/10 border-red-500/30 text-red-300',
  },
  [AlertEnum.WARNING]: {
    light: 'bg-amber-50 border-amber-200 text-amber-700',
    dark: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
  },
  [AlertEnum.SUCCESS]: {
    light: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    dark: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
  },
  [AlertEnum.INFO]: {
    light: 'bg-sky-50 border-sky-200 text-sky-700',
    dark: 'bg-sky-500/10 border-sky-500/30 text-sky-300',
  },
}

const palette = computed(() =>
  isDark.value ? PALETTES[props.color].dark : PALETTES[props.color].light,
)

// Icon + tint follow the alert mode so an error doesn't render with a
// neutral info glyph.
const iconComponent = computed(() => {
  switch (props.color) {
    case AlertEnum.SUCCESS: return CheckCircleIcon
    case AlertEnum.WARNING: return ExclamationTriangleIcon
    case AlertEnum.INFO: return InformationCircleIcon
    default: return ExclamationCircleIcon
  }
})

const iconColorClass = computed(() => {
  switch (props.color) {
    case AlertEnum.SUCCESS: return 'text-emerald-500'
    case AlertEnum.WARNING: return 'text-amber-500'
    case AlertEnum.INFO: return 'text-sky-500'
    default: return 'text-red-500'
  }
})
</script>
