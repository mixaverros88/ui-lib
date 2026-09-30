<template>
  <div class="relative" :class="block ? 'w-full' : 'inline-block'">
    <select
      v-bind="$attrs"
      :value="modelValue"
      class="base-select w-full appearance-none bg-none rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm cursor-pointer transition-colors hover:border-slate-400 dark:hover:border-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed"
      :class="size === 'md' ? 'py-2 pl-3 pr-9' : 'py-1.5 pl-2.5 pr-8'"
      @change="onChange"
    >
      <SlotContent />
    </select>
    <ChevronDownIcon
      class="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400"
      :class="size === 'md' ? 'right-3' : 'right-2.5'"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
/*
 * Themed select sharing BaseInput's field skin. Options come from the
 * default slot so callers keep full control of <option> rendering (values,
 * titles, disabled entries). Attrs (id, disabled, extra classes) fall
 * through. Same `dark:`-variant note as BaseInput.
 *
 */
import { useSlots } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { humanizeTextVNodes } from '../utils/humanize'

// Attrs (id, name, disabled, extra classes) go to the <select>, not the
// chevron wrapper. `bg-none` drops any arrow a forms reset (e.g. Flowbite /
// @tailwindcss/forms) paints as a background image, so only our chevron shows.
defineOptions({ inheritAttrs: false })

// String-valued only — a DOM select always yields strings; use v-model.number
// semantics in the owner if needed. The update:modelValue payload is `any`
// (not generic: vite-plugin-dts flattens SFC generics out of the emitted
// declarations) so `v-model` on a union-typed ref ('7D' | '30D' | …)
// type-checks; the actual payload is always the selected option's string.
interface Props {
  modelValue?: string | null
  /** 'sm' = px-2 py-1.5 (default, the usual select height); 'md' = px-3 py-2. */
  size?: 'sm' | 'md'
  /** Full-width (w-full). Set false for inline selects. */
  block?: boolean
  /** Render underscores in option text as spaces (BLUE_SKY → BLUE SKY). Values are untouched. */
  humanize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  size: 'sm',
  block: true,
  humanize: true,
})

// Options are often raw enum names; only their visible text is rewritten, the
// `value` attribute (what v-model receives) stays the raw enum.
const slots = useSlots()
const SlotContent = () => {
  const nodes = slots.default?.() ?? []
  return props.humanize ? humanizeTextVNodes(nodes, ['option', 'optgroup']) : nodes
}

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'update:modelValue', value: any): void
}>()

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLSelectElement).value)
}
</script>
