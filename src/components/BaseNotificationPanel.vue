<script setup lang="ts">
import { computed } from 'vue'
import { XMarkIcon, BellIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '../composables/useTheme'
import { useThemeClasses } from '../composables/useThemeClasses'
import { useEscapeKey } from '../composables/useEscapeKey'
import { useNotifications } from '../composables/useNotifications'

interface Props {
  /** Panel heading. Defaults to "Notifications". */
  title?: string
  /** Shown when there are no notifications. */
  emptyText?: string
  /** Render the "Mark all read" action when there are unread items. */
  showMarkAllRead?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Notifications',
  emptyText: 'You have no notifications.',
  showMarkAllRead: true,
})

const emit = defineEmits<{
  /** A notification row was clicked (e.g. to navigate to its target). */
  select: [id: import('../types/notification').NotificationItem['id']]
}>()

const { isDark } = useTheme()
const t = useThemeClasses()
const {
  notifications,
  unreadCount,
  open,
  closePanel,
  markAllRead,
  markRead,
} = useNotifications()

const dotClass: Record<string, string> = {
  info: 'bg-sky-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
}

const total = computed(() => notifications.value.length)

function onSelect(id: import('../types/notification').NotificationItem['id']) {
  markRead(id)
  emit('select', id)
}

useEscapeKey(() => {
  if (open.value) closePanel()
})
</script>

<template>
  <!--
    Left-anchored notification drawer. Open/close state and the list live
    in `useNotifications()`, so the sidebar bell and this panel stay in
    sync. Teleported to <body> with a backdrop; slides in from the left.
  -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[60] bg-black/50"
        aria-hidden="true"
        @click="closePanel"
      />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="open"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        class="fixed top-0 left-0 z-[70] h-screen w-full max-w-sm flex flex-col border-r shadow-xl"
        :class="isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between gap-3 px-5 py-4 border-b shrink-0"
          :class="t.border"
        >
          <h2 class="text-lg font-semibold flex items-center gap-2" :class="t.primaryText">
            {{ title }}
            <span class="text-sm font-normal" :class="t.dimTextAlt">— {{ total }}</span>
          </h2>
          <button
            type="button"
            @click="closePanel"
            aria-label="Close notifications"
            class="p-1.5 rounded-lg cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            :class="isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'"
          >
            <XMarkIcon class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <!-- Mark all read -->
        <div
          v-if="showMarkAllRead && unreadCount > 0"
          class="px-5 py-2 border-b shrink-0 flex justify-end"
          :class="t.border"
        >
          <button
            type="button"
            @click="markAllRead"
            class="text-xs font-medium cursor-pointer transition-colors focus:outline-none focus-visible:underline"
            :class="t.emeraldText"
          >
            Mark all as read
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto">
          <!-- Empty state -->
          <div
            v-if="total === 0"
            class="flex flex-col items-center justify-center text-center px-6 py-16 gap-3"
          >
            <BellIcon class="w-10 h-10" :class="t.illustration" aria-hidden="true" />
            <p class="text-sm" :class="t.mutedText">{{ emptyText }}</p>
          </div>

          <!-- List -->
          <ul v-else class="divide-y" :class="isDark ? 'divide-gray-800' : 'divide-gray-100'">
            <li v-for="n in notifications" :key="n.id">
              <button
                type="button"
                @click="onSelect(n.id)"
                class="w-full text-left px-5 py-4 flex gap-3 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
                :class="[
                  !n.read
                    ? (isDark ? 'bg-emerald-500/5' : 'bg-emerald-50/60')
                    : '',
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
                ]"
              >
                <span
                  class="mt-1.5 w-2 h-2 rounded-full shrink-0"
                  :class="n.read ? (isDark ? 'bg-gray-700' : 'bg-gray-300') : (dotClass[n.type ?? 'info'])"
                  aria-hidden="true"
                />
                <span class="min-w-0 flex-1">
                  <span class="flex items-baseline justify-between gap-2">
                    <span
                      class="text-sm truncate"
                      :class="[n.read ? 'font-medium' : 'font-semibold', t.primaryTextSoft]"
                    >
                      {{ n.title }}
                    </span>
                    <span v-if="n.time" class="text-xs shrink-0" :class="t.dimText">{{ n.time }}</span>
                  </span>
                  <span v-if="n.message" class="mt-0.5 block text-sm" :class="t.mutedText">
                    {{ n.message }}
                  </span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
