<template>
  <div class="flex flex-col gap-2 text-left">
    <component
      :is="to ? RouterLink : 'div'"
      v-bind="to ? { to } : {}"
      class="flex items-center gap-3 rounded-lg p-2 transition-colors"
      :class="to ? 'hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500' : ''"
      :title="to ? profileLabel : undefined"
    >
      <span
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
        aria-hidden="true"
      >{{ initials }}</span>
      <span class="min-w-0">
        <span class="block truncate text-sm font-medium text-slate-900 dark:text-slate-100">{{ name }}</span>
        <span v-if="email" class="block truncate text-xs text-slate-500 dark:text-slate-400">{{ email }}</span>
      </span>
    </component>
    <BaseButton
      v-if="showLogout"
      class="w-full justify-center"
      :description="logoutLabel"
      :color="BaseButtonEnum.RED"
      :size="BaseButtonSizeEnum.SMALL"
      outline
      icon-left
      @click="emit('logout')"
    >
      <ArrowRightStartOnRectangleIcon class="mr-1.5 h-4 w-4" aria-hidden="true" />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
/**
 * Signed-in user block for the sidebar footer (BaseSidebar `footer` slot):
 * initials avatar + name + email, linking to the profile page when `to` is
 * set, and a Logout button that emits `logout` (the app clears its session).
 */
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline'
import BaseButton from './BaseButton.vue'
import { BaseButtonEnum } from '../enums/BaseButtonEnum'
import { BaseButtonSizeEnum } from '../enums/BaseButtonSizeEnum'

interface Props {
  name: string
  email?: string
  /** Profile route; makes the name/email block a link. */
  to?: RouteLocationRaw
  showLogout?: boolean
  logoutLabel?: string
  profileLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  email: '',
  to: undefined,
  showLogout: true,
  logoutLabel: 'Logout',
  profileLabel: 'View profile',
})

const emit = defineEmits<{ (e: 'logout'): void }>()

const initials = computed(() =>
  (props.name || '?')
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join(''),
)
</script>
