<template>
  <!--
    Themed text/number input. Carries the shared field skin (slate border,
    slate-50/slate-900 surface); everything else — placeholder, id, disabled,
    step/min, extra classes like `font-mono` — falls through via attrs and
    Vue's class merging, so callers keep their one-off styling.

    Dark mode uses `dark:` variants: the consuming app must map the `dark`
    variant to the `.dark` class useTheme() toggles (all current consumers do).
  -->
  <input
    :value="modelValue"
    :type="type"
    class="rounded border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm"
    :class="[block ? 'w-full' : '', size === 'sm' ? 'px-2 py-1.5' : 'px-3 py-2']"
    @input="onInput"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number | null
  /** Native input type ('text', 'number', 'password', …). */
  type?: string
  /** 'md' = px-3 py-2 (default); 'sm' = px-2 py-1.5 compact. */
  size?: 'sm' | 'md'
  /** Full-width (w-full). Set false for inline fields. */
  block?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  block: true,
})

const emit = defineEmits<{
  /** Raw string value on every input — callers parse numbers themselves. */
  (e: 'update:modelValue', value: string): void
}>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
