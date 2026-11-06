<template>
  <Teleport to="body">
    <div
      v-if="current"
      class="fixed inset-0 z-[1000] flex flex-col bg-slate-950/90"
      role="dialog"
      aria-modal="true"
      @click.self="emit('close')"
    >
      <div class="flex items-center justify-between px-4 py-3 text-sm text-white">
        <span class="font-medium">{{ current.label }}</span>
        <div class="flex items-center gap-3">
          <span class="text-slate-300">{{ index + 1 }} / {{ photos.length }}</span>
          <button type="button" class="rounded-full p-1.5 hover:bg-white/10" :aria-label="closeLabel" @click="emit('close')">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
      <div class="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4" @click.self="emit('close')">
        <img :src="current.src" :alt="current.label" class="max-h-full max-w-full rounded-lg object-contain shadow-2xl" />
        <template v-if="photos.length > 1">
          <button
            type="button"
            class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            :aria-label="previousLabel"
            @click="step(-1)"
          >
            <ChevronLeftIcon class="h-7 w-7" />
          </button>
          <button
            type="button"
            class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            :aria-label="nextLabel"
            @click="step(1)"
          >
            <ChevronRightIcon class="h-7 w-7" />
          </button>
        </template>
      </div>
      <p v-if="current.caption" class="mx-auto max-w-2xl whitespace-pre-line px-4 pb-4 text-center text-sm text-white">
        {{ current.caption }}
      </p>
      <div v-if="photos.length > 1" class="flex justify-center gap-2 overflow-x-auto px-4 pb-4">
        <button
          v-for="(photo, i) in photos"
          :key="i"
          type="button"
          class="h-14 w-14 shrink-0 overflow-hidden rounded-md border-2"
          :class="i === index ? 'border-emerald-400' : 'border-transparent opacity-60 hover:opacity-100'"
          :aria-label="photo.label"
          @click="index = i"
        >
          <img :src="photo.src" :alt="photo.label" class="h-full w-full object-cover" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// Full-screen photo viewer. v-model is the current index; arrow keys or the buttons step through, Esc or the backdrop emits `close`. Labels are props so apps can translate them.
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { ViewerPhoto } from '../types/photoViewer'

const props = withDefaults(
  defineProps<{
    photos: ViewerPhoto[]
    closeLabel?: string
    previousLabel?: string
    nextLabel?: string
  }>(),
  { closeLabel: 'Close', previousLabel: 'Previous', nextLabel: 'Next' },
)
const index = defineModel<number>({ required: true })
const emit = defineEmits<{ close: [] }>()

const current = computed(() => props.photos[index.value])

function step(delta: number) {
  const n = props.photos.length
  if (n > 0) index.value = (index.value + delta + n) % n
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === 'ArrowRight') step(1)
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
