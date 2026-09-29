<template>
  <label
    class="inline-flex items-center gap-2 select-none"
    :class="disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'"
  >
    <input
      v-bind="$attrs"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="h-5 w-5 shrink-0 cursor-[inherit] rounded-md border-slate-300 bg-white text-emerald-600 accent-emerald-600 transition-colors focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-0 dark:border-slate-600 dark:bg-slate-900 dark:checked:bg-emerald-600"
      @change="onChange"
    />
    <span v-if="label || $slots.default" class="text-sm text-slate-700 dark:text-slate-200">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
/**
 * Rounded checkbox, emerald when checked (both a forms-plugin fill via
 * `text-emerald-600` and native `accent-color`, so it looks the same with or
 * without @tailwindcss/forms / Flowbite). `v-model` is the boolean; `change`
 * fires with the new value. Attrs (id, name, …) go to the <input>.
 */
defineOptions({ inheritAttrs: false })

interface Props {
  modelValue?: boolean
  label?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

function onChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>
