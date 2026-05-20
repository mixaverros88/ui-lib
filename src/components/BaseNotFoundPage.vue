<template>
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center px-6">
      <ExclamationTriangleIcon class="w-16 h-16 mx-auto mb-4" :class="t.illustration" />
      <h1 class="text-4xl font-bold mb-2" :class="isDark ? 'text-gray-200' : 'text-gray-800'">
        {{ code }}
      </h1>
      <p class="text-lg mb-6" :class="t.dimTextAlt">{{ message }}</p>
      <button
        @click="goHome"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors cursor-pointer"
        :class="isDark ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-600 hover:bg-emerald-700'"
      >
        {{ homeLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '../composables/useTheme'
import { useThemeClasses } from '../composables/useThemeClasses'

interface Props {
  /** Big heading. Defaults to '404'. */
  code?: string
  /** Subtitle text. Defaults to 'Page not found'. */
  message?: string
  /** Vue Router named route to redirect to when the button is clicked. */
  homeRouteName?: string
  /** Button label. Defaults to 'Go home'. */
  homeLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '404',
  message: 'Page not found',
  homeRouteName: 'home',
  homeLabel: 'Go home',
})

const router = useRouter()
const { isDark } = useTheme()
const t = useThemeClasses()

function goHome() {
  router.push({ name: props.homeRouteName })
}
</script>
