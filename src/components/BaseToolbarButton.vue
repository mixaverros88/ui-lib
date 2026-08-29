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
      • variant  — 'neutral' (default grey), 'danger' (solid red) or
        'ghost' (slate outline — TradeAutomation's toolbar/footer idiom).
      • disabled — greys out + blocks the click.
      • title    — native tooltip / accessibility text.
      • type     — native button type. Defaults to 'button' so the
        button never accidentally submits a surrounding form.
  -->
  <button
    :type="type"
    :disabled="disabled"
    :title="title"
    class="inline-flex shrink-0 items-center gap-2 text-sm border transition-colors cursor-pointer disabled:cursor-not-allowed whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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

type ToolbarVariant = 'neutral' | 'danger' | 'ghost'

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

// Resolves the variant + theme into shape and colour classes. The danger
// style is normalised here so every destructive toolbar button reads
// identically (red-500 hover in dark, red-700 hover in light). Shape lives
// per-variant because 'ghost' — the slate outline button extracted from
// TradeAutomation's toolbars and modal footers — is a fixed-height
// rounded-md button, not the neutral/danger pill; it themes via dark:
// utilities so it renders the same markup in both themes.
const SHAPE: Record<ToolbarVariant, string> = {
  neutral: 'px-3 py-2 rounded-lg font-medium disabled:opacity-50',
  danger: 'px-3 py-2 rounded-lg font-medium disabled:opacity-50',
  ghost: 'h-9 px-4 rounded-md font-semibold disabled:opacity-40 disabled:hover:bg-slate-50 dark:disabled:hover:bg-slate-900',
}

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
    ghost: {
      dark: 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
      light: 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
    },
  }
  const entry = palette[props.variant]
  return [SHAPE[props.variant], isDark.value ? entry.dark : entry.light]
})
</script>
