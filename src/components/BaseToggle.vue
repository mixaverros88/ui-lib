<template>
  <label
    class="inline-flex items-center gap-3 select-none"
    :class="disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'"
  >
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label ? undefined : ariaLabel || undefined"
      :disabled="disabled"
      class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed"
      :class="modelValue ? ON[color] : offTone === 'red' ? 'bg-red-200 dark:bg-red-900/50' : 'bg-slate-200 dark:bg-slate-700'"
      @click="toggle"
    >
      <span
        class="inline-block h-5 w-5 rounded-full bg-white shadow ring-1 ring-black/5 transition-transform"
        :class="modelValue ? 'translate-x-[22px]' : 'translate-x-0.5'"
        aria-hidden="true"
      />
    </button>
    <span v-if="label" class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
/**
 * On/off switch (role="switch"). `v-model` is the boolean; `change` fires
 * after every user toggle with the new value, so callers can persist it.
 * `color` tints the on state; `offTone="red"` shows a red track while off
 * (e.g. "account is down" states).
 */
type Color = 'emerald' | 'red' | 'sky' | 'amber'

interface Props {
  modelValue?: boolean
  /** Visible label beside the switch (also its accessible name). */
  label?: string
  /** Accessible name when there is no visible label. */
  ariaLabel?: string
  color?: Color
  offTone?: 'slate' | 'red'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  ariaLabel: '',
  color: 'emerald',
  offTone: 'slate',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const ON: Record<Color, string> = {
  emerald: 'bg-emerald-500',
  red: 'bg-red-600',
  sky: 'bg-sky-500',
  amber: 'bg-amber-500',
}

function toggle() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>
