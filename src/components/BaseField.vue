<template>
  <div ref="root" :class="grow ? 'min-w-48 flex-1' : ''" class="text-left">
    <label
      v-if="label"
      :for="labelFor || autoFor"
      class="mb-1 block"
      :class="compact
        ? 'text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400'
        : 'text-sm font-medium text-slate-700 dark:text-slate-200'"
    >
      {{ label }}<span v-if="required" class="ml-0.5 text-red-500" aria-hidden="true">*</span>
    </label>
    <slot />
    <p v-if="error" class="mt-1 text-xs font-medium text-red-600 dark:text-red-400" role="alert">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useId } from 'vue'

/**
 * Label + control + message wrapper for forms and filter bars. The control
 * goes in the default slot (BaseInput, BaseSelect, BaseSearchSelect, …).
 * `compact` switches to the small uppercase filter-bar label; `grow` makes
 * the field take the free space in a flex row (filter bars).
 */
interface Props {
  label?: string
  /** id of the control, wired to the label's `for`. */
  labelFor?: string
  required?: boolean
  /** Validation message (red); replaces the hint while set. */
  error?: string
  hint?: string
  compact?: boolean
  grow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  labelFor: '',
  required: false,
  error: '',
  hint: '',
  compact: false,
  grow: false,
})

// Without labelFor, link the label to the control in the slot so clicking it
// focuses the field and screen readers announce it.
const root = ref<HTMLElement>()
const autoFor = ref<string>()
const generatedId = useId()

onMounted(() => {
  if (props.labelFor || !props.label) return
  const control = root.value?.querySelector<HTMLElement>('input, select, textarea')
  if (!control) return
  control.id ||= generatedId
  autoFor.value = control.id
})
</script>
