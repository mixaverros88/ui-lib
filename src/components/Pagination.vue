<template>
  <div>
    <ul>
      <li v-for="cell in cells" :key="cell">
        <a v-if="cell!==0" @click="changePage(cell)" :class="{ active: cell === currentPage }">{{ cell }}</a>
        <span v-if="cell===0" style="cursor: not-allowed;">...</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
    default: 10
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

function changePage(pageNumber: number) {
  if (pageNumber !== currentPage.value && pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }

  if (totalPages.value > 5) {
    cells.value = [];

    let isAwayFromStartPoint = (pageNumber - 3) > 0;
    if (isAwayFromStartPoint) {
      cells.value.push(1);
      cells.value.push(0);
    }

    for (let i = 2; i >= 1; i--) {
      let previousCell = pageNumber - i;
      if (previousCell > 0) {
        cells.value.push(previousCell);
      }
    }

    cells.value.push(currentPage.value);

    let nextPages = totalPages.value - pageNumber;
    let hasNextPages = nextPages > 2;
    let nextPagesSize = 2;

    if (hasNextPages) {
      for (let i = 1; i <= nextPagesSize; i++) {
        cells.value.push(pageNumber + i);
      }
      cells.value.push(0);
      cells.value.push(totalPages.value);
    } else {
      for (let i = 1; i <= nextPages; i++) {
        cells.value.push(pageNumber + i);
      }
    }
  }

  emit('page-changed', pageNumber);
}

watch(() => props.totalItems, () => {
  totalPages.value = Math.ceil(props.totalItems / props.itemsPerPage);

  cells.value = [];
  if (totalPages.value > 5) {
    for (let i = 1; i < 5; i++) {
      cells.value.push(i);
    }
    cells.value.push(0);
    cells.value.push(totalPages.value);
  } else {
    for (let i = 1; i <= totalPages.value; i++) {
      cells.value.push(i);
    }
  }
})
</script>

<style lang="scss" scoped>
span {
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 0.75rem;
  text-decoration: none;
  color: black;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
}

li {
  margin-right: 3px;
}

a {
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 0.75rem;
  text-decoration: none;
  color: black;
}

a:hover {
  background-color: rgb(195 197 201);
  color: #000000;
  cursor: pointer;
}

a.active:hover {
  background-color: rgb(195 197 201);
}

a.active {
  font-weight: 700;
  border-radius: 10px;
  background-color: #e5e7eb;
  color: #000000;
}
</style>
