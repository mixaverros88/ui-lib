<template>
  <!--
    Compact ghost action button — the colour-coded "Edit / Logs / Stub /
    Delete" actions that sit on a card footer or in an action row. No
    border or fill at rest; a tinted hover background keyed to the
    semantic colour. Pairs an optional leading icon with a label.

    Slots:
      • icon — leading Heroicon. Receives an `iconClass` slot prop
        ('w-4 h-4') so callers can spread it onto their icon.

    Props:
      • label     — button text. Optional (some actions are label-only,
        e.g. "click to create").
      • color     — semantic colour token. Determines text + hover tint.
      • disabled  — greys via opacity + blocks the click; the hover tint
        is suppressed so a disabled button doesn't light up.
      • fullWidth — stretch to fill its flex row (adds `flex-1`). Used
        on card footers where actions share the width evenly.
      • title / ariaLabel — native tooltip / accessibility text.
      • type      — native button type. Defaults to 'button'.
  -->
  <button
    :type="type"
    :disabled="disabled"
    :title="title"
    :aria-label="ariaLabel"
    class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
    :class="[fullWidth ? 'flex-1' : '', stateClass]"
    @click="$emit('click', $event)"
  >
    <slot name="icon" :icon-class="'w-4 h-4'" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

type ActionColor =
  | 'emerald'
  | 'sky'
  | 'indigo'
  | 'teal'
  | 'purple'
  | 'red'
  | 'amber'
  | 'amberStrong'

const props = withDefaults(
  defineProps<{
    label?: string
    color?: ActionColor
    disabled?: boolean
    fullWidth?: boolean
    title?: string
    ariaLabel?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    label: '',
    color: 'emerald',
    disabled: false,
    fullWidth: false,
    title: undefined,
    ariaLabel: undefined,
    type: 'button',
  },
)

defineEmits<{
  click: [event: MouseEvent]
}>()

const { isDark } = useTheme()

// Per-colour text + hover-tint classes for each theme. `amberStrong`
// is the higher-contrast amber used for the "click to create" call to
// action; `amber` is the softer shade used for Clone-style actions.
const colorClass = computed(() => {
  const palette: Record<ActionColor, { dark: string; light: string }> = {
    emerald: {
      dark: 'text-emerald-400 hover:bg-emerald-500/10',
      light: 'text-emerald-600 hover:bg-emerald-50',
    },
    sky: {
      dark: 'text-sky-400 hover:bg-sky-500/10',
      light: 'text-sky-600 hover:bg-sky-50',
    },
    indigo: {
      dark: 'text-indigo-400 hover:bg-indigo-500/10',
      light: 'text-indigo-600 hover:bg-indigo-50',
    },
    teal: {
      dark: 'text-teal-400 hover:bg-teal-500/10',
      light: 'text-teal-600 hover:bg-teal-50',
    },
    purple: {
      dark: 'text-purple-400 hover:bg-purple-500/10',
      light: 'text-purple-600 hover:bg-purple-50',
    },
    red: {
      dark: 'text-red-400 hover:bg-red-500/10',
      light: 'text-red-500 hover:bg-red-50',
    },
    amber: {
      dark: 'text-amber-400 hover:bg-amber-500/10',
      light: 'text-amber-600 hover:bg-amber-50',
    },
    amberStrong: {
      dark: 'text-amber-300 hover:bg-amber-500/10',
      light: 'text-amber-700 hover:bg-amber-50',
    },
  }
  const entry = palette[props.color]
  return isDark.value ? entry.dark : entry.light
})

// Text colour without the hover tint, for the disabled state. Keeps the
// semantic colour legible but stops the button reacting to the pointer.
const disabledColorClass = computed(() => {
  const palette: Record<ActionColor, { dark: string; light: string }> = {
    emerald: { dark: 'text-emerald-400', light: 'text-emerald-600' },
    sky: { dark: 'text-sky-400', light: 'text-sky-600' },
    indigo: { dark: 'text-indigo-400', light: 'text-indigo-600' },
    teal: { dark: 'text-teal-400', light: 'text-teal-600' },
    purple: { dark: 'text-purple-400', light: 'text-purple-600' },
    red: { dark: 'text-red-400', light: 'text-red-500' },
    amber: { dark: 'text-amber-400', light: 'text-amber-600' },
    amberStrong: { dark: 'text-amber-300', light: 'text-amber-700' },
  }
  const entry = palette[props.color]
  return isDark.value ? entry.dark : entry.light
})

const stateClass = computed(() =>
  props.disabled
    ? `${disabledColorClass.value} opacity-50 cursor-not-allowed`
    : `${colorClass.value} cursor-pointer`,
)
</script>
