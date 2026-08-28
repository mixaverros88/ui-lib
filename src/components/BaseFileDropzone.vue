<template>
  <!--
    Dashed "click to select a file" upload zone — extracted from WireMate's
    ImportPostmanModal file picker. Also accepts drag-and-drop.

    The hidden input is reset after every selection so choosing the same
    file twice still fires `files` — callers don't need their own reset.
  -->
  <label
    class="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors"
    :class="[
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      dragging
        ? (isDark ? 'border-emerald-500 text-emerald-400' : 'border-emerald-500 text-emerald-600')
        : (isDark
          ? 'border-gray-700 hover:border-emerald-500 text-gray-400 hover:text-emerald-400'
          : 'border-gray-300 hover:border-emerald-500 text-gray-500 hover:text-emerald-600'),
    ]"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="dragging = false"
    @drop.prevent="onDrop"
  >
    <slot name="icon">
      <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    </slot>
    <p class="text-sm font-medium">{{ label }}</p>
    <p v-if="hint" class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
      {{ hint }}
    </p>
    <input
      type="file"
      class="hidden"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="onChange"
    />
  </label>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'

interface Props {
  /** Main line, e.g. "Click to select a Postman collection (.json)". */
  label: string
  /** Optional dimmed helper line below the label. */
  hint?: string
  /** Forwarded to the hidden input's `accept`. Dropped files are NOT filtered by it. */
  accept?: string
  multiple?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hint: '',
  accept: '',
  multiple: false,
  disabled: false,
})

const emit = defineEmits<{ files: [files: File[]] }>()

const { isDark } = useTheme()

const dragging = ref(false)

function onChange(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files ?? [])
  // Reset so re-selecting the same file re-triggers change.
  input.value = ''
  if (files.length) emit('files', files)
}

function onDragOver() {
  if (!props.disabled) dragging.value = true
}

function onDrop(e: DragEvent) {
  dragging.value = false
  if (props.disabled) return
  const dropped = Array.from(e.dataTransfer?.files ?? [])
  if (!dropped.length) return
  emit('files', props.multiple ? dropped : dropped.slice(0, 1))
}
</script>
