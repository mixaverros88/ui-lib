<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useThemeClasses } from '../composables/useThemeClasses'
import BaseGoogleSignInButton from './BaseGoogleSignInButton.vue'
import type { LoginCredentials } from '../types/auth'

interface Props {
  /** Card heading. Defaults to "Sign in". */
  title?: string
  /** Optional muted line under the heading. */
  subtitle?: string
  /** Submit button label. Defaults to "Sign in". */
  submitLabel?: string
  /** Disables the form and shows a spinner on the submit button. */
  loading?: boolean
  /** Disables the form and shows a spinner on the Google button. */
  googleLoading?: boolean
  /** Error message rendered above the form (e.g. "Invalid credentials"). */
  error?: string
  /** Render the "Sign in with Google" button + divider. Defaults to true. */
  showGoogle?: boolean
  /** Render the "Remember me" checkbox. Defaults to false. */
  showRemember?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Sign in',
  subtitle: '',
  submitLabel: 'Sign in',
  loading: false,
  googleLoading: false,
  error: '',
  showGoogle: true,
  showRemember: false,
})

const emit = defineEmits<{
  /** Email/password submit. */
  submit: [credentials: LoginCredentials]
  /** User chose "Sign in with Google". */
  'google-sign-in': []
}>()

const { isDark } = useTheme()
const t = useThemeClasses()

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)

const busy = computed(() => props.loading || props.googleLoading)

function onSubmit() {
  if (busy.value) return
  emit('submit', {
    email: email.value,
    password: password.value,
    ...(props.showRemember ? { remember: remember.value } : {}),
  })
}
</script>

<template>
  <!--
    Presentational sign-in card. Owns its own input state and emits
    `submit` (with credentials) / `google-sign-in`. It runs no auth
    itself — the consuming app handles the actual request and feeds back
    `loading` / `error`.
  -->
  <div
    class="w-full max-w-sm mx-auto rounded-xl border shadow-sm p-6 sm:p-8"
    :class="t.card"
  >
    <!-- Brand / logo slot above the heading. -->
    <div v-if="$slots.logo" class="flex justify-center mb-6">
      <slot name="logo" />
    </div>

    <div class="mb-6 text-center">
      <h1 class="text-xl font-semibold" :class="t.primaryText">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-sm" :class="t.mutedText">{{ subtitle }}</p>
    </div>

    <!-- Error banner -->
    <div
      v-if="error"
      role="alert"
      class="mb-4 rounded-lg border px-3 py-2 text-sm"
      :class="isDark
        ? 'bg-red-500/10 border-red-500/30 text-red-300'
        : 'bg-red-50 border-red-200 text-red-700'"
    >
      {{ error }}
    </div>

    <!-- Google sign-in + divider -->
    <template v-if="showGoogle">
      <BaseGoogleSignInButton
        :loading="googleLoading"
        :disabled="loading"
        @click="emit('google-sign-in')"
      />
      <div class="flex items-center gap-3 my-5">
        <span class="h-px flex-1" :class="isDark ? 'bg-gray-700' : 'bg-gray-200'" />
        <span class="text-xs uppercase tracking-wider" :class="t.dimTextAlt">or</span>
        <span class="h-px flex-1" :class="isDark ? 'bg-gray-700' : 'bg-gray-200'" />
      </div>
    </template>

    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label for="login-email" class="block mb-1.5 text-sm font-medium" :class="t.label">
          Email
        </label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          required
          :disabled="busy"
          placeholder="you@example.com"
          class="w-full h-11 px-3 rounded-lg border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-60"
          :class="t.inputWithPlaceholder"
        />
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label for="login-password" class="block text-sm font-medium" :class="t.label">
            Password
          </label>
          <!-- `forgot` slot: drop a "Forgot password?" link here. -->
          <slot name="forgot" />
        </div>
        <div class="relative">
          <input
            id="login-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            autocomplete="current-password"
            required
            :disabled="busy"
            placeholder="••••••••"
            class="w-full h-11 pl-3 pr-16 rounded-lg border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-60"
            :class="t.inputWithPlaceholder"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            class="absolute inset-y-0 right-0 px-3 text-xs font-medium cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-r-lg"
            :class="t.mutedText"
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>

      <label
        v-if="showRemember"
        class="flex items-center gap-2 text-sm cursor-pointer select-none"
        :class="t.bodyText"
      >
        <input
          v-model="remember"
          type="checkbox"
          :disabled="busy"
          class="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        Remember me
      </label>

      <button
        type="submit"
        :disabled="busy"
        :aria-busy="loading"
        class="inline-flex items-center justify-center gap-2 w-full h-11 px-4 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg
          v-if="loading"
          class="w-4 h-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
        {{ submitLabel }}
      </button>
    </form>

    <!-- `footer` slot: e.g. "Don't have an account? Sign up". -->
    <div v-if="$slots.footer" class="mt-6 text-center text-sm" :class="t.mutedText">
      <slot name="footer" />
    </div>
  </div>
</template>
