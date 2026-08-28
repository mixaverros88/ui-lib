<template>
  <BaseModalShell
    :title="title"
    :icon="ExclamationTriangleIcon"
    :icon-bg-class="variant === 'danger'
      ? isDark ? 'bg-red-900/30' : 'bg-red-50'
      : isDark ? 'bg-amber-900/30' : 'bg-amber-50'"
    :icon-class="variant === 'danger' ? 'text-red-600' : 'text-amber-600'"
    :manual-close="submitting"
    @cancel="handleCancel"
  >
    <!--
      Default renders the plain `message` string. Callers that need rich
      text (bold names, inline code, etc.) can override the `message` slot
      and render their own markup — the `message` prop is still used as the
      accessible/fallback text and by callers that don't override.
    -->
    <slot name="message">
      <p class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
        {{ message }}
      </p>
    </slot>

    <!--
      Optional extra content rendered below the message — e.g. a warning
      banner or an opt-in checkbox the caller wants the user to see before
      confirming. Empty for the common confirm/cancel case.
    -->
    <slot />

    <template #footer>
      <button
        type="button"
        :disabled="submitting"
        class="inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        :class="[
          t.ghostButton,
          submitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        ]"
        @click="handleCancel"
      >
        {{ cancelText }}
      </button>

      <button
        type="button"
        :disabled="submitting"
        class="inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        :class="[
          variant === 'danger' ? 'focus-visible:ring-red-500' : 'focus-visible:ring-emerald-500',
          variant === 'danger'
            ? submitting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 cursor-pointer'
            : submitting ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer',
        ]"
        @click="handleConfirm"
      >
        <svg
          v-if="submitting"
          class="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        {{ submitting ? submittingText : confirmText }}
      </button>
    </template>
  </BaseModalShell>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import BaseModalShell from './BaseModalShell.vue'
import { useTheme } from '../composables/useTheme'
import { useThemeClasses } from '../composables/useThemeClasses'

interface Props {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  submittingText?: string
  variant?: 'danger' | 'warning'
  submitting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: "Yes, I'm sure",
  cancelText: 'No, cancel',
  submittingText: 'Working...',
  variant: 'danger',
  submitting: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const { isDark } = useTheme()
const t = useThemeClasses()

function handleConfirm() {
  if (props.submitting) return
  emit('confirm')
}

function handleCancel() {
  if (props.submitting) return
  emit('cancel')
}
</script>
