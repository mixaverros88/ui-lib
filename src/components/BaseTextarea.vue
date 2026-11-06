<template>
  <textarea
    :value="modelValue ?? ''"
    class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm px-3 py-2 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors hover:border-slate-400 dark:hover:border-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed"
    @input="onInput"
  />
</template>

<script setup lang="ts">
// Themed multi-line input, sharing BaseInput's field skin. rows, maxlength, placeholder, required and extra classes fall through via attrs.
interface Props {
  modelValue?: string | null
}

withDefaults(defineProps<Props>(), { modelValue: '' })

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
</script>
