<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '../composables/useTheme'
import { useMobileSidebar } from '../composables/useMobileSidebar'
import { useSidebarCollapse } from '../composables/useSidebarCollapse'
import { useNotifications } from '../composables/useNotifications'
import type { NavSection } from '../types/sidebar'

interface Props {
  /** Nav sections (groups of items). */
  sections: NavSection[]
  /** Route name to navigate to when the logo / home button is clicked. */
  homeRouteName?: string
  /** Optional app name shown in the footer next to the version. */
  appName?: string
  /** Optional version string shown in the footer. */
  version?: string
  /** Whether to render the dark/light toggle in the footer. */
  showThemeToggle?: boolean
  /** Whether to render the desktop collapse toggle (icon-only rail). */
  collapsible?: boolean
  /** Whether to render the notifications bell button. */
  showNotifications?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  homeRouteName: 'home',
  appName: '',
  version: '',
  showThemeToggle: true,
  collapsible: true,
  showNotifications: false,
})

const router = useRouter()
const route = useRoute()
const { isDark, toggleTheme } = useTheme()
const { mobileOpen, close: closeMobile, toggle: toggleMobile } = useMobileSidebar()
const { collapsed, toggle: toggleCollapsed } = useSidebarCollapse()
const { unreadCount, togglePanel: toggleNotifications } = useNotifications()

// Whether the icon-only rail styling applies. Only relevant on desktop
// (`lg:`) — on mobile the sidebar is always the full off-canvas panel.
const isRail = computed(() => props.collapsible && collapsed.value)

// Refs needed for the mobile focus management.
const closeMobileButton = ref<HTMLButtonElement | null>(null)
let lastFocusedBeforeOpen: HTMLElement | null = null

// When the mobile sidebar opens, move focus into it so keyboard users
// don't have to Tab back from <main> (which the surrounding layout
// marks `inert`); when it closes, restore focus to whatever opened the
// menu.
watch(mobileOpen, async (open) => {
  if (open) {
    lastFocusedBeforeOpen = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    await nextTick()
    closeMobileButton.value?.focus()
  } else {
    lastFocusedBeforeOpen?.focus()
    lastFocusedBeforeOpen = null
  }
})

function goHome() {
  router.push({ name: props.homeRouteName })
  closeMobile()
}

function isActive(name: string): boolean {
  return route.name === name
}

function navigate(name: string) {
  router.push({ name })
  closeMobile()
}
</script>

<template>
  <div>
    <!-- Mobile top bar (hidden on desktop via scoped CSS to avoid flex/hidden conflict) -->
    <div class="mobile-topbar fixed top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-3 border-b transition-colors"
      :class="isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'">
      <button type="button" @click="goHome" class="cursor-pointer" aria-label="Go to home">
        <!--
          `logo` slot: consumers drop their brand logo in here. Receives
          the current size hint so a logo component can scale to match.
        -->
        <slot name="logo" :size="28" />
      </button>
      <button
        type="button"
        @click="toggleMobile"
        class="p-2 rounded-lg cursor-pointer"
        :class="isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'"
        :aria-label="mobileOpen ? 'Close navigation menu' : 'Open navigation menu'"
        :aria-expanded="mobileOpen"
      >
        <Bars3Icon v-if="!mobileOpen" class="w-6 h-6" aria-hidden="true" />
        <XMarkIcon v-else class="w-6 h-6" aria-hidden="true" />
      </button>
    </div>

    <!-- Mobile overlay (decorative). -->
    <div
      v-if="mobileOpen"
      class="mobile-overlay fixed inset-0 z-40 bg-black/50"
      aria-hidden="true"
      @click="closeMobile"
    />

    <aside
      role="navigation"
      aria-label="Main navigation"
      class="fixed top-0 left-0 h-screen w-60 flex flex-col border-r transition-all duration-300 lg:pointer-events-auto"
      :class="[
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200',
        mobileOpen ? 'translate-x-0 z-50' : '-translate-x-full max-lg:pointer-events-none lg:translate-x-0 z-50',
        collapsible && collapsed ? 'lg:w-16' : 'lg:w-60',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div
          class="px-5 pt-5 pb-4 flex items-center justify-center relative"
          :class="{ 'lg:px-2': isRail }"
        >
          <button type="button" @click="goHome" class="cursor-pointer" aria-label="Go to home">
            <slot name="logo" :size="isRail ? 36 : 52" />
          </button>
          <button
            ref="closeMobileButton"
            type="button"
            @click="closeMobile"
            class="lg:hidden p-1.5 rounded-lg cursor-pointer absolute right-3 top-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            :class="isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'"
            aria-label="Close navigation menu"
          >
            <XMarkIcon class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <!-- Nav -->
        <nav class="flex-1 overflow-y-auto px-3 space-y-6">
          <div v-for="section in sections" :key="section.title">
            <p
              class="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500"
              :class="{ 'lg:hidden': isRail }"
            >
              {{ section.title }}
            </p>
            <ul class="space-y-0.5">
              <li v-for="item in section.items" :key="item.name">
                <button
                  type="button"
                  :aria-current="isActive(item.name) ? 'page' : undefined"
                  :title="isRail ? item.label : undefined"
                  @click="navigate(item.name)"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  :class="[
                    isActive(item.name)
                      ? (isDark
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-emerald-50 text-emerald-700')
                      : (isDark
                          ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'),
                    { 'lg:justify-center': isRail },
                  ]"
                >
                  <component :is="item.icon" class="w-[18px] h-[18px] shrink-0" />
                  <span :class="{ 'lg:hidden': isRail }">{{ item.label }}</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Bottom: Notifications, theme toggle, status slot, footer slot -->
        <div class="px-4 py-4 border-t transition-colors space-y-3"
          :class="isDark ? 'border-gray-800' : 'border-gray-200'">
          <!--
            Notifications bell: toggles the shared `BaseNotificationPanel`
            (via useNotifications). The unread badge reads the same shared
            count. Drop a `<BaseNotificationPanel />` in your layout to
            render the panel itself.
          -->
          <button
            v-if="showNotifications"
            type="button"
            @click="toggleNotifications"
            title="Notifications"
            :aria-label="unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'"
            class="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            :class="[
              isDark
                ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              { 'lg:justify-center': isRail },
            ]"
          >
            <span class="relative shrink-0">
              <BellIcon class="w-[18px] h-[18px]" aria-hidden="true" />
              <!-- Unread badge -->
              <span
                v-if="unreadCount > 0"
                class="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold leading-4 text-center"
              >
                {{ unreadCount > 99 ? '99+' : unreadCount }}
              </span>
            </span>
            <span :class="{ 'lg:hidden': isRail }">Notifications</span>
          </button>

          <button
            v-if="showThemeToggle"
            type="button"
            @click="toggleTheme"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            :aria-pressed="isDark"
            class="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            :class="[
              isDark
                ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              { 'lg:justify-center': isRail },
            ]"
          >
            <!-- Icon stand-in shown only on the collapsed desktop rail. -->
            <component
              :is="isDark ? SunIcon : MoonIcon"
              class="hidden w-[18px] h-[18px] shrink-0"
              :class="{ 'lg:block': isRail }"
              aria-hidden="true"
            />
            <span :class="{ 'lg:hidden': isRail }">{{ isDark ? 'Switch to light' : 'Switch to dark' }}</span>
            <span class="ml-auto relative w-9 h-5 rounded-full transition-colors"
              :class="[isDark ? 'bg-emerald-600' : 'bg-gray-300', { 'lg:hidden': isRail }]">
              <span class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300"
                :class="isDark ? 'translate-x-4' : 'translate-x-0'" />
            </span>
          </button>

          <!--
            Desktop-only collapse toggle: shrinks the sidebar to an
            icon-only rail. Hidden on mobile, where the off-canvas menu is
            controlled by the open/close buttons instead.
          -->
          <button
            v-if="collapsible"
            type="button"
            @click="toggleCollapsed"
            :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            :aria-pressed="collapsed"
            class="hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            :class="[
              isDark
                ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              { 'lg:justify-center': isRail },
            ]"
          >
            <component
              :is="collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon"
              class="w-[18px] h-[18px] shrink-0"
              aria-hidden="true"
            />
            <span :class="{ 'lg:hidden': isRail }">Collapse</span>
          </button>

          <!--
            `status` slot: consumers drop in their own indicator (e.g.
            health check, sync status). The wrapper handles spacing only.
            Hidden on the collapsed desktop rail where there's no room.
          -->
          <div :class="{ 'lg:hidden': isRail }">
            <slot name="status" />
          </div>

          <!--
            `footer` slot: links / version / etc. If not provided and
            either `appName` or `version` is set, we render a default
            "appName vVersion" line. Hidden on the collapsed desktop rail.
          -->
          <div :class="{ 'lg:hidden': isRail }">
            <slot name="footer">
              <div
                v-if="appName || version"
                class="flex items-center justify-center gap-2 text-xs"
                :class="isDark ? 'text-gray-500' : 'text-gray-500'"
              >
                <span>{{ appName }}<template v-if="appName && version"> </template><template v-if="version">v{{ version }}</template></span>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  /* Hide mobile top bar on desktop */
  .mobile-topbar {
    display: none !important;
  }
}
</style>
