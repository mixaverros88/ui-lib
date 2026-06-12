<template>
  <div>
    <ul class="flex list-none p-0 m-0">
      <li v-for="(cell, index) in cells" :key="index" class="mr-1">
        <a
          v-if="cell !== 0"
          role="button"
          tabindex="0"
          @click="changePage(cell)"
          @keydown.enter="changePage(cell)"
          class="inline-block border border-gray-300 rounded-lg p-3 no-underline text-black cursor-pointer hover:bg-gray-300"
          :class="{ 'active font-bold bg-gray-200': cell === currentPage }"
        >{{ cell }}</a>
        <span v-else class="inline-block border border-gray-300 rounded-lg p-3 text-black cursor-not-allowed">...</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 20
  }
})

const currentPage = ref(1);
const totalPages = ref(0);
const cells = ref([] as number[]);
const emit = defineEmits(['page-changed']);

// Rebuild the visible cells around `page`. A cell value of 0 renders as
// an ellipsis. The window is the current page ± 2 neighbours, plus the
// first/last page with an ellipsis only when pages are actually hidden.
function buildCells(page: number) {
  if (totalPages.value <= 5) {
    cells.value = Array.from({ length: totalPages.value }, (_, i) => i + 1);
    return;
  }

  const out: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages.value, page + 2);

  if (start > 1) {
    out.push(1);
    if (start > 2) out.push(0);
  }
  for (let i = start; i <= end; i++) {
    out.push(i);
  }
  if (end < totalPages.value) {
    if (end < totalPages.value - 1) out.push(0);
    out.push(totalPages.value);
  }
  cells.value = out;
}

function changePage(pageNumber: number) {
  if (pageNumber === currentPage.value || pageNumber < 1 || pageNumber > totalPages.value) {
    return;
  }
  currentPage.value = pageNumber;
  buildCells(pageNumber);
  emit('page-changed', pageNumber);
}

watch(() => [props.totalItems, props.itemsPerPage], () => {
  totalPages.value = Math.ceil(props.totalItems / props.itemsPerPage);
  if (currentPage.value > totalPages.value) {
    currentPage.value = Math.max(1, totalPages.value);
  }
  buildCells(currentPage.value);
}, { immediate: true })
</script>
