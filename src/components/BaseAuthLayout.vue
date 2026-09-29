<template>
  <div class="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
    <div class="mb-6 flex justify-center">
      <slot name="logo">
        <BaseLogo :size="BaseLogoEnum.MEDIUM" />
      </slot>
    </div>
    <div
      class="w-full rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-900"
      :class="wide ? 'max-w-3xl' : 'max-w-md'"
    >
      <h1 v-if="title" class="mb-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{{ title }}</h1>
      <p v-if="subtitle" class="text-sm text-slate-500 dark:text-slate-400">{{ subtitle }}</p>
      <div :class="title || subtitle ? 'mt-6' : ''">
        <slot />
      </div>
      <div
        v-if="$slots.footer"
        class="mt-6 border-t border-slate-200 pt-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Full-page, centred shell for sign-in / sign-up / password-recovery screens:
 * logo on top (defaults to BaseLogo, override via the `logo` slot), then a
 * bordered card with the title, the page content (default slot) and an
 * optional `footer` ("Don't have an account? Sign up"). `wide` widens the card
 * for multi-column forms such as registration.
 */
import BaseLogo from './BaseLogo.vue'
import { BaseLogoEnum } from '../enums/BaseLogoEnum'

interface Props {
  title?: string
  subtitle?: string
  /** max-w-3xl card instead of max-w-md (multi-column forms). */
  wide?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  wide: false,
})
</script>
