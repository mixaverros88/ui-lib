<template>
  <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">

      <li class="inline-flex items-center" style="margin-left: 0;">
        <router-link to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <HomeIcon class="h-4 w-4 text-gray-500 mr-2" />
          Home
        </router-link>
      </li>

      <li v-for="(crumb, index) in crumbs" :key="index" class="inline-flex items-center" style="margin-left: 0;">
        <ChevronRightIcon class="h-4 w-4 text-gray-500" />
        <router-link :to="crumb.url" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
          {{ crumb.name }}
        </router-link>
      </li>

    </ol>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { HomeIcon } from '@heroicons/vue/24/solid'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

export interface BreadCrumb {
  name: string
  url: string
}

const props = defineProps({
  items: {
    type: Array as () => BreadCrumb[],
    required: false,
    default: undefined
  },
  path: {
    type: String,
    required: false,
    default: undefined
  }
})

const crumbs = computed<BreadCrumb[]>(() => {
  // If explicit items are provided, use them directly
  if (props.items && props.items.length > 0) {
    return props.items
  }

  // Otherwise, auto-generate from the path prop (or current URL)
  const pathname = props.path ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  const segments = pathname.split('/').filter(s => s !== '')

  let accumulated = ''
  return segments.map(segment => {
    accumulated += '/' + segment

    const name = !Number(segment)
      ? (segment.charAt(0).toUpperCase() + segment.slice(1)).replaceAll('-', ' ')
      : segment

    return { name, url: accumulated }
  })
})
</script>
