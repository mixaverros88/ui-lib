<template>
  <!--
    Animated loading spinner — a spinning ring with a neutral track and a
    coloured leading arc.

    Props:
      • size  — diameter + ring thickness. 'sm' (16px) is the default and
        reproduces the original spinner; 'md' (24px), 'lg' (32px) and
        'xl' (48px) step up for full-page / empty-state loaders.
      • color — the colour of the spinning arc (`border-t-*`). The track
        stays neutral gray. Defaults to 'blue' to match the original.

    With no props it renders exactly the legacy spinner, so existing
    `<BaseSpinner />` call sites are unaffected.
  -->
  <div
    class="border-gray-200 rounded-full animate-spin"
    :class="[sizeClass, colorClass]"
    role="status"
    aria-label="Loading"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'
type SpinnerColor =
  | 'blue'
  | 'emerald'
  | 'sky'
  | 'indigo'
  | 'teal'
  | 'purple'
  | 'red'
  | 'amber'

const props = withDefaults(
  defineProps<{
    size?: SpinnerSize
    color?: SpinnerColor
  }>(),
  {
    size: 'sm',
    color: 'blue',
  },
)

// Diameter pairs with a proportional ring thickness. Full literal strings
// so Tailwind detects them at build time.
const sizeClass = computed(() => {
  const sizes: Record<SpinnerSize, string> = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-4',
    xl: 'w-12 h-12 border-4',
  }
  return sizes[props.size]
})

// Only the leading arc (`border-t-*`) is tinted; the rest of the ring is
// the neutral gray track from the template.
const colorClass = computed(() => {
  const colors: Record<SpinnerColor, string> = {
    blue: 'border-t-blue-500',
    emerald: 'border-t-emerald-500',
    sky: 'border-t-sky-500',
    indigo: 'border-t-indigo-500',
    teal: 'border-t-teal-500',
    purple: 'border-t-purple-500',
    red: 'border-t-red-500',
    amber: 'border-t-amber-500',
  }
  return colors[props.color]
})
</script>
