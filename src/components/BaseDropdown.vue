<template>
  <!--
    Button-style single-select dropdown ("Select Social User ⌄"). Unlike
    BaseSelect (a themed native <select>), this renders a trigger button plus
    a floating menu, so the closed control shows a placeholder and a chevron
    that rotates while open — matching the app's filter dropdowns.

    Options are passed as data (not <option> slots) so the menu rows can carry
    tooltips and disabled state. Selecting a row emits its `value` and closes
    the menu; Escape and an outside click also close it.

    Same `dark:`-variant note as BaseSelect: the slate skin ships static
    light/dark classes so consumers get both themes without extra config.
  -->
  <div
    ref="rootEl"
    :class="block ? 'relative w-full' : 'relative inline-block'"
  >
    <button
      type="button"
      :class="[triggerClass, block ? 'w-full' : '']"
      :disabled="disabled"
      :aria-label="ariaLabel || undefined"
      aria-haspopup="listbox"
      :aria-expanded="open"
      @click="toggle"
    >
      <!-- min-w-0 + truncate so long labels ellipsize inside narrow
           (fixed-column) triggers instead of wrapping or widening them. -->
      <span class="min-w-0 truncate" :class="selectedOption ? '' : 'text-slate-400 dark:text-slate-500'">
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>
      <ChevronDownIcon
        class="shrink-0 transition-transform"
        :class="[chevronClass, open ? 'rotate-180' : '']"
        aria-hidden="true"
      />
    </button>

    <ul
      v-if="open"
      role="listbox"
      :aria-label="ariaLabel || placeholder"
      class="absolute z-20 mt-1 w-full min-w-max max-w-xs max-h-60 overflow-auto rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-1 shadow-lg focus:outline-none"
    >
      <li
        v-for="opt in options"
        :key="String(opt.value)"
        role="option"
        :aria-selected="opt.value === modelValue"
        :title="opt.title"
      >
        <button
          type="button"
          :disabled="opt.disabled"
          :class="rowClass(opt)"
          @click="select(opt)"
        >
          {{ opt.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useEscapeKey } from '../composables/useEscapeKey'
import type { DropdownOption } from '../types/dropdown'

// NOT generic on purpose: vite-plugin-dts flattens SFC generics out of the
// emitted declarations, so consumers would see the erased constraint anyway.
// The update:modelValue payload is `any` so `v-model` on a union-typed ref
// type-checks; the actual payload is always one of the options' values.
interface Props {
  options: readonly DropdownOption[]
  modelValue?: string | number | null
  /** Trigger text shown when nothing is selected. */
  placeholder?: string
  /** 'md' = px-4 py-2.5 (default, the app filter height); 'sm' = px-3 py-2. */
  size?: 'sm' | 'md'
  /** Full-width (w-full). Set false for an inline, content-width dropdown. */
  block?: boolean
  disabled?: boolean
  /** Accessible name for the trigger/listbox when there is no visible label. */
  ariaLabel?: string
  /**
   * Replaces the trigger's default slate skin (border/background/text/padding)
   * with the given classes — layout, focus ring and disabled classes are kept.
   * Lets a consumer render the trigger as e.g. a coloured status pill while
   * keeping the shared menu behaviour. `size` is ignored when this is set.
   */
  triggerClass?: string
  /** Chevron sizing/colour classes; shrink for compact triggers. */
  chevronClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: 'Select',
  size: 'md',
  block: true,
  disabled: false,
  ariaLabel: '',
  triggerClass: '',
  chevronClass: 'w-5 h-5 text-slate-500 dark:text-slate-400',
})

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'update:modelValue', value: any): void
}>()

const open = ref(false)
const rootEl = ref<HTMLElement | null>(null)

const selectedOption = computed(() =>
  props.options.find((o) => o.value === props.modelValue) ?? null,
)

const triggerClass = computed(() => {
  const layout =
    'flex items-center justify-between gap-2 text-left transition-colors ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ' +
    'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed '
  if (props.triggerClass) return layout + props.triggerClass
  const padding = props.size === 'sm' ? 'px-3 py-2' : 'px-4 py-2.5'
  return (
    layout +
    'rounded-lg border text-sm ' +
    'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 ' +
    'hover:bg-slate-50 dark:hover:bg-slate-800 ' +
    padding
  )
})

function rowClass(opt: DropdownOption): string {
  const selected = opt.value === props.modelValue
  const base =
    'block w-full px-4 py-2 text-left text-sm transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed'
  const fill = selected
    ? 'bg-emerald-500 text-white'
    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
  return `${base} ${fill}`
}

function toggle() {
  if (props.disabled) return
  open.value = !open.value
}

function select(opt: DropdownOption) {
  if (opt.disabled) return
  emit('update:modelValue', opt.value)
  open.value = false
}

useEscapeKey(() => {
  open.value = false
})

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>
