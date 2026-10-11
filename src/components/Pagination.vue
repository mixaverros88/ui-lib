<template>
  <nav aria-label="Pagination">
    <ul class="flex list-none p-0 m-0">
      <li v-for="(cell, index) in cells" :key="index" class="mr-1">
        <button
          v-if="cell !== 0"
          type="button"
          :aria-current="cell === currentPage ? 'page' : undefined"
          :aria-label="`Go to page ${cell}`"
          @click="changePage(cell)"
          class="inline-block min-w-[44px] border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-black dark:text-gray-200 cursor-pointer transition-colors hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          :class="{ 'active font-bold bg-gray-200 dark:bg-gray-700': cell === currentPage }"
        >{{ cell }}</button>
        <span v-else aria-hidden="true" class="inline-block border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-black dark:text-gray-200 cursor-not-allowed">...</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 20
  },
  // Optional CONTROLLED current page (1-based). When set, the highlighted
  // page follows this prop instead of internal state, so a page restored
  // from the URL (?page=N) renders as N rather than 1. Clicks still emit
  // `page-changed`; the parent is expected to feed the new page back in.
  // Left undefined, the component keeps its own state (uncontrolled).
  page: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits(['page-changed']);

// Guard against a missing/zero page size or total (e.g. a reset form that
// nulled them): fall back to 20 per page / 0 items instead of rendering
// "Infinity" or "NaN" pages.
const totalPages = computed(() => {
  const perPage = Number(props.itemsPerPage) > 0 ? Number(props.itemsPerPage) : 20;
  const total = Number(props.totalItems) > 0 ? Number(props.totalItems) : 0;
  return Math.ceil(total / perPage);
});

function clamp(p: number): number {
  return Math.min(Math.max(p, 1), Math.max(totalPages.value, 1));
}

const internalPage = ref(1);
// The total shrinking under the current page snaps it to the last page.
watch(totalPages, () => {
  internalPage.value = clamp(internalPage.value);
});

const currentPage = computed(() =>
  props.page != null && Number.isFinite(props.page) ? clamp(props.page) : internalPage.value
);

// The visible cells around the current page. A cell value of 0 renders as
// an ellipsis. The window is the current page ± 2 neighbours, plus the
// first/last page with an ellipsis only when pages are actually hidden.
const cells = computed(() => {
  const total = totalPages.value;
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const out: number[] = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(total, currentPage.value + 2);

  if (start > 1) {
    out.push(1);
    if (start > 2) out.push(0);
  }
  for (let i = start; i <= end; i++) {
    out.push(i);
  }
  if (end < total) {
    if (end < total - 1) out.push(0);
    out.push(total);
  }
  return out;
});

function changePage(pageNumber: number) {
  if (pageNumber === currentPage.value || pageNumber < 1 || pageNumber > totalPages.value) {
    return;
  }
  internalPage.value = pageNumber;
  emit('page-changed', pageNumber);
}
</script>
