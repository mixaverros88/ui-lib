<template>
  <BaseModalShell
    :title="title"
    :manual-close="submitting"
    @cancel="handleCancel"
  >
    <template #icon>
      <slot name="icon">
        <div
          class="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full"
          :class="palette.iconBg"
        >
          <FolderIcon class="h-6 w-6" :class="palette.iconText" aria-hidden="true" />
        </div>
      </slot>
    </template>

    <p v-if="message" class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
      {{ message }}
    </p>

    <!-- Loading -->
    <div v-if="loading" class="mt-4 flex justify-center py-6">
      <BaseSpinner />
    </div>

    <!-- Error -->
    <div v-else-if="loadError" class="mt-4 text-sm text-red-500" role="alert">
      {{ loadError }}
    </div>

    <!-- Search input -->
    <div v-if="!loading && !loadError && items.length > 0" class="mt-4">
      <div class="relative">
        <MagnifyingGlassIcon
          class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
          :class="t.dimText"
          aria-hidden="true"
        />
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          class="w-full pl-9 pr-3 py-2 text-sm rounded-md border outline-none transition-colors"
          :class="[
            isDark
              ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-500'
              : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400',
            palette.inputFocus,
          ]"
        />
      </div>
    </div>

    <!-- Item list -->
    <div v-if="!loading && !loadError" class="mt-3 max-h-64 overflow-y-auto">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
        :class="[
          selectedId === item.id
            ? palette.selectedRow
            : isDark
              ? 'hover:bg-gray-800 border border-transparent'
              : 'hover:bg-gray-50 border border-transparent'
        ]"
        @click="selectedId = item.id"
      >
        <FolderIcon class="w-5 h-5 flex-shrink-0" :class="t.dimText" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="t.bodyText">
            {{ item.label }}
          </p>
        </div>
        <div v-if="selectedId === item.id"
          class="w-5 h-5 rounded-full flex items-center justify-center"
          :class="palette.checkBg">
          <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <!-- Empty states -->
      <div v-if="items.length === 0" class="text-center py-6">
        <p class="text-sm" :class="t.dimText">
          {{ emptyMessage }}
        </p>
      </div>
      <div v-else-if="filteredItems.length === 0" class="text-center py-6">
        <p class="text-sm" :class="t.dimText">
          {{ noMatchMessage }}
        </p>
      </div>
    </div>

    <template #footer>
      <button
        type="button"
        :disabled="submitting"
        class="inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="t.ghostButton"
        @click="handleCancel"
      >
        {{ cancelText }}
      </button>
      <button
        type="button"
        :disabled="!selectedId || submitting"
        class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-150"
        :class="!selectedId || submitting ? palette.confirmDisabled : palette.confirmActive"
        @click="handleConfirm"
      >
        {{ submitting ? submittingText : confirmText }}
      </button>
    </template>
  </BaseModalShell>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { FolderIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import BaseModalShell from './BaseModalShell.vue'
import BaseSpinner from './BaseSpinner.vue'
import { useTheme } from '../composables/useTheme'
import { useThemeClasses } from '../composables/useThemeClasses'
import type { EntityPickerItem } from '../types/entityPicker'

type Variant = 'emerald' | 'purple' | 'blue' | 'red' | 'amber'

interface PaletteClasses {
  iconBg: string
  iconText: string
  inputFocus: string
  selectedRow: string
  checkBg: string
  confirmActive: string
  confirmDisabled: string
}

interface Props {
  title: string
  message?: string
  /** Pre-loaded items. Pass these instead of `loader` when the items are already in memory. */
  items?: EntityPickerItem[]
  /** Async loader called on mount. Use when items live in a backend service. */
  loader?: () => Promise<EntityPickerItem[]>
  /** ID to exclude from the list (e.g. the current entity). */
  excludeId?: string
  /** Accent colour for selection / confirm. Defaults to 'emerald'. */
  variant?: Variant
  searchPlaceholder?: string
  emptyMessage?: string
  noMatchMessage?: string
  confirmText?: string
  cancelText?: string
  submittingText?: string
  submitting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: 'emerald',
  searchPlaceholder: 'Search...',
  emptyMessage: 'No items available.',
  noMatchMessage: 'No items match your search.',
  confirmText: 'Select',
  cancelText: 'Cancel',
  submittingText: 'Working...',
  submitting: false,
})

const emit = defineEmits<{
  confirm: [itemId: string]
  cancel: []
}>()

const { isDark } = useTheme()
const t = useThemeClasses()

const loadedItems = ref<EntityPickerItem[]>([])
const loading = ref(false)
const loadError = ref('')
const selectedId = ref<string | null>(null)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

const items = computed<EntityPickerItem[]>(() => {
  const source = props.loader ? loadedItems.value : props.items
  return props.excludeId
    ? source.filter(i => i.id !== props.excludeId)
    : source
})

const filteredItems = computed(() =>
  items.value.filter(i =>
    i.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

// Static palette maps — Tailwind's JIT can't see classes built from
// template strings (`bg-${variant}-500`), so we expand each variant to a
// concrete bundle of utilities that the compiler can find at build time.
const LIGHT_PALETTES: Record<Variant, PaletteClasses> = {
  emerald: {
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-600',
    inputFocus: 'focus:border-emerald-500',
    selectedRow: 'bg-emerald-50 border border-emerald-200',
    checkBg: 'bg-emerald-600',
    confirmActive: 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer',
    confirmDisabled: 'bg-emerald-400 cursor-not-allowed',
  },
  purple: {
    iconBg: 'bg-purple-50',
    iconText: 'text-purple-600',
    inputFocus: 'focus:border-purple-500',
    selectedRow: 'bg-purple-50 border border-purple-200',
    checkBg: 'bg-purple-600',
    confirmActive: 'bg-purple-600 hover:bg-purple-700 cursor-pointer',
    confirmDisabled: 'bg-purple-400 cursor-not-allowed',
  },
  blue: {
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-600',
    inputFocus: 'focus:border-blue-500',
    selectedRow: 'bg-blue-50 border border-blue-200',
    checkBg: 'bg-blue-600',
    confirmActive: 'bg-blue-600 hover:bg-blue-700 cursor-pointer',
    confirmDisabled: 'bg-blue-400 cursor-not-allowed',
  },
  red: {
    iconBg: 'bg-red-50',
    iconText: 'text-red-600',
    inputFocus: 'focus:border-red-500',
    selectedRow: 'bg-red-50 border border-red-200',
    checkBg: 'bg-red-600',
    confirmActive: 'bg-red-600 hover:bg-red-700 cursor-pointer',
    confirmDisabled: 'bg-red-400 cursor-not-allowed',
  },
  amber: {
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
    inputFocus: 'focus:border-amber-500',
    selectedRow: 'bg-amber-50 border border-amber-200',
    checkBg: 'bg-amber-600',
    confirmActive: 'bg-amber-600 hover:bg-amber-700 cursor-pointer',
    confirmDisabled: 'bg-amber-400 cursor-not-allowed',
  },
}

const DARK_PALETTES: Record<Variant, PaletteClasses> = {
  emerald: {
    iconBg: 'bg-emerald-900/30',
    iconText: 'text-emerald-400',
    inputFocus: 'focus:border-emerald-500',
    selectedRow: 'bg-emerald-500/15 border border-emerald-500/30',
    checkBg: 'bg-emerald-600',
    confirmActive: 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer',
    confirmDisabled: 'bg-emerald-400 cursor-not-allowed',
  },
  purple: {
    iconBg: 'bg-purple-900/30',
    iconText: 'text-purple-400',
    inputFocus: 'focus:border-purple-500',
    selectedRow: 'bg-purple-500/15 border border-purple-500/30',
    checkBg: 'bg-purple-600',
    confirmActive: 'bg-purple-600 hover:bg-purple-700 cursor-pointer',
    confirmDisabled: 'bg-purple-400 cursor-not-allowed',
  },
  blue: {
    iconBg: 'bg-blue-900/30',
    iconText: 'text-blue-400',
    inputFocus: 'focus:border-blue-500',
    selectedRow: 'bg-blue-500/15 border border-blue-500/30',
    checkBg: 'bg-blue-600',
    confirmActive: 'bg-blue-600 hover:bg-blue-700 cursor-pointer',
    confirmDisabled: 'bg-blue-400 cursor-not-allowed',
  },
  red: {
    iconBg: 'bg-red-900/30',
    iconText: 'text-red-400',
    inputFocus: 'focus:border-red-500',
    selectedRow: 'bg-red-500/15 border border-red-500/30',
    checkBg: 'bg-red-600',
    confirmActive: 'bg-red-600 hover:bg-red-700 cursor-pointer',
    confirmDisabled: 'bg-red-400 cursor-not-allowed',
  },
  amber: {
    iconBg: 'bg-amber-900/30',
    iconText: 'text-amber-400',
    inputFocus: 'focus:border-amber-500',
    selectedRow: 'bg-amber-500/15 border border-amber-500/30',
    checkBg: 'bg-amber-600',
    confirmActive: 'bg-amber-600 hover:bg-amber-700 cursor-pointer',
    confirmDisabled: 'bg-amber-400 cursor-not-allowed',
  },
}

const palette = computed<PaletteClasses>(() =>
  (isDark.value ? DARK_PALETTES : LIGHT_PALETTES)[props.variant],
)

onMounted(async () => {
  if (props.loader) {
    loading.value = true
    try {
      loadedItems.value = await props.loader()
    } catch (_e) {
      loadError.value = 'Failed to load items'
    } finally {
      loading.value = false
    }
  }
  await nextTick()
  searchInputRef.value?.focus()
})

function handleConfirm() {
  if (!selectedId.value || props.submitting) return
  emit('confirm', selectedId.value)
}

function handleCancel() {
  if (props.submitting) return
  emit('cancel')
}
</script>
