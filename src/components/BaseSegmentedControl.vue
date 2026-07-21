<template>
  <!--
    Segmented button group ("Class: All | Stock | Crypto"). One button per
    option; the selected one gets the filled treatment and aria-pressed.

    Variants:
      • base    — px-3 py-2 text-sm buttons, emerald-500 active fill
      • wide    — px-4 py-2 buttons, emerald-600 active fill
      • toolbar — h-9 uppercase text-xs buttons with focus-visible rings
                  (divide-x separators instead of border-l)

    `optionClass` overrides the per-button fill classes (e.g. severity
    colours per option); layout classes stay owned by the variant.
    Same `dark:`-variant note as BaseInput.
  -->
  <div
    :role="ariaLabel ? 'group' : undefined"
    :aria-label="ariaLabel || undefined"
    :class="wrapClass"
  >
    <button
      v-for="opt in options"
      :key="String(opt.value)"
      type="button"
      :class="[buttonClass, fillClass(opt)]"
      :aria-pressed="opt.value === modelValue"
      :title="opt.title"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SegmentedOption } from '../types/segmented'

// NOT generic on purpose: vite-plugin-dts flattens SFC generics out of the
// emitted declarations, so consumers would see the erased constraint anyway.
// The update:modelValue payload is `any` so `v-model` on a union-typed ref
// ('all' | 'STOCK' | …) type-checks; the actual payload is always one of the
// options' values.
interface Props {
  options: readonly SegmentedOption[]
  modelValue: string | number
  variant?: 'base' | 'wide' | 'toolbar'
  /** When set, the wrapper announces itself as a labelled group. */
  ariaLabel?: string
  /**
   * Override the fill (colour) classes per button — receives the option and
   * whether it is the selected one. Defaults to the variant's emerald/slate
   * treatment.
   */
  optionClass?: (option: SegmentedOption, active: boolean) => string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'base',
  ariaLabel: '',
  optionClass: undefined,
})

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'update:modelValue', value: any): void
}>()

const wrapClass = computed(() =>
  props.variant === 'toolbar'
    ? 'inline-flex h-9 divide-x divide-slate-300 dark:divide-slate-600 rounded-md border border-slate-300 dark:border-slate-600 overflow-hidden'
    : 'inline-flex rounded border border-slate-300 dark:border-slate-600 overflow-hidden',
)

const buttonClass = computed(() => {
  if (props.variant === 'toolbar') {
    return (
      'flex items-center px-3.5 text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500'
    )
  }
  const padding = props.variant === 'wide' ? 'px-4 py-2' : 'px-3 py-2'
  return `${padding} text-sm font-medium transition-colors cursor-pointer border-l first:border-l-0 border-slate-300 dark:border-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500`
})

const activeFill = computed(() =>
  props.variant === 'wide' ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white',
)

const idleFill =
  'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'

function fillClass(opt: SegmentedOption): string {
  const active = opt.value === props.modelValue
  if (props.optionClass) return props.optionClass(opt, active)
  return active ? activeFill.value : idleFill
}
</script>
