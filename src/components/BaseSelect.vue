<template>
  <!--
    Themed select sharing BaseInput's field skin. Options come from the
    default slot so callers keep full control of <option> rendering (values,
    titles, disabled entries). Attrs (id, disabled, extra classes) fall
    through. Same `dark:`-variant note as BaseInput.
  -->
  <select
    :value="modelValue"
    class="rounded border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm"
    :class="[block ? 'w-full' : '', size === 'md' ? 'px-3 py-2' : 'px-2 py-1.5']"
    @change="onChange"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
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
}

withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  size: 'sm',
  block: true,
})

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'update:modelValue', value: any): void
}>()

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLSelectElement).value)
}
</script>
