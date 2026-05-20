<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useMobileSidebar } from '../composables/useMobileSidebar'

interface Props {
  /**
   * Whether the sidebar should currently be rendered. Defaults to true.
   * Set to false for routes that should occupy the full viewport (e.g.
   * landing / marketing pages).
   */
  showSidebar?: boolean
  /** Skip-link label. Defaults to "Skip to main content". */
  skipLinkLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  showSidebar: true,
  skipLinkLabel: 'Skip to main content',
})

const { isDark } = useTheme()
const { mobileOpen } = useMobileSidebar()

const showSidebar = computed(() => props.showSidebar)
</script>

<template>
  <div class="min-h-screen transition-colors duration-300"
    :class="isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-800'">
    <!--
      Skip link: invisible until focused, becomes the first tab stop so
      keyboard users can bypass the sidebar and jump straight to page
      content.
    -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:rounded-md focus:bg-emerald-600 focus:text-white focus:shadow-lg"
    >
      {{ skipLinkLabel }}
    </a>

    <!--
      `sidebar` slot: consumers drop their (typically BaseSidebar-backed)
      sidebar in here. Only rendered when `showSidebar` is true.
    -->
    <slot v-if="showSidebar" name="sidebar" />

    <!--
      `inert` removes the entire <main> from the focus order AND the
      accessibility tree while the mobile sidebar is open. Without this,
      keyboard users could Tab from the sidebar into hidden page content,
      and screen readers would announce both at once. Only applied when
      the sidebar is actually rendered.
    -->
    <main
      id="main-content"
      tabindex="-1"
      :inert="showSidebar && mobileOpen ? true : undefined"
      :class="showSidebar ? 'pt-14 lg:pt-0 lg:ml-60' : ''"
    >
      <slot />
    </main>
  </div>
</template>
