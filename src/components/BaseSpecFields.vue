<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import type { SpecField, SpecFieldValue } from '../types/specField'

// Spec-driven form fields: renders a select / checkbox / number input per
// field spec, with labels and help text, in a responsive two-column grid.
// Feed it a backend-described catalogue (or any SpecField[]) and every form
// that edits those values stays in lockstep.
//
// The component never mutates `params`: every edit is emitted as
// (key, value) and the owner writes it back into its own form state.
defineProps<{
  specs: SpecField[]
  params: Record<string, SpecFieldValue>
}>()

const emit = defineEmits<{
  (e: 'update', key: string, value: SpecFieldValue): void
}>()

// Per-spec extra content rendered under a field (e.g. a live preview a
// caller attaches to one specific key).
defineSlots<{
  after?: (props: { spec: SpecField }) => unknown
}>()

function onCheckbox(key: string, e: Event) {
  emit('update', key, (e.target as HTMLInputElement).checked)
}

// Mirror v-model.number: a parseable value becomes a number, anything else
// (including a cleared field, which becomes '') passes through as the raw
// string so the owner's "enter a valid number" validation can catch it.
function onNumber(key: string, raw: string) {
  const n = parseFloat(raw)
  emit('update', key, Number.isNaN(n) ? raw : n)
}
</script>

<template>
  <div class="grid gap-3 md:grid-cols-2">
    <div v-for="spec in specs" :key="spec.key">
      <label
        v-if="spec.type !== 'boolean'"
        class="block text-[11px] uppercase tracking-wide text-slate-500 mb-1"
      >
        {{ spec.label }}
      </label>

      <BaseSelect
        v-if="spec.type === 'select'"
        :modelValue="String(params[spec.key] ?? '')"
        @update:modelValue="(v: string) => emit('update', spec.key, v)"
      >
        <option v-for="opt in spec.options ?? []" :key="opt" :value="opt">{{ opt }}</option>
      </BaseSelect>

      <label v-else-if="spec.type === 'boolean'" class="flex items-center gap-2 mt-4">
        <input
          :checked="Boolean(params[spec.key])"
          type="checkbox"
          class="h-4 w-4"
          @change="onCheckbox(spec.key, $event)"
        />
        <span class="text-sm text-slate-900 dark:text-slate-100">{{ spec.label }}</span>
      </label>

      <BaseInput
        v-else
        :modelValue="params[spec.key] as string | number"
        type="number"
        :step="spec.step ?? (spec.type === 'integer' ? 1 : 0.01)"
        :min="spec.min ?? undefined"
        @update:modelValue="(v: string) => onNumber(spec.key, v)"
      />

      <p v-if="spec.help" class="text-[11px] text-slate-400 mt-1">{{ spec.help }}</p>

      <slot name="after" :spec="spec" />
    </div>
  </div>
</template>
