<template>
  <div class="w-13">
    <div
        class="border border-gray-300 relative aspect-square rounded-lg bg-white shadow-sm overflow-hidden flex items-center justify-center text-center" :class="computeCss()">

      <slot />

      <div class="absolute bottom-0 left-0 h-1 w-full" :class="bgColor"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ColorsEnums } from "../enums/ColorsEnums";

const props = defineProps({
  color: {
    type: String,
    required: false
  }
})

const pastelColors = [
  'bg-slate-300',
  'bg-zinc-300',
  'bg-neutral-300',
  'bg-stone-300',
  'bg-blue-300',
  'bg-green-300',
  'bg-yellow-300',
  'bg-purple-300',
  'bg-pink-300'
]

const bgColor = computed(() => {
  return pastelColors[Math.floor(Math.random() * pastelColors.length)]
})

function computeCss() {
  let color = 'gray';
  switch (props.color) {
    case ColorsEnums.GREEN: { color = 'green'; break; }
    case ColorsEnums.RED: { color = 'red'; break; }
    case ColorsEnums.BLUE: { color = 'blue'; break; }
    case ColorsEnums.YELLOW: { color = 'yellow'; break; }
    case ColorsEnums.NONE: { color = ''; break; }
  }
  return "font-bold bg-" + color + "-100 text-" + color + "-800 text-xs mr-2 px-2.5 py-0.5 rounded-full";
}
</script>
