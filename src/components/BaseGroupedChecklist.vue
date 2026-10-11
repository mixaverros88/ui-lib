<template>
  <div>
    <label class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
      <input
        type="checkbox"
        class="h-4 w-4"
        :checked="allSelected"
        :aria-label="allAriaLabel"
        @change="toggleAll"
      />
      <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
        {{ allLabel }} ({{ allItems.length }})
      </span>
    </label>
    <div class="overflow-y-auto space-y-3 mt-3" :class="maxHeightClass">
      <div v-for="g in visibleGroups" :key="g.key">
        <label class="flex items-center gap-2 pb-1.5">
          <input
            type="checkbox"
            class="h-4 w-4"
            :checked="groupSelected(g)"
            :aria-label="`${allLabel} ${g.label}`"
            @change="toggleGroup(g)"
          />
          <span class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {{ g.label }} ({{ g.items.length }})
          </span>
        </label>
        <div class="grid grid-cols-[repeat(2,minmax(0,1fr))] sm:grid-cols-[repeat(3,minmax(0,1fr))] gap-x-3 gap-y-1.5">
          <label v-for="item in g.items" :key="item" class="flex items-center gap-2">
            <input
              type="checkbox"
              class="h-4 w-4"
              :checked="selected.has(item)"
              :aria-label="itemAriaLabel ? itemAriaLabel(item) : item"
              @change="toggleItem(item)"
            />
            <span
              class="text-sm text-slate-700 dark:text-slate-200"
              :class="{ 'font-mono': mono }"
            >{{ item }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Multi-select checklist in groups: a master "Select all (N)" checkbox, a
 * per-group select-all, and one checkbox per item. `v-model` is the array of
 * selected item ids (order follows the groups). Items are plain strings and
 * must be unique across groups; empty groups are not rendered.
 *
 * Typical use: "pick which symbols / users / records an action applies to"
 * inside a confirmation modal.
 */
import { computed } from 'vue'
import type { ChecklistGroup } from '../types/checklist'

interface Props {
  groups: ChecklistGroup[]
  modelValue: string[]
  /** Text of the master checkbox; group checkboxes read "<allLabel> <group>". */
  allLabel?: string
  allAriaLabel?: string
  /** Accessible name per item checkbox (defaults to the item itself). */
  itemAriaLabel?: (item: string) => string
  /** Render item labels in a monospace font (tickers, ids). */
  mono?: boolean
  maxHeightClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  allLabel: 'Select all',
  allAriaLabel: 'Select all items',
  itemAriaLabel: undefined,
  mono: false,
  maxHeightClass: 'max-h-72',
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>()

const visibleGroups = computed(() => props.groups.filter((g) => g.items.length > 0))
const allItems = computed(() => visibleGroups.value.flatMap((g) => g.items))
const selected = computed(() => new Set(props.modelValue))

const allSelected = computed(
  () => allItems.value.length > 0 && allItems.value.every((i) => selected.value.has(i)),
)

function groupSelected(g: ChecklistGroup): boolean {
  return g.items.every((i) => selected.value.has(i))
}

// Emit in group order so the model is stable regardless of click order.
function commit(next: Set<string>) {
  emit('update:modelValue', allItems.value.filter((i) => next.has(i)))
}

function toggleAll() {
  commit(allSelected.value ? new Set() : new Set(allItems.value))
}

function toggleGroup(g: ChecklistGroup) {
  const next = new Set(selected.value)
  const on = !groupSelected(g)
  for (const i of g.items) {
    if (on) next.add(i)
    else next.delete(i)
  }
  commit(next)
}

function toggleItem(item: string) {
  const next = new Set(selected.value)
  if (next.has(item)) next.delete(item)
  else next.add(item)
  commit(next)
}
</script>
