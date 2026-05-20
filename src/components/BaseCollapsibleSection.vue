<template>
  <!--
    Collapsible section wrapper. Parent owns the `collapsed` state so
    callers can persist it across edits or batch-collapse many sections
    at once.

    Slots:
      • default — the section body (only rendered when expanded)

    Props:
      • title    — heading text
      • collapsed — current collapsed state
      • badge    — optional pill next to the heading (label or count)
      • bodyClass — override classes for the body container. Defaults
        to a theme-aware white/gray-800 surface.

    Emits:
      • toggle — fired when the user clicks the header. The parent
        flips its own collapsed state in response.
  -->
  <section class="rounded-xl border overflow-hidden transition-colors" :class="t.cardAlt">
    <button
      type="button"
      class="w-full flex items-center justify-between p-4 text-left transition-colors"
      :class="headerClasses"
      :aria-expanded="!collapsed"
      @click="emit('toggle')"
    >
      <div class="flex items-center gap-3">
        <h2 class="text-base font-semibold" :class="headingClasses">{{ title }}</h2>
        <span
          v-if="badge"
          class="text-xs px-2 py-0.5 rounded-full"
          :class="badgeClasses"
        >
          {{ badge }}
        </span>
      </div>
      <svg
        class="w-5 h-5 transition-transform"
        :class="[collapsed ? '' : 'rotate-180', t.dimTextAlt]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div
      v-show="!collapsed"
      class="p-6 border-t"
      :class="[t.border, resolvedBodyClass]"
    >
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useThemeClasses } from '../composables/useThemeClasses'

interface Props {
  title: string
  collapsed: boolean
  /**
   * Optional pill next to the title. String so callers can pass either
   * a label ('Active') or a count ('3'). Null/undefined hides the pill.
   */
  badge?: string | null
  /**
   * Override the body container's background classes. Defaults to a
   * theme-aware surface: bg-white in light, bg-gray-800 in dark.
   */
  bodyClass?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ toggle: [] }>()

const { isDark } = useTheme()
const t = useThemeClasses()

const headingClasses = computed(() =>
  isDark.value ? 'text-gray-100' : 'text-gray-700',
)

const headerClasses = computed(() =>
  isDark.value
    ? 'bg-gray-800/50 hover:bg-gray-800 border-gray-700'
    : 'bg-gray-50 hover:bg-gray-100 border-gray-200',
)

const badgeClasses = computed(() =>
  isDark.value
    ? 'bg-emerald-500/15 text-emerald-400'
    : 'bg-emerald-50 text-emerald-700',
)

const resolvedBodyClass = computed(() => {
  if (props.bodyClass !== undefined) return props.bodyClass
  return isDark.value ? 'bg-gray-800' : 'bg-white'
})
</script>
