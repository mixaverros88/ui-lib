<template>
  <!--
    Small tinted "chip" action button — the compact emerald "+ Add" pill
    used above repeatable form rows (extracted from WireMate's CreateMock,
    where the identical class string appeared seven times).

    Label comes from the default slot so callers can mix text and icons.
  -->
  <button
    type="button"
    :disabled="disabled"
    class="inline-flex items-center gap-1 font-medium rounded-md border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    :class="[
      size === 'xs' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1',
      isDark
        ? 'text-emerald-300 border-emerald-700 bg-emerald-900/30 hover:bg-emerald-800/50'
        : 'text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100',
    ]"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { useTheme } from '../composables/useTheme'

interface Props {
  /** 'sm' = px-2.5 py-1 (default); 'xs' = px-2 py-0.5 for tight corners. */
  size?: 'xs' | 'sm'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'sm',
  disabled: false,
})

const emit = defineEmits<{ click: [] }>()

const { isDark } = useTheme()
</script>
