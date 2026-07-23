<template>
  <!--
    Connection/health status pill: a colored dot (pulsing while ok) next
    to a short label, on a tinted rounded background. Extracted from
    WireMate's sidebar WireMock health indicator.

    status: 'ok' → emerald + pulse, 'error' → red, 'unknown' → gray.
  -->
  <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" :class="pillClass">
    <span class="relative flex h-2 w-2">
      <span
        v-if="status === 'ok'"
        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
        aria-hidden="true"
      ></span>
      <span class="relative inline-flex rounded-full h-2 w-2" :class="dotClass"></span>
    </span>
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

interface Props {
  status: 'ok' | 'error' | 'unknown'
  /** Short text next to the dot, e.g. "WireMock Connected". */
  label: string
}

const props = defineProps<Props>()

const { isDark } = useTheme()

const pillClass = computed(() => {
  switch (props.status) {
    case 'ok':
      return isDark.value ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
    case 'error':
      return isDark.value ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-700'
    default:
      return isDark.value ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
  }
})

const dotClass = computed(() => {
  switch (props.status) {
    case 'ok': return 'bg-emerald-500'
    case 'error': return 'bg-red-500'
    default: return 'bg-gray-400'
  }
})
</script>
