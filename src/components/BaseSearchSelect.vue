<template>
  <!--
    Searchable select ("combobox"). Type to filter the options, pick with the
    mouse or ArrowUp/ArrowDown + Enter. `multiple` turns it into a tag picker:
    picked options show as removable chips and the menu stays open so several
    can be picked in a row (Backspace on an empty search removes the last one).

    Options are data ({ value, label, title?, disabled? } — the same shape as
    BaseDropdown), and the field skin matches BaseInput/BaseSelect so it can sit
    in the same filter row. Escape and an outside click close the menu.
  -->
  <div ref="rootEl" :class="block ? 'relative w-full' : 'relative inline-block min-w-48'">
    <div
      class="flex min-h-[38px] items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-sm transition-colors dark:bg-slate-900"
      :class="[
        open
          ? 'border-emerald-500 ring-2 ring-emerald-500/30'
          : 'border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-text',
      ]"
      @mousedown="onControlMouseDown"
    >
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-1">
        <span
          v-for="opt in selectedOptions"
          v-show="multiple"
          :key="String(opt.value)"
          class="inline-flex max-w-full items-center gap-1 rounded-md bg-emerald-50 py-0.5 pl-2 pr-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
        >
          <span class="truncate">{{ opt.label }}</span>
          <button
            type="button"
            class="rounded p-0.5 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:bg-emerald-500/25"
            :aria-label="`Remove ${opt.label}`"
            :disabled="disabled"
            @mousedown.stop.prevent
            @click.stop="remove(opt)"
          >
            <XMarkIcon class="h-3 w-3" aria-hidden="true" />
          </button>
        </span>
        <input
          ref="inputEl"
          v-model="query"
          type="text"
          role="combobox"
          autocomplete="off"
          :disabled="disabled"
          :readonly="!searchable"
          :aria-label="ariaLabel || placeholder"
          aria-autocomplete="list"
          :aria-expanded="open"
          :aria-controls="listId"
          :aria-activedescendant="open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined"
          :placeholder="inputPlaceholder"
          class="min-w-16 flex-1 border-0 bg-transparent p-0 py-0.5 text-sm text-slate-900 outline-none focus:ring-0 dark:text-slate-100 disabled:cursor-not-allowed"
          :class="hasSingleValue
            ? 'placeholder:text-slate-900 dark:placeholder:text-slate-100'
            : 'placeholder:text-slate-400 dark:placeholder:text-slate-500'"
          @focus="openMenu"
          @input="openMenu"
          @keydown="onKeydown"
        />
      </div>
      <button
        v-if="clearable && hasValue && !disabled"
        type="button"
        class="shrink-0 rounded p-0.5 text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:text-slate-200"
        aria-label="Clear selection"
        @mousedown.stop.prevent
        @click.stop="clear"
      >
        <XMarkIcon class="h-4 w-4" aria-hidden="true" />
      </button>
      <ChevronDownIcon
        class="h-4 w-4 shrink-0 text-slate-500 transition-transform dark:text-slate-400"
        :class="open ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </div>

    <ul
      v-if="open"
      :id="listId"
      role="listbox"
      :aria-multiselectable="multiple || undefined"
      class="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      <li
        v-for="(opt, i) in filtered"
        :id="`${listId}-${i}`"
        :key="String(opt.value)"
        role="option"
        :aria-selected="isSelected(opt)"
        :aria-disabled="opt.disabled || undefined"
        :title="opt.title"
        class="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left text-sm"
        :class="rowClass(opt, i)"
        @mousedown.prevent
        @mouseenter="activeIndex = i"
        @click="pick(opt)"
      >
        <span class="truncate">{{ opt.label }}</span>
        <CheckIcon v-if="isSelected(opt)" class="h-4 w-4 shrink-0" aria-hidden="true" />
      </li>
      <li v-if="filtered.length === 0" class="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
        {{ options.length === 0 ? emptyText : noResultsText }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { DropdownOption } from '../types/dropdown'

type Value = string | number

interface Props {
  options: readonly DropdownOption[]
  /** Selected value (single) or values (`multiple`). */
  modelValue?: Value | null | readonly Value[]
  /** Pick several options, shown as removable chips. */
  multiple?: boolean
  placeholder?: string
  /** Allow typing to filter. False makes it a plain (non-typing) picker. */
  searchable?: boolean
  /** Show the clear (×) button while something is selected. */
  clearable?: boolean
  /** Full-width (w-full). Set false for an inline field. */
  block?: boolean
  disabled?: boolean
  /** Accessible name when there is no visible label. */
  ariaLabel?: string
  /** Shown when the search matches nothing. */
  noResultsText?: string
  /** Shown when there are no options at all. */
  emptyText?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  multiple: false,
  placeholder: 'Select',
  searchable: true,
  clearable: true,
  block: true,
  disabled: false,
  ariaLabel: '',
  noResultsText: 'No matches.',
  emptyText: 'No options.',
})

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: 'update:modelValue', value: any): void
}>()

const rootEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const open = ref(false)
const query = ref('')
const activeIndex = ref(-1)
const listId = `search-select-${useId()}`

const selectedValues = computed<Value[]>(() => {
  const v = props.modelValue
  if (Array.isArray(v)) return [...v]
  return v === null || v === undefined || v === '' ? [] : [v as Value]
})

const selectedOptions = computed(() =>
  selectedValues.value
    .map((v) => props.options.find((o) => o.value === v))
    .filter((o): o is DropdownOption => !!o),
)

const hasValue = computed(() => selectedValues.value.length > 0)
const hasSingleValue = computed(() => !props.multiple && selectedOptions.value.length > 0)

// Single mode shows the picked label as the input's placeholder, so typing
// starts a fresh search while the current choice stays visible until then.
const inputPlaceholder = computed(() => {
  if (hasSingleValue.value) return selectedOptions.value[0].label
  if (props.multiple && hasValue.value) return ''
  return props.placeholder
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? props.options.filter((o) => o.label.toLowerCase().includes(q)) : [...props.options]
})

watch(filtered, (list) => {
  activeIndex.value = list.findIndex((o) => !o.disabled)
})

function isSelected(opt: DropdownOption): boolean {
  return selectedValues.value.includes(opt.value)
}

function rowClass(opt: DropdownOption, i: number): string {
  if (opt.disabled) return 'cursor-not-allowed text-slate-400 dark:text-slate-600'
  if (isSelected(opt)) {
    return i === activeIndex.value
      ? 'bg-emerald-600 text-white'
      : 'bg-emerald-500 text-white'
  }
  return i === activeIndex.value
    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
    : 'text-slate-700 dark:text-slate-200'
}

function openMenu() {
  if (props.disabled || open.value) return
  open.value = true
  activeIndex.value = filtered.value.findIndex((o) => !o.disabled)
}

function closeMenu() {
  open.value = false
  query.value = ''
}

function onControlMouseDown(e: MouseEvent) {
  if (props.disabled) return
  // Keep focus in the input; toggle the menu when clicking the chrome.
  if (e.target !== inputEl.value) e.preventDefault()
  if (open.value && e.target !== inputEl.value) {
    closeMenu()
  } else {
    inputEl.value?.focus()
    openMenu()
  }
}

function pick(opt: DropdownOption) {
  if (opt.disabled) return
  if (props.multiple) {
    const next = isSelected(opt)
      ? selectedValues.value.filter((v) => v !== opt.value)
      : [...selectedValues.value, opt.value]
    emit('update:modelValue', next)
    query.value = ''
    nextTick(() => inputEl.value?.focus())
  } else {
    emit('update:modelValue', opt.value)
    closeMenu()
    inputEl.value?.blur()
  }
}

function remove(opt: DropdownOption) {
  emit('update:modelValue', selectedValues.value.filter((v) => v !== opt.value))
}

function clear() {
  emit('update:modelValue', props.multiple ? [] : null)
  query.value = ''
}

function move(step: 1 | -1) {
  const list = filtered.value
  if (list.length === 0) return
  let i = activeIndex.value
  for (let n = 0; n < list.length; n++) {
    i = (i + step + list.length) % list.length
    if (!list[i].disabled) break
  }
  activeIndex.value = i
  nextTick(() => document.getElementById(`${listId}-${i}`)?.scrollIntoView?.({ block: 'nearest' }))
}

function onKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      if (!open.value) openMenu()
      else move(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      if (!open.value) openMenu()
      else move(-1)
      break
    case 'Enter':
      if (open.value && activeIndex.value >= 0) {
        e.preventDefault()
        pick(filtered.value[activeIndex.value])
      }
      break
    case 'Escape':
      if (open.value) {
        e.preventDefault()
        closeMenu()
      }
      break
    case 'Tab':
      closeMenu()
      break
    case 'Backspace':
      if (props.multiple && query.value === '' && selectedOptions.value.length) {
        remove(selectedOptions.value[selectedOptions.value.length - 1])
      }
      break
  }
}

function onDocumentMouseDown(e: MouseEvent) {
  if (open.value && rootEl.value && !rootEl.value.contains(e.target as Node)) {
    closeMenu()
  }
}

onMounted(() => document.addEventListener('mousedown', onDocumentMouseDown))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocumentMouseDown))
</script>
