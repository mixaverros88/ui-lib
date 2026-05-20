<template>
  <!--
    Generic "ask the user for a single string and confirm" dialog.
    Used for clone-name prompts, rename dialogs, etc.

    Slots:
      • icon — replace the default emerald-tinted document icon.

    Preserves typed input on stray backdrop clicks (only treats the
    click as cancel if the user hasn't modified the initial value).
    Escape is always treated as an explicit dismissal.
  -->
  <BaseModalShell
    :title="title"
    manual-close
    @backdrop="handleBackdropClick"
  >
    <template #icon>
      <slot name="icon">
        <div
          class="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full"
          :class="isDark ? 'bg-emerald-900/30' : 'bg-emerald-50'"
        >
          <DocumentDuplicateIcon class="h-6 w-6 text-emerald-600" aria-hidden="true" />
        </div>
      </slot>
    </template>

    <p class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
      {{ message }}
    </p>

    <div class="mt-4">
      <label
        class="block text-sm font-medium mb-1"
        :class="t.label"
      >
        {{ inputLabel }}
      </label>
      <input
        ref="nameInput"
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        class="w-full px-3 py-2 rounded-md border text-sm transition-colors"
        :class="isDark
          ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500'
          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500'"
        @keyup.enter="handleConfirm"
      />
    </div>

    <template #footer>
      <button
        type="button"
        class="inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors duration-150"
        :class="t.ghostButton"
        @click="handleCancel"
      >
        {{ cancelText }}
      </button>
      <button
        type="button"
        :disabled="!inputValue.trim() || submitting"
        class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-150"
        :class="[
          !inputValue.trim() || submitting
            ? 'bg-emerald-400 cursor-not-allowed'
            : 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
        ]"
        @click="handleConfirm"
      >
        {{ submitting ? submittingText : confirmText }}
      </button>
    </template>
  </BaseModalShell>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { DocumentDuplicateIcon } from '@heroicons/vue/24/outline'
import BaseModalShell from './BaseModalShell.vue'
import { useTheme } from '../composables/useTheme'
import { useThemeClasses } from '../composables/useThemeClasses'
import { useEscapeKey } from '../composables/useEscapeKey'

interface Props {
  title: string
  message: string
  initialValue?: string
  placeholder?: string
  inputLabel?: string
  confirmText?: string
  cancelText?: string
  submittingText?: string
  submitting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: '',
  placeholder: 'Enter value...',
  inputLabel: 'Name',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  submittingText: 'Working...',
  submitting: false,
})

const emit = defineEmits<{
  confirm: [value: string]
  cancel: []
}>()

const { isDark } = useTheme()
const t = useThemeClasses()
const inputValue = ref(props.initialValue)
const nameInput = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  await nextTick()
  nameInput.value?.focus()
})

function handleConfirm() {
  if (!inputValue.value.trim() || props.submitting) return
  emit('confirm', inputValue.value.trim())
}

function handleCancel() {
  emit('cancel')
}

// Backdrop click: only treat it as cancel if the user hasn't modified
// the value. Otherwise a stray click outside the dialog would silently
// throw away the typed input.
function handleBackdropClick() {
  if (inputValue.value.trim() === (props.initialValue ?? '').trim()) {
    handleCancel()
  }
}

// Escape always cancels.
useEscapeKey(handleCancel)
</script>
