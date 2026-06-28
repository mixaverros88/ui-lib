<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

interface Props {
  /** Button label. Defaults to "Sign in with Google". */
  label?: string
  /** Disables the button and shows a busy spinner. */
  loading?: boolean
  /** Disables the button without the busy spinner. */
  disabled?: boolean
  /** Full-width (block) layout. Defaults to true. */
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Sign in with Google',
  loading: false,
  disabled: false,
  block: true,
})

const emit = defineEmits<{
  /** Fired when the user clicks the button (not when disabled/loading). */
  click: []
}>()

const { isDark } = useTheme()

const isDisabled = computed(() => props.disabled || props.loading)

function onClick() {
  if (isDisabled.value) return
  emit('click')
}
</script>

<template>
  <!--
    Google-branded sign-in button. Purely presentational: it does NOT run
    any OAuth flow itself — consumers listen on `click` and kick off their
    own Google Identity Services / Firebase / backend redirect there.

    Styling follows Google's button guidelines (neutral surface, the
    four-colour "G", clear label) with a dark-mode surface swap.
  -->
  <button
    type="button"
    :disabled="isDisabled"
    :aria-busy="loading"
    @click="onClick"
    class="inline-flex items-center justify-center gap-3 h-11 px-4 rounded-lg border text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed"
    :class="[
      block ? 'w-full' : '',
      isDark
        ? 'bg-gray-900 border-gray-700 text-gray-100 hover:bg-gray-800'
        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
    ]"
  >
    <!-- Busy spinner replaces the logo while loading. -->
    <svg
      v-if="loading"
      class="w-5 h-5 animate-spin shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
    </svg>

    <!-- Official multi-colour Google "G". -->
    <svg v-else class="w-5 h-5 shrink-0" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>

    <span>{{ label }}</span>
  </button>
</template>
