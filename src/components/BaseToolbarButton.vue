<template>
  <!--
    Bordered toolbar button — the "Refresh / Delete All" row that sits
    under a page header. Pairs an optional leading icon with a label.

    Slots:
      • icon — leading Heroicon. Receives an `iconClass` slot prop
        ('w-4 h-4') so callers can spread it onto their icon and still
        add their own state classes (e.g. `:class="['animate-spin']"`).

    Props:
      • label    — button text (rendered in a <span>). Optional so an
        icon-only toolbar button is possible.
      • variant  — 'neutral' (default grey) or 'danger' (solid red).
      • disabled — greys out + blocks the click.
      • title    — native tooltip / accessibility text.
      • type     — native button type. Defaults to 'button' so the
        button never accidentally submits a surrounding form.
  -->
  <button
    :type="type"
    :disabled="disabled"
    :title="title"
    class="inline-flex shrink-0 items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
    :class="variantClass"
    @click="$emit('click', $event)"
  >
    <slot name="icon" :icon-class="'w-4 h-4'" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

type ToolbarVariant = 'neutral' | 'danger'

const props = withDefaults(
  defineProps<{
    label?: string
    variant?: ToolbarVariant
    disabled?: boolean
    title?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    label: '',
    variant: 'neutral',
    disabled: false,
    title: undefined,
    type: 'button',
  },
)

defineEmits<{
  click: [event: MouseEvent]
}>()

const { isDark } = useTheme()

// Resolves the variant + theme into the colour classes. The danger
// style is normalised here so every destructive toolbar button reads
// identically (red-500 hover in dark, red-700 hover in light).
const variantClass = computed(() => {
  const palette: Record<ToolbarVariant, { dark: string; light: string }> = {
    neutral: {
      dark: 'bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700',
      light: 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100',
    },
    danger: {
      dark: 'bg-red-600 text-white border-red-600 hover:bg-red-500',
      light: 'bg-red-600 text-white border-red-600 hover:bg-red-700',
    },
  }
  const entry = palette[props.variant]
  return isDark.value ? entry.dark : entry.light
})
</script>
